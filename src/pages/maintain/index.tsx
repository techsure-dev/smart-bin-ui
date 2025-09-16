import { Button, Input, Modal } from "antd";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTank } from "../../context/TankContext";

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatTimestamp(date: Date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function maintain() {
  const [messages, setMessages] = useState([
    "<i>Messages from native code will appear here...</i>",
  ]);
  const [inputData, setInputData] = useState("");
  // const [tankValues, setTankValues] = useState([0, 0, 0, 0, 0]); // ✅ state สำหรับถัง 5 ถัง
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const { tankIndex, tankValues, setTankValues, requestReadAll } = useTank();
  
  const addMessage = (msg: string) => {
    const time = formatTimestamp(new Date());
    setMessages((prev) => [
      ...prev,
      `<span style='color:#888'>[${time}]</span> ${escapeHtml(msg)}`,
    ]);
  };

  // ------------------- USB Callbacks -------------------
  useEffect(() => {
    window.onUsbMessage = (message: string) => {
      addMessage(message);
      console.log("add Messge",message)

      // ลองดึงเลขทั้งหมดจากข้อความ
      const nums = message
        .match(/\d+/g)   // หาตัวเลขทั้งหมด
        ?.map((n) => parseInt(n, 10)); // แปลงเป็น number

      if (nums && nums.length === 5) {
        setTankValues([...nums]); // ✅ อัพเดท state ให้ UI รีเฟรช
        addMessage(`อัพเดทค่าทุกถัง = ${nums.join(", ")}`);
        return;
      }

      // ถ้ามี protocol แบบ TANK,3,15 ก็ยังรองรับ
      if (message.startsWith("TANK")) {
        const parts = message.split(",");
        if (parts.length === 3) {
          const tankIndex = parseInt(parts[1], 10) - 1;
          const value = parseInt(parts[2], 10);

          if (!isNaN(tankIndex) && tankIndex >= 0 && tankIndex < 5) {
            setTankValues((prev) => {
              const newVals = [...prev];
              newVals[tankIndex] = value;
              return newVals;
            });
            addMessage(`อัพเดทค่าจาก USB → ถัง ${tankIndex + 1} = ${value}`);
          }
        }
      }
    };

    if (window.USB?.jsReady) window.USB.jsReady();
    addMessage("JS Ready and DOMContentLoaded.");
  }, []);

  // ------------------- USB Fn -------------------
  const requestUsbPermission = () => {
    if (window.USB?.requestPermission) window.USB.requestPermission();
    else addMessage("Error: USB bridge not available in JS.");
  };

  const sendUsbData = () => {
    if (window.USB?.send) window.USB.send(`${inputData}\n`);
    else addMessage("Error: USB bridge not available in JS for sending.");
  };

  const closeUsbConnection = () => {
    if (window.USB?.close) window.USB.close();
    else addMessage("Error: USB bridge not available in JS for closing.");
  };

  // ------------------- Tank Control -------------------
  useEffect(() => {
    if (tankIndex !== null) {
      openTank(tankIndex);   
    }
  }, [tankIndex]);
  
const openTank = (index: number) => {
  if (window.USB?.send) {
    console.log("👉 tankIndex from context:", index); 

    window.USB.send(`F ${index} 5000\n`);
    addMessage(`ส่งคำสั่งเปิดถัง 'F ${index} 5000' → USB`);
  } else {
    addMessage("Error: USB bridge not available in JS for sending.");
  }
};



  // ✅ อ่านค่าทุกถัง
  const readDataAll = () => {
    if (window.USB?.send) {
      window.USB.send(`P 9 9\n`);
      addMessage("ส่งคำสั่งอ่านค่าทุกถัง → USB");
    } else {
      addMessage("Error: USB bridge not available in JS for sending.");
    }
  };
  const resetData = () => {
    if (window.USB?.send) {
      window.USB.send(`R 0 0\n`);
      addMessage("ส่งคำสั่ง Reset arduino → USB");
    } else {
      addMessage("Error: USB bridge not available in JS for sending.");
    }
  };

  // ------------------- Auto scroll -------------------
  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // ------------------- back to main page -------------------
  const navigate = useNavigate();
  const topRightClickCount = useRef(0);
  const topRightTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleTopRightClick = () => {
    topRightClickCount.current += 1;

    if (topRightClickCount.current === 3) {
      navigate("/"); // go back to main page
      topRightClickCount.current = 0;
      if (topRightTimeout.current) clearTimeout(topRightTimeout.current);
    } else {
      if (topRightTimeout.current) clearTimeout(topRightTimeout.current);
      topRightTimeout.current = setTimeout(() => {
        topRightClickCount.current = 0;
      }, 1000);
    }
  };

  
  // ------------------- Render -------------------
    const [isModalVisible, setIsModalVisible] = useState(true);
  const [passwordInput, setPasswordInput] = useState("");

  const handlePasswordSubmit = () => {
    if (passwordInput === "power2edit") {
      setIsModalVisible(false);
    } else {
      setPasswordInput("");
    }
  };
  if (isModalVisible) {
    return (
      <Modal
        title="Enter Password"
        open={true}
        closable={false}
        centered 
        footer={[
          <Button key="submit" type="primary" onClick={handlePasswordSubmit}>
            Submit
          </Button>,
        ]}
      >
        <Input.Password
          placeholder="Enter password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          onPressEnter={handlePasswordSubmit}
        />
      </Modal>
    );
  }


  return (
    <div style={{ fontFamily: "sans-serif", margin: 20 }}>
      <h1>USB & Tank Control</h1>

      {/* USB Controls */}
      <div style={{ marginBottom: 10 }}>
        <button onClick={requestUsbPermission}>Request USB Permission</button>
        <button onClick={closeUsbConnection} style={{ marginLeft: 10 }}>
          Close USB
        </button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Enter data to send to USB"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          style={{ padding: 10, width: "calc(100% - 22px)", marginBottom: 10 }}
        />
        <button onClick={sendUsbData}>Send Data to USB</button>
      </div>

      {/* ✅ Tank Controls */}
      <h2>Tank Control</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: 20 }}>
        {tankValues.map((_, i) => (
          <button key={i} onClick={() => openTank(i)}>
            เปิดถัง {i + 1}
          </button>
        ))}
        <button onClick={readDataAll} style={{ background: "#4caf50", color: "#fff" }}>
          Read Data All
        </button>
        <button onClick={resetData} style={{ background: "#fc6464ff", color: "#fff" }}>
          Reset send 'R 0 0'
        </button>
      </div>

      {/* ✅ Tank Values */}
      <div style={{ display: "flex", gap: "10px" }}>
        {tankValues.map((val, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              padding: 20,
              width: 80,
              textAlign: "center",
              background: "#f0f0f0",
              borderRadius: 8,
            }}
          >
            <strong style={{ color: "#333" }}>ถัง {i + 1}</strong>
            <div style={{ color: "#333" }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Messages */}
      <h2>Messages:</h2>
      <div
        id="messages"
        ref={messageBoxRef}
        style={{
          border: "1px solid #ccc",
          padding: 10,
          marginTop: 10,
          height: 300,
          width: 400,
          backgroundColor: "#f9f9f9",
          overflowY: "auto",
          color: "#000",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg, index) => (
          <p
            key={index}
            dangerouslySetInnerHTML={{ __html: msg }}
            style={{ marginBottom: 8, wordBreak: "break-word" }}
          />
        ))}
      </div>
        <div
          onClick={handleTopRightClick}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 50,
            height: 50,
            cursor: "pointer",
            // backgroundColor: "rgba(0,0,255,0.2)" 
          }}
        />
    </div>
    
  );
}

export default maintain;
