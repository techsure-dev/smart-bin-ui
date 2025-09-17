// CheckCard.tsx
import { Flex, Typography } from "antd";
import checkMark from "../../../assets/icons/check_mark.png";
import crossMark from "../../../assets/icons/cross_mark.png";

const { Text } = Typography;

interface CheckCardProps {
  onCorrect: () => void;
  onWrong: () => void;
}

const CheckCard = ({ onCorrect, onWrong }: CheckCardProps) => {
  return (
    <div className="relative bg-[#F0EFEF] rounded-tl-[16px] rounded-bl-[16px] rounded-br-[16px] shadow-md">
      <Flex className="flex-col items-center justify-center w-[310px] h-[215px] p-4">
        <Text className="text-center text-heading-xs font-bold">
          ผมแยกประเภท<br />ถูกต้องไหมครับ?
        </Text>
        <Text className="text-center text-heading-xs font-bold text-text-subtitle">
          Is It correct?
        </Text>
      </Flex>

      <div className="absolute left-[40%] top-[85%] -translate-x-1/2 flex w-full justify-around px-16 z-30">
        <img
          src={crossMark}
          alt="cross mark"
          className="h-[120px] w-[120px] object-contain cursor-pointer"
          onClick={onWrong} 
        />

        <img
          src={checkMark}
          alt="check mark"
          className="h-[120px] w-[120px] object-contain cursor-pointer"
          onClick={onCorrect} 
        />
      </div>
    </div>
  );
};

export default CheckCard;
