import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import 'react-datepicker/dist/react-datepicker.css'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VibeCall",
  description: "Created by Ayush Bhardwaj",
  icons: {
    icon: [
      {
        url: "/icons/logo.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/icons/logo.svg",
    apple: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorText: "#fff",
          colorBackground: "#1c1f2e",
          colorInputBackground: "#252a41",
          colorInputText: "#fff",
          colorPrimary: "#3b82f6",
          colorDanger: "#fff",
          colorSuccess: "#fff",
          colorWarning: "#fff",
          colorNeutral: "#fff",
        },
        elements: {
          formButtonPrimary: {
            backgroundColor: "#3b82f6",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#2563eb",
            },
          },
          footerActionLink: {
            color: "#fff",
          },
          formFieldLabel: {
            color: "#fff",
          },
          userButtonPopoverCard: {
            backgroundColor: "#1c1f2e",
          },
          userButtonPopoverActionButton: {
            color: "#fff",
            "&:hover": {
              backgroundColor: "#252a41",
            },
          },
          userButtonPopoverActionButtonText: {
            color: "#fff",
          },
        },
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-950`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
