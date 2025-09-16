import { Flex, Typography } from "antd";
const { Text } = Typography;

interface WasteCardProps {
  item_th: string;
  item_en: string;
  image: string;
  bgColor: string;
  textColor: string;
  iconColor?: string;
}

const WasteCard = ({
  item_th,
  item_en,
  image,
  bgColor,
  textColor,
}: WasteCardProps) => {
  return (
    <Flex
      className="w-[500px] min-h-[620px] flex flex-col items-center justify-between rounded-2xl p-8"
      style={{
        backgroundColor: bgColor,
        boxShadow: `0 50px 50px rgba(245, 220, 210, 0.5)`,
      }}
    >
      <Flex vertical className="text-center gap-6">
        <Text className="text-heading-xs font-bold" style={{ color: textColor }}>
          ขยะชิ้นนี้นี่คือ...
        </Text>

        <Flex vertical className="gap-2 transition-opacity duration-500 ease-in-out">
          <Text className="text-heading-s font-bold h-[140px]" style={{ color: textColor }}>
            {item_th}
          </Text>
          <Text className="text-label-m" style={{ color: textColor }}>
            {item_en}
          </Text>
        </Flex>
      </Flex>

      <img
        src={image}
        alt={item_th}
        className="w-[220px] h-[220px] object-contain"
      />
    </Flex>
  );
};

export default WasteCard;
