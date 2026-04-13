"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import WalletFormCard from "@/components/WalletFormCard";
import { freezeWalletThunk, getUserByIdThunk, updateUserRoleThunk, updateUserThunk, } from "@/lib/redux/admin/adminThunk";
import { useAppDispatch } from "@/lib/redux/hooks";
import { getRoleAllThunk } from "@/lib/redux/role/roleThunk";
import { getMyMenuThunk } from "@/lib/redux/user/userThunk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({
    id: z.number().min(1, "User Id cannot be empty!"),
    name: z.string().min(1, "Name cannot be empty!"),
    email: z.string().email("Email is not valid!"),
    username: z.string().min(1, "Username cannot be empty"),
})

const schemaUserRole = z.object({
    user_id: z.number().min(1, "User Id cannot be empty"),
    role_id: z.number().nullable(),
})

const schemaUserWallet = z.object({
    user_id: z.number().min(1, "User Id cannot be empty"),
})

const ViewUserPage = () => {
    const route = useRouter();

    const params = useParams();
    const id = params.id;

    const dispatch = useAppDispatch();

    const { roleAll } = useSelector((state: any) => state.role);
    const { user, updatedUser } = useSelector((state: any) => state.admin);

    const [selectedRole, setSelectedRole] = useState<any>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(schema),
    })

    const {
        register: registerRole,
        handleSubmit: handleSubmitRole,
        formState: { errors: errorsRole, isSubmitting: isSubmittingRole },
        reset: resetRole,
        setValue: setValueRole,
        getValues: getValuesRoles,
    } = useForm({
        resolver: zodResolver(schemaUserRole),
    })

    const {
        register: registerWallet,
        handleSubmit: handleSubmitWallet,
        formState: { errors: errorsWallet, isSubmitting: isSubmittingWallet },
        reset: resetWalet,
        setValue: setValueWallet,
        getValues: getValuesWallet,
    } = useForm({
        resolver: zodResolver(schemaUserWallet),
    })

    const onSubmit = async (data: any) => {
        const { id, ...rest } = data;
        const payload = { id, data: rest }
        const res = await dispatch(updateUserThunk(payload));

        if (res.payload.status) {
            getUserById();
            toast.success(res.payload.message);
        }

        if (!res.payload.status) {
            toast.error(res.payload.message);
            return;

        }
    }

    const onSubmitRole = async () => {
        const payload: any = {
            id: getValuesRoles("user_id"),
            data: {
                user_id: getValuesRoles("user_id"),
                role_id: getValuesRoles("role_id"),
            }
        }
        const res = await dispatch(updateUserRoleThunk(payload));

        if (res.payload.status) {
            getUserById();
            getMyMenuThunk();
            toast.success(res.payload.message);
        }

        if (!res.payload.status) {
            toast.error(res.payload.message);
            return;

        }
    }

    const handleFreeze = async (type: 1 | 0) => {
        const res = await dispatch(
            freezeWalletThunk({ id: getValuesWallet("user_id"), type, })
        )

        if (res.payload.status) {
            getUserById();
            toast.success(res.payload.message);
        }

        if (!res.payload.status) {
            toast.error(res.payload.message);
            return;

        }
    }

    useEffect(() => {
        if (updatedUser) {
            if (updatedUser.status) {
                getUserById();
                toast.success(updatedUser.message);
                reset();
            }

            if (!updatedUser.status) {
                toast.error(updatedUser.message);
                return;

            }
        }
    }, [updatedUser])

    const getRoles = async () => {
        const res = await dispatch(getRoleAllThunk());
    }

    const getUserById = async () => {
        const res = await dispatch(getUserByIdThunk(String(id)));
    }

    useEffect(() => {
        getRoles();
    }, [])

    useEffect(() => {
        if (id) {
            getUserById();
        }
    }, [id])

    useEffect(() => {
        if (user?.data) {
            setValue("id", user?.data?.id);
            setValue("name", user?.data?.name);
            setValue("email", user?.data?.email);
            setValue("username", user?.data?.username);
            if (user?.data?.user_roles?.[0]) {
                const userRole = roleAll?.data.find((a: any) => a.id === user?.data?.user_roles?.[0]?.role_id);
                setSelectedRole(userRole);
            }
            setValueRole("user_id", user?.data.id);
            setValueRole("role_id", user?.data?.user_roles?.[0]?.role_id ?? null);

            setValueWallet("user_id", user?.data.id);
        }
    }, [user])

    return (
        <div className="w-full grid grid-col-1 md:grid-cols-2 gap-8 p-4 pb-16 px-8">
            <div>
                <div className="text-xl text-left text-gray-800 font-semibold mb-4">Profile</div>
                <div className="p-4 bg-white rounded-md mb-4">
                    <div>
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
                                size={"sm"}
                                variant={"default"}
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-gray-700 text-white p-2"
                            >
                                {isSubmitting ? "Updating..." : "Change"}
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="text-xl text-left text-gray-800 font-semibold mb-4">Role</div>
                <div className="p-4 bg-white rounded-md">
                    <div className="mb-2">
                        {roleAll?.data?.map((value: any, index: number) => {
                            return (
                                <div key={index} className="flex items-center">
                                    <Checkbox
                                        className={"bg-gray-50 border border-2 border-gray-200 my-1"}
                                        checked={selectedRole?.id === value.id}
                                        onCheckedChange={(checked: boolean) => {
                                            setValueRole("role_id", checked ? value.id : null);
                                            setSelectedRole(checked ? value : null);
                                        }}
                                    />
                                    <p className="text-xs ml-2">{value.role_name}</p>
                                </div>
                            )
                        })}
                    </div>
                    <Button
                        size={"sm"}
                        variant={"default"}
                        disabled={isSubmittingRole}
                        className="bg-gray-700 text-white p-2"
                        onClick={onSubmitRole}
                    >
                        {isSubmittingRole ? "Saving..." : "Save"}
                    </Button>
                </div>
            </div>

            <div className="w-full flex justify-center">
                <div className="">
                    <div className="text-xl text-left text-gray-800 font-semibold mb-4">Wallet</div>

                    <WalletFormCard
                        user={user?.data ?? null}
                        title="Balance"
                        description="Wallet is temporary frozen."
                        handleFreeze={(type) => handleFreeze(type)}
                    />
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default ViewUserPage;