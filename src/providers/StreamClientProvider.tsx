'use client'
import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import {
  StreamVideo,
  StreamVideoClient,

} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const StreamVideoProvider = ({children}:{children:React.ReactNode}) => {

    const [videoClient, setvideoClient] = useState<StreamVideoClient>()
    
    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
    const {user,isLoaded}=useUser()

    useEffect(() => {
        if(!isLoaded || !user) return;
        if(!apiKey) throw new Error("Missing API key")

        const client = new StreamVideoClient({
            apiKey,
            user:{
                id:user?.id,
                name:user?.username||user?.id,
                image:user?.imageUrl


            },
            tokenProvider
        })
        setvideoClient(client)
    }, [user,isLoaded,apiKey])

    if(!videoClient) return (
        <Loader/>
    )
    
    
  return (
    <StreamVideo client={videoClient}>
        {children}
    </StreamVideo>
  );
};