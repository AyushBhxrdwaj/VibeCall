import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCalls=()=>{
    const [Calls,setCalls]=useState<Call[]>([])
    const [isloading, setisloading] = useState(false)
    const client = useStreamVideoClient();
    const {user}=useUser();

    useEffect(()=>{
        const fetchCalls=async ()=>{
            if(!client||!user?.id) return 
            setisloading(true)
            try {
                const {calls}=await client.queryCalls({
                    sort:[
                        {field:'starts_at',direction:-1}
                    ],
                    filter_conditions:{
                        start_at:{$exists:true},
                        $or:[
                            {created_by_user_id:user.id},
                            {members:{$in:[user.id]}},
                        ]
                    }
                });
                setCalls(calls)
                
            } catch (error) {
                console.log(error)
                
            }finally{
                setisloading(false)
            }
    }
    fetchCalls()

    },[client,user?.id])

    const now=new Date();

    const endedCalls= Calls.filter(({state:{startsAt,endedAt}}:Call)=>{
        return(startsAt&&new Date(startsAt)<now || !!endedAt)
    })
    const upcomingCalls=Calls.filter(({state:{startsAt,endedAt}}:Call)=>{
        return(startsAt&& new Date(startsAt)>now)
    });

    return {endedCalls,upcomingCalls,recordingCalls:Calls,isloading}


}