import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
type HomeCardProps = {
  className: string;
  img: string;
  title: string;
  description: string;
  handleClick: () => void;
};

const HomeCard = ({
  className,
  img,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <div
      className={cn(
        "px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] cursor-pointer rounded-lg min-h-[260px]",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex justify-center item-center bg-white/40 size-12 rounded-sm">
        <Image
          src={img}
          alt={title}
          width={24}
          height={24}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-medium">{title}</h1>
        <p className="text-base font-semibold">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
