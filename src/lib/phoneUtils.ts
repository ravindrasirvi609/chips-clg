/**
 * Utility functions for phone number handling in WhatsApp integration
 */

/**
 * Clean and format phone number for WhatsApp API
 * Removes country code, leading zeros, and non-numeric characters
 */
export function formatPhoneNumber(phoneNumber: string): string {
  if (!phoneNumber) return "";

  // Remove all non-numeric characters
  let cleaned = phoneNumber.replace(/\D/g, "");

  // Remove country code if present (91 for India)
  if (cleaned.startsWith("91") && cleaned.length === 12) {
    cleaned = cleaned.substring(2);
  }

  // Remove leading zeros
  cleaned = cleaned.replace(/^0+/, "");

  return cleaned;
}

/**
 * Validate if phone number is a valid Indian mobile number
 */
export function isValidIndianMobile(phoneNumber: string): boolean {
  const cleaned = formatPhoneNumber(phoneNumber);

  // Indian mobile numbers are 10 digits and start with 6, 7, 8, or 9
  const mobilePattern = /^[6-9]\d{9}$/;
  return mobilePattern.test(cleaned);
}

/**
 * Add country code to phone number for display
 */
export function addCountryCode(
  phoneNumber: string,
  countryCode: string = "+91"
): string {
  const cleaned = formatPhoneNumber(phoneNumber);
  return cleaned ? `${countryCode} ${cleaned}` : "";
}

/**
 * Mask phone number for privacy (e.g., for logs)
 */
export function maskPhoneNumber(phoneNumber: string): string {
  const cleaned = formatPhoneNumber(phoneNumber);
  if (cleaned.length !== 10) return "***";

  return cleaned.substring(0, 3) + "****" + cleaned.substring(7);
}

/**
 * Get country code and phone number for Interakt API
 */
export function getInteraktPhoneFormat(phoneNumber: string): {
  countryCode: string;
  phoneNumber: string;
} {
  return {
    countryCode: "+91",
    phoneNumber: formatPhoneNumber(phoneNumber),
  };
}

// Export for use in components and API routes
export const phoneUtils = {
  format: formatPhoneNumber,
  validate: isValidIndianMobile,
  addCountryCode,
  mask: maskPhoneNumber,
  forInterakt: getInteraktPhoneFormat,
};
