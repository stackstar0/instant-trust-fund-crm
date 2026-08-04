import axios from "axios";
import { logger } from "./logger";

const MESSAGEBOT_API_URL = "http://papi.messagebot.in/SendSmsV2";
const MESSAGEBOT_API_TOKEN = process.env.MESSAGEBOT_API_TOKEN;
const MESSAGEBOT_SENDER_ID = process.env.MESSAGEBOT_SENDER_ID || "TRUSTF"; // Example sourceAddress

export interface SMSPayload {
  destinationAddress: string;
  messageText: string;
  dltEntityId: string;
  dltEntityTemplateId: string;
}

export const sendTransactionalSMS = async (payload: SMSPayload) => {
  if (!MESSAGEBOT_API_TOKEN) {
    logger.warn("SMS not sent: MESSAGEBOT_API_TOKEN is missing from environment variables.");
    return;
  }

  try {
    const response = await axios.post(
      MESSAGEBOT_API_URL,
      [
        {
          apiToken: MESSAGEBOT_API_TOKEN,
          messageType: "2", // Transactional
          messageEncoding: "1", // Text
          destinationAddress: payload.destinationAddress,
          sourceAddress: MESSAGEBOT_SENDER_ID,
          messageText: payload.messageText,
          dltEntityId: payload.dltEntityId,
          dltEntityTemplateId: payload.dltEntityTemplateId,
        }
      ],
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    logger.info(`SMS sent to ${payload.destinationAddress} via MessageBot`, { responseData: response.data });
    return response.data;
  } catch (error: any) {
    logger.error("Failed to send SMS via MessageBot", {
      error: error.response?.data || error.message,
      destination: payload.destinationAddress
    });
    throw error;
  }
};
