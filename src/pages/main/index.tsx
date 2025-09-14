import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import CategoryCard from "./component/CategoryCard";
import { Button, Flex, Typography } from "antd";
import Header from "../../component/Header";
import { wasteMap } from "../../types/wasteType";
import VideoPr from "../../assets/video/smart_bit_pr.mp4";
import kCleanLogo from "../../assets/images/Logo/K-CLEAN-LOGO.png";
import pmoLogo from "../../assets/images/Logo/pmo_logo.png";
import buildKmitlLogo from "../../assets/images/Logo/BUILD_KMITL-LOGO.png";
import techsureLogo from "../../assets/images/Logo/techsure_logo.png";
import { textToSpeech } from "../../api/audioWaste";

const { Text } = Typography;

const MainPage = () => {
  const navigate = useNavigate();
  const [showVideoOverlay, setShowVideoOverlay] = useState(true);
  const [defaultTouchedOnce, setDefaultTouchedOnce] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);
  const overlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCache = useRef<{ th?: string; en?: string }>({});
  const topRightClickCount = useRef(0);
  const topRightTimeout = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    const interval = setInterval(() => {
      setIsEnglish((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const preloadAudio = async () => {
      try {
        const thBlob = await textToSpeech("มาช่วยกันเเยกขยะกันเถอะ");
        const enBlob = await textToSpeech("Let's help separate the trash.");
        audioCache.current = {
          th: URL.createObjectURL(thBlob),
          en: URL.createObjectURL(enBlob),
        };
      } catch (err) {
        console.error("TTS preload error:", err);
      }
    };
    preloadAudio();
  }, []);

  const startVideoTimeout = () => {
    if (overlayTimeoutRef.current) clearTimeout(overlayTimeoutRef.current);
    overlayTimeoutRef.current = setTimeout(() => {
      setShowVideoOverlay(true);
      setDefaultTouchedOnce(false);
      if (audioRef.current) {
        audioRef.current.pause(); 
      }
    }, 20000); 
  };

 
  const playTTSSequence = async () => {
    if (!audioRef.current || !audioCache.current) return;
    audioRef.current.src = audioCache.current.th!;
    audioRef.current.currentTime = 0;
    await audioRef.current.play().catch(() => {});

    audioRef.current.onended = async () => {
      audioRef.current!.src = audioCache.current.en!;
      audioRef.current!.currentTime = 0;
      await audioRef.current!.play().catch(() => {});
      audioRef.current!.onended = null;
    };
  };

  const handleOverlayClick = () => {
    setShowVideoOverlay(false);
    setDefaultTouchedOnce(false);
    startVideoTimeout();
    playTTSSequence();
  };

  const handleDefaultClick = () => {
    if (!defaultTouchedOnce) {
      setDefaultTouchedOnce(true);
      startVideoTimeout();
      playTTSSequence();
    } else {
      if (overlayTimeoutRef.current) clearTimeout(overlayTimeoutRef.current);
      if (audioRef.current) audioRef.current.pause();
      navigate("/scan");
    }
  };

  const handleTopRightClick = () => {
    topRightClickCount.current += 1;

    if (topRightClickCount.current === 3) {
      navigate("/maintain");
      topRightClickCount.current = 0;
      if (topRightTimeout.current) clearTimeout(topRightTimeout.current);
    } else {
      if (topRightTimeout.current) clearTimeout(topRightTimeout.current);
      topRightTimeout.current = setTimeout(() => {
        topRightClickCount.current = 0;
      }, 1000); 
    }
  };


  return (
    <Flex className="w-full h-screen relative flex flex-col items-center justify-start">
      <Flex className="w-full sticky top-0 z-0 bg-white">
        <Header />
      </Flex>

      <Flex
        className="w-full flex-1 flex flex-col items-center justify-center"
        onClick={handleDefaultClick}
        onTouchStart={handleDefaultClick}
      >
        <Flex vertical className="gap-[140px] item-center justify-center mt-24">
          <Flex vertical className="items-center">
            {isEnglish ? (
              <>
                <Text className="font-bold text-hero">Confused?</Text>
                <Text className="font-bold text-hero">
                  LET ME HELP <span className="text-text-brand">SORT</span> เอง
                </Text>
              </>
            ) : (
              <>
                <Text className="font-bold text-hero">มาแยกขยะกันไหม?</Text>
                <Text className="font-bold text-hero">
                  เดี๋ยวเราช่วย <span className="text-text-brand">แยก</span> เอง
                </Text>
              </>
            )}
          </Flex>

          <Flex className="grid grid-cols-5 divide-x-2 divide-gray-300">
            {Object.entries(wasteMap).map(([key, waste]) => (
              <CategoryCard
                key={key}
                image={waste.image}
                header={isEnglish ? waste.description : key}
                bgColor={waste.bgColor}
                iconColor={waste.iconColor || waste.bgColor}
                textColor={waste.textColor}
              />
            ))}
          </Flex>

          <Flex vertical className="items-center">
            <Button
              type="primary"
              className="w-fit h-[120px] rounded-full animate-scalePulse bg-background-brand text-white text-heading-m font-bold flex px-8"
            >
              {isEnglish ? "Tap to start" : "แตะหน้าจอเพื่อเริ่มแยกขยะ"}
            </Button>
          </Flex>
        </Flex>

        <Flex vertical className="items-center mt-72">
          <Text className="text-heading-s">ร่วมพัฒนาโดย</Text>
          <Flex className="items-center justify-center gap-10">
            <img src={kCleanLogo} alt="Logo" className="h-[80px] cursor-pointer" />
            <img src={pmoLogo} alt="Logo" className="h-[80px] cursor-pointer" />
            <img src={buildKmitlLogo} alt="Logo" className="h-[80px] cursor-pointer" />
            <img src={techsureLogo} alt="Logo" className="h-[50px] cursor-pointer" />
          </Flex>
        </Flex>
      </Flex>

      {showVideoOverlay && (
        <Flex
          className="absolute w-full h-full items-center justify-center bg-black z-20"
          onClick={handleOverlayClick}
          onTouchStart={handleOverlayClick}
        >
          <video
            src={VideoPr}
            autoPlay
            loop
            playsInline
            className="absolute w-full h-full object-cover object-center"
          />

          <Flex
            vertical
            className="absolute bottom-0 w-full h-[300px] items-center justify-end pb-20 z-10"
          >
            <Button
              type="primary"
              className="w-fit h-[120px] rounded-full animate-scalePulse bg-background-brand text-white text-heading-m font-bold flex px-8 z-20"
            >
              {isEnglish ? "Tap to start" : "แตะหน้าจอเพื่อเริ่มแยกขยะ"}
            </Button>
          </Flex>
        </Flex>
      )}

      <audio ref={audioRef} preload="auto" />

      <div
        onClick={handleTopRightClick}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 50,
          height: 50,
          cursor: "pointer",
          // backgroundColor: "rgba(255,0,0,0.2)" 
        }}
      />

    </Flex>
  );
};

export default MainPage;
