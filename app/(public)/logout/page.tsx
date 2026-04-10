"use client";

import { logoutThunk } from "@/lib/redux/auth/authThunk";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function LoginPage() {

    const router = useRouter();
    const dispatch = useAppDispatch();

    const { loading, error, isAuthenticated, isInitialized } = useAppSelector((state: any) => state.auth);

    const logoutHandle = () => {
        dispatch(logoutThunk());
    }

    useEffect(() => {
        logoutHandle();
    }, [])

    useEffect(() => {
        if (!loading && !isAuthenticated && !isInitialized) {
            router.replace("/");
        }
    }, [loading, isAuthenticated, isInitialized])

    return (
        <div>

        </div>
    )
}