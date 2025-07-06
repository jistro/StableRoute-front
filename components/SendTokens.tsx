"use client";
import { config } from "@/config";
import $ from "jquery";
import Addresses from "@/variables/addresses.json";
import Voucher from "@/variables/abi/Voucher.json";
import Vault from "@/variables/abi/Vault.json";
import MessageTransmitterV2 from "@/variables/abi/MessageTransmitterV2.json";
import { writeContract } from "wagmi/actions";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const SendTokens = ({ txId }: { txId: number }) => {
  const [step, setStep] = React.useState<boolean>(true);
  const [transactionHash, setTransactionHash] = React.useState<string | null>(
    null
  );
  const [message, setMessage] = React.useState<string | null>(null);
  const [attestation, setAttestation] = React.useState<string | null>(null);

  function fetchMessageAndAttestation(hash: string) {
    const settings = {
      async: true,
      crossDomain: true,
      url: `https://iris-api-sandbox.circle.com/v2/messages/6?transactionHash=${hash}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      const messages = response.messages || [];
      if (messages.length === 0) {
        console.error("Message not found for provided parameters");
        return;
      }
      for (const msg of messages) {
        if (msg.attestation && msg.message) {
          setMessage(msg.message);
          setAttestation(msg.attestation);
          break; // Stop once we find the first valid message and attestation
        }
      }
    });
  }

  function manualSearch() {
    const hash = prompt("Enter transaction hash to search manually:");
    if (hash) {
      fetchMessageAndAttestation(hash);
    }
  }

  function makeSend() {
    const amountTokens = (
      document.getElementById("sendTokens_amountInput") as HTMLInputElement
    ).value;
    const parsedAmountTokens = Math.floor(parseFloat(amountTokens) * 10 ** 6);

    writeContract(
      {
        ...config,
        chainId: 84532, // Sepolia network
      },
      {
        abi: Vault,
        address: Addresses.vault as `0x${string}`,
        functionName: "sendToVoucher",
        args: [parsedAmountTokens],
      }
    )
      .then((data: any) => {
        console.log(data);
        setTransactionHash(data); // Store the transaction hash in state
        fetchMessageAndAttestation(data); // Fetch message and attestation
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  function receiveMessage() {
    writeContract(
      {
        ...config,
        chainId: 421614, // Arbitrum Sepolia network
      },
      {
        abi: MessageTransmitterV2,
        address: Addresses.MessageTransmitterV2Address as `0x${string}`,
        functionName: "receiveMessage",
        args: [message, attestation],
      }
    )
      .then((data: any) => {
        console.log(data);
        setStep(false); // Set step to false after successful transaction
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  function receveTokens() {
    writeContract(
      {
        ...config,
        chainId: 421614, // Arbitrum Sepolia network
      },
      {        abi: Voucher,
        address: Addresses.voucher as `0x${string}`,
        functionName: "redeemVoucher",
        args: [txId],
      }
    )
      .then((data: any) => {
        console.log(data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  return (
    <>
      {step ? (
        <>
          {message && attestation ? (
            <>
              <Button
                onClick={receiveMessage}
                className="mt-4 h-[56px] rounded-[28px] bg-blue-500 text-white"
              >
                Continue
              </Button>
            </>
          ) : (
            <>
              <Input
                placeholder="amount in USDC to send in arb"
                id="sendTokens_amountInput"
                className="h-[56px] rounded-[28px] border border-[#17181A1A] bg-white px-6"
              />
              <Button
                onClick={makeSend}
                className="mt-4 h-[56px] rounded-[28px] bg-blue-500 text-white"
              >
                Send Tokens
              </Button>
              <Button
                onClick={() => setStep(false)}
                className="mt-4 h-[56px] rounded-[28px] bg-gray-500 text-white"
              >
                Skip
              </Button>
              <Button
                onClick={manualSearch}
                className="mt-4 h-[56px] rounded-[28px] bg-green-500 text-white"
              >
                Manual Search
              </Button>
            </>
          )}
        </>
      ) : (
        <>
        <p>Transaction ID: {txId}</p>
        <Button
          onClick={receveTokens}
          className="mt-4 h-[56px] rounded-[28px] bg-blue-500 text-white"
        >
          Receive Tokens
        </Button>
        </>
      )}
    </>
  );
};

export default SendTokens;
