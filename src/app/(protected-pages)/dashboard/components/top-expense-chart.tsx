"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
import { capitalize } from "@/lib/utils";
import { getExpenseStats } from "@/server/txn.actions";
import { useQuery } from "@tanstack/react-query";

const chartConfig = {
  expense: {
    label: "Tot Expense",
  },
  Food: {
    label: "Food",
    color: "hsl(var(--chart-1))",
  },
  Health: {
    label: "Health",
    color: "hsl(var(--chart-1))",
  },
  Household: {
    label: "Household",
    color: "hsl(var(--chart-1))",
  },
  Miscellaneous: {
    label: "Misc",
    color: "hsl(var(--chart-1))",
  },
  Personal: {
    label: "Personal",
    color: "hsl(var(--chart-1))",
  },
  Transportation: {
    label: "Travel",
    color: "hsl(var(--chart-1))",
  },
  Utilities: {
    label: "Utilities",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function TopExpenseChart() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["exp-stats"],
    queryFn: () => getExpenseStats(),
    refetchOnMount: true,
  });
  const chartData = stats?.data?.slice(0, 5).map((s, i) => ({
    category: capitalize(s.category),
    expense: s.tot_amt,
    fill: `hsl(var(--chart-${i + 1}))`,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 text-center">
        <CardTitle>Top Expense Categories</CardTitle>
        <CardDescription>Below are your top spend areas</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pt-4">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 16,
            }}
          >
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={1}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="expense" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="expense" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm text-balance text-center">
        <div className="leading-none text-muted-foreground">
          Showing total expenses by transaction category
        </div>
      </CardFooter>
    </Card>
  );
}
