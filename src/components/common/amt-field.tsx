import { amountFormatter, cn, shortAmount } from "@/lib/utils";
import { IndianRupee } from "lucide-react";

type Props = {
  amount: number;
  icon?: boolean;
  className?: string;
  full?: boolean;
};

export function AmountField({ amount, className, icon, full }: Props) {
  return (
    <div
      className={cn("flex items-center gap-1 text-2xl justify-end", className)}
    >
      {icon ? (
        <IndianRupee className="size-4 text-muted-foreground" />
      ) : (
        <span className="text-sm text-muted-foreground">INR</span>
      )}
      <span className="font-bold">
        {full ? amountFormatter(amount) : shortAmount(amount)}
      </span>
    </div>
  );
}
