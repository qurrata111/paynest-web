"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/lib/redux/hooks";
import { useEffect, useState } from "react";
import { getMeThunk } from "@/lib/redux/auth/authThunk";
import { useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export default function DashboardPage() {
  const route = useRouter();

  const dispatch = useAppDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const [showBalance, setShowBalance] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex flex-col flex-1 items-center font-mono bg-amber-300 text-black">
      <Card className="flex items-center justify-center h-40 w-100 bg-yellow-100 m-4 p-2">
        <div className="text-2xl font-bold">My Balance</div>
        <div className="text-3xl mb-4">
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
  );
}
