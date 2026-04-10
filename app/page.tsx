"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/lib/redux/hooks";
import { useEffect } from "react";
import { getMeThunk } from "@/lib/redux/auth/authThunk";
import { useSelector } from "react-redux";

export default function Home() {
  const route = useRouter();

  const dispatch = useAppDispatch();
  const { loading, user, isAuthenticated, isInitialized} = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(getMeThunk());
  }, [])
  
  useEffect(() => {
    if (isAuthenticated) {
      route.push("/home");
    }
  }, [isAuthenticated])
  
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-mono bg-amber-300 text-black">
      <div className="text-xl font-semibold">
        PayNest E-Wallet
      </div>
      <div className="mt-4" hidden={isAuthenticated}>
        <Button
          variant={"default"}
          className={"bg-gray-700 "}
          onClick={() => {
            route.push("/login")
          }}
        >
          Continue to login
        </Button>
      </div>
      <div className="mt-4 text-sm" hidden={isAuthenticated}>or register
        <Link href="/register" className="text-blue-500 underline ml-2">
          here
        </Link>
      </div>
      <div className="mt-9 mb-4 text-xs absolute bottom-0">
        Design was inspired from
        <Link href="https://www.figma.com/design/VCMiF0JkUjTbTucdr1HPAq/Wallet-App-UI-Kit--Community" className="text-blue-500 underline ml-2">here</Link>
      </div>
    </div>
  );
}
