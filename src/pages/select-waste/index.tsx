import { Flex, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AIProfileAnimation from "./component/AnimationContext";
import Header from "../../component/Header";
import WasteCard from "../prediction/component/WasteCard";
import { wasteMap } from "../../types/wasteType";
import checkMark from "../../assets/icons/check_mark.png";
import ArrowIcon from "../../assets/icons/arrow.svg?react";
import { motion } from "framer-motion";
import WasteBinCard from "../prediction/component/WasteBinCard";

const { Text } = Typography;

const SelectWastePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const item_th = location.state?.item_th;
  const item_en = location.state?.item_en;
  const selectedCategory_th = location.state?.selectedCategory_th;
  const selectedCategory_en = location.state?.selectedCategory_en;

  if (!item_th || !selectedCategory_th) return <div>No category selected</div>;

  const selectedCategory = selectedCategory_th;

  const waste = wasteMap[selectedCategory];

 
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/correct", {
        state: {
          item_th,
          item_en,
          selectedCategory_th,
          selectedCategory_en,
        },
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, item_th, item_en, selectedCategory_th, selectedCategory_en]);

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
            item_th={item_th}
            item_en={item_en}
            type_th={selectedCategory_th}
            type_en={selectedCategory_en}
            image={waste.image}
            bgColor={waste.bgColor}
            textColor={waste.textColor}
          />

          <img
            src={checkMark}
            alt="check mark"
            className="absolute -top-[8%] -right-[10%] h-[100px] w-[100px] object-contain cursor-pointer z-30"
            onClick={() => console.log("Correct clicked!")}
          />
        </div>

        {/* Arrow animation */}
        <ArrowIcon
          className="h-[220px] w-[130px] animate-bounce mt-24"
          fill={waste.bgColor}
        />
      </motion.div>

      {/* Waste Bin Card */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 120 }}
        className="w-full h-screen flex items-end justify-center"
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
