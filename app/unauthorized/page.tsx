"use client";

import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
    const router = useRouter();

    return (
        <div className="flex h-screen items-center justify-center flex-col gap-4 font-mono bg-amber-300">
            <h1 className="text-2xl font-bold">403 - Unauthorized</h1>
            <p className="text-gray-800">
                You don’t have permission to access this page.
            </p>

            <button
                onClick={() => router.push("/")}
                className="px-4 py-2 bg-black text-white rounded-lg"
            >
                Back to Home
            </button>
        </div>
    );
}

export default UnauthorizedPage;