"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingDialog from "./MeetingDialog";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import {toast} from 'sonner'

const MeetingList = () => {
  const router = useRouter();
  const [meetingState, setmeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const [values, setvalues] = useState({
    datetime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setcallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!user || !client) return;
    try {
      if (!values.datetime) {
        toast("Please select a valid date and time");
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Call not found");
      const startAt =
        values.datetime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Description";

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });
      setcallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast("Meeting created successfully");
    } catch (error) {
      console.log(error);
      toast('Failed to create Meeting')
    }
  };
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New meeting"
        description="Start an instant meeting"
        handleClick={() => setmeetingState("isInstantMeeting")}
        className="bg-[#881b1d]"
      />

      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule meeting"
        description="Schedule a meeting"
        handleClick={() => setmeetingState("isScheduleMeeting")}
        className="bg-[#365237]"
      />

      <HomeCard
        img="/icons/recordings.svg"
        title="Recordings"
        description="View your recordings"
        handleClick={() => router.push("/recordings")}
        className="bg-[#3c0209]"
      />

      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join meeting"
        description="Join an instant meeting via link"
        handleClick={() => setmeetingState("isJoiningMeeting")}
        className="bg-[#392200]"
      />

      <MeetingDialog
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setmeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingList;
