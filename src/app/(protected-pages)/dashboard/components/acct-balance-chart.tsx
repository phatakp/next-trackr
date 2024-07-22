"use client";

import { TrendingUp } from "lucide-react";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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
import { capitalize, shortAmount } from "@/lib/utils";
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

export default function AcctBalanceChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["acct-stats"],
    queryFn: () => getAcctStats(),
  });

  const chartData = data?.data.stats.map((s, i) => ({
    types: capitalize(s.type),
    balance: s.tot_value,
    fill: `hsl(var(--chart-${i + 1}))`,
  }));

  const assets = React.useMemo(() => {
    return chartData
      ?.filter((a) => !["Mortgage", "Credit-card"].includes(a.types))
      .reduce((acc, curr) => acc + curr.balance, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Accounts-Summary</CardTitle>
        <CardDescription>Balance in accounts</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="balance"
              nameKey="types"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {shortAmount(assets ?? 0)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Assets
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total balances by account types
        </div>
      </CardFooter>
    </Card>
  );
}
