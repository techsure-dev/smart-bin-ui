import { useEffect } from "react";

export const useResetPoints = (
  totalPoints: number,
  listOfPoints: any[],
  resetResults?: () => void
) => {
  useEffect(() => {
    if ((totalPoints > 0 || listOfPoints.length > 0) && resetResults) {
      resetResults();
      console.log("✅ Points reset on MainPage because there were points");
    }
  }, [totalPoints, listOfPoints, resetResults]);
};
