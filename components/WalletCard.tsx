import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Eye, EyeOff } from "lucide-react";


type WalletCardProps = {
    user: any;
    title?: string;
    description?: string;
};

const WalletCard = (props: WalletCardProps) => {
    const [showBalance, setShowBalance] = useState<boolean>(false);
    return (
        <Card className={`p-4 ${props.user?.wallet?.[0]?.is_frozen
            ? "bg-gray-200 border border-gray-400"
            : "bg-yellow-100"
            }`}>

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

            <div className="flex justify-between items-center text-2xl mb-2">
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

        </Card>
    )
}

export default WalletCard;