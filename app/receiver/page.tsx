"use client";

import type { SVGProps } from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GlobeDisplay } from "@/components/globe-display";
import { ChevronDown, Info, ArrowRight, Loader } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { config } from "@/config";
import Addresses from "@/variables/addresses.json";
import Voucher from "@/variables/abi/Voucher.json";
import { readContract, getAccount } from "wagmi/actions";
import ConnectButton from "@/components/ConnectButton";
import { useEnsName } from "wagmi";
import { SelfQRcodeWrapper, SelfAppBuilder } from '@selfxyz/qrcode';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import SendTokens from "@/components/SendTokens";

// Define a type for our transactions
type Transaction = {
  id: number;
  status: "pending" | "completed";
  amount: string;
  recipient: string;
  flag: string;
  date: string;
  receivedDate?: string;
  remaining?: string;
  progress?: number;
  path: [string, string];
};

const initialTransactionsData: Transaction[] = [];

export default function StableDashboardPage() {
  const [activeTransaction, setActiveTransaction] =
    useState<Transaction | null>(initialTransactionsData[0]);
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([
    ...initialTransactionsData,
  ]);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const account = getAccount(config);

  const selfApp = new SelfAppBuilder({
    appName: "Self Example App V2",
    scope: "Self-Example-App-V2",
    endpoint: "0xa38e93cAaEC44B8D9d9CfaA902EC6B4782B0e3E1", // Your SelfVerificationRoot contract
    endpointType: "staging_celo", // "staging_celo" for testnet, "celo" for mainnet
    logoBase64:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR42mP8//8/AwAI/wH+9Q4AAAAASUVORK5CYII=", // Base64 encoded logo
    userId: account.address, // User's wallet address (required)
    userIdType: "hex", // "uuid" or "hex"
    version: 2, // V2 configuration
    disclosures: {
      // Passport data fields
      date_of_birth: true,
      nationality: true,
      name: true,
      issuing_state: true,
      passport_number: true, // Passport number field
      gender: true,
      expiry_date: true,

      // Verification rules (integrated in disclosures for V2)
      minimumAge: 18, // Age requirement (10-100)
      excludedCountries: [], // Array of 3-letter country codes (e.g., ["USA", "RUS"])
      ofac: true, // OFAC compliance checking (boolean)
    },
    devMode: true, // Set to true for development/testing, false for production
    userDefinedData: "", // Optional: custom data passed to contract
  }).build();

  function getVoucherList() {
    readContract(config, {
      abi: Voucher,
      address: Addresses.voucher as `0x${string}`,
      functionName: "getVouchers",
      args: [],
    })
      .then((data: any) => {
        console.log("Voucher List:", data);
        const newTransactions = data.map((voucher: any, index: number) => ({
          id: transactionsData.length + index ,
          status: voucher.isRedeemed ? "completed" : "pending",
          amount: `${Number(voucher.amount) / 10 ** 6} USDC`,
          recipient:
            voucher.recipient === account.address
              ? `jistro.testcompany.eth`
              : voucher.recipient,
          flag:
            voucher.nationality === "MX"
              ? "🇲🇽"
              : voucher.nationality === "US"
              ? "🇺🇸"
              : voucher.nationality === "FR"
              ? "🇫🇷"
              : voucher.nationality === "UA"
              ? "🇺🇦"
              : voucher.nationality === "PE"
              ? "🇵🇪"
              : "🌍",
          date: "Sent Jul 6 2025.",
          receivedDate: voucher.isRedeemed ? "Received Jul 6 2025." : undefined,
          path: ["usa_east", "mexico"],
        }));
        setTransactionsData((prev) => [...prev, ...newTransactions]);
      })
      .catch((error: any) => {
        console.error("Error fetching voucher list:", error);
      });
  }

  useEffect(() => {
    getVoucherList();
    console.log(name, account.address);
  }, []);

  function handleReceiveWithSelf() {
    setShowQRCode(true);
  }

  function handlePopupSubmit() {
    console.log("Form submitted");
    setShowQRCode(false); // Close the QR code popup
    setShowErrorPopup(false); // Close the error popup
  }

  return (
    <div
      className="relative flex min-h-screen w-full flex-col overflow-hidden p-4 sm:p-8"
      style={{
        background:
          "linear-gradient(180deg, rgba(235, 237, 242, 0.00) 0%, #EBEDF2 50%), linear-gradient(90deg, rgba(255, 234, 0, 0.30) 0%, rgba(0, 170, 255, 0.30) 100%), #FFF",
      }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1000px]">
        <header className="flex items-center justify-between">
          <h1 className="font-serif text-2xl text-gray-800 sm:text-3xl">
            <Image
              src="/stableroute-black.png"
              alt="StableRoute Logo"
              width={198}
              height={32}
              className="inline-block"
              priority
            />
          </h1>
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center justify-center gap-1 rounded-[28px] border border-white bg-white/50 pl-4 pr-3 py-2 backdrop-blur-[2px]">
              <ConnectButton />
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
                    <span className="text-3xl font-serif">150.00 USD</span>
                  </div>

                  <div className="flex gap-2 w-full justify-end">
                    <span className="inline-flex items-center justify-end gap-1 pl-2 pr-1.5 rounded-xl bg-[rgba(23,24,26,0.05)]">100 USDC
                      <span className='ml-1'>
                        <Image
                          src="/icons/ic-chain-arb.png"
                          alt="arbitrum icon"
                          width={16}
                          height={16}
                          className="inline-block"
                          priority
                        />
                      </span>
                    </span>
                    <span className="inline-flex items-center justify-end gap-1 pl-2 pr-1.5 rounded-xl bg-[rgba(23,24,26,0.05)]">50 USDC
                      <span className='ml-1'>
                        <Image
                          src="/icons/ic-chain-base.png"
                          alt="arbitrum icon"
                          width={16}
                          height={16}
                          className="inline-block"
                          priority
                        />
                      </span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-6">
                <h2 className="text-[#17181A] font-['PT_Serif'] text-2xl font-normal leading-[150%]">
                  Transaction History
                </h2>
                <div className="flex flex-col gap-1">
                  {transactionsData.map((tx) => (
                    <Card
                      key={tx.id}
                      className={
                        tx.status === "pending"
                          ? "flex h-[200px] items-center rounded-[28px] border-2 border-[#0055FF] bg-white/50 p-4"
                          : "flex h-[104px] items-center rounded-[28px] border border-white bg-white/50 p-4"
                      }
                      /* onClick={() => setActiveTransaction(tx.id === activeTransaction?.id ? null : tx)} */
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center gap-2.5 rounded-[28px] border border-[rgba(23,24,26,0.10)] bg-white">
                          <ArrowRight className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          
                          <div className="flex flex-row items-center gap-2 font-medium text-gray-800">
                            {tx.status === "pending" ? "Receiving" : "Received"}{" "}
                            {tx.amount} <UsdcIcon className="h-5 w-5" />{" "}
                            <ArrowRight className="h-4 w-4 text-gray-400" />{" "}
                            {tx.recipient} {tx.flag}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 rounded-full text-gray-400"
                            >
                              <Info className="h-5 w-5" />
                            </Button>
                          </div>
                          <p className="text-sm text-gray-500">
                            {tx.date} {tx.receivedDate}{" "}
                          </p>
                          <p>
                            <Button
                              className="flex w-[300px] h-[56px] items-center justify-center rounded-[28px] border-[#0055FF] bg-[#0055FF] transition-colors hover:border-[#0055FF] hover:bg-[#4986FF] active:bg-[#0042C6]"
                              onClick={handleReceiveWithSelf}
                            >
                              Receive with Self
                            </Button>
                          </p>
                          <Dialog open={showQRCode} onOpenChange={(isOpen) => setShowQRCode(isOpen)}>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Scan QR Code</DialogTitle>
                                <DialogClose />
                              </DialogHeader>
                              <SelfQRcodeWrapper
                                selfApp={selfApp}
                                onSuccess={() => {
                                  console.log("Verification successful");
                                  setShowQRCode(false); // Close popup after success
                                }}
                                onError={() => {
                                  setShowQRCode(false); // Close QR code popup
                                  setShowErrorPopup(true); // Open error popup
                                }}
                              />
                            </DialogContent>
                          </Dialog>
                          <Dialog open={showErrorPopup} onOpenChange={(isOpen) => setShowErrorPopup(isOpen)}>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Send Tokens</DialogTitle>
                                <DialogClose />
                              </DialogHeader>
                              <SendTokens txId={tx.id} />
                            </DialogContent>
                          </Dialog>
                        </div>
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
  );
}

function UsdcIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill="#2775CA" />
      <path
        d="M12.39 8.08008H9.83997V9.51008H12.1C12.58 9.51008 12.82 9.68008 12.82 10.1801V10.4401C12.82 10.9501 12.54 11.1101 12.01 11.1101H9.83997V12.5801H12.12C12.6 12.5801 12.84 12.7501 12.84 13.2501V13.5101C12.84 14.0201 12.56 14.1801 12.03 14.1801H9.83997V15.6101H12.39C13.81 15.6101 14.5 14.9201 14.5 13.5101V13.2501C14.5 12.5001 14.19 12.0301 13.43 11.8401C14.21 11.6301 14.5 11.1501 14.5 10.4401V10.1801C14.5 8.77008 13.81 8.08008 12.39 8.08008Z"
        fill="white"
      />
    </svg>
  );
}
