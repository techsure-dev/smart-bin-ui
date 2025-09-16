import { Button, Flex, Typography, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useCamera } from "../../hook/useCamera"; 
import { useLocation, useNavigate } from "react-router-dom"; 
import bg from "../../assets/images/bg.png";
import dot from "../../assets/images/Dot.png";
import arrow_left from "../../assets/images/arrow_left.png";
import arrow_right from "../../assets/images/arrow_right.png";
import scanThSound from "../../assets/sound/2-วางขยะให้อ.mp3"
import scanEnSound from "../../assets/sound/5-Keepthetra.mp3"

const { Text } = Typography;

const ScanPage = () => {
  const { videoRef, devices, startCamera } = useCamera();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const location = useLocation(); 
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loadingCamera, setLoadingCamera] = useState(true); 
  const thAudioRef = useRef<HTMLAudioElement | null>(null);
  const enAudioRef = useRef<HTMLAudioElement | null>(null);


  useEffect(() => {
    if (devices.length > 0) {
      const usbCamera = devices.find(d => !d.label.toLowerCase().includes("built-in")) || devices[0];
      startCamera(usbCamera.deviceId);
    }
  }, [devices]);


  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setLoadingCamera(false); 
    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [videoRef]);

  useEffect(() => {
    const state = location.state as { toastMessage?: string };
    if (state?.toastMessage) {
      setErrorMessage(state.toastMessage); 
      window.history.replaceState({}, document.title); 
    }
  }, [location.state]);

  useEffect(() => {
    thAudioRef.current = new Audio(scanThSound);
    enAudioRef.current = new Audio(scanEnSound);

    thAudioRef.current.play().catch(err => console.log("Audio play error:", err));
    thAudioRef.current.onended = () => {
      enAudioRef.current?.play().catch(err => console.log("Audio play error:", err));
    };

    return () => {
      thAudioRef.current?.pause();
      thAudioRef.current!.currentTime = 0;
      enAudioRef.current?.pause();
      enAudioRef.current!.currentTime = 0;
    };
  }, []);

  useEffect(() => {
  const thAudio = thAudioRef.current;
  const enAudio = enAudioRef.current;
  if (!thAudio || !enAudio) return;

  let autoBackTimer: NodeJS.Timeout;

  const startAutoBackTimer = () => {

    autoBackTimer = setTimeout(() => {
      navigate("/"); 
    }, 5000);
  };
  thAudio.play().catch(err => console.log("Audio play error:", err));
  thAudio.onended = () => {
    enAudio.play().catch(err => console.log("Audio play error:", err));
    enAudio.onended = () => {
      startAutoBackTimer(); 
    };
  };
  return () => {
    clearTimeout(autoBackTimer);
    thAudio.pause();
    thAudio.currentTime = 0;
    enAudio.pause();
    enAudio.currentTime = 0;
  };
}, [navigate]);


  const captureAndClassify = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoHeight;
    canvas.height = video.videoWidth;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((-90 * Math.PI) / 180);
    ctx.drawImage(video, -video.videoWidth / 2, -video.videoHeight / 2);
    ctx.restore();

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
      navigate("/loading", { state: { file } });
    }, "image/jpeg");
  };



  const customIcon = <LoadingOutlined style={{ fontSize: 200, color: "#F16323" }} spin />;

  return (
    <Flex
      className="w-full h-screen flex items-center justify-center relative bg-white"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {loadingCamera && (
        <Spin
          indicator={customIcon} 
          tip="Connecting to camera..."
          className="absolute z-50"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        />
      )}

      <Flex vertical className="absolute top-48 items-center justify-center z-20">
        <Text className="font-bold text-heading-xl text-text-light">
          วางขยะให้อยู่ในกรอบ
        </Text>
        <Text className="font-bold text-heading-s text-text-light">
          Keep the trash inside the circle.
        </Text>
      </Flex>

      <img src={dot} alt="dot" className="absolute w-[1260px] h-[1260px] object-contain z-10 animate-floatUpDown" />
      <img src={arrow_left} alt="left" className="absolute left-[calc(43%-600px)] top-1/2 transform -translate-y-1/2 w-[260px] h-[260px] z-20 cursor-pointer animate-leftToRight" />
      <img src={arrow_right} alt="right" className="absolute right-[calc(45%-600px)] top-1/2 transform -translate-y-1/2 w-[260px] h-[260px] z-20 cursor-pointer animate-rightToLeft" />

      <div className="absolute w-[720px] h-[720px] rounded-full overflow-hidden flex items-center justify-center z-30 border-[14px] border-[#AF6214]">
        <video
          ref={videoRef}
          className="w-full h-full object-cover bg-white transform -rotate-90"
          style={{ transformOrigin: "center" }}
          autoPlay
          muted
        />
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {errorMessage && (
        <div
          className="absolute w-full flex items-center justify-center z-40 pointer-events-none px-20"
          style={{ bottom: "400px" }}
        >
          <Text className="text-white text-heading-m font-bold bg-black/40 px-4 py-2 rounded text-center">
            {errorMessage}
          </Text>
        </div>
      )}

      {!loadingCamera && (
        <Button 
          onClick={captureAndClassify} 
          className="h-[120px] text-heading-xl absolute bottom-40 bg-[#AF6214] text-white px-6 py-3 rounded-lg z-40">
            Scan
        </Button>
      )}
    </Flex>
  );
};

export default ScanPage;
