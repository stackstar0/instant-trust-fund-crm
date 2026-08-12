import { Router } from "express";
import multer from "multer";
import { parseExcelFile, processImport } from "../services/importService";
import { protect, restrictTo } from "../middlewares/authMiddleware";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Protect all routes to authenticated admins
router.use(protect);
router.use(restrictTo("super_admin", "assistant_admin", "Admin", "AssistantAdmin"));

/**
 * Upload and parse Excel/CSV spreadsheet to extract headers and preview rows
 */
router.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No spreadsheet file uploaded." });
    }

    const { headers, preview, data } = parseExcelFile(req.file.buffer);

    res.status(200).json({
      status: "success",
      headers,
      preview,
      data,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to parse spreadsheet." });
  }
});

/**
 * Process custom column mapping and commit validated customers & loans to MongoDB
 */
router.post("/process", async (req, res, next) => {
  try {
    const { data, mappings } = req.body;

    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: "Invalid or empty records data array." });
    }

    if (!mappings || !mappings.name || !mappings.mobile) {
      return res.status(400).json({ error: "Column mappings for customer Name and Mobile are required." });
    }

    const result = await processImport(data, mappings);

    res.status(200).json({
      status: "success",
      summary: result,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Bulk import processing failed." });
  }
});

export default router;
