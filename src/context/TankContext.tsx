import { createContext, useContext, useState, useEffect } from "react";

type TankContextType = {
  tankIndex: number | null;
  setTankIndex: (index: number | null) => void;
  tankValues: number[];
  setTankValues: React.Dispatch<React.SetStateAction<number[]>>;
  readDataAll: () => void;
  addUsbMessage: (msg: string) => void;   
  logUsbReceived: (msg: string) => void; 
  openTank: (index: number) => void;
};

const TankContext = createContext<TankContextType | undefined>(undefined);

export const TankProvider = ({ children }: { children: React.ReactNode }) => {
  const [tankIndex, setTankIndex] = useState<number | null>(null);
  const [tankValues, setTankValues] = useState<number[]>([0, 0, 0, 0, 0]);

  // ------------------- Logging -------------------
  const addUsbMessage = (msg: string) => {
    console.log("📤 Sent:", msg);
  };

  const logUsbReceived = (msg: string) => {
    console.log("📥 Received:", msg);
  };

  // ------------------- Tank Control -------------------
  const openTank = (index: number) => {
    if (window.USB?.send) {
      const command = `F ${index} 5000`;
      window.USB.send(command + "\n");
      addUsbMessage(`Sent command → ${command}`);
    } else {
      addUsbMessage("USB not available for sending.");
    }
  };

  useEffect(() => {
    if (tankIndex !== null) {
      openTank(tankIndex);
    }
  }, [tankIndex]);

  // ------------------- Read Data -------------------
  const readDataAll = () => {
    if (window.USB?.send) {
      const command = "P 9 9";
      window.USB.send(command + "\n");
      addUsbMessage(`Sent command → ${command}`);
    } else {
      addUsbMessage("USB not available.");
    }
  };

  return (
    <TankContext.Provider
      value={{
        tankIndex,
        setTankIndex,
        tankValues,
        setTankValues,
        readDataAll,
        addUsbMessage,
        logUsbReceived,
        openTank,
      }}
    >
      {children}
    </TankContext.Provider>
  );
};

export const useTank = () => {
  const ctx = useContext(TankContext);
  if (!ctx) throw new Error("useTank must be used inside TankProvider");
  return ctx;
};
