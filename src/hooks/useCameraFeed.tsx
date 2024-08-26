// hooks/useCameraFeed.ts
import { useEffect, useRef, useState } from 'react';

export function useCameraFeed() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [preferFrontCamera, setPreferFrontCamera] = useState(false);
  const [deviceslabel, setDevicesLabel] = useState<string[]>([]);

  const refVd = videoRef.current;

  useEffect(() => {
    async function getCameraFeed() {
      try {

        let selectedDeviceId: string | undefined;

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        console.log(devices)

        if(devices){
            setDevicesLabel(devices.map(device => {
                if(device.kind === 'videoinput'){
                    return device.label
                }else{
                    return 'nopes'
                }
            }))
        }
        
        if (videoDevices.length > 0) {
          selectedDeviceId = videoDevices.find(device =>
            preferFrontCamera ? device.label.toLowerCase().includes('front') : device.label.toLowerCase().includes('back')
          )?.deviceId;

          if (!selectedDeviceId) {
            selectedDeviceId = videoDevices[0].deviceId;
          }
        }
        
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('Unable to access camera');
      }
    }

    getCameraFeed();

    return () => {
      if (refVd && refVd.srcObject) {
        const tracks = (refVd!.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [refVd, preferFrontCamera]);

  return { videoRef, error,deviceslabel };
}
