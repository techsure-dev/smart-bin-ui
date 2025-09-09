import { useNavigate } from "react-router-dom";

const OptionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-green-700">What Next?</h1>
      <div className="flex gap-6 mt-6">
        <button
          onClick={() => navigate("/scan")}
          className="px-8 py-4 bg-yellow-400 text-black rounded-xl shadow-md"
        >
          Scan More
        </button>
        <button
          onClick={() => navigate("/score")}
          className="px-8 py-4 bg-green-500 text-white rounded-xl shadow-md"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default OptionPage;
