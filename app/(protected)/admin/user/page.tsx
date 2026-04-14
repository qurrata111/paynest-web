"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { setPage, setPaginationIsFrozen, setPaginationSearch } from "@/lib/redux/admin/adminSlice";
import { getUserThunk } from "@/lib/redux/admin/adminThunk";
// import { setPage, setPaginationIsFrozen, setPaginationSearch } from "@/lib/redux/admin/user/userSlice";
// import { getUserThunk } from "@/lib/redux/admin/user/userThunk";
import { useAppDispatch } from "@/lib/redux/hooks";
import { ArrowDown, ChevronDown, Eye, LockIcon, SearchIcon, UnlockIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AdminUserPage = () => {
    const route = useRouter();
    const dispatch = useAppDispatch();

    const { loading, users, pagination } = useSelector((state: any) => state.admin);

    const { page, limit, total } = pagination;
    const totalPages = Math.ceil(total / limit);

    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage));
    };

    useEffect(() => {
        dispatch(getUserThunk(pagination));
    }, [pagination.page, pagination.limit, pagination.search, pagination.sort, pagination.is_frozen]);

    return (
        <div className="font-mono">
            <div className="text-xl text-center font-semibold">Users</div>
            <div className='w-full p-2 pb-20'>
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
                    <div></div>
                    <div></div>
                    <div className="">
                        <DropdownMenu>
                            <DropdownMenuTrigger className={"w-full"}>
                                <div className="flex justify-between items-center pt-2 pb-2 px-8 rounded-lg text-sm text-gray-500 bg-white">
                                    <p>Frozen</p>
                                    <ChevronDown size={20} className="ml-4" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='start'>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className={"text-sm text-gray-500 "} onClick={() => dispatch(setPaginationIsFrozen(""))}>
                                        All
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className={"text-sm text-gray-500 "} onClick={() => dispatch(setPaginationIsFrozen("true"))}>
                                        Frozen
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className={"text-sm text-gray-500"} onClick={() => dispatch(setPaginationIsFrozen("false"))}>
                                        Unfrozen
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className='[&>div]:rounded-sm [&>div]:border'>
                    <Table className="bg-amber-50">
                        <TableHeader>
                            <TableRow className='hover:bg-transparent'>
                                <TableHead className="font-bold text-black">Name</TableHead>
                                <TableHead className="font-bold text-black">Uid</TableHead>
                                <TableHead className="font-bold text-black w-0">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((item: any) => {
                                const wallet = item.wallet?.[0] ?? null;
                                return (
                                    <TableRow key={item.id} className='has-data-[state=checked]:bg-muted/50'>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.uid}</TableCell>
                                        <TableCell className='flex items-center gap-1'>
                                            <Tooltip>
                                                <TooltipTrigger render={
                                                    <Link href={`/admin/user/${item.id}/view`}>
                                                        <Button variant='default' className='rounded-full bg-orange-400' aria-label={`product-${item.id}-edit`}>
                                                            <Eye />
                                                        </Button>
                                                    </Link>
                                                } />
                                                <TooltipContent>
                                                    View Details
                                                </TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                                <TooltipTrigger render={
                                                    wallet?.is_frozen === 1 ? (
                                                        <Button variant='default' className='rounded-full' aria-label={`product-${item.id}-edit`}>
                                                            <LockIcon />
                                                        </Button>
                                                    ) : wallet?.is_frozen === 0 ? (
                                                        <Button variant='default' className='rounded-full' aria-label={`product-${item.id}-edit`}>
                                                            <UnlockIcon />
                                                        </Button>
                                                    ) : <div></div>
                                                } />
                                                <TooltipContent>
                                                    {wallet?.is_frozen === 1 ? (
                                                        <p>Unfreeze this wallet</p>
                                                    ) : wallet?.is_frozen === 0 ? (
                                                        <p>Freeze this wallet</p>
                                                    ) : null}
                                                </TooltipContent>
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
        </div >
    )
}

export default AdminUserPage;