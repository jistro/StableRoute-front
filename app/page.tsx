"use client"

import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Link from "next/link"
import Image from "next/image"

export default function StableRoutePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-yellow-50 via-lime-50 to-cyan-100">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/pattern.png)`,
          backgroundRepeat: "repeat",
          backgroundSize: "10rem",
          opacity: 0.4,
        }}
      />
      <div className="relative z-10 flex flex-col items-center space-y-8">
        <h1 className="text-[#17181A] text-center font-['PT_Serif'] text-[48px] font-normal leading-[150%] tracking-[-1.44px]">
          <Image
            src="/stableroute-black.png"
            alt="StableRoute Logo"
            width={340}
            height={55}
            className="inline-block"
            priority
          />
        </h1>
        <ToggleGroup 
          type="single" 
          defaultValue="sender" 
          className="flex h-[56px] w-[300px] items-start gap-[2px] rounded-[28px] border border-[rgba(23,24,26,0.05)] bg-[rgba(23,24,26,0.05)] p-[2px] backdrop-blur-[2px]"
        >
          <ToggleGroupItem
            value="sender"
            className="flex flex-[1_0_0] items-center justify-center gap-[10px] rounded-[26px] border border-white bg-white/75 p-3 data-[state=off]:border-transparent data-[state=off]:bg-transparent"
          >
            Sender
          </ToggleGroupItem>
          <ToggleGroupItem
            value="receiver"
            className="flex flex-[1_0_0] items-center justify-center gap-[10px] rounded-[26px] border border-white bg-white/75 p-3 data-[state=off]:border-transparent data-[state=off]:bg-transparent"
          >
            Receiver
          </ToggleGroupItem>
        </ToggleGroup>
        <Link href="/stable">
          <Button
            className="flex h-[56px] w-[300px] items-center justify-center gap-[10px] rounded-[28px] border border-[#002B80] bg-[#0055FF] px-6 py-4 active:bg-[#0042C6] hover:bg-[#4986FF]"
          >
            <span className="flex-[1_0_0] text-center font-['Inter'] text-base font-normal leading-[150%] text-white">
              Go to app
            </span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
