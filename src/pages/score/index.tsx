import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ScorePage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const userScore = 120; 

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-4xl font-bold text-green-700">🎉 Great Job!</h1>
      <p className="mt-4 text-xl">
        Your total score: <b>{userScore}</b>
      </p>
      <p className="mt-6 text-gray-500">
        Redirecting to main page in {countdown}...
      </p>
    </div>
  );
};

export default ScorePage;
