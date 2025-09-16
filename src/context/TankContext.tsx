import { createContext, useContext, useState } from "react";

type TankContextType = {
  tankIndex: number | null;
  setTankIndex: (index: number | null) => void;
  tankValues: number[];
  setTankValues: React.Dispatch<React.SetStateAction<number[]>>;
  readDataAll: () => void;          // new
  addUsbMessage: (msg: string) => void; // new
};

const TankContext = createContext<TankContextType | undefined>(undefined);

export const TankProvider = ({ children }: { children: React.ReactNode }) => {
  const [tankIndex, setTankIndex] = useState<number | null>(null);
  const [tankValues, setTankValues] = useState<number[]>([0, 0, 0, 0, 0]);

  // Function to log USB messages
  const addUsbMessage = (msg: string) => {
    console.log("USB Message:", msg);
  };

  // Function to read all tank data
const readDataAll = () => {
  if (window.USB?.send) {
    window.USB.send("P 9 9\n");
    addUsbMessage("Sent command → P 9 9");
  } else {
    addUsbMessage("USB not available");
  }
};

  return (
    <TankContext.Provider
      value={{ tankIndex, setTankIndex, tankValues, setTankValues, readDataAll, addUsbMessage }}
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
