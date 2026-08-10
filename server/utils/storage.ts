import fs from "fs";
import path from "path";
import crypto from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export function generateSecureSignedUrl(fileKey: string, expiresInMinutes: number = 60): string {
  const expiresAt = Math.floor(Date.now() / 1000) + expiresInMinutes * 60;
  const secret = process.env.JWT_SECRET || "secure-storage-secret-key";
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${fileKey}:${expiresAt}`)
    .digest("hex");

  return `/api/documents/download/${encodeURIComponent(fileKey)}?expires=${expiresAt}&signature=${signature}`;
}

export function verifySignedUrl(fileKey: string, expires: number, signature: string): boolean {
  if (Math.floor(Date.now() / 1000) > expires) return false;
  const secret = process.env.JWT_SECRET || "secure-storage-secret-key";
  const expectedSig = crypto
    .createHmac("sha256", secret)
    .update(`${fileKey}:${expires}`)
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig));
}
