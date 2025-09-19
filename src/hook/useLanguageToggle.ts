import { useEffect, useState } from "react";

export const useLanguageToggle = (intervalMs = 5000, fadeDuration = 300) => {
  const [isEnglish, setIsEnglish] = useState(false);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIsEnglish(prev => !prev);
        setFade(true);
      }, fadeDuration);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs, fadeDuration]);

  return { isEnglish, fade };
};
