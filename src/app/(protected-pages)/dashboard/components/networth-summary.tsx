"use client";

import { AmountField } from "@/components/common/amt-field";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import { useAcctPageContext } from "../../accounts/contexts/acct-page-context";

const chartConfig = {
    liquid: {
        label: "Liquid",
        color: "hsl(var(--chart-1))",
    },
    investment: {
        label: "Investment",
        color: "hsl(var(--chart-2))",
    },
    liabilities: {
        label: "Liabilities",
        color: "hsl(var(--chart-3))",
    },
};

export default function NetworthSummary() {
    const { liquid, liabilities, totalInvestment } = useAcctPageContext();
    const assets = liquid + totalInvestment;
    const networth = assets - liabilities;
    const liabilityRatio = networth > 0 ? (liabilities / networth) * 100 : 0;
    const liquidRatio =
        (assets > 0 ? (liquid / assets) * 100 : 0) - liabilityRatio / 2;
    const investmentRatio =
        (assets > 0 ? (totalInvestment / assets) * 100 : 0) -
        liabilityRatio / 2;
    const data = [
        {
            activity: "liquid",
            value: liquid,
            label: `${liquidRatio.toFixed(1)}%`,
            fill: "var(--color-liquid)",
        },
        {
            activity: "investment",
            value: totalInvestment,
            label: `${investmentRatio.toFixed(1)}%`,
            fill: "var(--color-investment)",
        },
        {
            activity: "liabilities",
            value: liabilities,
            label: `${liabilityRatio.toFixed(1)}%`,
            fill: "var(--color-liabilities)",
        },
    ];

    return (
        <Card className="sm:col-span-2">
            <CardHeader>
                <CardTitle>Networth distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4 py-4 px-2 pb-2">
                <ChartContainer
                    config={chartConfig}
                    className="h-[140px] w-full"
                >
                    <BarChart
                        margin={{
                            left: 10,
                            right: 0,
                            top: 0,
                            bottom: 10,
                        }}
                        data={data}
                        layout="vertical"
                        barSize={32}
                        barGap={2}
                    >
                        <XAxis type="number" dataKey="value" hide />
                        <YAxis
                            dataKey="activity"
                            type="category"
                            tickLine={false}
                            tickMargin={0}
                            axisLine={false}
                            className="capitalize"
                        />
                        <Bar dataKey="value" radius={5}>
                            <LabelList
                                position="insideLeft"
                                dataKey="label"
                                fill="white"
                                offset={12}
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex flex-row border-t px-2 py-4">
                <div className="flex w-full items-center gap-1">
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                        <div className="text-xs text-muted-foreground ">
                            Liquid
                        </div>
                        <AmountField
                            amount={liquid}
                            className="text-lg sm:text-xl justify-start"
                            icon
                        />
                    </div>
                    <Separator
                        orientation="vertical"
                        className="mx-2 h-10 w-px"
                    />
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                        <div className="text-xs text-muted-foreground">
                            Investment
                        </div>
                        <AmountField
                            amount={totalInvestment}
                            className="text-lg sm:text-xl justify-start"
                            icon
                        />
                    </div>
                    <Separator
                        orientation="vertical"
                        className="mx-2 h-10 w-px"
                    />
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                        <div className="text-xs text-muted-foreground">
                            Liabilities
                        </div>
                        <AmountField
                            amount={liabilities}
                            className="text-lg sm:text-xl justify-start"
                            icon
                        />
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
