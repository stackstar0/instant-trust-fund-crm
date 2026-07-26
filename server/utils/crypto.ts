import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

if (!ENCRYPTION_KEY && process.env.NODE_ENV === "production") {
  throw new Error("[FATAL] ENCRYPTION_KEY environment variable is not set. Server cannot start in production without it.");
}

// Derive a 32-byte key from the env variable via SHA-256
const getKey = (): Buffer => {
  const rawKey = ENCRYPTION_KEY || "";
  return crypto.createHash("sha256").update(rawKey).digest();
};

const IV_LENGTH = 12; // AES-256-GCM optimal IV length

/**
 * Encrypts a plain-text field using AES-256-GCM.
 * Output format: <iv_hex>:<ciphertext_hex>:<auth_tag_hex>
 */
export function encryptField(text: string): string {
  if (!text) return "";

  const key = getKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag().toString("hex");

  return `${iv.toString("hex")}:${encrypted}:${authTag}`;
}

/**
 * Decrypts an AES-256-GCM encrypted field.
 * Returns "[DECRYPTION_FAILED]" if decryption fails (tampered data, wrong key).
 */
export function decryptField(encryptedText: string): string {
  if (!encryptedText || !encryptedText.includes(":")) return encryptedText;

  try {
    const parts = encryptedText.split(":");
    if (parts.length !== 3) return encryptedText;

    const [ivHex, ciphertext, tagHex] = parts;

    const key = getKey();
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(tagHex, "hex");

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(ciphertext, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    console.error("[CRYPTO] Decryption failed:", (error as Error).message);
    return "[DECRYPTION_FAILED]";
  }
}

/**
 * Masks a sensitive string for display (e.g. Aadhaar, PAN).
 * Shows last 4 characters only.
 */
export function maskSensitiveField(value: string, visibleChars = 4): string {
  if (!value || value.length <= visibleChars) return "****";
  return "*".repeat(value.length - visibleChars) + value.slice(-visibleChars);
}

/**
 * Generates a cryptographically secure random token.
 */
export function generateSecureToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString("hex");
}

/**
 * Creates a SHA-256 hash of a token for safe storage.
 */
export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}
