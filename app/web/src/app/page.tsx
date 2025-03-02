"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Button } from "@/components/shadcn/button";
import { useState, useEffect } from "react";

export default function Home() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  
  const getAirdropOnClick = async () => {
    try {
      if (!publicKey) {
        throw new Error("Wallet is not Connected");
      }
      const [latestBlockhash, signature] = await Promise.all([
        connection.getLatestBlockhash(),
        connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL),
      ]);
      const sigResult = await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        "confirmed",
      );
      if (sigResult) {
        alert("Airdrop was confirmed!");
      }
    } catch (err) {
      console.error(err);
      alert("You are Rate limited for Airdrop");
    }
  };

  const [balance, setBalance] = useState<number>(0);

useEffect(() => {
  if (publicKey) {
    (async function getBalanceEvery10Seconds() {
      const newBalance = await connection.getBalance(publicKey);
      setBalance(newBalance / LAMPORTS_PER_SOL);
      setTimeout(getBalanceEvery10Seconds, 10000);
    })();
  }
}, [publicKey, connection, balance]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="border hover:border-slate-900 rounded">
        <WalletMultiButton style={{}} />
      </div>
      <div>
        <Button onClick={getAirdropOnClick}>
          Get an Airdrop!
        </Button>
      </div>
      <div>
        Your balance is {balance} SOL.
      </div>
    </main>
  );
}
