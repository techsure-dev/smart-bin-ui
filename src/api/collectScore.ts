import axios from "axios";

let isRequestInProgress = false;

export const collectScore = async (
  phone: string,
  listOfPoints: [string, number][]
) => {
  if (isRequestInProgress) {
    console.warn("⚠️ Request already in progress, skipping new one.");
    return;
  }

  isRequestInProgress = true;

  const date = new Date().toLocaleString("en-GB"); 

  try {
    const responses = await Promise.all(
      listOfPoints.map(([pointMap, count]) => {
        const payload = {
          code: "TL",
          Phonelog: phone,
          Date: date,
          "Point+": pointMap,
          Count: count,
        };

        return axios.post("https://sunun.top/tl/api-receiver.php", payload, {
          headers: { "Content-Type": "application/json" },
        });
      })
    );

    return responses.map((res) => res.data);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("❌ API Error:", error.response?.data, error.response?.status);
    } else {
      console.error("❌ Unexpected Error:", error);
    }
    throw error;
  } finally {
    isRequestInProgress = false;
  }
};
