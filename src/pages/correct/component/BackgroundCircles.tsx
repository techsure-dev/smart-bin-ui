import { motion } from "framer-motion";

interface BackgroundCirclesProps {
  reverse: boolean;
}

const BackgroundCircles = ({ reverse }:BackgroundCirclesProps) => {
  return (
    <div className="absolute flex items-center justify-center">
      <motion.div
        initial={{ width: 120, height: 120 }}
        animate={reverse ? { width: 0, height: 0 } : { width: 2300, height: 2300 }}
        transition={{ duration: 1, ease: "easeInOut", delay: reverse ? 0.4 : 0 }}
        className="absolute rounded-full bg-[#00D774] opacity-100"
      />
      <motion.div
        initial={{ width: 100, height: 100 }}
        animate={reverse ? { width: 0, height: 0 } : { width: 1500, height: 1500 }}
        transition={{ duration: 1, ease: "easeInOut", delay: reverse ? 0.2 : 0 }}
        className="absolute rounded-full bg-[#00D774] opacity-60"
      />
      <motion.div
        initial={{ width: 80, height: 80 }}
        animate={reverse ? { width: 0, height: 0 } : { width: 1000, height: 1000 }}
        transition={{ duration: 1, ease: "easeInOut", delay: reverse ? 0 : 0 }}
        className="absolute rounded-full bg-[#00D774] opacity-20"
      />
    </div>
  );
};

export default BackgroundCircles;
