import axios from "axios";

const BASE_URL = "http://octocat.thddns.net:8332"; 
const API_KEY = "power2edit"; 

export interface WasteClassificationResult {
  category: string;
  confidence?: number;
  [key: string]: any;
}

export const classifyWaste = async (
  file: File
): Promise<WasteClassificationResult> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post<WasteClassificationResult>(
      `${BASE_URL}/classify/image/classify`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error classifying waste:", error);
    throw error;
  }
};
