import MeetingList from "@/components/MeetingList";
import React from "react";

const Home = () => {
  const currentDate=new Date()
  const time=currentDate.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});
  const day=new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(currentDate);
  return (
    <section className="flex size-full flex-col gap-10 text-white ">
      <div className="h-[250px] w-full rounded-[20px] bg-hero">
        <div className="flex h-full flex-col justify-between max-md:px-5 max:md:py-8 lg:p-11">
          <h2 className="backdrop-blur-md mb-3 bg-black/30 py-4 px-3 rounded-md max-w-[300px] text-base font-mono">
            Upcoming Meeting at 12:00 AM
          </h2>
          <div className="flex flex-col gap-2 ">
            <h1 className="text-4xl font-extrabold lg:text-7xl text-gray-300">{time}</h1>
            <p className="text-lg font-medium lg:text-2xl text-blue-200">{day}</p>

          </div>

        </div>
      </div>
      <MeetingList/>
    </section>
  );
};

export default Home;
