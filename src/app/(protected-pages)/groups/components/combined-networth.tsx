"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import { AmountField } from "@/components/common/amt-field";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { amountFormatter } from "@/lib/utils";
import { getGroupStats } from "@/server/groups.actions";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useGroupContext } from "./group-context";

const COLORS = [
  { color: "hsl(var(--chart-1))", foreground: "white" },
  { color: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
];

export default function CombinedNetworth() {
  const { currGroup, isGroupLoading } = useGroupContext();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["getGroupStats", currGroup],
    queryFn: () => getGroupStats(currGroup ?? 0),
    enabled: !!currGroup,
  });

  if (isGroupLoading || isLoading)
    return <Loader2 className="size-4 animate-spin" />;

  if (!stats?.data) return;
  const chartData = stats.data.map((d, i) => ({
    name: d.name,
    amount: d.networth,
    ...COLORS[i],
  }));

  const networth = chartData.reduce((acc, b) => acc + b.amount, 0);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Group Networth</CardTitle>
        <Badge className="sm:w-fit text-2xl" variant={"outline"}>
          <span className="text-sm text-muted-foreground">INR</span>
          {amountFormatter(networth)}
          {/* <AmountField
            amount={networth}
            className="justify-start text-3xl font-extrabold"
          /> */}
        </Badge>
      </CardHeader>
      <CardContent className="grid gap-4 py-4">
        {chartData.map((item) => (
          <div key={item.name} className="grid auto-rows-min gap-2">
            <AmountField amount={item.amount} className="justify-start" />
            <ChartContainer
              config={{
                amount: {
                  label: "Networth",
                  color: item.color,
                },
              }}
              className="aspect-auto h-[32px] w-full"
            >
              <BarChart
                accessibilityLayer
                layout="vertical"
                margin={{
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                }}
                data={[
                  {
                    name: item.name,
                    amount: item.amount,
                  },
                ]}
              >
                <Bar dataKey="amount" fill={item.color} radius={4} barSize={32}>
                  <LabelList
                    position="insideLeft"
                    dataKey="name"
                    offset={8}
                    fontSize={12}
                    fill={item.foreground}
                  />
                </Bar>
                <YAxis dataKey="name" type="category" tickCount={1} hide />
                <XAxis dataKey="amount" type="number" hide />
              </BarChart>
            </ChartContainer>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
