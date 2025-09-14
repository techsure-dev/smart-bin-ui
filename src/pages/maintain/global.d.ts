// src/global.d.ts
interface Window {
  USB?: {
    jsReady?: () => void;
    requestPermission?: () => void;
    send?: (data: string) => void;
    close?: () => void;
  };
  Camera?: {
    openCamera: () => void;
  };
  CameraBridge?: {
    sendImage: (base64: string) => void;
  };
  onCameraImage?: (base64: string) => void;
  onUsbMessage?: (message: string) => void;
}