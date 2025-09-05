'use client'
import { Button } from '@/components/ui/button'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'


const Table=({title,desc}:{title:string,desc:string})=>(
  <div className='flex flex-col items-start gap-2 xl:flex-row'>
    <h1 className='text-base font-medium text-gray-300 lg:text-xl xl:min-w-32'>{title}:</h1>
    <h1 className='truncate flex-sm font-bold max-sm:max-w-[320px] lg:text-xl'>{desc}</h1>
  </div>
)
const Room = () => {
  const {user}=useUser()
  const router = useRouter()
  const meetingId=user?.id
  const {call}=useGetCallById(meetingId!)
  const client=useStreamVideoClient();
  if(!user || !client) return

  
  const startRoom=async()=>{
    const newCall=client.call('default',meetingId!)
    if(!call){

      await newCall.getOrCreate({
          data: {
            starts_at: new Date().toISOString()
          },
        });
    }
    router.push(`/meeting/${meetingId}?personal=true`)

  }
  return (
     <section className='flex size-full flex-col gap-10 text-white '>
      <h1 className='text-3xl font-bold '>Personal Room</h1>
      <div className='flex flex-col w-full gap-8 xl:max-w-[900px]'>
        <Table title='Topic' desc={`${user?.firstName}'s Room`}/>
        <Table title='Meeting ID' desc={meetingId!}/>
        <Table title='Invite Link' desc={`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`}/>
      </div>
      <div className='flex gap-5 '>
        <Button className='hover:bg-blue-800' onClick={startRoom}>Start Meeting</Button>
        <Button className='hover:bg-blue-800' onClick={()=>{navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`); toast('Link is copied')}}>Copy Invitation</Button>
      </div>

    </section>
  )
}

export default Room