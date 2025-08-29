import { cn } from '@/lib/utils'
import { Call, CallParticipantsList, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

const MeetingRoom = () => {
    type Layout='grid'|'speaker-left'|'speaker-right'
    const [layout, setlayout] = useState('speaker-left')
    const [showParticipants, setshowParticipants] = useState(false)
    const Call_Layout=()=>{
        switch(layout){
            case 'grid':
                return <PaginatedGridLayout/>
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition={'right'}/>
            default:
                return <SpeakerLayout participantsBarPosition={'left'}/>
            
        }
    }
  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
        <div className='relative flex size-full items-center justify-center'>
            <div className='flex size-full max-w-[1000px] items-center '>
                <Call_Layout/>

            </div>
            <div className={cn('h-[calc(100vh-86px)] hidden ml-2', {'show-block':showParticipants})}>
                <CallParticipantsList/>
            </div>
        </div>
    </section>
  )
}

export default MeetingRoom