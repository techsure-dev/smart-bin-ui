import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SmartBinVideo from "../../assets/video/Smart_Bin_Video.mp4";
import CategoryCard from "./component/CategoryCard";
import { Button, Flex, Typography } from "antd";
import Header from "../../component/Header";
import { wasteMap} from "../../types/wasteType"; 

const { Text } = Typography;

const MainPage = () => {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInteraction = () => {
    setShowOverlay(true);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setShowOverlay(false);
    }, 100000);
  };

  useEffect(() => {
    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Flex className="w-full h-screen relative flex items-center justify-center">
      <video
        src={SmartBinVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover object-center"
      />

      {showOverlay && (
        <Flex className="absolute w-full h-screen bg-white flex flex-col items-center justify-start transition-opacity duration-500 z-10">
         
          <Flex className="w-full sticky top-0 z-20 bg-white">
            <Header />
          </Flex>

          <Flex className="flex-1 w-full flex flex-col items-center justify-center">
            <Flex vertical className="items-center">
              <Text className="font-bold text-hero">มาแยกขยะกันไหม?</Text>
              <Text className="font-bold text-hero">
                เดี๋ยวเราช่วย <span className="text-text-brand">แยก</span> เอง
              </Text>
            </Flex>

            <Flex className="grid grid-cols-5 divide-x-2 divide-gray-300 mt-36">
              {Object.entries(wasteMap).map(([key, waste]) => (
                <CategoryCard
                  key={key}
                  image={waste.image}
                  header={key} 
                  title={`(${waste.description})`} 
                  bgColor={waste.bgColor}
                  iconColor={waste.iconColor || waste.bgColor}
                  textColor={waste.textColor}
                />
              ))}
            </Flex>
          </Flex>

          <Button
            onClick={() => navigate("/scan")}
            type="primary"
            className="h-[120px] rounded-full animate-scalePulse bg-background-brand text-white text-heading-l font-bold flex px-8 mb-52"
          >
            แตะหน้าจอเพื่อเริ่มแยกขยะ
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default MainPage;
