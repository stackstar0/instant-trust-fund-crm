import { SMSModel } from "../models/SMS";

const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY || "";
const MSG91_SENDER_ID = process.env.MSG91_SENDER_ID || "IFYCRM";

export async function sendSMS({
  mobile,
  message,
  templateId,
  type = "TRANSACTIONAL",
}: {
  mobile: string;
  message: string;
  templateId: string;
  type?: "OTP" | "TRANSACTIONAL" | "SERVICE";
}) {
  try {
    const isConfigured = Boolean(MSG91_AUTH_KEY && MSG91_AUTH_KEY.length > 5);

    if (isConfigured) {
      // MSG91 API call
      await fetch("https://api.msg91.com/api/v5/flow/", {
        method: "POST",
        headers: {
          authkey: MSG91_AUTH_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          template_id: templateId,
          sender: MSG91_SENDER_ID,
          short_url: "1",
          recipients: [{ mobiles: `91${mobile}`, message }],
        }),
      });
    }

    await SMSModel.create({
      recipient: mobile,
      templateId,
      message,
      type,
      status: isConfigured ? "SENT" : "QUEUED",
    });

    console.log(`[SMS] DLT SMS ${isConfigured ? "sent" : "queued/logged"} to: +91-${mobile}`);
    return true;
  } catch (error: any) {
    console.error(`[SMS] Failed to send SMS to ${mobile}:`, error.message);
    await SMSModel.create({
      recipient: mobile,
      templateId,
      message,
      type,
      status: "FAILED",
    });
    return false;
  }
}
