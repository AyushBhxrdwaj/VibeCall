import Image from "next/image";
import Link from "next/link";
import React from "react";
import Mobilenav from "./Mobilenav";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center fixed z-50 w-full bg-stone-900 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          className="max-sm:size-10"
          alt="logo"
        />
        <p className="text-[26px] ml-2 font-extrabold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent max-sm:hidden">
          VibeCall
        </p>
      </Link>
      <div className="flex justify-between items-center gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        {/* <SignedOut>
          <SignInButton />
        </SignedOut> */}

        <Mobilenav />
      </div>
    </nav>
  );
};

export default Navbar;
