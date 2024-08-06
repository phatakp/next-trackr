"use client";

import { AmountField } from "@/components/common/amt-field";
import { Area, AreaChart, XAxis, YAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { cn, shortAmount } from "@/lib/utils";
import { getMonthlyExpenseStats } from "@/server/txn.actions";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function AverageExpenses({ className }: { className?: string }) {
    const { data: stats, isLoading } = useQuery({
        queryKey: ["exp-summary"],
        queryFn: () => getMonthlyExpenseStats(),
        refetchOnWindowFocus: true,
    });

    if (isLoading) return <Loader2 className="animate-spin size-4" />;
    if (!stats?.data) return;
    const average =
        stats.data.length > 0
            ? stats.data.reduce((acc, b) => acc + b.expense, 0) /
              stats.data.length
            : 0;

    const data = stats.data
        .reduce(
            (acc, d) => {
                const found = acc.find((a) => a.month === d.key);
                const value = { month: d.key, expenses: d.expense };
                if (!found) {
                    acc.push(value);
                } else {
                    found.expenses += d.expense;
                }
                return acc;
            },
            [{ month: "", expenses: 0 }]
        )
        .filter((d) => d.expenses > 0);

    return (
        <Card className={cn("relative", className)}>
            <CardHeader className="p-4 pb-0">
                <CardDescription>Average Expenses</CardDescription>
                <CardTitle className="flex items-center py-4 gap-2">
                    <AmountField
                        amount={average}
                        full
                        className="text-4xl justify-start"
                        textClassName="text-lg"
                    />
                    <span className="text-muted-foreground text-lg">
                        / month
                    </span>
                </CardTitle>
            </CardHeader>
            {/* <CardContent className="flex items-center py-4 gap-2 md:absolute md:inset-x-0 md:bottom-4 md:px-4 md:py-8"> */}
            <CardContent className="p-0">
                <ChartContainer
                    config={{
                        expenses: {
                            label: "Expense",
                            color: "hsl(var(--chart-2))",
                        },
                    }}
                >
                    <AreaChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        }}
                    >
                        <XAxis dataKey="month" hide />
                        <YAxis domain={["dataMin - 5", "dataMax + 2"]} hide />
                        <defs>
                            <linearGradient
                                id="fillTime"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-expenses)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-expenses)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="expenses"
                            type="natural"
                            fill="url(#fillTime)"
                            fillOpacity={0.4}
                            stroke="var(--color-expenses)"
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(val) => val.slice(2)}
                                />
                            }
                            formatter={(value) => (
                                <div className="flex items-center text-xs text-muted-foreground">
                                    Expense
                                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                        {shortAmount(Number(value))}
                                        <span className="font-normal text-muted-foreground">
                                            INR
                                        </span>
                                    </div>
                                </div>
                            )}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
