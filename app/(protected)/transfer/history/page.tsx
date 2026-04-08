"use client";
import { Card } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useAppDispatch, } from "@/lib/redux/hooks";
import { setPage } from "@/lib/redux/transfer/transferSlice";
import { getTransferHistoryThunk } from "@/lib/redux/transfer/transferThunk";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TransferHistoryPage = () => {
    const route = useRouter();
    const dispatch = useAppDispatch();

    const { loading, transfers, pagination } = useSelector((state: any) => state.transfer);
    const { user } = useSelector((state: any) => state.auth);
    const userWalletId = user?.wallet?.[0]?.id ?? null;

    const { page, limit, total } = pagination;
    const totalPages = Math.ceil(total / limit);

    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage));
    };

    useEffect(() => {
        dispatch(getTransferHistoryThunk(pagination));
    }, [pagination.page, pagination.limit, pagination.search, pagination.sort]);


    return (
        <div className="pb-40">
            <div className="text-xl text-center font-semibold">History</div>
            <div className="h-full p-4 grid grid-cols-4">
                <div className="span-1"></div>
                <div className="col-span-2">
                    {transfers.map((val: any, index: number) => {
                        const fromWalletId = val.from_wallet_id;
                        const toWalletId = val.to_wallet_id;

                        const amount = Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }).format(val.amount);

                        return (
                            <div key={index} className="p-4 flex items-center justify-between shadow-sm bg-amber-50 rounded-md mt-2">
                                <div className="mb-2">
                                    <div className="font-semibold text-md">
                                        {` From: ${val.from_wallet?.user?.name} -> to: ${val.to_wallet?.user?.name}`}
                                    </div>
                                    <div className="text-sm text-gray-500">{moment(val.created_at).format("LLL")}</div>
                                </div>
                                <div className="text-right">
                                    <div className={`${userWalletId === toWalletId
                                        ? "text-green-600"
                                        : "text-red-600"
                                        } font-bold text-md`}
                                    >
                                        {amount}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="span-1"></div>
            </div>

            <Pagination>
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
    )
}

export default TransferHistoryPage;