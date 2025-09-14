import { Flex, Typography } from "antd";
import { useEffect, useState } from "react";

const { Text } = Typography;

interface WasteCardProps {
  item_th: string;
  item_en: string;
  type_th: string;
  type_en: string;
  image: string;
  bgColor: string;
  textColor: string;
  iconColor?: string;
}

const WasteCard = ({
  item_th,
  item_en,
  type_th,
  type_en,
  image,
  bgColor,
  textColor,
}: WasteCardProps) => {
  const [showThai, setShowThai] = useState(true);

  // Switch language every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setShowThai((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
          {showThai ? (
            <>
              <Text className="text-heading-s font-bold" style={{ color: textColor }}>
                {item_th}
              </Text>
              <Text className="text-label-m" style={{ color: textColor }}>
                {type_th}
              </Text>
            </>
          ) : (
            <>
              <Text className="text-heading-s font-bold" style={{ color: textColor }}>
                {item_en}
              </Text>
              <Text className="text-label-m" style={{ color: textColor }}>
                {type_en}
              </Text>
            </>
          )}
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
