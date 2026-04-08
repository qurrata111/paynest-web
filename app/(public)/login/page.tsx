"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { loginThunk } from "@/lib/redux/auth/authThunk";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const schema = z.object({
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Minimal 6 karakter"),
});

export default function LoginPage() {
    const route = useRouter();

    const dispatch = useAppDispatch();
    const { loading, error, isAuthenticated, isInitialized } = useAppSelector((state: any) => state.auth);

     const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: any) => {
        dispatch(
            loginThunk(data)
        );
    }

    useEffect(() => {
        if (isInitialized && isAuthenticated) {
            route.push("/home");
        }
    }, [isInitialized, isAuthenticated, route]);

    return (
        <div>
            <div className="text-xl font-semibold">Login</div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-sm mx-auto mt-4 space-y-4"
            >
                <div>
                    <Input
                        {...register("email")}
                        placeholder="Email"
                        className="w-full border p-2 bg-white"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <Input
                        {...register("password")}
                        type="password"
                        placeholder="Password"
                        className="w-full border p-2 bg-white"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <Button
                    variant="default"
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-700 text-white p-2"
                >
                    {loading ? "Loading..." : "Login"}
                </Button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
}