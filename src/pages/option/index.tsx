import { Flex, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import type { WasteCategory } from "../../types/wasteType";
import AIProfileAnimation from "./component/AnimationContext";
import Header from "../../component/Header";
import WasteBinCard from "./component/WasteBinCard";
import { wasteMap } from "../../types/wasteType"; 
import { motion } from "framer-motion";
import { useTank } from "../../context/TankContext";

const { Text } = Typography;

const wasteIndexMap: Record<WasteCategory, number> = {
  "ขยะกำพร้า": 0,
  "ขยะทั่วไป": 1,
  "ขวดพลาสติก": 2,
  "ขวดแก้ว กระป๋อง โลหะ อะลูมิเนียม": 3,
  "ขยะอันตราย": 4,
};

const allCategories: { th: WasteCategory; en: string }[] = [
  { th: "ขยะกำพร้า", en: "Refused Derived Fuel (RDF)" },
  { th: "ขยะทั่วไป", en: "General Waste" },
  { th: "ขวดพลาสติก", en: "Plastic Bottle" },
  { th: "ขวดแก้ว กระป๋อง โลหะ อะลูมิเนียม", en: "Glass / Can / Metal / Aluminium" },
  { th: "ขยะอันตราย", en: "Hazardous Waste" },
];

const OptionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setTankIndex } = useTank();

  const state = location.state as {
    result?: { 
      item_th: string; 
      item_en: string; 
      type_th: WasteCategory; 
      type_en: string;
      weight_g: number; 
      point_map: string;
    }[];
  };

  const results = state?.result || [];
  const predictedTypes: WasteCategory[] = results.map(r => r.type_th);

  const options = allCategories.filter(
    (cat) => !predictedTypes.includes(cat.th)
  );


  const handleSelect = (selected: { th: WasteCategory; en: string }) => {
    const firstItem = results[0];

    const tankIndex = wasteIndexMap[selected.th];
    console.log("👉 OptionPage setTankIndex:", tankIndex);
    setTankIndex(tankIndex); 

    navigate("/select-waste", {
      state: {
        item_th: firstItem?.item_th,
        item_en: firstItem?.item_en,
        selectedCategory_th: selected.th,
        selectedCategory_en: selected.en,
        weight_g: firstItem?.weight_g,
        point_map: firstItem?.point_map,  
      },
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
        {options.map((cat) => (
        <WasteBinCard
          key={cat.th}
          type={cat.th}
          description={wasteMap[cat.th].description}
          binImage={wasteMap[cat.th].binImage}
          bgColor={wasteMap[cat.th].bgColor}
          textColor={wasteMap[cat.th].textColor}
          onSelect={() => handleSelect(cat)}
        />
      ))}
    </Flex>

    </Flex>
  );
};


export default OptionPage;
