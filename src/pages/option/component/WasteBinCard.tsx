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
        className="h-fit rounded-full  text-heading-m font-bold absolute -top-32 z-20 px-8"
        style={{
            boxShadow: "0 4px 6px rgba(241, 99, 35, 0.5)" 
        }}
        onClick={onSelect}
      >
        <Flex vertical>
         <Text className="text-heading-xs text-text-brand ">เลือก</Text>
         <Text className="text-sub-heading-xs text-text-brand ">(Choose)</Text>
         </Flex>
      </Button>
      
       <div
        onClick={onSelect}
        className="cursor-pointer flex flex-col items-center w-full"
      >
      {/* Image */}
      <img
        src={binImage}
        alt={type}
        className="w-full h-[300px] object-contain relative z-10"
        style={{
          marginBottom: "-30px", 
        }}
      />

      {/* Text section */}
      <Flex
        vertical
        className="w-[240px] h-[430px] text-center relative z-0 px-6 rounded-2xl"
        style={{
          backgroundColor: bgColor,
        }}
      >
        <Text
          className="text-heading-xs font-bold mt-20" 
          style={{ color: textColor }}
        >
          {type}
        </Text>
        <Text
          className="text-heading-xs mt-1 font-bold"
          style={{ color: textColor }}
        >
          {description}
        </Text>
      </Flex>
      </div>
    </Flex>
  );
};

export default WasteBinCard;
