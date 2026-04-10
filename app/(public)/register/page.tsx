"use client";

import { Button } from "@/components/ui/button";
import { registerThunk } from "@/lib/redux/auth/authThunk";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Input } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({
    name: z.string().min(1, "Name cannot be empty!"),
    email: z.string().email("Email is not valid!"),
    password: z.string().min(6, "Password should contain at least 6 characters")
})

const RegisterPage = () => {
    const route = useRouter();

    const dispatch = useAppDispatch();
    const { registered } = useSelector((state: any) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const onSubmit = async (data: any) => {
        const res = await dispatch(registerThunk(data));
        // const resData = res.payload?.data ?? null;

        // if (!resData) {
        //     toast.error("Something went wrong");
        //     return;
        // }

        // resData.status
        //     ? toast.success(resData.message)
        //     : toast.error(resData.message);

        // if (resData.status) {
        //     route.push("/login")
        // }
    }

    useEffect(() => {
        if (registered) {
            if (registered.status) {
                toast.success(registered.message);
                reset();
            }

            if (!registered.status) {
                toast.error(registered.message);
                return;

            }
        }
    }, [registered])
    
    return (
        <div>
            <div className="text-xl text-center font-semibold">Register</div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-sm mx-auto mt-4 space-y-4"
            >
                <div>
                    <Input
                        {...register("name")}
                        placeholder="Name"
                        className="w-full border p-2 bg-white"

                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>

                    )}
                </div>

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

                <div className="relative">
                    <Input
                        id="password-toggle"
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full border p-2 bg-white"
                    />
                    <Button
                        className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        size="icon"
                        type="button"
                        variant="ghost"
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                    </Button>
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <Button
                    variant={"default"}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gray-700 text-white p-2"
                >
                    {isSubmitting ? "Submitting..." : "Register"}
                </Button>

            </form>
        </div>
    )
}

export default RegisterPage;