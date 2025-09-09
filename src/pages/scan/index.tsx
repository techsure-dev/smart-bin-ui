import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 via-cyan-400 to-green-400">
      <video
        src="/smart-bin-intro.mp4"
        autoPlay
        loop
        muted
        className="w-[80%] rounded-xl shadow-xl"
      ></video>

      <button
        onClick={() => navigate("/scan")}
        className="mt-8 px-8 py-4 bg-white text-blue-700 text-xl font-bold rounded-xl shadow-lg hover:bg-blue-100 transition-all"
      >
        Start Scanning 🚀
      </button>
    </div>
  );
};

export default MainPage;
