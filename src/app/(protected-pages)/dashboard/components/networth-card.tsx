"use client";

import { useAcctPageContext } from "@/app/(protected-pages)/accounts/contexts/acct-page-context";
import { AmountField } from "@/components/common/amt-field";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
};

export default function NetworthCard({ className }: Props) {
    const { assets, liquid, liabilities, totalInvestment } =
        useAcctPageContext();
    const networth = assets - liabilities;
    const returns = (networth / 10000000) * 100;

    return (
        <Card className={cn("relative", className)}>
            <CardHeader className="pb-3">
                <CardDescription>Your Networth</CardDescription>
                <CardTitle className="hidden sm:flex">
                    <div className="relative w-fit">
                        <AmountField
                            amount={networth}
                            className="text-4xl justify-start"
                            textClassName="text-lg"
                        />
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between gap-4">
                    <div className="grid gap-1 w-full md:py-8">
                        <div className="text-xs text-muted-foreground">
                            {`${returns.toFixed()}% of 1Cr target`}
                        </div>
                        <Progress
                            value={returns}
                            aria-label={`${returns.toFixed()}% of 1Cr target`}
                        />
                    </div>
                    <AmountField
                        amount={networth}
                        className=" justify-end sm:hidden"
                        textClassName="sm:text-lg"
                    />
                </div>
            </CardContent>
            <CardFooter className="flex flex-row border-t px-2 py-4 md:absolute md:bottom-0 md:inset-x-0">
                <div className="flex w-full items-center gap-1">
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                        <div className="text-sm text-muted-foreground ">
                            Liquid
                        </div>
                        <AmountField
                            amount={liquid}
                            className="text-xl sm:text-xl justify-start"
                            icon
                        />
                    </div>
                    <Separator
                        orientation="vertical"
                        className="mx-2 h-10 w-px"
                    />
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                        <div className="text-sm text-muted-foreground">
                            Investment
                        </div>
                        <AmountField
                            amount={totalInvestment}
                            className="text-xl sm:text-xl justify-start"
                            icon
                        />
                    </div>
                    <Separator
                        orientation="vertical"
                        className="mx-2 h-10 w-px"
                    />
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                        <div className="text-sm text-muted-foreground">
                            Liabilities
                        </div>
                        <AmountField
                            amount={liabilities}
                            className="text-xl sm:text-xl justify-start"
                            icon
                        />
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
