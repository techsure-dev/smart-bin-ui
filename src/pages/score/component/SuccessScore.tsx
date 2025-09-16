import { Flex, Typography } from "antd";
import showScoreImage from "../../../assets/images/show_score.png";
import { useEffect, useRef, useState } from "react";
import successThsound from "../../../assets/sound/1-ไม่มีใครรั.mp3";
import successEnsound from "../../../assets/sound/4-Nooneloves.mp3";
import WastePointDisplay from "./WastePointDisplay";
import { usePoints } from "../../../context/PointsContext"; 
import { collectScore } from "../../../api/collectScore";
import { useNavigate } from "react-router-dom";
import { useTank } from "../../../context/TankContext";

const { Text } = Typography;

interface SuccessScoreProps {
  countdown: number;
  skipped?: boolean;
  totalPoints: number;
  resetResults?: () => void;
  phoneNumber: string; 
}

const SuccessScore = ({ countdown, skipped = false, phoneNumber }: SuccessScoreProps) => {
  const navigate = useNavigate();
  const { totalPoints, listOfPoints, resetResults } = usePoints(); 
  const hasNavigatedRef = useRef(false);

  const { tankValues, requestReadAll } = useTank();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showTankValues, setShowTankValues] = useState<number[] | null>(null);

  // ------------------- Audio -------------------
  useEffect(() => {
    if (!audioRef.current) return;
    const audioEl = audioRef.current;
    audioEl.src = successThsound;
    audioEl.play().catch(() => {});
    const playEnglish = () => {
      audioEl.onended = null;
      audioEl.src = successEnsound;
      audioEl.play().catch(() => {});
    };
    audioEl.onended = playEnglish;
    return () => { audioEl.onended = null; };
  }, []);

  // ------------------- Send Points -------------------
  useEffect(() => {
    if (skipped) return;
    let cancelled = false;

    const sendPoints = async () => {
      try {
        // request fresh tank values before sending
        const freshTanks = await requestReadAll();
        if (cancelled) return;
        console.log("Fresh tank values before sending points:", freshTanks);
        
        const results = await collectScore(phoneNumber, listOfPoints);
        console.log("✅ Points submitted:", results);
      } catch (err) {
        if (!cancelled) console.error("❌ Failed to submit points", err);
      }
    };

    sendPoints();
    return () => { cancelled = true; };
  }, [phoneNumber, skipped, listOfPoints, requestReadAll]);

  // ------------------- Countdown Navigation -------------------
  useEffect(() => {
    if (countdown === 0 && !hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      let cancelled = false;

      const navigateAfterTankRead = async () => {
        try {
          // request fresh tank values before navigating
        const freshTanks = await requestReadAll();
          if (cancelled) return;
          console.log("Tank values:", freshTanks);

          resetResults?.();
          navigate("/");
        } catch (err) {
          console.error("Failed to read tanks:", err);
          resetResults?.();
          navigate("/");
        }
      };

      navigateAfterTankRead();

      return () => { cancelled = true; };
    }
  }, [countdown, resetResults, navigate, requestReadAll]);

  // ------------------- Render -------------------
  return (
    <Flex vertical className="flex-col items-center justify-between w-full h-screen px-4">
      <Flex vertical className="items-center mt-48">
        <img
          src={showScoreImage}
          alt="Show Score"
          className="w-[560px] h-[430px] object-contain"
        />
        <Flex vertical className="items-center justify-center">
          <Text className="font-bold text-heading-xl text-center mt-10 px-32">
            ไม่มีใครรักโลกเท่า{" "}
            <Text className="text-text-brand text-heading-xl font-bold">คุณ</Text>
            {"\n"}แล้วล่ะ ✨
          </Text>
          <Text className="font-bold text-heading-xs text-text-subtitle">
            No one loves the Earth more than You.
          </Text>
        </Flex>

        {!skipped && (
          <Flex vertical className="min-w-[735px] h-fit bg-background-light rounded-full items-center justify-center mt-20 px-7 py-14">
            <WastePointDisplay totalPoint={totalPoints} />
          </Flex>
        )}

        {showTankValues && (
          <Flex vertical className="mt-4">
            <Text className="font-bold text-heading-xs text-text-subtitle">
              Tank Values before exit: {showTankValues.join(", ")}
            </Text>
          </Flex>
        )}
      </Flex>

      <Flex vertical className="items-center mt-auto mb-64">
        <Text className="font-bold text-heading-xs text-center text-text-subtitle">
          กำลังกลับสู่หน้าหลัก (Back to home) (
          <span className="text-text-brand font-bold">{countdown}</span>)
        </Text>
      </Flex>

      <audio ref={audioRef} preload="auto" />
    </Flex>
  );
};

export default SuccessScore;
