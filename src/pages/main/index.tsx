import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import SmartBinVideo from "../../assets/video/Smart_Bin_Video.mp4";
import CategoryCard from "./component/CategoryCard";
import { Button, Flex, Typography } from "antd";
import Header from "../../component/Header";
import { wasteMap } from "../../types/wasteType";

const { Text } = Typography;

const MainPage = () => {
  const navigate = useNavigate();
  const [showVideoOverlay, setShowVideoOverlay] = useState(true); 
  const [defaultTouchedOnce, setDefaultTouchedOnce] = useState(false); 
  const overlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startVideoTimeout = () => {
    if (overlayTimeoutRef.current) clearTimeout(overlayTimeoutRef.current);
    overlayTimeoutRef.current = setTimeout(() => {
      setShowVideoOverlay(true);
      setDefaultTouchedOnce(false);
    }, 10000);
  };

  const handleOverlayClick = () => {
    setShowVideoOverlay(false);
    setDefaultTouchedOnce(false);
    startVideoTimeout(); 
  };

  const handleDefaultClick = () => {
    if (!defaultTouchedOnce) {
      setDefaultTouchedOnce(true);
      startVideoTimeout(); 
    } else {
      if (overlayTimeoutRef.current) clearTimeout(overlayTimeoutRef.current);
      navigate("/scan");
    }
  };

  return (
    <Flex className="w-full h-screen relative flex flex-col items-center justify-start">
      <Flex className="w-full sticky top-0 z-0 bg-white">
        <Header />
      </Flex>

      <Flex
        className="w-full flex-1 flex flex-col items-center justify-center mt-16"
        onClick={handleDefaultClick}
        onTouchStart={handleDefaultClick}
      >
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

        <Button
          type="primary"
          className="h-[120px] rounded-full animate-scalePulse bg-background-brand text-white text-heading-l font-bold flex px-8 mt-44"
        >
          แตะหน้าจอเพื่อเริ่มแยกขยะ
        </Button>
      </Flex>

      {showVideoOverlay && (
        <Flex
          className="absolute w-full h-full items-center justify-center bg-black z-20"
          onClick={handleOverlayClick}
          onTouchStart={handleOverlayClick}
        >
          <video
            src={SmartBinVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover object-center"
          />
        </Flex>
      )}
    </Flex>
  );
};

export default MainPage;
