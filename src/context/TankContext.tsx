import { createContext, useContext, useState } from "react";

type TankContextType = {
  tankIndex: number | null;
  setTankIndex: (index: number | null) => void;
  tankValues: number[];
  setTankValues: React.Dispatch<React.SetStateAction<number[]>>;
};

const TankContext = createContext<TankContextType | undefined>(undefined);

export const TankProvider = ({ children }: { children: React.ReactNode }) => {
  const [tankIndex, setTankIndex] = useState<number | null>(null);
  const [tankValues, setTankValues] = useState<number[]>([0, 0, 0, 0, 0]); // ✅ new state

  return (
    <TankContext.Provider value={{ tankIndex, setTankIndex, tankValues, setTankValues }}>
      {children}
    </TankContext.Provider>
  );
};

export const useTank = () => {
  const ctx = useContext(TankContext);
  if (!ctx) throw new Error("useTank must be used inside TankProvider");
  return ctx;
};
