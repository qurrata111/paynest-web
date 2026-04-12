"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getMeThunk } from "@/lib/redux/auth/authThunk";
import { useAppDispatch } from "@/lib/redux/hooks";
import { resetUsersState } from "@/lib/redux/user/userSlice";
import { updateUserThunk } from "@/lib/redux/user/userThunk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({
    name: z.string().min(1, "Name cannot be empty!"),
    email: z.string().email("Email is not valid!"),
    username: z.string().min(1, "Username cannot be empty"),
})


const MyProfilePage = () => {
    const route = useRouter();

    const dispatch = useAppDispatch();

    const { loading, updatedUser } = useSelector((state: any) => state.user);
    const { user } = useSelector((state: any) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (data: any) => {
        const res = await dispatch(updateUserThunk(data));

    }

    useEffect(() => {
        if (updatedUser) {
            if (updatedUser.status) {
                dispatch(getMeThunk());
                toast.success(updatedUser.message);
                resetUsersState();
                reset();
            }

            if (!updatedUser.status) {
                toast.error(updatedUser.message);
                return;

            }
        }
    }, [updatedUser])

    useEffect(() => {
        if (user) {
            setValue("name", user.name);
            setValue("email", user.email);
            setValue("username", user.username);
        }
    }, [user])

    return (
        <div>
            <div className="text-xl text-center font-semibold">My Profile</div>

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
                        {...register("username")}
                        placeholder="Username"
                        className="w-full border p-2 bg-white  disabled:bg-gray-50"
                        disabled
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm">{errors.username.message}</p>

                    )}
                </div>

                <div>
                    <Input
                        {...register("email")}
                        placeholder="Email"
                        className="w-full border p-2 bg-white disabled:bg-gray-50"
                        disabled
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>

                    )}
                </div>

                <Button
                    variant={"default"}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gray-700 text-white p-2"
                >
                    {isSubmitting ? "Updating..." : "Change"}
                </Button>
            </form>

        </div>
    )
}

export default MyProfilePage;