import { AmountField } from "@/components/common/amt-field";
import { Badge } from "@/components/ui/badge";
import Icon, { mappings } from "@/components/ui/custom/icon";
import { capitalize } from "@/lib/utils";
import { FullTxn } from "@/types";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export default function TxnListItem({ txn }: { txn: FullTxn }) {
  return (
    <div className="grid grid-cols-12 items-center w-full">
      <div className="flex md:flex-row gap-1 items-center col-span-2">
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

      <div className="text-sm text-muted-foreground col-span-7 md:col-span-4 truncate text-left">
        {!txn.description ? txn.category.name : txn.description}
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
      <AmountField
        amount={txn.amount}
        className="text-xl col-span-3 md:col-span-2"
      />
    </div>
  );
}
