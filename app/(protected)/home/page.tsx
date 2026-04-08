"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/lib/redux/hooks";
import { useEffect, useState } from "react";
import { getMeThunk } from "@/lib/redux/auth/authThunk";
import { useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Divide, Eye, EyeOff } from "lucide-react";

export default function HomePage() {
  const route = useRouter();

  const dispatch = useAppDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const [showBalance, setShowBalance] = useState<boolean>(false);


  return (
    <div className="w-full h-full font-mono text-gray-800 bg-amber-300 text-black p-2">
      <div className="grid grid-col-1">

        <div className="text-xl p-2">
          Welcome, <span className="font-semibold">{user?.name}</span>
        </div>
        <Card className="h-40 w-100 bg-yellow-100 p-4">
          <div className="text-2xl font-semibold">My Balance</div>
          <div className="text-xl font-bold">
            {user?.uid}
          </div>
          <div className="flex justify-between text-3xl mb-4">
            {showBalance ? (
              user?.wallet[0]?.balance && (
                Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(user?.wallet[0]?.balance)
              )
            ) : (
              "*******"
            )}
            <Button
              className={"ml-2"}
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? (
                <EyeOff />
              ) : <Eye />}
            </Button>

          </div>
        </Card>
      </div>
    </div>
  );
}
