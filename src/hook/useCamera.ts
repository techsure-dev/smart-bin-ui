import { useEffect, useRef, useState } from "react";

// Global persistent stream
let persistentStream: MediaStream | null = null;

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(persistentStream);

  const getCameraDevices = async () => {
    const allDevices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = allDevices.filter((d) => d.kind === "videoinput");
    setDevices(videoDevices);
    return videoDevices;
  };

  const startCamera = async (deviceId?: string) => {
    try {
      if (persistentStream) {
        if (videoRef.current) {
          videoRef.current.srcObject = persistentStream;
          await videoRef.current.play();
        }
        setStream(persistentStream);
        return;
      }

      const constraints: MediaStreamConstraints = {
        video: {
          deviceId: deviceId ? { exact: deviceId } : undefined,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: "environment",
        },
        audio: false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }

      setStream(mediaStream);
      persistentStream = mediaStream;
    } catch (err) {
      console.error("Error starting camera:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      persistentStream = null;
    }
  };

  useEffect(() => {
    getCameraDevices();
    // Do not stop camera on unmount to persist stream
    // return () => stopCamera();
  }, []);

  return { videoRef, devices, startCamera, stopCamera, stream };
};
