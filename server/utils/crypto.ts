import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "ify-crm-enterprise-key-32bytes-long-101"; // Must be exactly 32 bytes/characters
const IV_LENGTH = 12; // For AES-256-GCM, IV length is 12 bytes
const AUTH_TAG_LENGTH = 16;

export function encryptField(text: string): string {
  if (!text) return "";
  
  // Enforce key length to exactly 32 bytes
  const key = crypto.createHash("sha256").update(ENCRYPTION_KEY).digest();
  
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  
  const authTag = cipher.getAuthTag().toString("hex");
  
  // Output format: iv:ciphertext:tag
  return `${iv.toString("hex")}:${encrypted}:${authTag}`;
}

export function decryptField(encryptedText: string): string {
  if (!encryptedText || !encryptedText.includes(":")) return encryptedText;
  
  try {
    const [ivHex, ciphertext, tagHex] = encryptedText.split(":");
    if (!ivHex || !ciphertext || !tagHex) return encryptedText;
    
    const key = crypto.createHash("sha256").update(ENCRYPTION_KEY).digest();
    
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(tagHex, "hex");
    
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(ciphertext, "hex", "utf8");
    decrypted += decipher.final("utf8");
    
    return decrypted;
  } catch (error) {
    console.error("[DECRYPTION_ERROR] Failed to decrypt field:", error);
    return "[DECRYPTION_FAILED]";
  }
}
