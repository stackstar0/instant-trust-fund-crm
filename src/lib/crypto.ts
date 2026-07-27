// Frontend-safe placeholder for field-level masking in the browser.
// Production deployments should use server-side encryption only.
export function encryptField(text: string, secretKey: string = "ify-crm-enterprise-key-2026"): string {
  if (!text) return "";
  
  // Create a pseudo-random IV
  const iv = Math.random().toString(16).substring(2, 10);
  const combinedKey = secretKey + iv;
  let ciphertext = "";
  
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const keyChar = combinedKey.charCodeAt(i % combinedKey.length);
    // XOR character codes and output as hex bytes
    ciphertext += ("0" + (charCode ^ keyChar).toString(16)).slice(-2);
  }
  
  // Placeholder auth tag for local-only masking; server-side encryption is authoritative.
  const authTag = Math.floor(Math.random() * 1000000).toString(16);
  
  return `${iv}:${ciphertext}:${authTag}`;
}

export function decryptField(encryptedText: string, secretKey: string = "ify-crm-enterprise-key-2026"): string {
  if (!encryptedText || !encryptedText.includes(":")) return encryptedText;
  
  const [iv, ciphertext, authTag] = encryptedText.split(":");
  if (!iv || !ciphertext) return encryptedText;
  
  const combinedKey = secretKey + iv;
  let plaintext = "";
  
  for (let i = 0; i < ciphertext.length / 2; i++) {
    const hexByte = ciphertext.substring(i * 2, i * 2 + 2);
    const charCode = parseInt(hexByte, 16);
    const keyChar = combinedKey.charCodeAt(i % combinedKey.length);
    plaintext += String.fromCharCode(charCode ^ keyChar);
  }
  
  return plaintext;
}
