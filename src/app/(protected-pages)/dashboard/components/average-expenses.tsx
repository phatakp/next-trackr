"use client";

import { AmountField } from "@/components/common/amt-field";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
    const data = stats.data.map((d) => ({ month: d.key, expenses: d.expense }));

    return (
        <Card className={cn("relative", className)}>
            <CardHeader className="p-4 pb-0">
                <CardDescription>Average Expenses</CardDescription>
                <CardTitle className="flex items-center gap-2">
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
            <CardFooter className="px-4">
                <div className="md:absolute md:inset-x-0 md:bottom-4 md:px-4">
                    This is the average you are spending per month
                </div>
                {/* <ChartContainer
                    config={{
                        expenses: {
                            label: "Expenses",
                            color: "hsl(var(--chart-1))",
                        },
                    }}
                    className="max-w-sm"
                >
                    <BarChart
                        accessibilityLayer
                        margin={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        }}
                        data={data}
                    >
                        <Bar
                            dataKey="expenses"
                            fill="var(--color-expenses)"
                            radius={2}
                            fillOpacity={0.2}
                            activeIndex={data.length - 1}
                            activeBar={<Rectangle fillOpacity={0.8} />}
                        />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={4}
                            hide
                        />
                    </BarChart>
                </ChartContainer> */}
            </CardFooter>
        </Card>
    );
}
