import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import circle from "../../../assets/images/noisy-gradients.png";
import ai_profile from "../../../assets/images/AIProfile.png";

interface AIProfileAnimationProps {
  top?: string;
  left?: string;
  scale?: number;
  duration?: number;
}

const AIProfileAnimation = ({
  top = "25%",
  left = "18%",
  scale = 0.7,
  duration = 1.5,
}: AIProfileAnimationProps) => {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(false), duration * 1000);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <>
      {showOverlay && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full bg-white z-40"
        />
      )}

      <motion.div
        initial={{
          top: "30%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          scale: 1,
        }}
        animate={{
          top,
          left,
          x: 0,
          y: 0,
          scale,
        }}
        transition={{
          duration,
          ease: "easeInOut",
        }}
        className="absolute z-30 flex flex-col items-center"
      >
        {/* AI Profile */}
        <img
          src={ai_profile}
          alt="ai profile"
          className="w-[250px] h-[250px] object-contain relative z-20"
        />

        {/* Circle below AI */}
        <img
          src={circle}
          alt="circle"
          className="w-[180px] h-[180px] object-contain relative -mt-36 z-10"
        />
      </motion.div>
    </>
  );
};

export default AIProfileAnimation;
