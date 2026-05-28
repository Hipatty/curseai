"use server";

// Yeh function chupchaap server par password check karega
export async function verifyAdminPasscode(inputPasscode: string) {
  const secret = process.env.ADMIN_PASSCODE || "admin123"; // Agar .env na mile toh fallback
  return inputPasscode === secret;
}