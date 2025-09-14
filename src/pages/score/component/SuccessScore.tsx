import { Flex, Typography } from "antd";
import showScoreImage from "../../../assets/images/show_score.png";
import { textToSpeech } from "../../../api/audioWaste"; 
import { useEffect, useRef } from "react";

const { Text } = Typography;

interface SuccessScoreProps {
  countdown: number;
  skipped?: boolean;
}

const SuccessScore = ({ countdown, skipped = false }: SuccessScoreProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    const playAudio = async () => {
      try {
        const thText = "ไม่มีใครรักโลกเท่า คุณวัชราภรณ์ แล้วล่ะ";
        const enText = "No one loves the Earth more than khun watcharaporn.";
        
    
        const thBlob = await textToSpeech(thText);
        const thUrl = URL.createObjectURL(thBlob);

        if (audioRef.current) {
          audioRef.current.src = thUrl;
          await audioRef.current.play().catch(() => {});

          audioRef.current.onended = async () => {
            const enBlob = await textToSpeech(enText);
            const enUrl = URL.createObjectURL(enBlob);
            if (audioRef.current) {
              audioRef.current.src = enUrl;
              await audioRef.current.play().catch(() => {});
            }
          };
        }
      } catch (err) {
        console.error("TTS play error:", err);
      }
    };

    playAudio();
  }, []);
  
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
        <Flex vertical className="items-center justify-center">
          <Text className="font-bold text-heading-xl text-center mt-10 px-32">
            ไม่มีใครรักโลกเท่า{" "}
            <Text className="text-text-brand">
              คุณวัราภรณ์
            </Text>
            {"\n"}แล้วล่ะ ✨
          </Text>

            <Text className="font-bold text-heading-xs text-text-subtitle">
            No one loves the Earth more than Khun watcharaporn.
          </Text>
        </Flex>
        {!skipped && (
          <Flex vertical className="w-[600px] h-fit bg-background-light rounded-full items-center justify-center mt-20 p-4">
            <Text className="text-heading-s text-center text-text-title">
              คะแนนสะสม{" "}
              <span className="text-text-brand font-bold">654</span> คะแนน
            </Text>
             <Text className="text-heading-xs font-bold text-center text-text-subtitle">
              You have 654 points.
            </Text>
          </Flex>
        )}
      </Flex>

      <Flex vertical className="items-center mt-auto mb-64">
        <Text className="font-bold text-heading-xs text-center text-text-subtitle">
           กำลังกลับสู่หน้าหลัก (Back to home) (<span className="text-text-brand font-bold">{countdown}</span>)
        </Text>
      </Flex>

        <audio ref={audioRef} preload="auto" />
    </Flex>
  );
};

export default SuccessScore;
