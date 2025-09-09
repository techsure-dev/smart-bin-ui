import { Flex, Typography, Button } from "antd";

const { Text } = Typography;

interface WasteBinCardProps {
  type: string;          
  description: string;   
  binImage: string;      
  bgColor: string;      
  textColor: string;     
  shadowColor?: string;  
  onSelect?: () => void; 
}

const WasteBinCard = ({
  type,
  description,
  binImage,
  bgColor,
  textColor,
  onSelect
}: WasteBinCardProps) => {
  return (
    <Flex vertical className="items-center justify-between relative">
      <Button
        type="default"
        className="h-[60px] rounded-full  text-heading-m font-bold text-text-brand  absolute -top-20 z-20 px-8"
        style={{
            boxShadow: "0 4px 6px rgba(241, 99, 35, 0.5)" 
        }}
        onClick={onSelect}
      >
        เลือก
      </Button>

      {/* Image */}
      <img
        src={binImage}
        alt={type}
        className="w-[190px] h-[300px] object-contain relative z-10"
        style={{
          marginBottom: "-30px", 
        }}
      />

      {/* Text section */}
      <Flex
        vertical
        className="w-full h-[300px] text-center relative z-0 px-6"
        style={{
          backgroundColor: bgColor,
        }}
      >
        <Text
          className="text-heading-s font-bold mt-20" 
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
