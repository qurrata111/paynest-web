"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/lib/redux/hooks";
import { resetTransferState } from "@/lib/redux/transfer/transferSlice";
import { createTransferThunk } from "@/lib/redux/transfer/transferThunk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import z from "zod";


const schema = z.object({
    uid: z.string().min(1, "Uid cannot be empty!"),
    amount: z.number().min(1, "Amount cannot be empty!"),
})

const CreateTranserPage = () => {
    const route = useRouter();

    const dispatch = useAppDispatch();
    const { user } = useSelector((state: any) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
    });

    const { loading, created } = useSelector((state: any) => state.transfer);

    const onSubmit = async (data: any) => {
        const res = await dispatch(createTransferThunk(data));
        if (res.payload.status) {
            resetTransferState();
            reset();
            toast.success(res.payload.message);
        }

        if (!res.payload.status) {
            toast.error(res.payload.message);
            return;

        }
    }

    return (
        <div className=" p-2">
            <div className="text-xl font-semibold text-gray-800 text-center">Transfer to</div>
            <form
                className="max-w-sm mx-auto mt-4 space-y-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <Input
                        {...register("uid")}
                        placeholder="Recipient Uid"
                        className="w-full border p-2 bg-white"
                    />
                    {errors.uid && (
                        <p className="text-red-500 text-sm">{errors.uid.message}</p>
                    )}
                </div>
                <div>
                    <Input
                        {...register("amount", { valueAsNumber: true })}
                        placeholder="Amount"
                        className="w-full border p-2 bg-white"
                        type="number"
                    />
                    {errors.amount && (
                        <p className="text-red-500 text-sm">{errors.amount.message}</p>
                    )}
                </div>
                <Button
                    variant="default"
                    type="submit"
                    disabled={isSubmitting || loading}
                    className="w-full bg-gray-700 text-white p-2"
                >
                    {isSubmitting ? "Sending..." : "Send"}
                </Button>
            </form>
        </div>
    )
}

export default CreateTranserPage;