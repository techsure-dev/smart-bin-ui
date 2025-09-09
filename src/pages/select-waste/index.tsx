import { useNavigate } from "react-router-dom";

const SelectWastePage = () => {
  const navigate = useNavigate();
  const wasteTypes = ["Plastic", "Glass", "Paper", "Metal", "Organic"];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Select Waste Type</h1>
      <div className="grid grid-cols-2 gap-4 mt-6">
        {wasteTypes.map((type) => (
          <button
            key={type}
            onClick={() => navigate("/option")}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-400"
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectWastePage;
