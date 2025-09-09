import { useNavigate } from "react-router-dom";

const PredictionPage = () => {
  const navigate = useNavigate();
  const predictedType = "Plastic Bottle"; 

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-4xl font-bold text-green-700">AI Prediction</h1>
      <p className="mt-4 text-xl">
        We detected: <b>{predictedType}</b>
      </p>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => navigate("/option")}
          className="px-6 py-3 bg-green-500 text-white rounded-xl shadow-md"
        >
          ✅ Correct
        </button>
        <button
          onClick={() => navigate("/select-waste")}
          className="px-6 py-3 bg-red-500 text-white rounded-xl shadow-md"
        >
          ❌ Wrong
        </button>
      </div>
    </div>
  );
};

export default PredictionPage;
