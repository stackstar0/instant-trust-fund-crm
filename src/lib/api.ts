import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const method = (options.method || "GET").toLowerCase();
  const headers = (options.headers as Record<string, string>) || {};
  let data: any = undefined;

  if (options.body) {
    try {
      data = JSON.parse(options.body as string);
    } catch {
      data = options.body;
    }
  }

  try {
    const response = await api({
      url: endpoint,
      method,
      headers,
      data,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || `API request failed: ${error.response.statusText}`);
    }
    throw error;
  }
}
