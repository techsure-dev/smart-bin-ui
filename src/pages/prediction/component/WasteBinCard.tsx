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
      {/* Image */}
      <img
        src={binImage}
        alt={type}
        className="w-[300px] h-[460px] object-contain relative z-10"
        style={{
          marginBottom: "-30px", 
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
          className="text-heading-l font-bold mt-20" 
          style={{ color: textColor }}
        >
          {type}
        </Text>
        <Text
          className="text-heading-s mt-1 font-bold"
          style={{ color: textColor }}
        >
          {description}
        </Text>
      </Flex>
    </Flex>
  );
};

export default WasteBinCard;
