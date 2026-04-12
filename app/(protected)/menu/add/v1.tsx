"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { XIcon } from "lucide-react"
import { useAppDispatch } from "@/lib/redux/hooks"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { createMenuThunk } from "@/lib/redux/menu/menuThunk"
import { useEffect } from "react"
import { toast } from "sonner"

const SubMenuSchema = z.object({
    name: z.string().min(1, "Name is required"),
    path: z.string().nullable(),
    icon: z.string().nullable(),
    seq: z.number().nullable(),
})

const MenuSchema = z.object({
    name: z.string().min(1, "Menu name is required"),
    path: z.string().nullable(),
    icon: z.string().nullable(),
    seq: z.number().nullable(),
    children: z.array(SubMenuSchema),
})

type FormValues = z.infer<typeof MenuSchema>

export default function CreateMenuFormV1() {
    const route = useRouter();
    const dispatch = useAppDispatch();

    const { loading } = useSelector((state: any) => state.menu);


    const form = useForm<FormValues>({
        resolver: zodResolver(MenuSchema),
        defaultValues: {
            name: "",
            path: "",
            seq: 0,
            children: [],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "children",
    })


    const onSubmit = async (data: any) => {
        const res = await dispatch(createMenuThunk(data));

        if (res.payload.status) {
            toast.success(res.payload.message);
            form.reset();
            route.push("/menu");
        }

        if (!res.payload.status) {
            toast.error(res.payload.message);
            return;

        }
    }

    // useEffect(() => {
    //     if (created) {
    //         if (created.status) {
    //             toast.success(created.message);
    //             resetCreatedMenu();
    //             form.reset();
    //             setTimeout(() => {
    //                 route.push("/menu");
    //             }, 300);
    //         }

    //         if (!created.status) {
    //             toast.error(created.message);
    //             return;

    //         }
    //     }
    // }, [created])

    return (
        <div>
            <h2 className="text-xl text-center font-semibold">Add Menu</h2>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-sm mx-auto mt-4 h-screen"
            >
                <div className="space-y-2 mb-4">
                    <div>
                        <Input
                            {...form.register("name")}
                            placeholder="Menu Name"
                            className="bg-white"
                        />
                        <p className="text-red-500 text-xs">
                            {form.formState.errors.name?.message}
                        </p>
                    </div>

                    <div>
                        <Input
                            {...form.register("path")}
                            placeholder="Path"
                            className="bg-white"
                        />
                        <p className="text-red-500 text-xs">
                            {form.formState.errors.path?.message}
                        </p>
                    </div>

                    <div>
                        <Input
                            type="number"
                            placeholder="Order"
                            {...form.register("seq", { valueAsNumber: true })}
                            className="bg-white"
                        />
                        <p className="text-red-500 text-xs">
                            {form.formState.errors.seq?.message}
                        </p>
                    </div>

                    <div>
                        <Input
                            {...form.register("icon")}
                            placeholder="Menu Icon"
                            className="bg-white"
                        />
                        <p className="text-red-500 text-xs">
                            {form.formState.errors.icon?.message}
                        </p>
                    </div>

                </div>

                <Button
                    type="button"
                    onClick={() =>
                        append({ name: "", path: null, seq: null, icon: null })
                    }
                    className="bg-gray-700 text-white"
                >
                    + Sub Menu
                </Button>

                <div className="space-y-4 overflow-auto h-40">
                    {fields.map((item, index) => (
                        <div key={item.id} className="space-y-1 border-l pl-4 pt-4">
                            <div className="flex items-center">
                                <div className="w-full grid grid-col-1 gap-2 items-center">

                                    <div>
                                        <Input
                                            {...form.register(`children.${index}.name`)}
                                            placeholder="Name"
                                            className="bg-white w-full"
                                        />
                                    </div>

                                    <div>
                                        <Input
                                            {...form.register(`children.${index}.path`)}
                                            placeholder="Path"
                                            className="bg-white"
                                        />
                                    </div>

                                    <div>
                                        <Input
                                            {...form.register(`children.${index}.seq`, { valueAsNumber: true })}
                                            type="number"
                                            placeholder="Order"
                                            className="bg-white"
                                        />
                                    </div>

                                    <div>
                                        <Input
                                            {...form.register(`children.${index}.icon`)}
                                            placeholder="Icon"
                                            className="bg-white"
                                        />
                                    </div>

                                </div>
                                <Button
                                    type="button"
                                    className={"w-10 bg-gray-700"}
                                    onClick={() => remove(index)}
                                >
                                    <XIcon />
                                </Button>
                            </div>

                            <div>
                                <p className="text-red-500 text-xs">
                                    {form.formState.errors.children?.[index]?.name?.message}
                                </p>
                                <p className="text-red-500 text-xs">
                                    {form.formState.errors.children?.[index]?.path?.message}
                                </p>
                                <p className="text-red-500 text-xs">
                                    {form.formState.errors.children?.[index]?.seq?.message}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <Button
                        variant={"default"}
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="w-full bg-gray-700 text-white p-2"
                    >
                        {form.formState.isSubmitting ? "Loading..." : "Add"}
                    </Button>
                </div>
            </form>
        </div>
    )
}