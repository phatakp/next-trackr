"use client";

import { AmountField } from "@/components/common/amt-field";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site-config";
import { masked_acct } from "@/lib/utils";
import { FullAccount } from "@/types";
import AcctCard from "./acct-card";

export default function AcctListItem({ acct }: { acct: FullAccount }) {
    const returns = ((acct.curr_value - acct.balance) / acct.balance) * 100;
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value={`${acct.id}`}>
                <AccordionTrigger className="py-2 rounded w-full px-4">
                    <div className="grid text-left flex-1">
                        <span className="font-medium">
                            {acct.name === siteConfig.cashBankName ||
                            acct.type === "investment"
                                ? acct.number
                                : masked_acct(acct.number)}
                        </span>
                        <span className=" font-normal text-sm text-muted-foreground dark:text-primary-foreground/70 inline truncate max-w-[100px] sm:max-w-full">
                            {acct.name}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <AmountField
                            amount={acct.curr_value}
                            className="text-base"
                        />
                        {acct.type === "investment" && (
                            <Badge
                                variant={
                                    returns < 0 ? "destructive" : "success"
                                }
                                className="w-9 px-1.5 py-0 text-center"
                            >
                                {returns.toFixed()}%
                            </Badge>
                        )}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <AcctCard acct={acct} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
