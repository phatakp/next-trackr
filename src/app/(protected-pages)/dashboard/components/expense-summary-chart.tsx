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

    const statsConfig =
        stats?.data?.reduce(
            (
                x: {
                    [key: string]: {
                        key: string;
                        expense: number;
                        income: number;
                    }[];
                },
                y
            ) => {
                (x[y.key] = x[y.key as any] || []).push(y);

                return x;
            },
            {}
        ) ?? {};

    const chartData = Object.keys(statsConfig)?.map((key) => ({
        month: key,
        expense: statsConfig[key].reduce((acc, b) => acc + b.expense, 0),
        income: statsConfig[key].reduce((acc, b) => acc + b.income, 0),
    }));

    console.log(chartData);

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
                            tickFormatter={(value) => value.slice(0, 3)}
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
