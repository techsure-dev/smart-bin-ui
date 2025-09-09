import { Flex, Typography } from "antd";

const { Text } = Typography;

interface WasteCardProps {
  item: string;
  type: string;
  image: string;
  bgColor: string;
  textColor: string;
  iconColor?: string; 
  description?: string;
}

const WasteCard = ({ item, image, bgColor, textColor, description }:WasteCardProps) => {
  return (
    <Flex
  className="w-[380px] h-[420px] flex flex-col items-center justify-between rounded-2xl p-6"
  style={{
    backgroundColor: bgColor,
    boxShadow: `0 50px 50px rgba(245, 220, 210, 0.5)`, 
  }}
>
      <Flex vertical className="text-center">
        <Text className="text-heading-s font-bold" style={{ color: textColor }}>ขยะชิ้นนี้นี่คือ...</Text>
        <Text className="text-heading-m font-bold" style={{ color: textColor }}>{item}</Text>
        <Text className="text-heading-s font-bold" style={{ color: textColor }}>{description}</Text> 
      </Flex>
      <img src={image} alt={item} className="w-[340px] h-[180px] object-contain" />
    </Flex>
  );
};

export default WasteCard;
