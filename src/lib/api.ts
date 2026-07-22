export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    // Important: include credentials to send HttpOnly cookies (accessToken, refreshToken)
    credentials: "include", 
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API request failed: ${response.statusText}`);
  }

  return response.json();
}
