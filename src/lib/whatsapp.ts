export const WHATSAPP_NUMBER = "5514997091179";

export function normalizeWhatsAppPhone(rawPhone: string) {
  const digits = rawPhone.replace(/\D/g, "");
  if (!digits) return WHATSAPP_NUMBER;
  return digits.startsWith("55") ? digits : `55${digits}`;
}

export function getWhatsAppUrl(message = "", phone = WHATSAPP_NUMBER) {
  const normalizedPhone = normalizeWhatsAppPhone(phone);
  const params = new URLSearchParams();
  params.set("phone", normalizedPhone);
  if (message.trim()) params.set("text", message);
  const query = params.toString();
  return `https://web.whatsapp.com/send${query ? `?${query}` : ""}`;
}

export function getWhatsAppAppUrl(message = "", phone = WHATSAPP_NUMBER) {
  const params = new URLSearchParams({ phone: normalizeWhatsAppPhone(phone) });
  if (message.trim()) params.set("text", message);
  return `whatsapp://send?${params.toString()}`;
}

export function isMobileWhatsAppDevice() {
  if (typeof navigator === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function openWhatsApp(message = "", phone = WHATSAPP_NUMBER) {
  const appUrl = getWhatsAppAppUrl(message, phone);

  if (isMobileWhatsAppDevice()) {
    window.location.href = appUrl;
    return;
  }

  window.open(appUrl, "_blank", "noopener,noreferrer");
}

export function handleWhatsAppClick(
  event: { preventDefault: () => void },
  message = "",
  phone = WHATSAPP_NUMBER,
) {
  event.preventDefault();
  openWhatsApp(message, phone);
}