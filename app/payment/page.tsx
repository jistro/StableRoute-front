'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

export default function PaymentPage() {
  return (
    <div 
      className="relative flex min-h-screen w-full flex-col overflow-hidden p-4 sm:p-8"
      style={{
        background: "linear-gradient(180deg, rgba(235, 237, 242, 0.00) 0%, #EBEDF2 50%), linear-gradient(90deg, rgba(255, 234, 0, 0.30) 0%, rgba(0, 170, 255, 0.30) 100%), #FFF"
      }}
    >
      <div className="relative mx-auto flex w-full max-w-[480px] flex-col gap-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/stable">
            <Button variant="ghost" size="icon" className="rounded-full bg-white/50 p-4">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-[32px] font-normal font-['PT_Serif']">New Payment</h1>
        </div>

        {/* Sender Verification */}
        <div className="flex flex-col gap-4 rounded-[28px] bg-white/50 p-6 backdrop-blur-[2px]">
          <h2 className="text-[24px] font-normal font-['PT_Serif'] text-[#17181A]">Sender country verification</h2>
          <Select>
            <SelectTrigger className="flex h-[56px] items-center justify-start gap-2 rounded-[28px] border border-[#17181A1A] bg-white px-6">
              <span className="text-base">🌍</span>
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            className="flex h-[56px] items-center justify-center gap-[10px] rounded-[28px] border border-[#0055FF] bg-[#0055FF] px-6 py-4 transition-colors hover:border-[#0055FF] hover:bg-[#4986FF] active:bg-[#0042C6]"
          >
            <span className="flex-[1_0_0] text-center font-['Inter'] text-base font-normal leading-[150%] text-white">
              Verify with Self
            </span>
          </Button>
          <p className="text-center text-sm text-gray-600">Scan your NFC-enabled Passport or EU-issued IDs</p>
        </div>

        {/* Receiver Information */}
        <div className="flex flex-col gap-4 rounded-[28px] bg-white/50 p-6 backdrop-blur-[2px]">
          <h2 className="text-[24px] font-normal font-['PT_Serif'] text-[#17181A]">Receiver information</h2>
          <Select>
            <SelectTrigger className="flex h-[56px] items-center justify-start gap-2 rounded-[28px] border border-[#17181A1A] bg-white px-6">
              <span className="text-base">💎</span>
              <SelectValue placeholder="Company ENS Domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="company1">Company 1</SelectItem>
              <SelectItem value="company2">Company 2</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="flex h-[56px] items-center justify-start gap-2 rounded-[28px] border border-[#17181A1A] bg-white px-6">
              <span className="text-base">💎</span>
              <SelectValue placeholder="Employee ENS name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employee1">Employee 1</SelectItem>
              <SelectItem value="employee2">Employee 2</SelectItem>
            </SelectContent>
          </Select>
          <Input 
            placeholder="First and second names"
            className="h-[56px] rounded-[28px] border border-[#17181A1A] bg-white px-6"
          />
          <Select>
            <SelectTrigger className="flex h-[56px] items-center justify-start gap-2 rounded-[28px] border border-[#17181A1A] bg-white px-6">
              <span className="text-base">🌍</span>
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-4 rounded-[28px] bg-white/50 p-6 backdrop-blur-[2px]">
          <div className="flex items-center justify-between">
            <h2 className="text-[24px] font-normal font-['PT_Serif'] text-[#17181A]">Amount</h2>
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600">Max.</span>
              <span className="text-sm">500</span>
            </div>
          </div>
          <Input 
            placeholder="Enter amount"
            className="h-[56px] rounded-[28px] border border-[#17181A1A] bg-white px-6"
          />
        </div>

        {/* Send Button */}
        <Button
          asChild
          className="flex h-[56px] items-center justify-center gap-[10px] rounded-[28px] border border-[#0055FF] bg-[#0055FF] px-6 py-4 transition-colors hover:border-[#0055FF] hover:bg-[#4986FF] active:bg-[#0042C6]"
        >
          <Link href="/stable">
            <span className="flex-[1_0_0] text-center font-['Inter'] text-base font-normal leading-[150%] text-white">
              Send
            </span>
          </Link>
        </Button>
      </div>
    </div>
  )
} 