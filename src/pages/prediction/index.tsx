import { Flex, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../component/Header";
import WasteCard from "./component/WasteCard";
import { wasteMap } from "../../types/wasteType";
import ArrowIcon from "../../assets/icons/arrow.svg?react";
import WasteBinCard from "./component/WasteBinCard";
import AIProfileAnimation from "./component/AIProfileAnimation"; 
import { useEffect, useState } from "react";
import CheckCard from "./component/CheckCard";
import { motion } from "framer-motion";

const { Text } = Typography;

const PredictionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { result?: Record<string, any> };
  const [showCheckCard, setShowCheckCard] = useState(false);

  useEffect(() => {
  const timer = setTimeout(() => {
    setShowCheckCard(true);
  }, 1500); 
  return () => clearTimeout(timer); 
}, []);

  if (!state?.result) {
    return (
      <Flex className="w-full h-screen items-center justify-center">
        <Text className="text-heading-l font-bold">No result available</Text>
      </Flex>
    );
  }

  const { result } = state;

  const parsedResult: Record<string, string> = {};
  if (result.output) {
    const entries = result.output.split(",");
    entries.forEach((entry: string) => {
      const [item, type] = entry.split(":").map((str: string) => str.trim());
      if (item && type) parsedResult[item] = type;
    });
  }

  return (
    <Flex className="absolute w-full h-screen bg-white flex flex-col items-center justify-start transition-opacity duration-500 z-10">
      <Flex className="w-full sticky top-0 z-20 bg-white">
        <Header />
      </Flex>

      <Text className="text-heading-xl font-bold mt-40">
        โปรดทิ้งขยะตามคำแนะนำ
      </Text>

      <Flex className="flex-wrap justify-center gap-6 mt-36 relative w-full">
        {Object.entries(parsedResult).map(([item, type]) => {
          const waste = wasteMap[type];
          if (!waste) return null;

          return (
            <div key={item} className="flex flex-col items-center relative">
              <div className="relative z-20">
                <WasteCard
                  item={item}
                  type={type}
                  image={waste.image}
                  bgColor={waste.bgColor}
                  textColor={waste.textColor}
                  description={waste.description}
                />
              </div>

              <div className="mt-20">
                <ArrowIcon
                  className="h-[220px] w-[130px] animate-bounce"
                  fill={waste.bgColor}
                />
              </div>

              <WasteBinCard
                key={type}
                type={type}
                description={waste.description}
                binImage={waste.binImage}
                bgColor={waste.bgColor}
                textColor={waste.textColor}
              />

              <AIProfileAnimation />
              {showCheckCard && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}    
                  animate={{ opacity: 1, y: 0 }}     
                  transition={{ duration: 0.8, ease: "easeOut" }} 
                  className="absolute top-[36%] left-[5%] -translate-y-1/2 z-40"
                >
                  <CheckCard
                    onCorrect={() => navigate("/correct")}
                    onWrong={() => navigate("/option", { state: { result } })}
                  />
                </motion.div>
              )}
            </div>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default PredictionPage;
