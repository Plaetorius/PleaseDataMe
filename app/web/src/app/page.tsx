"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { Button } from "@/components/shadcn/button";
import { useState, useEffect } from "react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";


interface SendOneSOLProps {
  toPublickKey: PublicKey;
}

export default function Home() {
  const { connection } = useConnection();
  const { publicKey, connected, sendTransaction } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  // const router = useRouter();

  
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

  useEffect(() => {
    if (publicKey) {
      (async function getBalanceEvery10Seconds() {
        const newBalance = await connection.getBalance(publicKey);
        setBalance(newBalance / LAMPORTS_PER_SOL);
        setTimeout(getBalanceEvery10Seconds, 10000);
      })();
    }
  }, [publicKey, connection, balance]);

  useEffect(() => {
    if (!publicKey)
      setBalance(0);
  }, [publicKey]);

  useEffect(() => {
    if (connected) {
      console.log("Congrats");
    }
  })

  const handleSendOneSOL = async () => {
    const recipientPublicKeyString = "Ey1zGZwLbMkFQNZdcW824eXEeuUxtjbxPdjDTfE5hcEr";
    const recipientPublicKey = new PublicKey(recipientPublicKeyString);

    await sendOneSOL({ toPublickKey: recipientPublicKey });
  }

  const sendOneSOL = async ({ toPublickKey }: SendOneSOLProps) => {
        if (!publicKey) throw new WalletNotConnectedError();

        // 890880 lamports as of 2022-09-01
        const lamports = await connection.getMinimumBalanceForRentExemption(0);

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: toPublickKey,
                lamports,
            })
        );

        const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight }
        } = await connection.getLatestBlockhashAndContext();

        const signature = await sendTransaction(transaction, connection, { minContextSlot });

        await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
  }


  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div>
        <WalletMultiButton />
      </div>
      <div>
        <WalletDisconnectButton />
      </div>
      <div>
        <Button onClick={getAirdropOnClick}>
          Get an Airdrop!
        </Button>
      </div>
      <div>
        Your balance is {balance} SOL.
      </div>
      <div>
        <Button  onClick={handleSendOneSOL}>
          Send 1 SOL
        </Button>
      </div>
    </main>
  );
}
