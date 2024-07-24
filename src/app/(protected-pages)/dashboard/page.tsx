import { getTotalAssets, getTotalLiabilities } from "@/lib/utils";
import { getAcctStats } from "@/server/accounts.actions";
import AcctSummaryChart from "./components/acct-summary-chart";
import ExpenseSummaryChart from "./components/expense-summary-chart";
import StatCard from "./components/stat-card";
import TopExpenseChart from "./components/top-expense-chart";

export default async function DashboardPage() {
  const { data: stats, error } = await getAcctStats();
  if (error) throw new Error("Get Acct Stats Err: " + error);

  const assets = getTotalAssets(stats ?? []);
  const liabilities = getTotalLiabilities(stats ?? []);
  const networth = assets - liabilities;

  const investmentStats = stats?.find((s) => s.type === "investment");

  return (
    <main className="grid flex-1 items-start gap-6 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-6 md:gap-8 lg:col-span-2">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Your Networth"
            value={networth}
            returns={(networth / 10000000) * 100}
            returnText="of 1Cr target"
            className="sm:col-span-2"
          />

          <StatCard
            title="Total Investment"
            value={investmentStats?.tot_value ?? 0}
            returns={investmentStats?.returns ?? 0}
            returnText="increase in value"
          />

          <StatCard
            title="Total Liabilities"
            value={liabilities}
            returns={(liabilities / assets!) * 100}
            returnText="of your assets"
          />
        </div>

        <ExpenseSummaryChart />
      </div>
      <div className="grid gap-4">
        <AcctSummaryChart />
        <TopExpenseChart />
      </div>
    </main>
  );
}
