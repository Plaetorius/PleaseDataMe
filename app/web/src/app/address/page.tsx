"use client";

import { Button } from "@/components/shadcn/button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AccountInfo, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function Address() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number>(0);
	const [accountInfo, setAccountInfo] = useState<AccountInfo<Buffer> | null>(null);
  
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
			(async function getInfovEvery10Seconds() {
				// Balance
				const newBalance = await connection.getBalance(publicKey);
				setBalance(newBalance / LAMPORTS_PER_SOL);

				// AccountInfo
				const newAccountInfo = await connection.getAccountInfo(publicKey);
				setAccountInfo(newAccountInfo);
				setTimeout(getInfovEvery10Seconds, 10000);
			})();
		}
	}, [publicKey, connection, balance]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
      {publicKey ? (
        <div className="flex flex-col gap-4">
          <h1>Your Public key is: {publicKey?.toString()}</h1>
          <h2>Your Balance is: {balance} SOL</h2>
					<p>Your account info is: {accountInfo ? JSON.stringify(accountInfo) : ""}</p>
          <div>
            <Button
              onClick={getAirdropOnClick}
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Get Airdrop
            </Button>
          </div>
        </div>
      ) : (
        <h1>Wallet is not connected</h1>
      )}
    </main>
  );
}