'use client'
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({setisSetupComplete}:{setisSetupComplete:(value:boolean)=>void}) => {
    const [isMicCamToggeledOn, setisMicCamToggeledOn] = useState(false)
    const call=useCall()

    if(!call) throw new Error("Call not found")

    useEffect(() => {
        if(isMicCamToggeledOn){
            call?.camera.disable()
            call?.microphone.disable()
        }else{
            call?.camera.enable()
            call?.microphone.enable()
        }
      
    }, [isMicCamToggeledOn,call?.camera,call?.microphone])
    
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
        <h1 className='text-2xl font-bold'>Meeting Setup</h1>
        <VideoPreview/>
        <div className='h-16 items-center justify-center gap-3 '>
            <label className='flex justify-center items-center gap-2 font-medium'>
                <input type="checkbox" checked={isMicCamToggeledOn} onChange={(e)=>setisMicCamToggeledOn(e.target.checked)} />
                Join witout Mic and Camera 
            </label>
            <DeviceSettings/>
        </div>
        <Button className='rounded-md bg-gray-300' variant="secondary" onClick={()=>{
            call.join()
            setisSetupComplete(true)}}>Join Meeting</Button>

    </div>
  )
}

export default MeetingSetup