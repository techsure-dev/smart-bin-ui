import { Flex, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../component/Header";
import WasteCard from "./component/WasteCard";
import { wasteMap } from "../../types/wasteType"; 
import ArrowIcon from "../../assets/icons/arrow.svg?react";
import WasteBinCard from "./component/WasteBinCard";
import AIProfileAnimation from "./component/AIProfileAnimation";
import CheckCard from "./component/CheckCard";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { textToSpeech } from "../../api/audioWaste";

const { Text } = Typography;

const PredictionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    result?: { item_th: string; item_en: string; type_th: string; type_en: string }[];
  };

  const results = state?.result || [];

  const [showCheckCard, setShowCheckCard] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);
  const [audioCache, setAudioCache] = useState<Record<string, { th: string; en: string }>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const langInterval = setInterval(() => setIsEnglish(prev => !prev), 5000);

    const showCheckTimer = setTimeout(() => setShowCheckCard(true), 1500);

    const preloadAudio = async () => {
      if (!results.length) return;
      const cache: Record<string, { th: string; en: string }> = {};
      for (const wasteItem of results) {
        try {
          const thBlob = await textToSpeech(`${wasteItem.item_th} ${wasteItem.type_th}`);
          const enBlob = await textToSpeech(`${wasteItem.item_en} ${wasteItem.type_en}`);
          cache[wasteItem.item_th] = {
            th: URL.createObjectURL(thBlob),
            en: URL.createObjectURL(enBlob),
          };
        } catch (err) {
          console.error("TTS preload error:", err);
        }
      }
      setAudioCache(cache);
    };

    preloadAudio();

    return () => {
      clearInterval(langInterval);
      clearTimeout(showCheckTimer);
    };
  }, [results]);

  useEffect(() => {
    if (!results.length || Object.keys(audioCache).length === 0 || !audioRef.current) return;

    let index = 0;

    const playNext = async () => {
      if (index >= results.length) return;

      const wasteItem = results[index];
      const audioTh = audioCache[wasteItem.item_th]?.th;
      const audioEn = audioCache[wasteItem.item_th]?.en;

      if (!audioTh || !audioEn) {
        index++;
        playNext();
        return;
      }

      if (!audioRef.current) return;

      // Play Thai audio
      audioRef.current.src = audioTh;
      await audioRef.current.play().catch(() => {});

      audioRef.current.onended = async () => {
        if (!audioRef.current) return;

        // Play English audio
        audioRef.current.src = audioEn;
        await audioRef.current.play().catch(() => {});

        audioRef.current.onended = () => {
          index++;
          playNext();
        };
      };
    };

    playNext();
  }, [audioCache, results]);

  if (!results.length) {
    return (
      <Flex className="w-full h-screen items-center justify-center">
        <Text className="text-heading-l font-bold">No result available</Text>
      </Flex>
    );
  }

  return (
    <Flex className="absolute w-full h-screen bg-white flex flex-col items-center justify-start transition-opacity duration-500 z-10">
      <Flex className="w-full sticky top-0 z-20 bg-white">
        <Header />
      </Flex>

      <Flex vertical className="items-center justify-center mt-10">
        <Text className="text-heading-xl font-bold">โปรดทิ้งขยะตามคำแนะนำ</Text>
        <Text className="text-heading-s font-bold">Sort your trash and throw it in the right bin</Text>
      </Flex>

      <Flex className="flex-wrap justify-center gap-6 relative w-full mt-12">
        {results.map((wasteItem, index) => {
          const waste = wasteMap[wasteItem.type_th];
          if (!waste) return null;

          return (
            <div key={index} className="flex flex-col items-center relative">
              <div className="relative z-20">
                <WasteCard
                  item_th={wasteItem.item_th}
                  item_en={wasteItem.item_en}
                  type_th={wasteItem.type_th}
                  type_en={wasteItem.type_en}
                  image={waste.image}
                  bgColor={waste.bgColor}
                  textColor={waste.textColor}
                />
              </div>

              <div className="mt-20">
                <ArrowIcon className="h-[220px] w-[130px] animate-bounce" fill={waste.bgColor} />
              </div>

              <WasteBinCard
                key={wasteItem.type_th}
                type={wasteItem.type_th}
                description={waste.description}
                binImage={waste.binImage}
                bgColor={waste.bgColor}
                textColor={waste.textColor}
              />

              <AIProfileAnimation />

              {showCheckCard && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute top-[41%] left-[4%] -translate-y-1/2 z-40"
                >
                  <CheckCard
                    onCorrect={() => navigate("/correct")}
                    onWrong={() => navigate("/option", { state: { result: results } })}
                  />
                </motion.div>
              )}
            </div>
          );
        })}
      </Flex>

      <audio ref={audioRef} preload="auto" />
    </Flex>
  );
};

export default PredictionPage;
