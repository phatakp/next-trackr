import { getCurrUser } from "@/app/auth/actions";
import { AmountField } from "@/components/common/amt-field";
import { Badge } from "@/components/ui/badge";
import Icon, { mappings } from "@/components/ui/custom/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { capitalize, cn } from "@/lib/utils";
import { FullTxn } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

type Props = {
    txn: FullTxn;
};

export default function GrpTxnListItem({ txn }: Props) {
    const { data: user, isLoading } = useQuery({
        queryKey: ["curr-user"],
        queryFn: () => getCurrUser(),
    });
    if (isLoading) return <Skeleton className="w-full h-10" />;
    if (!user) return;

    const splitText =
        txn.user_id === user.id
            ? txn.grp_txn_type === "you-owe-full"
                ? "You Borrowed"
                : "You Lent"
            : txn.grp_txn_type === "you-owe-none"
            ? "You Lent"
            : "You Borrowed";
    return (
        <div className="grid grid-cols-12 items-center w-full gap-1 md:gap-0">
            <div className="flex md:flex-row gap-1 items-center md:col-span-2">
                <Icon
                    name={
                        `${
                            txn.category.type
                        }:${txn.category.name.toLowerCase()}` as keyof typeof mappings
                    }
                />
                <Badge variant="outline" className="hidden md:flex">
                    {capitalize(txn.category.type)}
                </Badge>
            </div>

            <div className="flex flex-col items-start group-hover:text-primary-foreground col-span-8 md:col-span-4">
                <span className="text-sm truncate">
                    {!txn.description ? txn.category.name : txn.description}
                </span>
                <span className="text-xs flex gap-1 items-center text-muted-foreground">
                    {user.first_name} paid{" "}
                    <AmountField
                        amount={txn.amount}
                        full
                        className="text-xs justify-start"
                    />
                </span>
            </div>

            <div className="hidden md:flex md:flex-row md:gap-1 md:col-span-4">
                {txn.source_id && (
                    <Badge variant="destructive">
                        {txn.src?.name}{" "}
                        <ArrowUpRight className="size-4 text-destructive-foreground" />
                    </Badge>
                )}
                {txn.destination_id && (
                    <Badge variant="success" className="py-0 my-0">
                        {txn.dest?.name}{" "}
                        <ArrowDownLeft className="size-4 text-success-foreground" />
                    </Badge>
                )}
            </div>
            <div className="flex flex-col items-end col-span-3 md:col-span-2">
                <span
                    className={cn(
                        "text-xs",
                        splitText.includes("Lent")
                            ? "text-success"
                            : "text-destructive"
                    )}
                >
                    {splitText}
                </span>
                <AmountField
                    amount={txn.grp_split_amt ?? 0}
                    icon
                    className="text-base justify-end"
                />
            </div>
        </div>
    );
}
