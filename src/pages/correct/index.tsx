import { useEffect, useState } from "react";
import { Button, Flex, Typography } from "antd";
import BackgroundCircles from "./component/BackgroundCircles";
import CheckAnimation from "./component/CheckAnimation";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../component/Header";

const { Text } = Typography;


const CorrectPage= () => {
  const navigate = useNavigate();
  const [showCheck, setShowCheck] = useState<boolean>(false);
  const [reverse, setReverse] = useState<boolean>(false);
  const [showText, setShowText] = useState<boolean>(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowCheck(true), 1000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!showCheck) return;
    const reverseTimer = setTimeout(() => setReverse(true), 2000);
    return () => clearTimeout(reverseTimer);
  }, [showCheck]);

   useEffect(() => {
    if (!showCheck) return;
    const textTimer = setTimeout(() => setShowText(true), 3200);
    return () => clearTimeout(textTimer);
  }, [showCheck]);

  return (
    <Flex className="w-screen h-screen items-center justify-center relative bg-white overflow-hidden">
      {/* Background circles */}
      <BackgroundCircles reverse={reverse} />

      {/* White circles and check icon */}
      {showCheck && <CheckAnimation reverse={reverse} />}

      {showText && (
        <Flex className="absolute w-full h-screen bg-white flex flex-col items-center justify-start z-10">
          <Flex className="w-full sticky top-0 z-20 bg-white">
            <Header />
        </Flex>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center mt-80"
        >
          <Text className="font-bold text-hero">มาแยกขยะกันไหม?</Text>
          <Text className="font-bold text-hero">
            เดี๋ยวเราช่วย <span className="text-text-brand">แยก</span> เอง
          </Text>
          <Flex vertical className="mt-56 gap-24">
            <Button
              type="default"
              className="h-[120px] rounded-full animate-scalePulse text-text-brand text-heading-l font-bold flex px-16"
              style={{ boxShadow: "0 4px 20px rgba(241, 99, 35, 0.5)" }}
              onClick={() => navigate("/scan")}
            >
              ทิ้งขยะเพิ่มเติม
            </Button>
            <Button
              type="primary"
              className="h-[120px] rounded-full animate-scalePulse bg-background-brand text-white text-heading-l font-bold flex px-16"
              style={{ boxShadow: "0 4px 20px rgba(241, 99, 35, 0.5)" }}
              onClick={() => navigate("/score")}
            >
              ทิ้งขยะครบหมดแล้ว
            </Button>
          </Flex>
        </motion.div>
        </Flex>
      )}
      
    </Flex>
  );
};

export default CorrectPage;
