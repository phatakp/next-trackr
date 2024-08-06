"use client";

import { AmountField } from "@/components/common/amt-field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { getAccountChartData } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import { useAcctPageContext } from "../contexts/acct-page-context";

const classNames =
    "text-chart1 text-chart2 text-chart3 text-chart4 text-chart5";

export default function DistributionChart() {
    const { stats, type } = useAcctPageContext();
    const { data, isLoading } = useQuery({
        queryKey: ["acct-distribution", stats, type],
        queryFn: () => getAccountChartData(stats ?? [], type!),
    });
    if (isLoading) return <Loader2 className="animate-spin size-4" />;
    if (!data) return "Error could not get data";

    let chartConfig = {};
    chartConfig = data.map((d, i) => ({
        ...chartConfig,
        [d.title]: {
            label: d.title,
            color: `hsl(var(--chart-${i + 1}))`,
        },
    }));

    const chartData = data.map((d, i) => ({
        activity: d.title,
        value: d.value,
        fill: `hsl(var(--chart-${i + 1}))`,
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Wealth Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4 p-4">
                <div className="grid items-center gap-2">
                    {data.map((d, i) => (
                        <div
                            className="grid flex-1 auto-rows-min gap-0.5"
                            key={d.title}
                        >
                            <div
                                className={`text-sm text-chart${
                                    i + 1
                                } capitalize`}
                            >
                                {d.title === "fund"
                                    ? "Mutual Fund"
                                    : d.title === "fd"
                                    ? "Deposit"
                                    : d.title}
                            </div>
                            <AmountField
                                amount={d.value}
                                className="justify-start"
                            />
                        </div>
                    ))}
                </div>
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[80%]"
                >
                    <RadialBarChart
                        margin={{
                            left: -10,
                            right: -10,
                            top: -10,
                            bottom: -10,
                        }}
                        data={chartData}
                        innerRadius="20%"
                        barSize={24}
                        startAngle={90}
                        endAngle={450}
                    >
                        <PolarAngleAxis
                            type="number"
                            domain={[0, 100]}
                            dataKey="value"
                            tick={false}
                        />
                        <RadialBar
                            dataKey="value"
                            background
                            cornerRadius={5}
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
