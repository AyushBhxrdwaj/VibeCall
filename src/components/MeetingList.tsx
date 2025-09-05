"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingDialog from "./MeetingDialog";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import DatePicker from "react-datepicker";
import { Input } from "./ui/input";

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
      toast("Failed to create Meeting");
    }
  };

  const meetingLink=`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
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

      {!callDetails ? (
        <MeetingDialog
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setmeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-3 ">
            <label className="text-base text-normal leading-[22px] text-gray-300 ">
              Add a Description
            </label>
            <Textarea
              className="border-none bg-stone-600 focus-visible:ring-offset-0 focus-visible:ring-0"
              onChange={(e) =>
                setvalues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col w-full gap-2.5">
            <label className="text-base text-normal leading-[22px] text-gray-300 ">
              Select Date and Time
            </label>
            <DatePicker
              selected={values.datetime}
              onChange={(date) => setvalues({ ...values, datetime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-stone-700 p-2 focus:outline-none text-white"
              timeCaption="Time"
              minDate={new Date()}
            />
          </div>
        </MeetingDialog>
      ) : (
        <MeetingDialog
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setmeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            toast('Link Copied')
            navigator.clipboard.writeText(meetingLink)
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Link"
        />
      )}

      <MeetingDialog
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setmeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
      <MeetingDialog
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setmeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Join meeting"
        handleClick={()=>router.push(values.link)}
      >
        <Input placeholder="Meeting Link" className="border-none bg-stone-700 focus-visible:ring-0 focus-visible:ring-offset-0" onChange={(e)=>setvalues({...values,link:e.target.value})}/>
      </MeetingDialog>
    </section>
  );
};

export default MeetingList;
