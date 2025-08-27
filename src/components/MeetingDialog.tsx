import React from "react";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type MeetingDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  buttonText?: string;
  handleClick: () => void;
  image:string
  buttonIcon:string
};

const MeetingDialog = ({
  isOpen,
  onClose,
  image,
  title,
  className,
  buttonText,
  buttonIcon,
  handleClick,
}: MeetingDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" flex w-full max-w-[520px] flex-col gap-6 border-none bg-stone-800 px-6 py-9 text-white ">
        <div className="flex flex-col gap-6">
            {image&&(
                <div className="flex justify-center ">
                    <Image src={image} alt="image" height={72} width={72}/>

                </div>
            )}
            <h1 className={cn('text-3xl font-bold leading-[42px] ',className)}>{title}</h1>

            <Button className="focus-visible:ring-0 focus-visible:ring-offset-0" variant='default' onClick={handleClick}>
                {buttonIcon&&(
                    <Image src={buttonIcon} alt="buttonimage" height={13} width={13}/>
                )}&nbsp;
                {buttonText||'Schedule meeting'}
                </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingDialog;
