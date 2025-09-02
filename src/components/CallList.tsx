//@ts-nocheck
"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
const CallList = ({ type }: { type: "ended" | "upcoming" | "recording" }) => {
  const { endedCalls, upcomingCalls, recordingCalls, isLoading } =
    useGetCalls();
  const router = useRouter();
  
  const [recordings, setrecordings] = useState<CallRecording[]>([]);
  if(isLoading) return <Loader/>

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "upcoming":
        return upcomingCalls;

      case "recording":
        return recordings;

      default:
        return [];
    }
  };
  const getNoCallsMsg = () => {
    switch (type) {
      case "ended":
        return "No ended calls";
      case "upcoming":
        return "No upcoming calls";
      case "recording":
        return "No recording calls";
      default:
        return "";
    }
  };

  const calls = getCalls();
  const noCallsMsg = getNoCallsMsg();
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type=='ended'?'/icons/previous.svg':
              type==='upcoming'?'/icons/upcoming.svg':
              '/icons/recording.svg'
            }
            title={meeting.state.custom.description.substring(0,20)||'No description'}
            date={meeting.state.startsAt.toLocaleString()||meeting.start_time.toLocaleString()}
            isPreviousMeeting={type==='ended'}
            buttonIcon1={type==='recordings'?'/icons/play.svg':undefined}
            handleClick={type==='recordings'?()=>router.push(`${meeting.url}`):()=>router.push(`/meeting/${meeting.id}`)}
            link={type==='recordings'?meeting.url:`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`}
            buttonText={type==='recordings'?'Play':'Start'}
          />
        ))
      ) : (
        <h1>{noCallsMsg}</h1>
      )}
    </div>
  );
};

export default CallList;
