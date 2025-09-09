import { Flex, Typography } from "antd";
import showScoreImage from "../../../assets/images/show_score.png";

const { Text } = Typography;

interface SuccessScoreProps {
  countdown: number;
  skipped?: boolean;
}

const SuccessScore = ({ countdown, skipped = false }: SuccessScoreProps) => {
  return (
    <Flex
      vertical
      className="flex-col items-center justify-between w-full h-screen px-4" 
    >
      <Flex vertical className="items-center mt-48">
        <img
          src={showScoreImage}
          alt="Show Score"
          className="w-[560px] h-[430px] object-contain"
        />
        <Text className="font-bold text-heading-xl text-center mt-10 px-32">
          ไม่มีใครรักโลกเท่า <span className="text-text-brand">ลิงปั้น</span> แล้วล่ะ ✨
        </Text>
        {!skipped && (
          <Flex className="w-[600px] h-[130px] bg-background-light rounded-full items-center justify-center mt-20">
            <Text className="text-heading-l text-center text-text-title">
              คะแนนสะสม{" "}
              <span className="text-text-brand font-bold">654</span> คะแนน
            </Text>
          </Flex>
        )}
      </Flex>

      <Flex vertical className="items-center mt-auto mb-64">
        <Text className="font-bold text-heading-l text-center text-gray-500">
          กำลังกลับสู่หน้าหลัก (<span className="text-text-brand font-bold">{countdown}</span>)
        </Text>
      </Flex>
    </Flex>
  );
};

export default SuccessScore;
