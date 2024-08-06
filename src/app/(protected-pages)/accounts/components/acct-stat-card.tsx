"use client";

import { useAcctPageContext } from "@/app/(protected-pages)/accounts/contexts/acct-page-context";
import { AmountField } from "@/components/common/amt-field";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    capitalize,
    cn,
    getCurrTypeValue,
    getInvestmentReturn,
    getTotalAssets,
    getTotalLiabilities,
} from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
    className?: string;
};

export default function AcctStatCard({ className }: Props) {
    const { stats, type } = useAcctPageContext();
    const currTypeValue = getCurrTypeValue(stats ?? [], type);
    let investment = 0;
    if (type === "investment") investment = getInvestmentReturn(stats ?? []);

    const isAsset = ["savings", "wallet", "investment"].includes(type);

    const assets = getTotalAssets(stats ?? []);
    const liabilities = getTotalLiabilities(stats ?? []);
    const title = `Total ${capitalize(type)}`;
    const returns = isAsset
        ? assets > 0
            ? (currTypeValue / assets) * 100
            : 0
        : liabilities > 0
        ? (currTypeValue / liabilities) * 100
        : 0;
    const returnText = `of your ${isAsset ? "assets" : "liabilities"}`;

    return (
        <>
            <Card className={cn("hidden sm:block", className)}>
                <CardHeader className="pb-3">
                    <CardDescription>{title}</CardDescription>
                    <CardTitle>
                        <div className="relative w-fit">
                            <AmountField
                                amount={currTypeValue}
                                className="text-4xl justify-start"
                            />
                            {title.toLowerCase().includes("investment") && (
                                <Badge
                                    variant={
                                        investment < 0
                                            ? "destructive"
                                            : "success"
                                    }
                                    className="absolute top-0 -right-8 translate-x-1/2"
                                >
                                    {investment.toFixed()}%
                                    {investment < 0 ? (
                                        <ChevronDown className="size-4" />
                                    ) : (
                                        <ChevronUp className="size-4" />
                                    )}
                                </Badge>
                            )}
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="py-0 pb-1">
                    <div className="text-xs text-muted-foreground">
                        {`${returns.toFixed()}% ${returnText}`}
                    </div>
                </CardContent>
                <CardFooter>
                    <Progress
                        value={returns}
                        aria-label={`${returns.toFixed()}% ${returnText}`}
                    />
                </CardFooter>
            </Card>

            <Card className="flex items-center justify-between gap-4 sm:hidden  p-4">
                <div className="grid gap-1 w-full">
                    <span className="text-sm text-muted-foreground">
                        {title}
                    </span>
                    <Progress
                        value={returns}
                        aria-label={`${returns.toFixed()}% ${returnText}`}
                    />
                    <div className="text-xs text-muted-foreground">
                        {`${returns.toFixed()}% ${returnText}`}
                    </div>
                </div>
                <div className="flex flex-col gap-1 relative items-end">
                    <AmountField
                        amount={currTypeValue}
                        className="justify-end"
                    />
                    {title.toLowerCase().includes("investment") && (
                        <Badge
                            variant={investment < 0 ? "destructive" : "success"}
                            className="w-fit"
                        >
                            {investment.toFixed()}%
                            {investment < 0 ? (
                                <ChevronDown className="size-4" />
                            ) : (
                                <ChevronUp className="size-4" />
                            )}
                        </Badge>
                    )}
                </div>
            </Card>
        </>
    );
}
