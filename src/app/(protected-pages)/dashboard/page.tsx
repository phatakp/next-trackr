import { getAcctStats } from "@/server/accounts.actions";
import AcctPageProvider from "../accounts/contexts/acct-page-context";
import AcctSummaryChart from "./components/acct-summary-chart";
import AverageExpenses from "./components/average-expenses";
import ExpenseSummaryChart from "./components/expense-summary-chart";
import NetworthCard from "./components/networth-card";
import TopExpenseChart from "./components/top-expense-chart";

export default async function DashboardPage() {
    const { data: stats, error } = await getAcctStats();
    if (error) throw new Error("Get Acct Stats Err: " + error);

    return (
        <AcctPageProvider stats={stats}>
            <main className="grid flex-1 items-start gap-6 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <div className="grid auto-rows-max items-start gap-6 md:gap-8 lg:col-span-2">
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                        <NetworthCard className="sm:col-span-2" />
                        {/* <NetworthSummary /> */}
                        <AverageExpenses className="sm:col-span-2" />
                    </div>

                    <ExpenseSummaryChart />
                </div>
                <div className="grid gap-4">
                    <AcctSummaryChart />
                    <TopExpenseChart />
                </div>
            </main>
        </AcctPageProvider>
    );
}
