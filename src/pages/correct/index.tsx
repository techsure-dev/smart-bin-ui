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
      <BackgroundCircles reverse={reverse} />

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
          <Flex vertical className="justify-center items-center">
            <Text className="font-bold text-hero">มาแยกขยะกันไหม?</Text>
            <Text className="font-bold text-hero">
              เดี๋ยวเราช่วย <span className="text-text-brand">แยก</span> เอง
            </Text>
            <Text className="font-bold text-heading-m text-text-subtitle">
              Any more trash? I can help sort it.
            </Text>
          </Flex>
          <Flex vertical className="mt-56 gap-24">
            <Button
              type="default"
              className="h-[150px] w-[620px] rounded-full animate-scalePulse text-text-brand text-heading-l font-bold flex px-16"
              style={{ boxShadow: "0 4px 20px rgba(241, 99, 35, 0.5)" }}
              onClick={() => navigate("/scan")}
            >
              <Flex vertical>
                <Text className="text-heading-s text-text-brand ">ทิ้งขยะเพิ่มเติม</Text>
                <Text className="text-sub-heading-xs text-text-brand ">(More trash to sort)</Text>
              </Flex>
            
            </Button>
            <Button
              type="primary"
              className="h-[150px] w-[620px] rounded-full animate-scalePulse bg-background-brand text-white text-heading-l font-bold flex px-16"
              style={{ boxShadow: "0 4px 20px rgba(241, 99, 35, 0.5)" }}
              onClick={() => navigate("/score")}
            >
              <Flex vertical>
                <Text className="text-heading-s text-text-light ">ทิ้งขยะครบหมดแล้ว</Text>
                <Text className="text-sub-heading-xs text-text-light ">(All done)</Text>
              </Flex>
             
            </Button>
          </Flex>
        </motion.div>
        </Flex>
      )}
      
    </Flex>
  );
};

export default CorrectPage;
