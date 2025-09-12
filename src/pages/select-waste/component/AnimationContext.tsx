import { motion } from "framer-motion";
import circle from "../../../assets/images/noisy-gradients.png";
import ai_profile from "../../../assets/images/AIProfile.png";

interface AIProfileAnimationProps {
  top?: string;
  left?: string;
  scale?: number;
  duration?: number;
}

const AIProfileAnimation = ({
  top = "40%",
  left = "18%",
  scale = 0.7,
  duration = 0.7,
}: AIProfileAnimationProps) => {

  return (
    <>
      <motion.div
        initial={{
          top: "12%",
          left: "5%",
          x: "0%",
          y: "0%",
          scale: 0.7,
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
