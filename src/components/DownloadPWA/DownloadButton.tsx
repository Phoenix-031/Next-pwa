'use client'

import React, { useEffect, useState } from 'react'

const InstallPWAButton = () => {

  const  [prompt, setPrompt] = useState('')

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e:any) => {
        e.preventDefault()

        setPrompt(e)

        if(!window.matchMedia('(display-mode: standalone)').matches) {
            console.log('The app is not installed')
        }
    })
  }, [])
    
  return (
    <div className='border-1 border-red-600 w-screen h-[30rem] flex justify-center items-center'>
        <button className='p-[1rem]' onClick={handleClick}>
            Install App
        </button>
    </div>
  )

  function handleClick() {
    if(prompt) {
        prompt.prompt()
    }
  }
}

export default InstallPWAButton