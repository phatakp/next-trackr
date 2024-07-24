import { usePagination } from "@/components/common/pagination-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AcctType, FullAccount } from "@/types";
import { CreditCard, Landmark, PiggyBank, WalletMinimal } from "lucide-react";
import Link from "next/link";
import AcctListItem from "./acct-list-item";

type Props = {
  type: AcctType;
  accounts: FullAccount[];
};

export default function NonInvestmentAcctList({ accounts, type }: Props) {
  const { start, end } = usePagination();
  const pageData = accounts.slice(start, end);

  return (
    <Tabs defaultValue={type} className="w-full">
      <TabsList>
        <Link href={"/accounts?type=savings"}>
          <TabsTrigger value="savings">
            <PiggyBank className="sm:hidden size-6" />
            <span className="hidden sm:flex">Savings</span>
          </TabsTrigger>
        </Link>
        <Link href={"/accounts?type=wallet"}>
          <TabsTrigger value="wallet">
            <WalletMinimal className="sm:hidden size-6" />
            <span className="hidden sm:flex">Wallet</span>
          </TabsTrigger>
        </Link>
        <Link href={"/accounts?type=credit-card"}>
          <TabsTrigger value="credit-card">
            <CreditCard className="sm:hidden size-6" />
            <span className="hidden sm:flex">Credit Card</span>
          </TabsTrigger>
        </Link>
        <Link href={"/accounts?type=mortgage"}>
          <TabsTrigger value="Mortgage">
            <Landmark className="sm:hidden size-6" />
            <span className="hidden sm:flex">Mortgage</span>
          </TabsTrigger>
        </Link>
      </TabsList>
      <TabsContent value="savings">
        {pageData.map((acct) => (
          <AcctListItem key={acct.id} acct={acct} />
        ))}
      </TabsContent>
      <TabsContent value="wallet">
        {pageData.map((acct) => (
          <AcctListItem key={acct.id} acct={acct} />
        ))}
      </TabsContent>
      <TabsContent value="credit-card">
        {pageData.map((acct) => (
          <AcctListItem key={acct.id} acct={acct} />
        ))}
      </TabsContent>
      <TabsContent value="mortgage">
        {pageData.map((acct) => (
          <AcctListItem key={acct.id} acct={acct} />
        ))}
      </TabsContent>
    </Tabs>
  );
}
