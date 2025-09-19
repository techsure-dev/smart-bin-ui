import { useEffect, useState } from "react";

export const useUsbMessages = (readDataAll: () => void) => {
  const [usbMessages, setUsbMessages] = useState<string[]>([]);

  useEffect(() => {
    const handleUsbMessage = (message: string) => {
      setUsbMessages(prev => [...prev, message]);
      console.log("USB message (SuccessScore):", message);
    };

    const originalHandler = window.onUsbMessage;
    window.onUsbMessage = handleUsbMessage;
    readDataAll();

    const intervalId = setInterval(readDataAll, 10000);

    return () => {
      window.onUsbMessage = originalHandler;
      clearInterval(intervalId);
    };
  }, [readDataAll]);

  return usbMessages;
};
