"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppDispatch } from "@/lib/redux/hooks";
import { resetMenu } from "@/lib/redux/menu/menuSlice";
import { createMenuThunk, getMenuAllThunk, getOneMenuThunk, updateMenuThunk } from "@/lib/redux/menu/menuThunk";
import { getMyMenuThunk } from "@/lib/redux/user/userThunk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import z from "zod";


const schema = z.object({
    id: z.number().min(1, "Id is required"),
    name: z.string().min(1, "Name cannot be empty"),
    path: z.string().nullable(),
    icon: z.string().nullable(),
    seq: z.number().nullable(),
    parent_id: z.number().nullable(),
})

type FormValues = z.infer<typeof schema>;


const EditMenuPage = () => {
    const route = useRouter();

    const params = useParams();
    const id = params.id;

    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    })

    const { loading, menuAll, menu, error } = useSelector((state: any) => state.menu);

    const [selectedParent, setSelectedParent] = useState<any>(null);

    const onSubmit = async (data: any) => {
        const { id, ...rest } = data;
        const payload = { id, data: rest }
        const res = await dispatch(updateMenuThunk(payload));

        if (res.payload.status) {
            resetMenu();
            reset();
            dispatch(getMyMenuThunk());
            toast.success(res.payload.message);
            route.push("/menu");
        }

        if (!res.payload.status) {
            toast.error(res.payload.message);
            return;

        }
    }
    const init = async () => {
        const res = await dispatch(getMenuAllThunk());
    }

    const initValue = (data: any) => {
        setValue("name", data.name);
        setValue("icon", data.icon);
        setValue("path", data.path);
        setValue("seq", data.seq);
        setValue("parent_id", data.parent_id || null);

        if (data.parent_id) {
            const parent = menuAll.data?.find((a: any) => a.id === data.parent_id);
            setSelectedParent(parent);
        }

    }

    useEffect(() => {
        init();
    }, [])

    useEffect(() => {
        if (id) {
            setValue("id", +id);
            dispatch(getOneMenuThunk(id));
        }
    }, [id])

    useEffect(() => {
        if (menu?.status) {
            initValue(menu.data);
        }
    }, [menu])


    return (
        <div>
            <div className="text-center text-xl font-semibold">Edit Menu</div>
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
                        {...register("path")}
                        placeholder="Path"
                        className="w-full border p-2 bg-white"
                    />
                    {errors.path && (
                        <p className="text-red-500 text-sm">{errors.path.message}</p>
                    )}
                </div>

                <div>
                    <Input
                        {...register("seq", { valueAsNumber: true })}
                        type="number"
                        placeholder="Seq."
                        className="w-full border p-2 bg-white"
                    />
                    {errors.seq && (
                        <p className="text-red-500 text-sm">{errors.seq.message}</p>
                    )}
                </div>

                <div>
                    <Input
                        {...register("icon")}
                        placeholder="Icon"
                        className="w-full border p-2 bg-white"
                    />
                    {errors.icon && (
                        <p className="text-red-500 text-sm">{errors.icon.message}</p>
                    )}
                </div>

                <div>
                    <Select
                        value={selectedParent?.name ?? null}
                        onValueChange={(e: any) => {
                            const parent = menuAll.data?.find((a: any) => a.id === e);
                            setSelectedParent(parent);
                            setValue("parent_id", e ?? null)
                        }}
                    >
                        <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Select Menu" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value={null}>Select Menu</SelectItem>

                                {menuAll.data?.filter((val: any) => val.parent_id === null || val.parent_id === undefined)
                                    .map((value: any, index: number) => {
                                        return (
                                            <SelectItem key={index} value={value.id}>{value.name}</SelectItem>
                                        )
                                    })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <Button
                    variant="default"
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-700 text-white p-2"
                >
                    {loading ? "Loading..." : "Update"}
                </Button>

            </form>
        </div>
    )
}

export default EditMenuPage;