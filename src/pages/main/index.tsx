import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import CategoryCard from "./component/CategoryCard";
import { Button, Flex, Spin, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { wasteMap } from "../../types/wasteType";
import VideoPr from "../../assets/video/smart_bit_pr.mp4";
import kCleanLogo from "../../assets/images/Logo/K-CLEAN-LOGO.png";
import pmoLogo from "../../assets/images/Logo/pmo_logo.png";
import buildKmitlLogo from "../../assets/images/Logo/BUILD_KMITL-LOGO.png";
import techsureLogo from "../../assets/images/Logo/techsure_logo.png";
import Header from "../../component/Header";
import mianThSound from "../../assets/sound/0-มาช่วยกันแ.mp3";
import mianEnSound from "../../assets/sound/3-Let'shelps.mp3";
import { useTank } from "../../context/TankContext";


const { Text } = Typography;

const MainPage = () => {
  const navigate = useNavigate();
  const [showVideoOverlay, setShowVideoOverlay] = useState(true);
  const [defaultTouchedOnce, setDefaultTouchedOnce] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);
  const [fade, setFade] = useState(true);

  
  const { readDataAll, tankValues } = useTank();

  const topRightClickCount = useRef(0);
  const topRightTimeout = useRef<NodeJS.Timeout | null>(null);

  const overlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioFiles = [mianThSound, mianEnSound];

  const [videoLoading, setVideoLoading] = useState(true); 
  const videoRef = useRef<HTMLVideoElement | null>(null);


  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIsEnglish(prev => !prev);
        setFade(true); 
      }, 300); 
    }, 5000);

    return () => clearInterval(interval);
  }, []);

 // ------------------- USB readDataAll and messages -------------------
  useEffect(() => {
  const fetchTankData = () => {
    readDataAll(); 
    console.log("Current tank values after sending points:", tankValues);
  };

  fetchTankData();

  const interval = setInterval(fetchTankData, 60000);
  return () => clearInterval(interval);
}, [readDataAll, tankValues]);

  const startVideoTimeout = () => {
    if (overlayTimeoutRef.current) clearTimeout(overlayTimeoutRef.current);
    overlayTimeoutRef.current = setTimeout(() => {
      setShowVideoOverlay(true);
    }, 10000);
  };

  const handleOverlayClick = () => {
    setShowVideoOverlay(false);
    setDefaultTouchedOnce(false);
    startVideoTimeout();
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const handleDefaultClick = () => {
    if (!defaultTouchedOnce) {
      setDefaultTouchedOnce(true);
      startVideoTimeout();

      if (audioRef.current) {
        let index = 0;

        const playNext = () => {
          if (index < audioFiles.length) {
            audioRef.current!.src = audioFiles[index];
            audioRef.current!.currentTime = 0;
            audioRef.current!.play().catch(() => {});
            index += 1;
            audioRef.current!.onended = playNext;
          } else {
            audioRef.current!.onended = null;
          }
        };

        playNext();
      }
    } else {
      if (overlayTimeoutRef.current) clearTimeout(overlayTimeoutRef.current);
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

 const customIcon = <LoadingOutlined style={{ fontSize: 200, color: "#F16323" }} spin />;

  return (
    <Flex className="w-full h-full flex-col items-center justify-center relative">
      <Flex className="w-full sticky top-0 z-20 bg-white">
            <Header />
      </Flex>

      <Flex
        className="w-full flex-1 flex flex-col items-center justify-center"
        onClick={handleDefaultClick}
        onTouchStart={handleDefaultClick}
      >
        
        <Flex vertical className="gap-[140px] items-center justify-center">
          <Flex vertical className="items-center relative ">
            <Text
              className={`text-hero font-bold transition-opacity duration-300 ${
                fade ? "animate-fadeIn" : "animate-fadeOut"
              }`}
            >
              {isEnglish ? "Confused?" : "มาแยกขยะกันไหม?"}
            </Text>
            <Text
              className={`text-hero font-bold transition-opacity duration-300 mt-6 ${
                fade ? "animate-fadeIn" : "animate-fadeOut"
              }`}
            >
              {isEnglish ? (
                <>LET ME HELP <span className="text-text-brand">SORT</span></>
              ) : (
                <>เดี๋ยวเราช่วย <span className="text-text-brand">แยก</span></>
              )}
            </Text>
          </Flex>

          <Flex className="grid grid-cols-5 divide-x-2 divide-gray-300 mt-6">
            {Object.entries(wasteMap).map(([key, waste]) => (
              <CategoryCard
                key={key}
                image={waste.image}
                header={isEnglish ? waste.description : key}
                 fade={fade}
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
              <span className={`${fade ? "animate-fadeIn" : "animate-fadeOut"} flex`}>
                {isEnglish ? "Tap to start" : "แตะหน้าจอเพื่อเริ่มแยกขยะ"}
              </span>
            </Button>
          </Flex>
        </Flex>

  
        <Flex vertical className="items-center mt-72">
          <Text
            className={`text-heading-s ${fade ? "animate-fadeIn" : "animate-fadeOut"}`}
          >
            {isEnglish ? "Developed by" : "ร่วมพัฒนาโดย"}
          </Text>
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
          {videoLoading && (
             <Spin
              indicator={customIcon} 
              tip="Connecting to camera..."
              className="absolute z-50"
              style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            />
          )}
            <video
            ref={videoRef}
            src={VideoPr}
            autoPlay
            loop
            playsInline
            className={`absolute w-full h-full object-cover object-center ${
              videoLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"
            }`}
            onCanPlay={() => setVideoLoading(false)} 
          />
          <Flex
            vertical
            className="absolute bottom-0 w-full h-[300px] items-center justify-end pb-20 z-10"
          >
            <Button
              type="primary"
              className="w-fit h-[120px] rounded-full animate-scalePulse bg-background-brand text-white text-heading-m font-bold flex px-8"
            >
              <span className={`${fade ? "animate-fadeIn" : "animate-fadeOut"} flex`}>
                {isEnglish ? "Tap to start" : "แตะหน้าจอเพื่อเริ่มแยกขยะ"}
              </span>
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
          zIndex: 50,
          cursor: "pointer",
          // backgroundColor: "rgba(255,0,0,0.2)",
        }}
      />
    </Flex>
  );
};

export default MainPage;
