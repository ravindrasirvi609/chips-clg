import { phoneUtils } from "./phoneUtils";

interface WhatsAppTemplateData {
  phoneNumber: string;
  countryCode: string;
  templateName: string;
  languageCode: string;
  headerValues?: string[];
  bodyValues?: string[];
  buttonValues?: { [key: string]: string[] };
  callbackData?: string;
}

interface WhatsAppResponse {
  result: boolean;
  message: string;
  id?: string;
}

export class WhatsAppService {
  private apiKey: string;
  private baseUrl = "https://api.interakt.ai/v1/public/message/";

  constructor() {
    this.apiKey = process.env.INTERAKT_API_KEY || "";
    if (!this.apiKey) {
      console.warn("INTERAKT_API_KEY not found in environment variables");
    } else {
      console.log(
        "API Key found:",
        this.apiKey.substring(0, 10) + "..." + this.apiKey.slice(-4)
      );
    }
  }

  /**
   * Send WhatsApp template message using Interakt API
   */
  async sendTemplateMessage(
    data: WhatsAppTemplateData
  ): Promise<WhatsAppResponse> {
    if (!this.apiKey) {
      throw new Error(
        "Interakt API key is not configured. Please set INTERAKT_API_KEY in your .env.local file"
      );
    }

    console.log("debugging_tips_001", data);

    try {
      const payload = {
        countryCode: data.countryCode,
        phoneNumber: data.phoneNumber,
        type: "Template",
        callbackData: data.callbackData || "",
        template: {
          name: data.templateName,
          languageCode: data.languageCode,
          ...(data.headerValues && { headerValues: data.headerValues }),
          ...(data.bodyValues && { bodyValues: data.bodyValues }),
          ...(data.buttonValues && { buttonValues: data.buttonValues }),
        },
      };

      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Interakt API Error:", {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
          apiKeyPrefix: this.apiKey.substring(0, 10),
        });

        if (response.status === 401) {
          throw new Error(
            `Authentication failed: Invalid API key. Please check your INTERAKT_API_KEY in .env.local. Error: ${errorText}`
          );
        }

        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result: WhatsAppResponse = await response.json();

      return result;
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
      throw error;
    }
  }

  /**
   * Send registration success message
   */
  async sendRegistrationSuccessMessage(
    phoneNumber: string,
    userName: string,
    registrationCode: string,
    planName: string
  ): Promise<WhatsAppResponse> {
    // Clean phone number using utility
    const { phoneNumber: cleanPhone, countryCode } =
      phoneUtils.forInterakt(phoneNumber);

    if (!phoneUtils.validate(phoneNumber)) {
      console.warn(
        `Invalid phone number format: ${phoneUtils.mask(phoneNumber)}`
      );
    }

    return this.sendTemplateMessage({
      phoneNumber: cleanPhone,
      countryCode,
      templateName: "registration_success", // You need to create this template in Interakt
      languageCode: "en",
      bodyValues: [userName, registrationCode, planName],
      callbackData: `registration_${registrationCode}`,
    });
  }

  /**
   * Send payment confirmation message
   */
  async sendPaymentConfirmationMessage(
    phoneNumber: string,
    userName: string,
    amount: number,
    transactionId: string
  ): Promise<WhatsAppResponse> {
    const { phoneNumber: cleanPhone, countryCode } =
      phoneUtils.forInterakt(phoneNumber);

    return this.sendTemplateMessage({
      phoneNumber: cleanPhone,
      countryCode,
      templateName: "payment_confirmation", // You need to create this template in Interakt
      languageCode: "en",
      bodyValues: [userName, amount.toString(), transactionId],
      callbackData: `payment_${transactionId}`,
    });
  }

  /**
   * Send abstract submission confirmation message
   */
  async sendAbstractSubmissionMessage(
    phoneNumber: string,
    userName: string,
    abstractCode: string,
    abstractTitle: string
  ): Promise<WhatsAppResponse> {
    const { phoneNumber: cleanPhone, countryCode } =
      phoneUtils.forInterakt(phoneNumber);

    return this.sendTemplateMessage({
      phoneNumber: cleanPhone,
      countryCode,
      templateName: "abstract_submission",
      languageCode: "en",
      bodyValues: [userName, abstractTitle, abstractCode, "Pending"],
      callbackData: `abstract_${abstractCode}`,
    });
  }
}

// Export a singleton instance
export const whatsappService = new WhatsAppService();
