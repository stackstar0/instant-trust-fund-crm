import * as xlsx from "xlsx";
import mongoose from "mongoose";
import { CustomerModel } from "../models/Customer";
import { LoanAccountModel } from "../models/LoanAccount";

export interface IImportMapping {
  name: string;
  mobile: string;
  email?: string;
  pan?: string;
  loanType?: string;
  principal?: string;
  emi?: string;
  dueDay?: string;
}

export function parseExcelFile(buffer: Buffer) {
  const workbook = xlsx.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet, { defval: "" });

  if (data.length === 0) {
    throw new Error("The uploaded spreadsheet contains no rows.");
  }

  const headers = Object.keys(data[0] as object);
  const preview = data.slice(0, 5);

  return {
    headers,
    preview,
    data,
  };
}

export function normalizePhoneNumber(phoneStr: string): string | null {
  if (!phoneStr) return null;
  const clean = String(phoneStr).replace(/\D/g, "");
  if (/^[6-9]\d{9}$/.test(clean)) {
    return clean;
  }
  if (clean.length === 12 && clean.startsWith("91") && /^[6-9]\d{9}$/.test(clean.slice(2))) {
    return clean.slice(2);
  }
  if (clean.length === 11 && clean.startsWith("0") && /^[6-9]\d{9}$/.test(clean.slice(1))) {
    return clean.slice(1);
  }
  return null;
}

export async function processImport(rawData: any[], mappings: IImportMapping) {
  const summary = {
    totalFound: rawData.length,
    validCount: 0,
    duplicateCount: 0,
    invalidCount: 0,
    errors: [] as { row: number; data: any; errors: string[] }[],
  };

  const processedMobiles = new Set<string>();

  for (let i = 0; i < rawData.length; i++) {
    const row = rawData[i];
    const rowNumber = i + 1;
    const rowErrors: string[] = [];

    // Extract mapped fields
    const nameVal = String(row[mappings.name] || "").trim();
    const rawMobile = String(row[mappings.mobile] || "").trim();
    const emailVal = mappings.email ? String(row[mappings.email] || "").trim() : "";
    const panVal = mappings.pan ? String(row[mappings.pan] || "").trim() : "";
    const loanTypeVal = mappings.loanType ? String(row[mappings.loanType] || "").trim() : "";
    const principalVal = mappings.principal ? Number(row[mappings.principal]) : NaN;
    const emiVal = mappings.emi ? Number(row[mappings.emi]) : NaN;
    const dueDayVal = mappings.dueDay ? Number(row[mappings.dueDay]) : 1;

    // Validate fields
    if (!nameVal) {
      rowErrors.push("Customer name is required.");
    }

    const normalizedMobile = normalizePhoneNumber(rawMobile);
    if (!normalizedMobile) {
      rowErrors.push(`Invalid Indian mobile number format: '${rawMobile}'`);
    }

    // Determine error or duplicates
    if (rowErrors.length > 0) {
      summary.invalidCount++;
      summary.errors.push({ row: rowNumber, data: row, errors: rowErrors });
      continue;
    }

    const safeMobile = normalizedMobile!;

    // Duplicate check in this upload batch
    if (processedMobiles.has(safeMobile)) {
      summary.duplicateCount++;
      summary.errors.push({
        row: rowNumber,
        data: row,
        errors: [`Duplicate customer mobile '${safeMobile}' within the uploaded file.`],
      });
      continue;
    }

    // Duplicate check in database
    const existingDbCustomer = await CustomerModel.findOne({ mobile: safeMobile, isDeleted: false });
    if (existingDbCustomer) {
      summary.duplicateCount++;
      summary.errors.push({
        row: rowNumber,
        data: row,
        errors: [`Customer with mobile '${safeMobile}' already exists in database.`],
      });
      continue;
    }

    // Save Customer and active LoanAccount (wrap in transaction if supported, or sequence)
    try {
      processedMobiles.add(safeMobile);

      const customer = await CustomerModel.create({
        customerId: `CUST-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        fullName: nameVal,
        normalizedName: nameVal.toLowerCase().trim(),
        mobile: safeMobile,
        email: emailVal || undefined,
        pan: panVal || undefined,
        kycStatus: "pending",
        source: "imported",
        isImported: true,
      });

      // Link LoanAccount if loan details are mapped
      if (loanTypeVal && !isNaN(principalVal) && principalVal > 0) {
        const tenure = 12; // default
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(startDate.getMonth() + tenure);

        await LoanAccountModel.create({
          loanId: `LN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          customerId: customer._id,
          loanType: loanTypeVal as any,
          principalAmount: principalVal,
          interestRate: 12.0, // default
          tenureMonths: tenure,
          startDate,
          endDate,
          emiAmount: !isNaN(emiVal) ? emiVal : Math.round((principalVal * 1.12) / tenure),
          emiDueDate: !isNaN(dueDayVal) && dueDayVal >= 1 && dueDayVal <= 31 ? dueDayVal : 5,
          outstandingAmount: principalVal,
          nextEmiDate: new Date(startDate.getFullYear(), startDate.getMonth() + 1, !isNaN(dueDayVal) ? dueDayVal : 5),
          status: "ACTIVE",
        });
      }

      summary.validCount++;
    } catch (err: any) {
      rowErrors.push(err.message || "Database execution failed during record creation.");
      summary.invalidCount++;
      summary.errors.push({ row: rowNumber, data: row, errors: rowErrors });
    }
  }

  return summary;
}
