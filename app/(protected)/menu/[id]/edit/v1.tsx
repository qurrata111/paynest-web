"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { XIcon } from "lucide-react"
import { useAppDispatch } from "@/lib/redux/hooks"
import { useParams, useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { getOneMenuThunk, updateMenuThunk } from "@/lib/redux/menu/menuThunk"
import { useEffect } from "react"
import { toast } from "sonner"

const SubMenuSchema = z.object({
    name: z.string().min(1, "Name is required"),
    path: z.string().nullable(),
    icon: z.string().nullable(),
    seq: z.number().nullable(),
})

const MenuSchema = z.object({
    id: z.number().min(1, "Id is required"),
    name: z.string().min(1, "Menu name is required"),
    path: z.string().nullable(),
    icon: z.string().nullable(),
    seq: z.number().nullable(),
    children: z.array(SubMenuSchema),
})

type FormValues = z.infer<typeof MenuSchema>

export default function EditMenuForm() {
    const route = useRouter();
    const params = useParams();
    const id = params.id;

    const dispatch = useAppDispatch();

    const { loading, menuUpdated, menu } = useSelector((state: any) => state.menu);


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
        const { id, ...rest } = data;
        const payload = { id, data: rest }
        const res = await dispatch(updateMenuThunk(payload));

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

    useEffect(() => {
        if (id) {
            form.setValue("id", +id);
            dispatch(getOneMenuThunk(id));
        }
    }, [id])

    const init = (data: any) => {
        const children = data.subMenus?.map((value: any) => {
            const { id } = value;
            return value;
        }) ?? [];

        form.setValue("name", data.name);
        form.setValue("icon", data.icon);
        form.setValue("path", data.path);
        form.setValue("seq", data.seq);
        form.setValue("children", children);

    }

    useEffect(() => {
        if (menu) {
            if (menu.status) {
                init(menu.data);
            }

            if (!menu.status) {
                toast.error(menu.message);
                return;

            }
        }
    }, [menu])


    return (
        <div>
            <h2 className="text-xl text-center font-semibold">Edit Menu</h2>
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

                <div className="space-y-4 mt-4">
                    <Button
                        variant={"default"}
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="w-full bg-gray-700 text-white p-2"
                    >
                        {form.formState.isSubmitting ? "Loading..." : "Update"}
                    </Button>
                </div>
            </form>
        </div>
    )
}