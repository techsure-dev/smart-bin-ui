
import { motion } from "framer-motion";
import CheckIcon from "../../../assets/icons/Vector.svg?react"


interface CheckAnimationProps {
  reverse: boolean;
}

const CheckAnimation = ({ reverse }:CheckAnimationProps) => {
  return (
    <div className="relative flex items-center justify-center">

      {/* First white circle */}
      <motion.div
        initial={{ width: 120, height: 120, opacity: 0 }}
        animate={reverse ? { width: 120, height: 120, opacity: 0 } : { width: 280, height: 280, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: reverse ? 0.4 : 0 }}
        className="absolute rounded-full bg-white"
      />

      {/* Second white circle */}
      <motion.div
        initial={{ width: 120, height: 120, opacity: 0 }}
        animate={reverse ? { width: 120, height: 120, opacity: 0 } : { width: 350, height: 350, opacity: 0.32 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: reverse ? 0.2 : 0.2 }}
        className="absolute rounded-full bg-white"
      />

      {/* Third white circle */}
      <motion.div
        initial={{ width: 120, height: 120, opacity: 0 }}
        animate={reverse ? { width: 120, height: 120, opacity: 0 } : { width: 500, height: 500, opacity: 0.32 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: reverse ? 0 : 0.4 }}
        className="absolute rounded-full bg-white"
      />

      {/* Main Check Icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={reverse ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white"
      >
        <CheckIcon style={{ fontSize: 150, color: "#00D774" }} />
      </motion.div>
    </div>
  );
};

export default CheckAnimation;
