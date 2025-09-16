// context/TankContext.tsx
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type TankContextType = {
  tankIndex: number | null;
  setTankIndex: (index: number | null) => void;
  tankValues: number[];
  setTankValues: React.Dispatch<React.SetStateAction<number[]>>;
  // new API
  requestReadAll: () => Promise<number[]>;
};

const TankContext = createContext<TankContextType | undefined>(undefined);

export const TankProvider = ({ children }: { children: React.ReactNode }) => {
  const [tankIndex, setTankIndex] = useState<number | null>(null);
  const [tankValues, setTankValues] = useState<number[]>([0, 0, 0, 0, 0]);

  // pending resolver for the next read result
  const pendingResolveRef = useRef<((vals: number[]) => void) | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // whenever tankValues change, resolve any pending read promise
  useEffect(() => {
    if (pendingResolveRef.current) {
      pendingResolveRef.current(tankValues);
      pendingResolveRef.current = null;
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [tankValues]);

  // requestReadAll: sends USB read and returns a promise that resolves on next tankValues update
  const requestReadAll = (): Promise<number[]> => {
    return new Promise((resolve) => {
      // if no USB bridge, resolve immediately with current snapshot
      if (!window?.USB?.send) {
        resolve(tankValues);
        return;
      }

      // register resolver
      pendingResolveRef.current = (vals: number[]) => resolve(vals);

      // fallback timeout: if we don't get a response within e.g. 3000ms, resolve with current snapshot
      timeoutRef.current = window.setTimeout(() => {
        if (pendingResolveRef.current) {
          pendingResolveRef.current = null;
          timeoutRef.current = null;
          resolve(tankValues);
        }
      }, 3000);

      // send the command to request all tank values
      try {
        window.USB.send(`P 9 9\n`);
      } catch (err) {
        // if send throws, resolve immediately
        if (pendingResolveRef.current) {
          const r = pendingResolveRef.current;
          pendingResolveRef.current = null;
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          r(tankValues);
        }
      }
    });
  };

  return (
    <TankContext.Provider
      value={{ tankIndex, setTankIndex, tankValues, setTankValues, requestReadAll }}
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
