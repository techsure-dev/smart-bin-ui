import { Typography } from "antd";
const { Text } = Typography;

type WastePointDisplayProps = {
  totalPoint: number;
};

const WastePointDisplay = ({ totalPoint }: WastePointDisplayProps) => {
  return (
    <>
      <Text className="text-heading-s text-center text-text-title font-bold">
        คะแนนที่ได้รับในรอบนี้{" "}
        <span className="text-text-brand font-bold">{totalPoint}</span> คะแนน
      </Text>
      <Text className="text-heading-xs font-bold text-center text-text-subtitle">
        You get {totalPoint} green points.
      </Text>
    </>
  );
};

export default WastePointDisplay;
