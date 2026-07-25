export const WHATSAPP_NUMBER = "5514997091179";

export function normalizeWhatsAppPhone(rawPhone: string) {
  const digits = rawPhone.replace(/\D/g, "");
  if (!digits) return WHATSAPP_NUMBER;
  return digits.startsWith("55") ? digits : `55${digits}`;
}

export function getWhatsAppUrl(message = "", phone = WHATSAPP_NUMBER) {
  const params = new URLSearchParams({ phone });
  if (message.trim()) params.set("text", message);
  return `https://web.whatsapp.com/send?${params.toString()}`;
}