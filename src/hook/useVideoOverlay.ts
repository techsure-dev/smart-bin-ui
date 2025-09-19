import { useRef, useState, useEffect } from "react";

export const useVideoOverlay = (timeoutMs = 10000) => {
  const [showVideoOverlay, setShowVideoOverlay] = useState(false); // start hidden
  const overlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const firstTimeRef = useRef(true); // track first-time display

  const startOverlayTimeout = () => {
    if (overlayTimeoutRef.current) clearTimeout(overlayTimeoutRef.current);
    overlayTimeoutRef.current = setTimeout(() => {
      setShowVideoOverlay(true); // show overlay again after timeout
    }, timeoutMs);
  };

  const showOverlay = () => {
    setShowVideoOverlay(true);
    if (!firstTimeRef.current) startOverlayTimeout(); // timeout only after first display
  };

  const hideOverlay = () => {
    setShowVideoOverlay(false);
    firstTimeRef.current = false; // first-time is now done
    startOverlayTimeout();
  };

  // Play first overlay immediately on mount
  useEffect(() => {
    showOverlay();
    return () => {
      if (overlayTimeoutRef.current) clearTimeout(overlayTimeoutRef.current);
    };
  }, []);

  return { showVideoOverlay, hideOverlay, startOverlayTimeout };
};
