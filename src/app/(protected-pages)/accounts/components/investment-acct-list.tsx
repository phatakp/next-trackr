import { usePagination } from "@/components/common/pagination-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FullAccount, InvestmentType } from "@/types";
import Link from "next/link";
import AcctListItem from "./acct-list-item";

type Props = {
  accounts: FullAccount[];
  invType: InvestmentType;
};

export default function InvestmentAcctList({ accounts, invType }: Props) {
  const { start, end } = usePagination();
  const pageData = accounts.slice(start, end);

  return (
    <Tabs defaultValue={invType as string} className="w-full">
      <TabsList>
        <Link href={"/accounts?type=investment&invType=equity"}>
          <TabsTrigger value="equity">Equity</TabsTrigger>
        </Link>
        <Link href={"/accounts?type=investment&invType=fund"}>
          <TabsTrigger value="fund">Mutual Fund</TabsTrigger>
        </Link>
        <Link href={"/accounts?type=investment&invType=fd"}>
          <TabsTrigger value="fd">FD</TabsTrigger>
        </Link>
      </TabsList>
      <TabsContent value="equity">
        {pageData?.map((acct) => (
          <AcctListItem key={acct.id} acct={acct} />
        ))}
      </TabsContent>
      <TabsContent value="fund">
        {pageData.map((acct) => (
          <AcctListItem key={acct.id} acct={acct} />
        ))}
      </TabsContent>
      <TabsContent value="fd">
        {pageData.map((acct) => (
          <AcctListItem key={acct.id} acct={acct} />
        ))}
      </TabsContent>
    </Tabs>
  );
}
