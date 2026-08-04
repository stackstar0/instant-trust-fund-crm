import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { AppError } from "../middlewares/errorMiddleware";

const BHOOMI_CLIENT_ID = process.env.BHOOMI_CLIENT_ID;
const BHOOMI_CLIENT_SECRET = process.env.BHOOMI_CLIENT_SECRET;
const API_SETU_URL = "https://apisetu.gov.in/api/bhoomi";

// Helper function to get the API Setu token if needed
const getApiSetuToken = async () => {
  // Ideally, you'd call the API Setu OAuth endpoint to fetch a bearer token using client credentials
  // For now, this is a placeholder representing that logic
  if (!BHOOMI_CLIENT_ID || !BHOOMI_CLIENT_SECRET) {
    throw new AppError("Bhoomi API Setu credentials are not configured.", 500);
  }
  return "placeholder_token";
};

export const getRTCData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { surveyNumber, district, taluk, hobli, village } = req.body;

    if (!surveyNumber || !district || !taluk || !hobli || !village) {
      return next(new AppError("Please provide surveyNumber, district, taluk, hobli, and village.", 400));
    }

    // Example payload for Bhoomi API
    const requestPayload = {
      district_code: district,
      taluk_code: taluk,
      hobli_code: hobli,
      village_code: village,
      survey_no: surveyNumber,
    };

    // Make secure call to API Setu
    const token = await getApiSetuToken();

    const response = await axios.post(`${API_SETU_URL}/getRTC`, requestPayload, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "X-APISETU-CLIENTID": BHOOMI_CLIENT_ID,
        "X-APISETU-APIKEY": process.env.BHOOMI_API_KEY || "",
      },
      timeout: 10000,
    });

    res.status(200).json({
      status: "success",
      data: response.data,
    });
  } catch (error: any) {
    if (error.response) {
      return next(new AppError(`Bhoomi API Error: ${error.response.data.message || error.message}`, error.response.status));
    }
    next(new AppError("Failed to fetch RTC data from Bhoomi portal.", 500));
  }
};
