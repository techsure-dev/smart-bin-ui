import { useEffect, useState, useRef } from "react";
import { Flex } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../component/Header";
import InputPhoneNumber from "./component/InputPhoneNumber";
import SuccessScore from "./component/SuccessScore";
import { usePoints } from "../../context/PointsContext";

const ScorePage = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [skipped, setSkipped] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(5);
  const { totalPoints, resetResults } = usePoints();

  const autoSkipTimer = useRef<NodeJS.Timeout | null>(null);

  const handleKeyPress = (key: string) => {
    if (key === "x") {
      setInputValue((prev) => prev.slice(0, -1));
    } else {
      setInputValue((prev) => (prev.length < 10 ? prev + key : prev));
    }
  };

  const handleSubmit = () => {
    if (inputValue.length === 0) return;
    setSkipped(false);
    setSubmitted(true);
  };

  const handleSkip = () => {
    setInputValue("");
    setSkipped(true);
    setSubmitted(true);
  };


  useEffect(() => {
    if (!submitted) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted]);

  useEffect(() => {
    if (submitted) return; 

    const resetTimer = () => {
      if (autoSkipTimer.current) clearTimeout(autoSkipTimer.current);
      autoSkipTimer.current = setTimeout(() => {
        handleSkip();
      }, 20000);
    };

    resetTimer();
    const handleUserInput = () => {
      resetTimer();
    };

    document.addEventListener("keydown", handleUserInput);
    document.addEventListener("mousedown", handleUserInput);

    return () => {
      if (autoSkipTimer.current) clearTimeout(autoSkipTimer.current);
      document.removeEventListener("keydown", handleUserInput);
      document.removeEventListener("mousedown", handleUserInput);
    };
  }, [submitted]);

  return (
    <Flex className="absolute w-full h-screen bg-white flex flex-col items-center justify-start transition-opacity duration-500 z-10">
      <Flex className="w-full sticky top-0 z-20 bg-white">
        <Header />
      </Flex>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="input-screen"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <InputPhoneNumber
              inputValue={inputValue}
              onKeyPress={handleKeyPress}
              onSkip={handleSkip}
              onSubmit={handleSubmit}
            />
          </motion.div>
        ) : (
          <motion.div
            key="success-screen"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SuccessScore
              countdown={countdown}
              skipped={skipped}
              totalPoints={totalPoints}
              resetResults={resetResults}
              phoneNumber={inputValue}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  );
};

export default ScorePage;
