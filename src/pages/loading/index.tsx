import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import loading from "../../assets/images/Loading.png";
import circle from "../../assets/images/noisy-gradients.png";
import ai_profile from "../../assets/images/AIProfile.png";
import { classifyWaste } from "../../api/wasteService";
import { Flex } from "antd";
import type { WasteCategory } from "../../types/wasteType";

const validWasteCategories: WasteCategory[] = [
  "เชื้อเพลิงขยะ",
  "ขยะทั่วไป",
  "ขวดพลาสติก",
  "แก้ว โลหะ อะลูมิเนียม",
  "ขยะอาหาร",
];

const LoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { file?: File };
  const isProcessing = useRef(false);

  useEffect(() => {
    if (!state?.file) {
      navigate("/scan");
      return;
    }

    if (isProcessing.current) return;
    isProcessing.current = true;

    const classify = async () => {
      try {
        const result = await classifyWaste(state.file!);
        const output = result.output || "";
        const parsed: Record<string, string> = {};

        output.split(",").forEach((entry: string) => {
          const [item, type] = entry.split(":").map(str => str.trim());
          if (item && type) parsed[item] = type;
        });
        
        const allValid = Object.values(parsed).every(type => validWasteCategories.includes(type as WasteCategory));

        if (!allValid || Object.keys(parsed).length === 0) {
          navigate("/scan", { state: { toastMessage: "ไม่สามารถจำแนกประเภทขยะนี้ได้ กรุณาลองสแกนอีกครั้ง" } });
          return;
        }
        navigate("/prediction", { state: { result } });

      } catch (err) {
        console.error(err);
        navigate("/scan", { state: { toastMessage: "เกิดข้อผิดพลาด กรุณาลองใหม่" } });
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
  
      <div className="flex flex-col items-center relative">
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
        <img
          src={circle}
          alt="circle"
          className="w-[180px] h-[180px] object-contain -mt-40 z-10"
        />
      </div>

      {/* dots ... */}
      <style>
        {`
          .dot {
            width: 20px;
            height: 20px;
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
