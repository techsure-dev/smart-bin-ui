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
  "ขยะกำพร้า",
  "ขยะทั่วไป",
  "ขวดพลาสติก",
  "แก้ว โลหะ อะลูมิเนียม",
  "ขยะอันตราย"
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
        initial={{ y: 500, opacity: 0 }}  
        animate={{ y: 0, opacity: 1 }}    
        transition={{ type: "spring", duration: 3 }}
        className="relative bg-[#F0EFEF] rounded-2xl shadow-md px-10 py-5 mt-72"
      >
        <Flex vertical className="relative items-center">
          <Text className="text-heading-m font-bold text-center">
            เลือกถังขยะที่ถูกต้องให้หน่อยครับ
          </Text>
          <Text className="text-heading-s font-bold text-center text-text-subtitle">
            Please choose the correct trash bin
          </Text>

          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-0 h-0 
            border-l-[80px] border-l-transparent 
            border-r-[80px] border-r-transparent 
            border-t-[80px] border-t-[#F0EFEF]">
          </div>
        </Flex>
      </motion.div>



      <Flex className="grid grid-cols-4 justify-center mt-auto gap-6 px-6 pb-6">
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
