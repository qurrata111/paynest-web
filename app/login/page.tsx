"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Minimal 6 karakter"),
});

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: any) => {
        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            alert("Login gagal");
            return;
        }

        window.location.href = "/dashboard";
    };

    return (
        <div className="flex flex-col flex-1 items-center justify-center font-mono bg-amber-300 text-black">
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
                    disabled={isSubmitting}
                    className="w-full bg-gray-700 text-white p-2"
                >
                    {isSubmitting ? "Loading..." : "Login"}
                </Button>
            </form>
        </div>
    );
}