const configuredWhatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export const whatsappNumber =
  configuredWhatsAppNumber && /^\+?\d+$/.test(configuredWhatsAppNumber)
    ? configuredWhatsAppNumber.replace(/\D/g, '')
    : '965XXXXXXXX';

export const phoneNumber =
  process.env.NEXT_PUBLIC_PHONE_NUMBER || '+965XXXXXXXX';

export const emailAddress =
  process.env.NEXT_PUBLIC_EMAIL || 'taysir.licensing@gmail.com';

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
