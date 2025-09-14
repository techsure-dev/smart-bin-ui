import axios from "axios";

export const BASE_URL = "/api";
const API_KEY = "power2edit";

export interface TTSResult {
  text: string;
  audio_base64: string;
}

/**
 * @param text 
 * @returns {Promise<Blob>} 
 */

export const textToSpeech = async (text: string): Promise<Blob> => {
  try {
    const response = await axios.post<TTSResult>(
      `${BASE_URL}/tts-base64`,
      { text },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          Accept: "application/json",
        },
      }
    );

    const { audio_base64 } = response.data;


    const audioBytes = Uint8Array.from(atob(audio_base64), (c) =>
      c.charCodeAt(0)
    );
    return new Blob([audioBytes], { type: "audio/mpeg" });
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data, error.response?.status);
    } else {
      console.error(error);
    }
    throw error;
  }
};
