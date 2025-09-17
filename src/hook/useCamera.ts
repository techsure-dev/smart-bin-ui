import { useEffect, useRef, useState } from "react";

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);

  
  const getCameraDevices = async () => {
    const allDevices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = allDevices.filter(device => device.kind === "videoinput");
    setDevices(videoDevices);
    return videoDevices;
  };

 
  const startCamera = async (deviceId?: string) => {
  try {
    const videoConstraints: MediaTrackConstraints = {
      width: { ideal: 1240 },
      height: { ideal: 750 },
    };

    if (deviceId) videoConstraints.deviceId = { exact: deviceId };

    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints });
    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream;
      await videoRef.current.play();
    }
    setStream(mediaStream);
  } catch (err) {
    console.error("Error starting camera:", err);
  }
};



  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    getCameraDevices();
    return () => stopCamera(); 
  }, []);

  return { videoRef, devices, startCamera, stopCamera };
};
