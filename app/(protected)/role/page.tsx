"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setPage, setPaginationSearch } from "@/lib/redux/role/roleSlice";
import { deleteRoleThunk, getRoleThunk } from "@/lib/redux/role/roleThunk";
import { PencilIcon, SearchIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const RolePage = () => {
    const route = useRouter();

    const dispatch = useAppDispatch();

    const { loading, roles, pagination } = useSelector((state: any) => state.role);

    const { page, limit, total } = pagination;
    const totalPages = Math.ceil(total / limit);

    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage));
    };

    useEffect(() => {
        dispatch(getRoleThunk(pagination));
    }, [pagination.page, pagination.limit, pagination.search, pagination.sort]);

    const [show, setShow] = useState<boolean>(false);
    const [selected, setSelected] = useState<any>(null);

    const handleDelete = async (data: any) => {
        if (data) {
            setShow(!show);
            const res = await dispatch(deleteRoleThunk(String(data.id)));

            if (res.payload.status) {
                dispatch(getRoleThunk(pagination));
                toast.success(res.payload.message);
            }

            if (!res.payload.status) {
                toast.error(res.payload.message);
                return;

            }
        }
    }


    return (
        <div className="font-mono">
            <div className="text-xl text-center font-semibold">Role</div>
            <div className='w-full p-2 pb-20'>
                <div className="grid grid-cols-4 gap-4 mb-4">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div>
                        <Button
                            variant="secondary"
                            className={"w-full"}
                            onClick={() => route.push("/role/add")}
                        >
                            Add
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <div className='col-span-1 relative mb-2'>
                        <Input
                            className='peer pl-9 bg-white py-4.5'
                            onChange={e => dispatch(setPaginationSearch(e.target.value))}
                            placeholder={`Search `}
                            type='text'
                        />
                        <div className='text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                            <SearchIcon size={16} />
                        </div>
                    </div>
                </div>
                <div className='[&>div]:rounded-sm [&>div]:border'>
                    <Table className="bg-amber-50">
                        <TableHeader>
                            <TableRow className='hover:bg-transparent'>
                                <TableHead className="font-bold text-black">Name</TableHead>
                                <TableHead className="font-bold text-black w-0">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles.map((item: any) => {
                                return (
                                    <TableRow key={item.id} className='has-data-[state=checked]:bg-muted/50'>
                                        <TableCell>{item.role_name}</TableCell>
                                        <TableCell className='flex items-center gap-1'>
                                            <Tooltip>
                                                <TooltipTrigger render={
                                                    <Button variant='default' className='rounded-full' aria-label={`role-${item.id}-edit`} onClick={() => route.push(`/role/${item.id}/edit`)} disabled={loading}>
                                                        <PencilIcon />
                                                    </Button>
                                                } />
                                                <TooltipContent>Edit</TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                                <TooltipTrigger
                                                    render={
                                                        <Button
                                                            variant="destructive" className='rounded-full' aria-label={`role-${item.id}-delete`}
                                                            onClick={() => { setShow(true); setSelected(item) }}
                                                            disabled={loading}
                                                        >
                                                            <Trash />
                                                        </Button>
                                                    } />
                                                <TooltipContent>Delete</TooltipContent>
                                            </Tooltip>


                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>

                <Pagination className="bg-white">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => page > 1 && handlePageChange(page - 1)}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href="#"
                                    isActive={page === i + 1}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() =>
                                    page < totalPages && handlePageChange(page + 1)
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            <AlertDialog
                open={show} onOpenChange={() => setShow(!show)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure to delete this role {`${selected?.role_name ?? ""}`}?</AlertDialogTitle>
                        <AlertDialogDescription className={"text-mono"}>
                            This action cannot be undone
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => { setSelected(null); setShow(false); }}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(selected)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div >
    )
}

export default RolePage;