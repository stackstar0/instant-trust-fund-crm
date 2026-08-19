import { Router } from "express";
import multer from "multer";
import * as xlsx from "xlsx";
import { UserModel } from "../models/User";
import { LoanModel } from "../models/Loan";
import mongoose from "mongoose";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Stage 1: Upload and Parse
router.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { defval: "" });

    if (data.length === 0) {
      return res.status(400).json({ error: "File is empty" });
    }

    const headers = Object.keys(data[0] as object);
    const preview = data.slice(0, 5);

    res.json({
      headers,
      preview,
      data, // Send full data to client to hold in state
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to process file" });
  }
});

// Stage 2: Validate mapped data
router.post("/validate", async (req, res) => {
  try {
    const { data, mappings } = req.body;
    
    if (!data || !mappings) {
      return res.status(400).json({ error: "Missing data or mappings" });
    }

    let validCount = 0;
    let invalidCount = 0;
    let duplicateCount = 0;
    const errors: any[] = [];
    const validData: any[] = [];

    // Fetch existing unique fields to check duplicates
    const existingUsers = await UserModel.find({}, "phone email panNumber");
    const existingPhones = new Set(existingUsers.map(u => u.phone));
    const existingEmails = new Set(existingUsers.filter(u => u.email).map(u => u.email));
    const existingPans = new Set(existingUsers.filter(u => u.panNumber).map(u => u.panNumber));

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      
      // Map row based on mappings
      const mappedRow: any = {};
      for (const [dbField, fileColumn] of Object.entries(mappings)) {
        mappedRow[dbField] = row[fileColumn as string];
      }

      const rowErrors = [];

      // Validate required fields
      if (!mappedRow.name) rowErrors.push("Missing Name");
      if (!mappedRow.phone) rowErrors.push("Missing Phone");

      // Validate phone format
      if (mappedRow.phone && !/^\d{10}$/.test(String(mappedRow.phone).trim())) {
        rowErrors.push("Invalid Phone Format (must be 10 digits)");
      }

      // Validate loan amount if loan data provided
      if (mappedRow.principalAmount !== undefined && Number(mappedRow.principalAmount) <= 0) {
        rowErrors.push("Principal amount must be > 0");
      }

      // Duplicate check
      let isDuplicate = false;
      if (mappedRow.phone && existingPhones.has(String(mappedRow.phone).trim())) {
        isDuplicate = true;
      }
      if (mappedRow.email && existingEmails.has(String(mappedRow.email).trim().toLowerCase())) {
        isDuplicate = true;
      }
      if (mappedRow.panNumber && existingPans.has(String(mappedRow.panNumber).trim())) {
        isDuplicate = true;
      }

      if (isDuplicate) {
        duplicateCount++;
        rowErrors.push("Duplicate record found (Phone, Email, or PAN already exists)");
      }

      if (rowErrors.length > 0) {
        invalidCount++;
        errors.push({ row: i + 1, data: mappedRow, errors: rowErrors });
      } else {
        validCount++;
        validData.push(mappedRow);
      }
    }

    res.json({
      totalRecords: data.length,
      validCount,
      duplicateCount,
      invalidCount,
      errors,
      validPreview: validData.slice(0, 5),
      validData // Send valid data back for commit stage
    });
  } catch (error) {
    console.error("Validation error:", error);
    res.status(500).json({ error: "Validation failed" });
  }
});

// Stage 3: Commit
router.post("/commit", async (req, res) => {
  try {
    const { validData } = req.body;
    if (!validData || !Array.isArray(validData)) {
      return res.status(400).json({ error: "Missing validData array" });
    }

    const userOperations = [];
    const loanOperations = [];

    for (const row of validData) {
      const userId = new mongoose.Types.ObjectId();
      
      // 1. Prepare User insert operation
      userOperations.push({
        insertOne: {
          document: {
            _id: userId,
            name: row.name,
            email: row.email || undefined,
            phone: String(row.phone).trim(),
            role: "User",
            panNumber: row.panNumber,
            aadhaarNumber: row.aadhaarNumber,
            address: row.address,
          }
        }
      });

      // 2. Prepare Loan insert operation if applicable
      if (row.loanType && row.principalAmount) {
        const tenure = Number(row.tenureMonths || 12);
        const startDate = row.startDate ? new Date(row.startDate) : new Date();
        const endDate = row.endDate ? new Date(row.endDate) : new Date(new Date(startDate).setMonth(startDate.getMonth() + tenure));
        
        loanOperations.push({
          insertOne: {
            document: {
              loanId: row.loanId || `LN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              userId: userId,
              loanType: row.loanType,
              principalAmount: Number(row.principalAmount),
              interestRate: Number(row.interestRate || 10),
              tenureMonths: tenure,
              startDate: startDate,
              endDate: endDate,
              emiAmount: Number(row.emiAmount || 0),
              emiDueDate: Number(row.emiDueDate || 1),
              outstandingAmount: Number(row.principalAmount),
              nextEmiDate: row.nextEmiDate ? new Date(row.nextEmiDate) : new Date(new Date(startDate).setDate(Number(row.emiDueDate || 1))),
              status: "ACTIVE"
            }
          }
        });
      }
    }

    if (userOperations.length > 0) {
      await UserModel.bulkWrite(userOperations);
    }
    if (loanOperations.length > 0) {
      await LoanModel.bulkWrite(loanOperations);
    }

    res.json({ message: "Import completed successfully", importedUsers: userOperations.length, importedLoans: loanOperations.length });
  } catch (error) {
    console.error("Commit error:", error);
    res.status(500).json({ error: "Commit failed" });
  }
});

export default router;
