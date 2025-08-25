"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "../../constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Mobilenav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Menu
            width={36}
            height={36}
            className="text-gray-300 cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-stone-950 ">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              width={32}
              height={32}
              className="max-sm:size-10"
              alt="logo"
            />
            <p className="text-[26px] ml-2 font-extrabold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              VibeCall
            </p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between items-center overflow-y-auto">
            <section className="flex h-full flex-col gap-6 pt-16 text-gray-50">
              {sidebarLinks.map((link) => {
                const isActive =
                  pathname === link.route
                return (
                  <SheetClose asChild key={link.route}>
                    <Link
                      href={link.route}
                      key={link.label}
                      className={cn(
                        "flex gap-4 items-center p-4 rounded-xl w-full max-w-60  font-semibold",
                        { "bg-gray-600": isActive }
                      )}
                    >
                      <Image
                        src={link.imageUrl}
                        alt={link.label}
                        height={20}
                        width={20}
                      />
                      <p className="font-semibold text-base">{link.label}</p>
                    </Link>
                  </SheetClose>
                );
              })}
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default Mobilenav;
