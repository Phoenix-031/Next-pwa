'use client';

import InstallPWAButton from '@/components/DownloadPWA/DownloadButton'
import { useCameraCount } from '@/hooks/useCameraCount'
import { useCameraFeed } from '@/hooks/useCameraFeed';
import React from 'react'

const Home = () => {

  const cameraCount = useCameraCount();
  const {videoRef, error, deviceslabel} = useCameraFeed();
  
  return (
      <div>
        <InstallPWAButton />
        <div>the number of camera devices availble are as follows</div>
        <p>{cameraCount}</p>

        <div>
          <p>Camera devices</p>
          <ul>
            {deviceslabel.map((device, index) => (
              <li key={index}>{device}</li>
            ))}
          </ul>
        </div>

        <div>
          <p>Camera feed</p>

        <div>
          {error ? (
            <p>{error}</p>
          ) : (
            <div style={{ width: '100%', height: 'auto', overflow: 'hidden' }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          )}
        </div>

          
        </div>
        
      </div>
  )
}

export default Home