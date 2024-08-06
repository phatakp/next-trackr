"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { getMonthlyExpenseStats } from "@/server/txn.actions";
import { useQuery } from "@tanstack/react-query";

const chartConfig = {
    expense: {
        label: "Expense",
        color: "hsl(var(--chart-1))",
    },
    income: {
        label: "Income",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export default function ExpenseSummaryChart() {
    const { data: stats, isLoading } = useQuery({
        queryKey: ["exp-summary"],
        queryFn: () => getMonthlyExpenseStats(),
        refetchOnWindowFocus: true,
    });

    const chartData = stats?.data
        ?.reduce(
            (acc, d) => {
                const found = acc.find((a) => a.month === d.key);
                const value = {
                    month: d.key,
                    expense: d.expense,
                    income: d.income,
                };
                if (!found) {
                    acc.push(value);
                } else {
                    found.expense += d.expense;
                    found.income += d.income;
                }
                return acc;
            },
            [{ month: "", expense: 0, income: 0 }]
        )
        .filter((d) => d.month !== "");

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0 text-center">
                <CardTitle>Expense vs Income Summary</CardTitle>
                <CardDescription>Last 5 months</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(2)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar
                            dataKey="expense"
                            fill="var(--color-expense)"
                            radius={4}
                        />
                        <Bar
                            dataKey="income"
                            fill="var(--color-income)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm text-balance text-center">
                <div className="leading-none text-muted-foreground">
                    Showing total expense vs income for the last 5 months
                </div>
            </CardFooter>
        </Card>
    );
}
