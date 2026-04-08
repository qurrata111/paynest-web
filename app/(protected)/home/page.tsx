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
import WalletCard from "@/components/WalletCard";

export default function HomePage() {
  const route = useRouter();

  const dispatch = useAppDispatch();
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="w-full h-full font-mono text-gray-800 bg-amber-300 text-black p-2">
      <div className="grid grid-col-1">
        <div className="text-xl p-2">
          Welcome, <span className="font-semibold">{user?.name}</span>
        </div>
        <WalletCard
          user={user}
        />
      </div>
    </div>
  );
}
