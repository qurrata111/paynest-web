"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppDispatch } from "@/lib/redux/hooks";
import { getMenuAllMenuThunk } from "@/lib/redux/menu/menuThunk";
import { resetRole } from "@/lib/redux/role/roleSlice";
import { createRoleThunk, getOneRoleThunk, updateRoleThunk } from "@/lib/redux/role/roleThunk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import z from "zod";

const schemaRoleMenu = z.object({
    menu_id: z.number().min(1, "Menu Id is required"),
})

const schema = z.object({
    id: z.number().min(1, "Role Id cannot be empty"),
    role_key: z.string().min(1, "Key cannot be empty"),
    role_name: z.string().min(1, "Name cannot be empty"),
    role_menus: z.array(schemaRoleMenu),
})

type FormValues = z.infer<typeof schema>;

const EditRolePage = () => {
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
        control,
        watch,
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            role_menus: [],
        }
    });
    const selectedMenus = watch("role_menus");

    const { loading, error, role } = useSelector((state: any) => state.role);

    const [listMenu, setListMenu] = useState<any[]>([]);

    const handleCheckbox = (menuId: number, checked: boolean) => {
        const current = selectedMenus || [];

        if (checked) {
            setValue("role_menus", [...current, { menu_id: menuId }]);
        } else {
            setValue(
                "role_menus",
                current.filter((item: any) => item.menu_id !== menuId)
            );
        }
    };

    const onSubmit = async (data: any) => {
        const { id, ...rest } = data;
        const payload = { id, data: rest };
        const res = await dispatch(updateRoleThunk(payload));

        if (res.payload.status) {
            resetRole();
            reset();
            toast.success(res.payload.message);
            route.push("/role");
        }

        if (!res.payload.status) {
            toast.error(res.payload.message);
            return;

        }
    }
    const init = async () => {
        const res = await dispatch(getMenuAllMenuThunk());
        setListMenu(res.payload?.data || []);
    }

    useEffect(() => {
        init();
    }, [])

    useEffect(() => {
        if (id) {
            setValue("id", +id);
            dispatch(getOneRoleThunk(id));
        }
    }, [id])

    const initValue = (data: any) => {
        setValue("role_key", data.role_key);
        setValue("role_name", data.role_name);
        const roleIds = data?.roleMenus?.map((a: any) => {
            return ({ menu_id: a.menu_id })
        }) || [];
        setValue("role_menus", roleIds);
    }

    useEffect(() => {
        if (role?.status) {
            initValue(role.data);
        }
    }, [role])

    return (
        <div className="pb-40">
            <div className="text-center text-xl font-semibold">Edit Role</div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-sm mx-auto mt-4 space-y-4"
            >
                <div>
                    <Input
                        {...register("role_name")}
                        placeholder="Role Name"
                        className="w-full border p-2 bg-white"
                    />
                    {errors.role_name && (
                        <p className="text-red-500 text-sm">{errors.role_name.message}</p>
                    )}
                </div>

                <div>
                    <Input
                        {...register("role_key")}
                        placeholder="Role Key"
                        className="w-full border p-2 bg-white"
                    />
                    {errors.role_key && (
                        <p className="text-red-500 text-sm">{errors.role_key.message}</p>
                    )}
                </div>

                <div>
                    <p className="text-lg mb-2 text-center">Menus</p>
                    {listMenu.map((value: any, index: number) => {
                        const children = value.children;
                        return (
                            <div key={index} className="border border-1 bg-yellow-50 rounded-lg p-2 mb-2">

                                <div className="flex items-center">
                                    <Checkbox
                                        className={"bg-gray-50 border border-2 border-gray-200 my-2"}
                                        checked={
                                            (selectedMenus ?? []).some(
                                                (item: any) => item.menu_id === value.id
                                            )
                                        }
                                        onCheckedChange={(checked: boolean) =>
                                            handleCheckbox(value.id, checked === true)
                                        }
                                    />
                                    <p className="text-xs ml-2 font-semibold">{value.name}</p>
                                </div>
                                <div className="ml-4">
                                    {children.map((val: any, idx: number) => {
                                        return (
                                            <div key={val.id} className="flex items-center">
                                                <Checkbox
                                                    className={"bg-gray-50 border border-2 border-gray-200 my-1"}
                                                    checked={selectedMenus?.some(
                                                        (item: any) => item.menu_id === val.id
                                                    )}
                                                    onCheckedChange={(checked: boolean) =>
                                                        handleCheckbox(val.id, checked)
                                                    }
                                                />
                                                <p className="text-xs ml-2">{val.name}</p>
                                            </div>
                                        )
                                    })}
                                </div>

                            </div>
                        )
                    })}
                </div>

                <Button
                    variant="default"
                    type="submit"
                    disabled={loading || isSubmitting}
                    className="w-full bg-gray-700 text-white p-2"
                >
                    {isSubmitting ? "Loading..." : "Update"}
                </Button>

            </form>
        </div>
    )
}

export default EditRolePage;