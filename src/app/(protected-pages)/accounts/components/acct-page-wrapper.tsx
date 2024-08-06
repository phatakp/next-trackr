import PaginationWrapper from "@/components/common/pagination-wrapper";
import { Card } from "@/components/ui/card";
import TabWrapper from "@/components/ui/custom/tab-wrapper";
import { TabsContent } from "@/components/ui/tabs";
import {
    investmentOptions,
    nonInvestmentOptions,
    siteConfig,
} from "@/lib/site-config";
import { getAcctStats, getUserAccts } from "@/server/accounts.actions";
import type { AcctType, InvestmentType } from "@/types";
import AcctPageProvider from "../contexts/acct-page-context";
import AcctList from "./acct-list";
import AcctStatCard from "./acct-stat-card";
import DistributionChart from "./distribution-chart";

type Props = {
    type: AcctType;
    invType?: InvestmentType;
};

export default async function AcctPageWrapper({ type, invType }: Props) {
    const { data: stats, error } = await getAcctStats();
    if (error) throw new Error("Get Acct Stats Err: " + error);

    const { data: accounts, error: acctError } = await getUserAccts();
    if (acctError) throw new Error("Get Accts Err: " + acctError);

    return (
        <AcctPageProvider
            accounts={accounts}
            stats={stats}
            type={type}
            invType={invType}
        >
            <TabWrapper
                value={type === "investment" ? "investment" : "non-investment"}
                tabOptions={siteConfig.acctTabOptions}
            >
                {siteConfig.acctTabOptions.map((opt) => (
                    <TabsContent key={opt.value} value={opt.value}>
                        <TabWrapper
                            value={
                                !invType
                                    ? (type as string)
                                    : (invType as string)
                            }
                            tabOptions={
                                type === "investment"
                                    ? investmentOptions
                                    : nonInvestmentOptions
                            }
                        >
                            {(
                                siteConfig.acctTypes.filter(
                                    (t) => t !== "investment"
                                ) as string[]
                            )
                                .concat(siteConfig.invTypes)
                                .map((val) => (
                                    <TabsContent key={val} value={val}>
                                        <div className="grid gap-6 md:grid-cols-[1fr_300px] lg:grid-cols-3 lg:gap-8">
                                            <div className="grid auto-rows-max items-start gap-6 lg:col-span-2 lg:gap-8">
                                                <AcctStatCard />

                                                <PaginationWrapper>
                                                    <AcctList />
                                                </PaginationWrapper>
                                            </div>
                                            <div className="grid auto-rows-max items-start gap-6 lg:gap-8">
                                                <DistributionChart />
                                                <Card>Ttrans</Card>
                                            </div>
                                        </div>
                                    </TabsContent>
                                ))}
                        </TabWrapper>
                    </TabsContent>
                ))}
            </TabWrapper>
        </AcctPageProvider>
    );
}
