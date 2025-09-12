import axios from "axios";

export const BASE_URL = "/api";
const API_KEY = "power2edit"; 

export interface WasteClassificationResult {
  category: string;
  confidence?: number;
  [key: string]: any;
}

export const classifyWaste = async (file: File): Promise<WasteClassificationResult> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post<WasteClassificationResult>(
      `${BASE_URL}/classify`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": API_KEY,
        },
      }
    );
    return response.data;
      } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data, error.response?.status);
      } else {
        console.error(error);
      }
      throw error;
    }
};

