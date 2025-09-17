import { createContext, useContext, useState, useEffect } from "react";

type TankContextType = {
  tankIndex: number | null;
  setTankIndex: (index: number | null) => void;
  tankValues: number[];
  setTankValues: React.Dispatch<React.SetStateAction<number[]>>;
  readDataAll: () => void;        
  addUsbMessage: (msg: string) => void; 
  openTank: (index: number) => void;   
};

const TankContext = createContext<TankContextType | undefined>(undefined);

export const TankProvider = ({ children }: { children: React.ReactNode }) => {
  const [tankIndex, setTankIndex] = useState<number | null>(null);
  const [tankValues, setTankValues] = useState<number[]>([0, 0, 0, 0, 0]);

  // ------------------- Logging -------------------
  const addUsbMessage = (msg: string) => {
    console.log("USB Message:", msg);
  };

  // ------------------- Tank Control -------------------
  const openTank = (index: number) => {
    if (window.USB?.send) {
      console.log("👉 Opening tank:", index);
      window.USB.send(`F ${index} 5000\n`);
      addUsbMessage(`Sent command → F ${index} 5000`);
    } else {
      addUsbMessage("USB not available for sending.");
    }
  };

  // Whenever tankIndex changes → auto open
  useEffect(() => {
    if (tankIndex !== null) {
      openTank(tankIndex);
    }
  }, [tankIndex]);

  // ------------------- Read Data -------------------
  const readDataAll = () => {
    if (window.USB?.send) {
      window.USB.send("P 9 9\n");
      addUsbMessage("Sent command → P 9 9");
    } else {
      addUsbMessage("USB not available .");
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
