'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingDialog from './MeetingDialog'

const MeetingList = () => {
    const router=useRouter()
    const [meetingState, setmeetingState] = useState<'isScheduleMeeting'|'isJoiningMeeting'|'isInstantMeeting'|undefined>()

    const createMeeting=()=>{}
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
        <HomeCard img='/icons/add-meeting.svg' title="New meeting" description="Start an instant meeting" handleClick={()=>setmeetingState('isInstantMeeting')} className='bg-[#881b1d]'/>
        
        <HomeCard img='/icons/schedule.svg' title="Schedule meeting" description="Schedule a meeting" handleClick={()=>setmeetingState('isScheduleMeeting')} className='bg-[#365237]'/>

        <HomeCard img='/icons/recordings.svg' title="Recordings" description="View your recordings" handleClick={()=>router.push('/recordings')}  className='bg-[#3c0209]'/>

        <HomeCard img='/icons/join-meeting.svg' title="Join meeting" description="Join an instant meeting via link" handleClick={()=>setmeetingState('isJoiningMeeting')} className='bg-[#392200]'/>

        <MeetingDialog
          isOpen={meetingState==='isInstantMeeting'}
          onClose={() => setmeetingState(undefined)}
          title="Start an instant meeting"
          className='text-center'
          buttonText="Start Meeting"
          handleClick={createMeeting}
        />
       
    </section>
  )
}

export default MeetingList