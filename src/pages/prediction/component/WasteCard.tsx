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
  className="w-[500px] min-h-[620px] flex flex-col items-center justify-between rounded-2xl p-8"
  style={{
    backgroundColor: bgColor,
    boxShadow: `0 50px 50px rgba(245, 220, 210, 0.5)`, 
  }}
>
      <Flex vertical className="text-center gap-6">
        <Text className="text-heading-xs font-bold" style={{ color: textColor }}>ขยะชิ้นนี้นี่คือ...</Text>
        <Flex vertical className="gap-2">
          <Text className="text-heading-s font-bold" style={{ color: textColor }}>{item}</Text>
          <Text className="text-label-m " style={{ color: textColor }}>{description}</Text> 
        </Flex>
      </Flex>
      <img src={image} alt={item} className="w-[220px] h-[220px] object-contain" />
    </Flex>
  );
};

export default WasteCard;
