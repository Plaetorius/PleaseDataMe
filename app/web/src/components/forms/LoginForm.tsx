"use client";

// TODO remove me later

import { Button } from "@/components/shadcn/button"
import { signIn, useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function LoginForm() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()

  const handleClick = async () => {
    await signIn("github", { redirect: true, callbackUrl: window.location.href });
  }

  useEffect(() => {
    const error = searchParams.get("error");
    const authCallback = searchParams.has("callbackUrl")

    if (authCallback) {
      if (error) {
        console.log("Authentication failed", error);
      } else if (status ==="authenticated") {
        // BUG toast never shows up
        toast.success(`Welcome ${session?.user?.name}!`)
        console.log("Authentication successful:", session);
      }
    }
  }, [searchParams, session, status])

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={handleClick}>
        Connect with Github
      </Button>
      <Button onClick={() => {toast.success("WOW")}}>
        Another button
      </Button>

      {status === "authenticated" && (
        <div className="text-green-600">
          Logged in as {session?.user?.name || "User"}
        </div>
      )}
    </div>
  )
}

