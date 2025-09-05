'use client'
import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

const MeetingRoom = () => {
  type Layout = "grid" | "speaker-left" | "speaker-right";

  const searchParams = useSearchParams();
  const [layout, setlayout] = useState<Layout>("speaker-left");
  const [showParticipants, setshowParticipants] = useState(false);
  const isPersonalRoom = !!searchParams.get("personal");
  const Call_Layout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"right"} />;
      default:
        return <SpeakerLayout participantsBarPosition={"left"} />;
    }
  };
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const router=useRouter()
  const call=useCall()

  if(callingState!==CallingState.JOINED) return <Loader/>

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center ">
          <Call_Layout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            block: showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setshowParticipants(false)} />
        </div>
      </div>

      <div className="fixed bottom-0  flex w-full  items-center justify-center gap-5 flex-wrap">
        <CallControls onLeave={()=>{router.push('/'); call?.camera?.disable(); call?.microphone.disable()}} />

        <DropdownMenu>
          <div className="">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-gray-800 px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-black bg-stone-900 text-white">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, idx) => (
              <div key={idx}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    setlayout(item.toLowerCase() as Layout);
                  }}
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-stone-900" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setshowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-gray-800 px-4 py-2 hover:bg-[#4c535b]">
            <Users size={16} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
