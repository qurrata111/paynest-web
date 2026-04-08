"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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


    return children;
}