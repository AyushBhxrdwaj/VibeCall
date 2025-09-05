//@ts-nocheck
"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { toast } from "sonner";
const CallList = ({ type }: { type: "ended" | "upcoming" | "recording" }) => {
  const { endedCalls, upcomingCalls, recordingCalls, isloading } =
    useGetCalls();
  const isLoading = isloading;
  const router = useRouter();

  const [recordings, setRecordings] = useState<CallRecording[]>([]);

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

  useEffect(() => {
    if (type !== "recording") return;
    const fetchRecordings = async () => {
      try {
        const results = await Promise.all(
          recordingCalls.map((meeting) => meeting.queryRecordings())
        );
        const recordings = results.filter(call=>call.recordings.length>0).flatMap(call=>call.recordings)
        setRecordings(recordings);
      } catch (err) {
        toast('Try again later')
        console.error("Failed to fetch recordings", err);
      }
    };
    fetchRecordings();
  }, [type, recordingCalls]);

  if (isLoading) return <Loader />;

  const calls = getCalls();
  const noCallsMsg = getNoCallsMsg();
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => {
          const call = meeting as Call;
          const isRecordingTab = type === "recording";
          return (
            <MeetingCard
              key={(meeting as Call).id}
              icon={
                type == "ended"
                  ? "/icons/previous.svg"
                  : type === "upcoming"
                  ? "/icons/upcoming.svg"
                  : "/icons/recordings.svg"
              }
              title={(meeting as Call).state?.custom?.description||(meeting as CallRecording).filename?.substring(0,20)||"No description"}
              date={ (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()}
              isPreviousMeeting={type === "ended"}
              buttonIcon1={isRecordingTab ? "/icons/play.svg" : undefined}
              handleClick={
                isRecordingTab
                ?()=>router.push(`${(meeting as CallRecording).url}`):
                ()=>router.push(`/meeting/${(meeting as Call).id}`)
              }
              link={type==='recording'?(meeting as CallRecording).url:`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`}
              buttonText={isRecordingTab ? "Play" : "Start"}
            />
          );
        })
      ) : (
        <h1>{noCallsMsg}</h1>
      )}
    </div>
  );
};

export default CallList;
