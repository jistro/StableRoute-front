"use client"

import type { SVGProps } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { GlobeDisplay } from "@/components/globe-display"
import { ChevronDown, Info, ArrowRight, Loader } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Define a type for our transactions
type Transaction = {
  id: number
  status: "pending" | "completed"
  amount: string
  recipient: string
  flag: string
  date: string
  receivedDate?: string
  remaining?: string
  progress?: number
  path: [string, string]
}

const transactionsData: Transaction[] = [
  {
    id: 1,
    status: "pending",
    amount: "500 USDC",
    recipient: "antoni.plproject.eth",
    flag: "🇵🇱",
    date: "Sent Jul 3 2025.",
    remaining: "Remain 4d 17h 34m",
    progress: 60,
    path: ["usa_east", "poland"],
  },
  {
    id: 2,
    status: "completed",
    amount: "500 USDC",
    recipient: "antoni.plproject.eth",
    flag: "🇵🇱",
    date: "Sent Jul 1 2025.",
    receivedDate: "Received Jul 4 2025.",
    path: ["usa_east", "poland"],
  },
  {
    id: 3,
    status: "completed",
    amount: "500 USDC",
    recipient: "louis.lvproject.eth",
    flag: "🇫🇷",
    date: "Jul 4 2025",
    path: ["usa_east", "france"],
  },
]

export default function StableDashboardPage() {
  const [activeTransaction, setActiveTransaction] = useState<Transaction | null>(transactionsData[0])

  return (
    <div 
      className="relative flex min-h-screen w-full flex-col overflow-hidden p-4 sm:p-8"
      style={{
        background: "linear-gradient(180deg, rgba(235, 237, 242, 0.00) 0%, #EBEDF2 50%), linear-gradient(90deg, rgba(255, 234, 0, 0.30) 0%, rgba(0, 170, 255, 0.30) 100%), #FFF"
      }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1000px]">
        <header className="flex items-center justify-between">
          <h1 className="font-serif text-2xl text-gray-800 sm:text-3xl">StableRoute</h1>
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center justify-center gap-1 rounded-[28px] border border-white bg-white/50 pl-6 pr-4 py-4 backdrop-blur-[2px]">
              <span>mateo.company.eth</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </header>

        <main className="mt-8 grid flex-1 grid-cols-1 items-start gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="mb-8">
              <Card className="rounded-[28px] border border-white bg-white/50">
                <CardContent className="flex flex-col items-start gap-6 p-6 self-stretch">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-2xl font-serif">Your Cash</span>
                    <span className="text-3xl font-serif">500 USD</span>
                  </div>
                  <div className="flex gap-2 w-full">
                    <span className="inline-flex items-center justify-end gap-1 pl-2 pr-1.5 rounded-xl bg-[rgba(23,24,26,0.05)]">300 USDC <span className='ml-1'>🪙</span></span>
                    <span className="inline-flex items-center justify-end gap-1 pl-2 pr-1.5 rounded-xl bg-[rgba(23,24,26,0.05)]">100 USDC <span className='ml-1'>🟣</span></span>
                    <span className="inline-flex items-center justify-end gap-1 pl-2 pr-1.5 rounded-xl bg-[rgba(23,24,26,0.05)]">100 USDC <span className='ml-1'>🔵</span></span>
                  </div>
                  <Button
                    asChild
                    className="flex h-[56px] w-[432px] items-center justify-center gap-[10px] rounded-[28px] border border-[#002B80] bg-[#0055FF] px-6 py-4 hover:bg-[#4986FF]"
                  >
                    <Link href="/payment">
                      <span className="flex-[1_0_0] text-center font-['Inter'] text-base font-normal leading-[150%] text-white">
                        Make a Payment
                      </span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-6">
                <h2 className="text-[#17181A] font-['PT_Serif'] text-2xl font-normal leading-[150%]">Transaction History</h2>
                <div className="flex flex-col gap-1">
                  {transactionsData.map((tx) => (
                    <Card
                      key={tx.id}
                      className="flex h-[104px] items-center gap-4 rounded-[28px] border border-white bg-white/50 p-6"
                      onClick={() => setActiveTransaction(tx.id === activeTransaction?.id ? null : tx)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center gap-2.5 rounded-[28px] border border-[rgba(23,24,26,0.10)] bg-white">
                          <ArrowRight className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 font-medium text-gray-800">
                            {tx.amount} <UsdcIcon className="h-5 w-5" /> <ArrowRight className="h-4 w-4 text-gray-400" />{" "}
                            {tx.recipient} {tx.flag}
                          </div>
                          <p className="text-sm text-gray-500">
                            {tx.date} {tx.receivedDate}
                          </p>
                          {activeTransaction?.id === tx.id && tx.status === "pending" && tx.remaining && (
                            <div className="mt-1 flex items-center gap-2">
                              <p className="text-sm font-medium text-gray-600">{tx.remaining}</p>
                              <Progress
                                value={tx.progress}
                                className="h-2 flex-1 [&>*]:bg-gradient-to-r [&>*]:from-blue-500 [&>*]:to-purple-500"
                              />
                            </div>
                          )}
                        </div>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-gray-400">
                          <Info className="h-5 w-5" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="sticky top-8 hidden lg:block">
            <GlobeDisplay activePath={activeTransaction?.path} />
          </div>
        </main>
      </div>
    </div>
  )
}

function UsdcIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="10" fill="#2775CA" />
      <path
        d="M12.39 8.08008H9.83997V9.51008H12.1C12.58 9.51008 12.82 9.68008 12.82 10.1801V10.4401C12.82 10.9501 12.54 11.1101 12.01 11.1101H9.83997V12.5801H12.12C12.6 12.5801 12.84 12.7501 12.84 13.2501V13.5101C12.84 14.0201 12.56 14.1801 12.03 14.1801H9.83997V15.6101H12.39C13.81 15.6101 14.5 14.9201 14.5 13.5101V13.2501C14.5 12.5001 14.19 12.0301 13.43 11.8401C14.21 11.6301 14.5 11.1501 14.5 10.4401V10.1801C14.5 8.77008 13.81 8.08008 12.39 8.08008Z"
        fill="white"
      />
    </svg>
  )
}
