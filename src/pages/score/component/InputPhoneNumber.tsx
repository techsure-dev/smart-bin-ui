import { Flex, Button, Input, Typography } from "antd";
import { PhoneOutlined} from "@ant-design/icons";
import inputScoreImage from "../../../assets/images/input_score.png";

const { Text } = Typography;

interface InputPhoneNumberProps {
  inputValue: string;
  onKeyPress: (key: string) => void;
  onSkip: () => void;
  onSubmit: () => void;
}

const InputPhoneNumber = ({ inputValue, onKeyPress, onSkip, onSubmit }:InputPhoneNumberProps) => {
  return (
    <Flex className="flex flex-col items-center">
      {/* Image */}
      <img
        src={inputScoreImage}
        alt="Input Score"
        className="w-[560px] h-[430px] object-contain"
      />

      {/* Instructions */}
      <Flex vertical className="items-center justify-center">
        <Text className="font-bold text-heading-l">
          ขอบคุณที่รักษ์โลก
        </Text>
        <Text className="font-bold text-heading-s">
          กรอกเบอร์โทรศัพท์เพื่อรับคะแนนเลย!
        </Text>
        <Text className="font-bold text-heading-xs text-text-subtitle">
          Enter your phone number to get greenpoints!
        </Text>
      </Flex>

      {/* Input */}
      <Input
        value={inputValue}
        readOnly
        prefix={<PhoneOutlined style={{ fontSize: "42px", color: "#5A6169" }} />}
        className="text-heading-xs w-[430px] h-[120px] text-text-brand mt-20 border-[3px] border-[#F97316] rounded-xl px-8"
        style={{ textAlign: "left" }}
        placeholder="กรอกเบอร์โทรศัพท์"
      />

      {/* Numeric Keypad */}
      <Flex vertical className="gap-5 mt-16">
        {[
          ["1", "2", "3"],
          ["4", "5", "6"],
          ["7", "8", "9"],
          ["", "0", "x"],
        ].map((row, idx) => (
          <Flex key={idx} className="gap-8 justify-center">
            {row.map((key, i) =>
              key ? (
                <Button
                  key={i}
                  type="dashed"
                  className="w-[100px] h-[100px] text-heading-xs font-bold rounded-full bg-white text-text-brand transition-all duration-300"
                  style={{ boxShadow: "0 8px 20px rgba(241, 99, 35, 0.2)" }}
                  onClick={() => onKeyPress(key)}
                >
                  {key === "x" ? "⌫" : key}
                </Button>
              ) : (
                <div key={i} className="w-[100px] h-[100px]" />
              )
            )}
          </Flex>
        ))}
      </Flex>

      {/* Buttons */}
      <Flex className="gap-10 mt-32">
        <Button
          type="default"
          className="h-[120px] rounded-full text-text-brand text-heading-m font-bold flex px-28"
          style={{ boxShadow: "0 4px 20px rgba(241, 99, 35, 0.5)" }}
          onClick={onSkip}
        >
         <Flex vertical>
         <Text className="text-heading-s text-text-brand ">ข้าม</Text>
         <Text className="text-sub-heading-xs text-text-brand ">(Skip)</Text>
         </Flex>
        </Button>
        <Button
          type="primary"
          className="h-[120px] rounded-full bg-background-brand text-white text-heading-m font-bold flex px-28"
          style={{ boxShadow: "0 4px 20px rgba(241, 99, 35, 0.5)" }}
          onClick={onSubmit}
        >
        <Flex vertical>
         <Text className="text-heading-s text-white ">ยืนยัน</Text>
         <Text className="text-sub-heading-xs text-white ">(Confirm)</Text>
         </Flex>
        </Button>
      </Flex>
    </Flex>
  );
};

export default InputPhoneNumber;
