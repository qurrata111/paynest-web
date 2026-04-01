"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-mono bg-amber-300 text-black">
      <div className="text-xl font-semibold">
        PayNest E-Wallet
      </div>
      <div className="mt-4">
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
      <div className="mt-4 text-sm">or register
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
