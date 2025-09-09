import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SmartBinVideo from "../../assets/video/Smart_Bin_Video.mp4";
import CategoryCard from "./component/CategoryCard";
import rdf from "../../assets/images/rdf.png";
import general from "../../assets/images/general_waste.png";
import plastic from "../../assets/images/plastic_bottle.png";
import glass from "../../assets/images/glass_can.png";
import food from "../../assets/images/food_waste.png";
import { Button, Flex, Typography } from "antd";
import Header from "../../component/Header";

const { Text } = Typography;

const MainPage: React.FC = () => {
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
              <CategoryCard
                image={rdf}
                header="ขยะกำพร้า"
                title="(Refused Derived Fuel,RDF)"
                bgColor="#838383"
                iconColor="#A2ABB5"
                textColor="#FFFFFF"
              />
              <CategoryCard
                image={general}
                header="ขยะทั่วไป"
                title="(General Waste)"
                bgColor="#235B90"
                iconColor="#235B90"
                textColor="#FFFFFF"
              />
              <CategoryCard
                image={plastic}
                header="ขวดพลาสติก"
                title="(Plastic Bottle)"
                bgColor="#F6B31E"
                iconColor="#F5BE0C"
                textColor="#000000"
              />
              <CategoryCard
                image={glass}
                header="ขวดแก้ว/กระป๋อง/โลหะ/อะลูมิเนียม"
                title="(Glass/Can/Metal/Aluminium)"
                bgColor="#F6B31E"
                iconColor="#F5BE0C"
                textColor="#000000"
              />
              <CategoryCard
                image={food}
                header="เศษอาหาร"
                title="(Food Waste)"
                bgColor="#00712C"
                iconColor="#00712C"
                textColor="#FFFFFF"
              />
            </Flex>
          </Flex>

          <Button
            onClick={() => navigate("/scan")}
            type="primary"
            className="h-[120px] rounded-full animate-scalePulse bg-background-brand text-white text-heading-xl font-bold flex px-8 mb-52"
          >
            แตะหน้าจอเพื่อเริ่มแยกขยะ
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default MainPage;
