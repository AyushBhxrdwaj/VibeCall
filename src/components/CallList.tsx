"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MeetingCard from "./MeetingCard";
const CallList = ({ type }: { type: "ended" | "upcoming" | "recording" }) => {
  const { endedCalls, upcomingCalls, recordingCalls, isLoading } =
    useGetCalls();
  const router = useRouter();

  const [recordings, setrecordings] = useState<CallRecording[]>([]);

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
            icon=''
            title=''
            date=''
            isPreviousMeeting=''
            buttonIcon1=''
            handleClick=''
            link=''
            buttonText=''
          />
        ))
      ) : (
        <h1>{noCallsMsg}</h1>
      )}
    </div>
  );
};

export default CallList;
