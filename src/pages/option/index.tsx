import { Flex, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import type { WasteCategory } from "../../types/wasteType";
import AIProfileAnimation from "./component/AnimationContext";
import Header from "../../component/Header";
import WasteBinCard from "./component/WasteBinCard";
import { wasteMap } from "../../types/wasteType"; 
import { motion } from "framer-motion";

const { Text } = Typography;


const allCategories: WasteCategory[] = [
  "เชื้อเพลิงขยะ",
  "ขยะทั่วไป",
  "ขวดพลาสติก",
  "แก้ว โลหะ อะลูมิเนียม",
  "ขยะอาหาร"
];

const OptionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { result?: { output?: string } };
  const resultOutput = state?.result?.output;

  let predictedTypes: WasteCategory[] = [];
  if (resultOutput) {
    const entries = resultOutput.split(","); 
    predictedTypes = entries
      .map(entry => {
        const [, type] = entry.split(":").map(str => str.trim());
        return type as WasteCategory;
      })
      .filter(Boolean); 
  }

  const options = allCategories.filter(category => !predictedTypes.includes(category));
 
  const handleSelect = (category: WasteCategory) => {
 
    const firstEntry = resultOutput ? resultOutput.split(",")[0] : null;
    const resultItem = firstEntry ? firstEntry.split(":")[0].trim() : null;

    console.log("User selected:", category, "Result item:", resultItem);

    navigate("/select-waste", { 
      state: { 
        selectedCategory: category, 
        item: resultItem 
      } 
    });
  };


  return (
    <Flex className="absolute w-full h-screen bg-white flex flex-col items-center justify-start transition-opacity duration-500 z-10">
      <Flex className="w-full sticky top-0 z-20 bg-white">
        <Header />
      </Flex>
      
      <AIProfileAnimation />

      <motion.div
        initial={{ x: -500, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }}   
        transition={{ type: "spring", duration: 3 }}
        className="left-[10%] top-[8%] relative bg-[#F0EFEF] rounded-tr-[16px] rounded-tl-[16px] rounded-br-[16px] shadow-md px-10 py-5"
      >
        <Text className="text-heading-l font-bold text-center">
          เลือกถังขยะที่ถูกต้องให้หน่อยครับ
        </Text>
      </motion.div>


      <Flex className="grid grid-cols-4 justify-center mt-auto ">
        {options.map((category) => {
          const waste = wasteMap[category];
          return (
            <WasteBinCard
              key={category}
              type={category}
              description={waste.description}
              binImage={waste.binImage}
              bgColor={waste.bgColor}
              textColor={waste.textColor}
              onSelect={() => handleSelect(category)}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default OptionPage;
