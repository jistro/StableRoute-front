"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { config } from "@/config";
import ethereumAddresses from "@/variables/ethereumAddresses.json";
import VaucherABI from "@/variables/VoucherABI.json";
import { writeContract } from "wagmi/actions";


export default function PaymentPage() {
   const [country, setCountry] = React.useState<string | null>(null);
   const [paymentID, setPaymentID] = React.useState<string | null>(null);
   

  function makePayment() {
    const fullName = (document.getElementById("payment_fullNameInput") as HTMLInputElement)
      .value;
    const nationality = country;
    const addressRecipient = (document.getElementById("payment_paymentENSInput") as HTMLInputElement)
      .value;
    const amountTokens = (document.getElementById("payment_amountInput") as HTMLInputElement)
      .value;
    const parsedAmountTokens = Math.floor(parseFloat(amountTokens) * 10 ** 6);

    console.log("Full Name:", fullName);
    console.log("Nationality:", nationality);
    console.log("Address Recipient:", addressRecipient);
    console.log("Amount Tokens (parsed):", parsedAmountTokens);
    
    writeContract(config, {
      abi: VaucherABI,
      address: ethereumAddresses.voucher as `0x${string}`,
      functionName: "prepareVoucher",
      args: [fullName, nationality, addressRecipient, parsedAmountTokens],
    })
      .then((data: any) => {
        console.log(data);
        setPaymentID(data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

    React.useEffect(() => {
     if (paymentID) {
       alert(`Payment ID: ${paymentID}`);
     }
   }, [paymentID]);

  return (
    <div
      className="relative flex min-h-screen w-full flex-col overflow-hidden p-4 sm:p-8"
      style={{
        background:
          "linear-gradient(180deg, rgba(235, 237, 242, 0.00) 0%, #EBEDF2 50%), linear-gradient(90deg, rgba(255, 234, 0, 0.30) 0%, rgba(0, 170, 255, 0.30) 100%), #FFF",
      }}
    >
      <div className="relative mx-auto flex w-full max-w-[480px] flex-col gap-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/stable">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/50 p-4"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-[32px] font-normal font-['PT_Serif']">
            New Payment
          </h1>
        </div>

        {/* Receiver Information */}
        <div className="flex flex-col gap-4 rounded-[28px] bg-white/50 p-6 backdrop-blur-[2px]">
          <h2 className="text-[24px] font-normal font-['PT_Serif'] text-[#17181A]">
            Receiver information
          </h2>
          <Input
            placeholder="Enter receiver's company ENS"
            id="payment_paymentENSInput"
            className="h-[56px] rounded-[28px] border border-[#17181A1A] bg-white px-6"
          />

          <Input
            placeholder="First and second names"
            id="payment_fullNameInput"
            className="h-[56px] rounded-[28px] border border-[#17181A1A] bg-white px-6"
          />
          <Select value={country || ""} onValueChange={setCountry}>
            <SelectTrigger
              className="flex h-[56px] items-center justify-start gap-2 rounded-[28px] border border-[#17181A1A] bg-white px-6"
            >
              <SelectValue placeholder="🌍 Select receiver's country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">🇺🇸 United States</SelectItem>
              <SelectItem value="GB">🇬🇧 United Kingdom</SelectItem>
              <SelectItem value="CA">🇨🇦 Canada</SelectItem>
              <SelectItem value="DE">🇩🇪 Germany</SelectItem>
              <SelectItem value="FR">🇫🇷 France</SelectItem>
              <SelectItem value="ES">🇪🇸 Spain</SelectItem>
              <SelectItem value="IT">🇮🇹 Italy</SelectItem>
              <SelectItem value="JP">🇯🇵 Japan</SelectItem>
              <SelectItem value="BR">🇧🇷 Brazil</SelectItem>
              <SelectItem value="AU">🇦🇺 Australia</SelectItem>
              <SelectItem value="MX">🇲🇽 Mexico</SelectItem>
              <SelectItem value="IN">🇮🇳 India</SelectItem>
              <SelectItem value="CN">🇨🇳 China</SelectItem>
              <SelectItem value="KR">🇰🇷 South Korea</SelectItem>
              <SelectItem value="NL">🇳🇱 Netherlands</SelectItem>
              <SelectItem value="CH">🇨🇭 Switzerland</SelectItem>
              <SelectItem value="SE">🇸🇪 Sweden</SelectItem>
              <SelectItem value="NO">🇳🇴 Norway</SelectItem>
              <SelectItem value="DK">🇩🇰 Denmark</SelectItem>
              <SelectItem value="FI">🇫🇮 Finland</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-4 rounded-[28px] bg-white/50 p-6 backdrop-blur-[2px]">
          <div className="flex items-center justify-between">
            <h2 className="text-[24px] font-normal font-['PT_Serif'] text-[#17181A]">
              Amount
            </h2>
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600">Max.</span>
              <span className="text-sm">500</span>
            </div>
          </div>
          <Input
            placeholder="Enter amount"
            id="payment_amountInput"
            className="h-[56px] rounded-[28px] border border-[#17181A1A] bg-white px-6"
          />
        </div>

        <Button
          asChild
          className="flex h-[56px] items-center justify-center gap-[10px] rounded-[28px] border border-[#0055FF] bg-[#0055FF] px-6 py-4 transition-colors hover:border-[#0055FF] hover:bg-[#4986FF] active:bg-[#0042C6]"
          onClick={makePayment}
        >
          <span className="flex-[1_0_0] text-center font-['Inter'] text-base font-normal leading-[150%] text-white">
            Make Payment
          </span>
        </Button>
      </div>
    </div>
  );
}
