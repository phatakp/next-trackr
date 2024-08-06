"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getGroupStats } from "@/server/groups.actions";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useGroupContext } from "./group-context";

const RADIUS = [
  [0, 0, 4, 4],
  [4, 4, 0, 0],
];

export default function AcctSummaryChart() {
  const { currGroup } = useGroupContext();
  const { data: stats, isLoading } = useQuery({
    queryKey: ["group-stats", currGroup],
    queryFn: () => getGroupStats(currGroup),
  });

  if (isLoading) return <Loader2 className="size-4 animate-spin" />;
  const config = stats?.data?.map((s) => ({ [s.name]: { label: s.name } }));
  const chartConfig = config?.reduce((obj, item) => ({
    ...obj,
    ...item,
  })) as ChartConfig;

  const liquids = stats?.data
    ?.map((s) => ({
      ...s,
      type: "Liquid",
      [s.name]: Math.floor(s.assets - s.investment),
    }))
    .reduce((obj, s) => ({ ...s, ...obj }));
  const investments = stats?.data
    ?.map((s) => ({
      ...s,
      type: "Investment",
      [s.name]: Math.floor(s.investment),
    }))
    .reduce((obj, s) => ({ ...s, ...obj }));
  const liabilities = stats?.data
    ?.map((s) => ({
      ...s,
      type: "Liabilities",
      [s.name]: Math.floor(s.liabilities),
    }))
    .reduce((obj, s) => ({ ...s, ...obj }));
  const chartData = [liquids, investments, liabilities];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Account Summary</CardTitle>
        <CardDescription>Fund distribution for group accoounts</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="type"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              //   tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            {stats?.data?.map((s, i) => (
              <Bar
                key={s.name}
                dataKey={s.name}
                stackId="a"
                fill={`hsl(var(--chart-${i + 1}))`}
                radius={RADIUS[i] as [number, number, number, number]}
              />
            ))}
            {/* <Bar
              dataKey="Parul"
              stackId="a"
              fill="var(--color-Parul)"
              radius={[4, 4, 0, 0]}
            /> */}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
