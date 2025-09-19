import { createContext, useContext, useState } from "react";

interface CameraContextType {
  stream: MediaStream | null;
  setStream: (stream: MediaStream | null) => void;
}

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export const CameraProvider = ({ children }: { children: React.ReactNode }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  return (
    <CameraContext.Provider value={{ stream, setStream }}>
      {children}
    </CameraContext.Provider>
  );
};

export const useCameraContext = () => {
  const context = useContext(CameraContext);
  if (!context) throw new Error("useCameraContext must be used within CameraProvider");
  return context;
};
