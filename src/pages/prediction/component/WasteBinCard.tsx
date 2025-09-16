import { Flex, Typography } from "antd";

const { Text } = Typography;

interface WasteBinCardProps {
  type: string;          
  description: string;   
  binImage: string;      
  bgColor: string;      
  textColor: string;     
  shadowColor?: string;  
}

const WasteBinCard = ({
  type,
  description,
  binImage,
  bgColor,
  textColor
}:WasteBinCardProps) => {
  return (
      <Flex vertical className="items-center justify-between relative">
      <img
        src={binImage}
        alt={type}
        className="w-[300px] h-[460px] object-contain relative z-10"
        style={{
          marginBottom: "-40px", 
        }}
      />

     <Flex
        vertical
        className="w-screen h-[300px] text-center relative z-0"
        style={{
          backgroundColor: bgColor,
        }}
      >
        <Text
          className="text-heading-m font-bold mt-12" 
          style={{ color: textColor }}
        >
          {type}
        </Text>
        <Text
          className="text-sub-heading-xs"
          style={{ color: textColor }}
        >
          {description}
        </Text>
      </Flex>
    </Flex>
  );
};

export default WasteBinCard;
