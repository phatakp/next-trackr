import StatCard from "@/app/(protected-pages)/dashboard/components/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { capitalize, getTotalAssets, getTotalLiabilities } from "@/lib/utils";
import { getAcctStats } from "@/server/accounts.actions";
import type { AcctType, InvestmentType } from "@/types";
import Link from "next/link";
import AcctList from "./acct-list";

type Props = {
  type: AcctType;
  invType?: InvestmentType;
};

export default async function AcctListWrapper({ type, invType }: Props) {
  const { data: stats, error } = await getAcctStats();
  if (error) throw new Error("Get Acct Stats Err: " + error);
  const currStat = stats?.find((s) => s.type === type);

  const assets = getTotalAssets(stats ?? []);
  const liabilities = getTotalLiabilities(stats ?? []);
  return (
    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
      <Tabs
        defaultValue={type === "investment" ? "investment" : "non-investment"}
      >
        <TabsList>
          <Link href={"/accounts?type=savings"}>
            <TabsTrigger value="non-investment">Non Investment</TabsTrigger>
          </Link>
          <Link href={"/accounts?type=investment&invType=equity"}>
            <TabsTrigger value="investment">Investment</TabsTrigger>
          </Link>
        </TabsList>

        <TabsContent value="non-investment" className="grid gap-4 lg:gap-8">
          <StatCard
            title={`Total ${capitalize(type)}`}
            value={currStat?.tot_value ?? 0}
            returns={
              currStat?.is_asset
                ? assets > 0
                  ? ((currStat?.tot_value ?? 0) / assets) * 100
                  : 0
                : liabilities > 0
                ? ((currStat?.tot_value ?? 0) / liabilities) * 100
                : 0
            }
            returnText={`of your ${
              currStat?.is_asset ? "assets" : "liabilities"
            }`}
          />
          <AcctList type={type as AcctType} />
        </TabsContent>
        <TabsContent value="investment" className="grid gap-4 lg:gap-8">
          <StatCard
            title={`Total Investment`}
            value={currStat?.tot_value ?? 0}
            returns={
              currStat?.is_asset
                ? assets > 0
                  ? ((currStat?.tot_value ?? 0) / assets) * 100
                  : 0
                : liabilities > 0
                ? ((currStat?.tot_value ?? 0) / liabilities) * 100
                : 0
            }
            returnText={`of your ${
              currStat?.is_asset ? "assets" : "liabilities"
            }`}
          />
          <AcctList
            type={type as AcctType}
            invType={invType as InvestmentType | undefined}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
