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
import { getAcctStats } from "@/server/accounts.actions";
import { useQuery } from "@tanstack/react-query";

const chartConfig = {
  balance: {
    label: "Balance",
  },
  Savings: {
    label: "Savings",
    color: "hsl(var(--chart-1))",
  },
  "Credit-card": {
    label: "Credit-Card",
    color: "hsl(var(--chart-2))",
  },
  Wallet: {
    label: "Wallet",
    color: "hsl(var(--chart-3))",
  },
  Investment: {
    label: "Investment",
    color: "hsl(var(--chart-4))",
  },
  Mortgage: {
    label: "Mortgage",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function AcctSummaryChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["acct-stats"],
    queryFn: () => getAcctStats(),
  });
  const chartData = data?.data.stats.map((s, i) => ({
    types: capitalize(s.type),
    balance: s.tot_value,
    fill: `hsl(var(--chart-${i + 1}))`,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accounts-Summary</CardTitle>
        <CardDescription>Balance in accounts</CardDescription>
      </CardHeader>
      <CardContent>
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
              dataKey="types"
              type="category"
              tickLine={false}
              tickMargin={1}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="balance" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="balance" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total balance by Account Types
        </div>
      </CardFooter>
    </Card>
  );
}
