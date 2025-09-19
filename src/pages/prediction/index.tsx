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
import { useTank } from "../../context/TankContext";

const { Text } = Typography;

const wasteIndexMap: Record<string, number> = {
  "ขยะกำพร้า": 0,
  "ขยะทั่วไป": 1,
  "ขวดพลาสติก": 2,
  "ขวดแก้ว กระป๋อง โลหะ อะลูมิเนียม": 3,
  "ขยะอันตราย": 4,
};

const PredictionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    result?: { item_th: string; item_en: string; type_th: string; type_en: string }[];
  };
  const results = state?.result || [];

  const [showCheckCard, setShowCheckCard] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { setTankIndex, openTank } = useTank();

  // ------------------- Show CheckCard after delay -------------------
  useEffect(() => {
    const showCheckTimer = setTimeout(() => setShowCheckCard(true), 1500);
    return () => clearTimeout(showCheckTimer);
  }, []);

  // ------------------- Audio playback -------------------
  useEffect(() => {
    if (!results.length) return;

    const audio = audioRef.current;
    if (!audio) return;

    let index = 0;
    let isCancelled = false;

    const playAudio = (src: Blob | string, rate = 1) => {
      return new Promise<void>(async (resolve) => {
        if (!audio || isCancelled) return resolve();
        audio.src = src instanceof Blob ? URL.createObjectURL(src) : src;
        const onCanPlay = () => {
          if (isCancelled) return resolve();
          audio.playbackRate = rate;
          audio.play().catch(resolve);
        };
        const onEnded = () => {
          audio.removeEventListener("ended", onEnded);
          audio.removeEventListener("canplay", onCanPlay);
          resolve();
        };
        audio.addEventListener("canplay", onCanPlay);
        audio.addEventListener("ended", onEnded);
      });
    };

    const playNext = async () => {
      if (index >= results.length || isCancelled) return;
      const wasteItem = results[index];
      const waste = wasteMap[wasteItem.type_th];
      try {
        const thBlob = await textToSpeech(`${wasteItem.item_th}`);
        await playAudio(thBlob, 1.5);

        const enBlob = await textToSpeech(`${wasteItem.item_en}`);
        await playAudio(enBlob, 1.5);

        if (waste?.soundTh) {
          const thWasteBlob = await fetch(waste.soundTh).then(res => res.blob());
          await playAudio(thWasteBlob);
        }
        if (waste?.soundEn) {
          const enWasteBlob = await fetch(waste.soundEn).then(res => res.blob());
          await playAudio(enWasteBlob);
        }

        index++;
        playNext();
      } catch (err) {
        console.error("Audio playback error:", err);
        index++;
        playNext();
      }
    };

    playNext();
  }, [results]);

  // ------------------- Auto open tank and navigate -------------------
  useEffect(() => {
    if (!showCheckCard) return;

    const autoNavigateTimer = setTimeout(() => {
      if (results.length) {
        const tankIndex = wasteIndexMap[results[0].type_th];
        console.log("⏱ Auto sending tankIndex:", tankIndex);

        setTankIndex(tankIndex); 
        openTank(tankIndex);     

        navigate("/correct", { state: { result: results } });
      }
    }, 8000); 

    return () => clearTimeout(autoNavigateTimer);
  }, [showCheckCard, results, setTankIndex, openTank, navigate]);

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
                  image={waste.image}
                  bgColor={waste.bgColor}
                  textColor={waste.textColor}
                />
              </div>

              <div className="mt-14">
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
                    onCorrect={() => {
                      const tankIndex = wasteIndexMap[wasteItem.type_th];
                      console.log("👉 Sending tankIndex:", tankIndex);

                      setTankIndex(tankIndex); // update context
                      openTank(tankIndex);     // immediately open tank

                      navigate("/correct", { state: { result: results } });
                    }}
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
