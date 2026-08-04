import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Storage engine config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    // Generate secure randomized unique filename
    const uniqueSuffix = crypto.randomBytes(16).toString("hex");
    const originalExt = path.extname(file.originalname).toLowerCase();
    cb(null, `doc-${uniqueSuffix}${originalExt}`);
  }
});

// File filter validator (PDF, PNG, JPEG)
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedExtensions = [".pdf", ".png", ".jpg", ".jpeg"];
  const allowedMimeTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];

  const fileExt = path.extname(file.originalname).toLowerCase();
  const fileMime = file.mimetype;

  if (allowedExtensions.includes(fileExt) && allowedMimeTypes.includes(fileMime)) {
    cb(null, true);
  } else {
    cb(new Error("Security violation: Only PDF, PNG, and JPEG files are permitted."));
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB maximum size limit
  }
});
