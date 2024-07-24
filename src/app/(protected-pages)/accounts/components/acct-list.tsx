"use client";
import PaginationWrapper from "@/components/common/pagination-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getUserAccts } from "@/server/accounts.actions";
import type { AcctType, InvestmentType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2, PlusCircle } from "lucide-react";
import AcctPagination from "./acct-pagination";
import AddAcctBtn from "./add-acct-btn";
import EmptyAcctList from "./empty-acct-list";
import InvestmentAcctList from "./investment-acct-list";
import NonInvestmentAcctList from "./non-investment-acct-list";

type Props = {
  type: AcctType;
  invType?: InvestmentType;
};

export default function AcctList({ type, invType }: Props) {
  const { data: accounts, isLoading } = useQuery({
    queryKey: ["user-accounts"],
    queryFn: async () => await getUserAccts(),
  });

  if (isLoading) return <Loader2 className="animate-spin size-4" />;

  let acctsData = accounts?.data.filter((a) => a.type === type);
  if (invType) acctsData = acctsData?.filter((a) => a.inv_type === invType);
  const totalAccts = acctsData?.length ?? 0;

  return (
    <PaginationWrapper dataLength={totalAccts}>
      <Card>
        <CardHeader className="bg-muted/50 relative">
          <CardTitle className="capitalize">{type} accounts</CardTitle>
          <CardDescription>
            You have {totalAccts} account{totalAccts > 1 && "s"}
          </CardDescription>

          <AddAcctBtn
            type={type as AcctType}
            className="absolute top-4 right-4"
          >
            <Button size="sm">
              <PlusCircle className="sm:mr-2 size-4" />
              <span className="sr-only sm:not-sr-only">Add Account</span>
            </Button>
          </AddAcctBtn>
        </CardHeader>
        <CardContent className="py-4">
          {type !== "investment" && (
            <NonInvestmentAcctList accounts={acctsData ?? []} type={type} />
          )}
          {type === "investment" && (
            <InvestmentAcctList
              accounts={acctsData ?? []}
              invType={invType ?? acctsData?.[0].inv_type ?? "equity"}
            />
          )}
        </CardContent>

        <CardFooter
          className={cn("w-full", totalAccts > 0 && "px-4 py-2 bg-muted/50")}
        >
          {totalAccts > 0 ? (
            <AcctPagination />
          ) : (
            <EmptyAcctList type={type} invType={invType} />
          )}
        </CardFooter>
      </Card>
    </PaginationWrapper>
  );
}
