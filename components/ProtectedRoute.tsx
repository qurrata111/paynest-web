"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

export default function ProtectedRoute({ children }: any) {
    const router = useRouter();

    const { isAuthenticated, } = useSelector((state: any) => state.auth);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isAuthenticated) {
                router.push("/login");
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [isAuthenticated, router]);


    if (!isAuthenticated) {
        return (
            <div className='w-full flex items-center justify-center bg-amber-300 h-screen'>
                <Spinner className="w-100"/>
            </div>
        )
    }

    return children;
}