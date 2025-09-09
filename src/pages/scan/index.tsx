import { Button, Flex, Typography } from "antd";
import { useEffect, useRef } from "react";
import { useCamera } from "../../hook/useCamera"; 
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import bg from "../../assets/images/bg.png";
import dot from "../../assets/images/Dot.png";
import arrow_left from "../../assets/images/arrow_left.png";
import arrow_right from "../../assets/images/arrow_right.png";

const { Text } = Typography;

const ScanPage = () => {
  const { videoRef, devices, startCamera } = useCamera();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (devices.length > 0) {
      const usbCamera = devices.find(d => !d.label.toLowerCase().includes("built-in")) || devices[0];
      startCamera(usbCamera.deviceId);
    }
  }, [devices]);

  const captureAndClassify = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });

      navigate("/loading", { state: { file } });
    }, "image/jpeg");
  };

  return (
    <Flex
      className="w-full h-screen flex items-center justify-center relative"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <Flex vertical className="absolute top-48 items-center z-20">
        <Text className="font-bold text-heading-xl text-text-light">
          วางขยะให้อยู่ในกรอบ
        </Text>
      </Flex>

      <img src={dot} alt="dot" className="absolute w-[1260px] h-[1260px] object-contain z-10 animate-floatUpDown" />
      <img src={arrow_left} alt="left" className="absolute left-[calc(50%-600px)] top-1/2 transform -translate-y-1/2 w-[260px] h-[260px] z-20 cursor-pointer animate-leftToRight" />
      <img src={arrow_right} alt="right" className="absolute right-[calc(50%-600px)] top-1/2 transform -translate-y-1/2 w-[260px] h-[260px] z-20 cursor-pointer animate-rightToLeft" />

      <div className="absolute w-[600px] h-[600px] rounded-full overflow-hidden flex items-center justify-center z-30 border-[14px] border-[#AF6214]">
        <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted />
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <Button 
        onClick={captureAndClassify} 
        className="h-[120px] text-heading-xl absolute bottom-40 bg-[#AF6214] text-white px-6 py-3 rounded-lg z-40">
          Scan
      </Button>
    </Flex>
  );
};

export default ScanPage;
