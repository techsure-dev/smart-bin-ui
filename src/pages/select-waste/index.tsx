import { useLocation, useNavigate } from "react-router-dom";
import ArrowIcon from "../../assets/icons/arrow.svg?react";
import WasteBinCard from "../../pages/prediction/component/WasteBinCard";
import { wasteMap } from "../../types/wasteType";
import { Flex, Typography } from "antd";
import Header from "../../component/Header";
import AIProfileAnimation from "./component/AnimationContext";
import WasteCard from "../prediction/component/WasteCard";
import checkMark from "../../assets/icons/check_mark.png"; 
import { motion } from "framer-motion";
import { useEffect } from "react";

const { Text } = Typography;

const SelectWastePage = () => {
  const location = useLocation();
   const navigate = useNavigate();
  const selectedCategory = location.state?.selectedCategory; 
  const item = location.state?.item; 

  if (!selectedCategory || !item) return <div>No category selected</div>;

  const waste = wasteMap[selectedCategory];

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/correct", { state: { selectedCategory, item } });
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate, selectedCategory, item]);

  return (
    <Flex className="absolute w-full h-screen bg-white flex flex-col items-center justify-start transition-opacity duration-500 z-10">
      <Flex className="w-full sticky top-0 z-20 bg-white">
        <Header />
      </Flex>

    
      <AIProfileAnimation />

  
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.2 }}
        className="flex flex-col items-center w-full"
      >
         <Flex vertical className="items-center justify-center mt-10">
          <Text className="text-heading-xl font-bold">
          โปรดทิ้งขยะตามคำแนะนำ
          </Text>
          <Text className="text-heading-s font-bold">
            Sort your trash and throw it in the right bin
          </Text>
        </Flex>


        <div className="relative z-20 mt-12">
          <WasteCard
            item={item}
            type={selectedCategory}
            image={waste.image}
            bgColor={waste.bgColor}
            textColor={waste.textColor}
            description={waste.description}
          />
          <img
            src={checkMark}
            alt="check mark"
            className="absolute -top-[8%] -right-[10%] h-[100px] w-[100px] object-contain cursor-pointer z-30"
            onClick={() => console.log("Correct clicked!")}
          />
        </div>
          <ArrowIcon
            className="h-[220px] w-[130px] animate-bounce mt-24"
            fill={waste.bgColor}
          />
      </motion.div>


      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 120 }}
        className="w-full h-screen flex items-end justify-center "
      >
        <WasteBinCard
          type={selectedCategory}
          description={waste.description}
          binImage={waste.binImage}
          bgColor={waste.bgColor}
          textColor={waste.textColor}
        />
      </motion.div>

    </Flex>
  );
};

export default SelectWastePage;
