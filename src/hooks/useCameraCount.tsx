// hooks/useCameraCount.js
import { useState, useEffect } from 'react';

export function useCameraCount() {
  const [cameraCount, setCameraCount] = useState(0);

  useEffect(() => {
    async function getCameraCount() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputDevices = devices.filter(device => device.kind === 'videoinput');
        setCameraCount(videoInputDevices.length);
      } catch (error) {
        console.error('Error accessing media devices:', error);
        setCameraCount(0);
      }
    }

    getCameraCount();
  }, []);

  return cameraCount;
}
