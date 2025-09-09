import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import loading from "../../assets/images/Loading.png";
import circle from "../../assets/images/noisy-gradients.png";
import ai_profile from "../../assets/images/AIProfile.png";
import { classifyWaste } from "../../api/wasteService";
import { Flex } from "antd";

const LoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { file?: File };

  useEffect(() => {
    if (!state?.file) {
      navigate("/scan");
      return;
    }

    const classify = async () => {
      try {
        const result = await classifyWaste(state.file!);
        navigate("/prediction", { state: { result } }); 
      } catch (err) {
        console.error(err);
        navigate("/scan");
      }
    };

    classify();
  }, [state, navigate]);

  return (
    <Flex
      className="w-full h-screen flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url(${loading})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* AI profile and circle container */}
      <div className="flex flex-col items-center relative">
        {/* Dot loading animation */}
        <div className="flex space-x-2 mt-6">
          <span className="dot animate-bounce"></span>
          <span className="dot animate-bounce animation-delay-200"></span>
          <span className="dot animate-bounce animation-delay-400"></span>
        </div>


        {/* AI Profile */}
        <img
          src={ai_profile}
          alt="ai profile"
          className="w-[250px] h-[250px] object-contain z-20"
        />

        {/* Circle below AI profile */}
        <img
          src={circle}
          alt="circle"
          className="w-[180px] h-[180px] object-contain -mt-36 z-10"
        />
      </div>


      {/* dots ... */}
      <style>
        {`
          .dot {
            width: 10px;
            height: 10px;
            background-color: #FDBA74;
            border-radius: 50%;
          }
          .animate-bounce {
            animation: bounce 1s infinite;
          }
          .animation-delay-200 {
            animation-delay: 0.2s;
          }
          .animation-delay-400 {
            animation-delay: 0.4s;
          }
          @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
          }
        `}
      </style>
    </Flex>
  );
};

export default LoadingPage;
