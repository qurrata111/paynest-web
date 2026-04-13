import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Eye, EyeOff } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";


type WalletCardProps = {
    user: any;
    title?: string;
    description?: string;
    handleFreeze?: (type: 1 | 0) => void,

};

const WalletFormCard = (props: WalletCardProps) => {
    const [showBalance, setShowBalance] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    return (
        <div className="">
            <Card
                className={`w-full p-4 pb-8 ${props.user?.wallet?.[0]?.is_frozen
                    ? "bg-gray-200 border border-gray-400"
                    : "bg-yellow-100"
                    }`}
            >

                <div className="flex justify-between items-center">
                    <div className="text-2xl font-semibold">{props.title || "My Balance"}</div>

                    {props.user?.wallet?.[0]?.is_frozen ? (
                        <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                            Frozen
                        </span>
                    ) : null}
                </div>

                <div className="text-sm text-gray-500 mb-2">
                    UID: {props.user?.uid}
                </div>

                <div className="w-80 flex justify-between items-center text-2xl mb-2">
                    {showBalance ? (
                        props.user?.wallet?.[0]?.balance && (
                            Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(props.user?.wallet?.[0]?.balance)
                        )
                    ) : (
                        "*******"
                    )}

                    <Button
                        className="ml-2"
                        onClick={() => setShowBalance(!showBalance)}
                    >
                        {showBalance ? <EyeOff /> : <Eye />}
                    </Button>
                </div>

                {props.user?.wallet?.[0]?.is_frozen ? (
                    <div className="text-sm text-red-600">
                        {props.description ?? "Your wallet is temporarily frozen. Contact support."}
                    </div>
                ) : null}

                <div className="flex justify-center items-center">
                    <Button
                        onClick={() => setShow(!show)}
                        className={"px-2"}
                        size={"sm"}
                    >
                        {props.user?.wallet?.[0]?.is_frozen ? "Unfreeze" : "Freeze"}
                    </Button>
                </div>
            </Card>

            <AlertDialog
                open={show} onOpenChange={() => setShow(!show)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure to {props.user?.wallet?.[0]?.is_frozen ? "Unfreeze" : "Freeze"} this wallet?</AlertDialogTitle>
                        <AlertDialogDescription className={"text-mono"}>
                            This action cannot be undone
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShow(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                            if (props.handleFreeze) {
                                props.handleFreeze(props.user?.wallet?.[0]?.is_frozen ? 0 : 1);
                            }
                            setShow(false);
                        }}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default WalletFormCard;