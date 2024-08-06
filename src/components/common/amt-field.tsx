import { amountFormatter, cn, shortAmount } from "@/lib/utils";
import { IndianRupee } from "lucide-react";

type Props = {
    amount: number;
    icon?: boolean;
    textClassName?: string;
    className?: string;
    full?: boolean;
};

export function AmountField({
    amount,
    className,
    textClassName,
    icon,
    full,
}: Props) {
    return (
        <div
            className={cn(
                "flex items-center text-2xl justify-end",
                !icon && "gap-1",
                className
            )}
        >
            {icon ? (
                <IndianRupee className="size-4 text-muted-foreground" />
            ) : (
                <span
                    className={cn(
                        "text-muted-foreground text-sm",
                        textClassName
                    )}
                >
                    INR
                </span>
            )}
            <span className="font-bold">
                {full ? amountFormatter(amount) : shortAmount(amount)}
            </span>
        </div>
    );
}
