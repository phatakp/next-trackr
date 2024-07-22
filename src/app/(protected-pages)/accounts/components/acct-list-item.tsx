import { AmountField } from "@/components/common/amt-field";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";
import { capitalize, masked_acct } from "@/lib/utils";
import { FullAccount } from "@/types";
import { CircleChevronUp } from "lucide-react";
import AcctDeleteForm from "./acct-delete-form";
import EditAcctBtn from "./edit-acct-btn";

export default function AcctListItem({ acct }: { acct: FullAccount }) {
  const returns = ((acct.curr_value - acct.balance) / acct.balance) * 100;
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`${acct.id}`}>
        <AccordionTrigger className="py-2 rounded w-full px-4">
          <div className="grid text-left flex-1">
            <span className="font-medium">
              {acct.name === siteConfig.cashBankName
                ? acct.number
                : masked_acct(acct.number)}
            </span>
            <span className="text-sm text-muted-foreground dark:text-primary-foreground/70 inline truncate max-w-[100px] sm:w-full">
              {acct.name}
            </span>
          </div>
          <AmountField amount={acct.curr_value} className="text-base" />
        </AccordionTrigger>
        <AccordionContent>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{acct.number}</CardTitle>
              <CardDescription className="truncate max-w-[200px] sm:max-w-full">
                {acct.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 w-full mb-8 flex-wrap">
                <Badge className="whitespace-nowrap">{acct.bank.name}</Badge>
                {acct.type !== "investment" && (
                  <Badge variant={"outline"} className="whitespace-nowrap">
                    {capitalize(acct.type)}
                  </Badge>
                )}
                {acct.type === "investment" && (
                  <>
                    <Badge variant={"outline"}>
                      {acct.inv_type === "equity"
                        ? "Equity"
                        : acct.inv_type === "fd"
                        ? "FD"
                        : "Mutual Fund"}
                    </Badge>
                    {acct.inv_type === "fund" && (
                      <>
                        <Badge variant={"outline"}>
                          {acct.mf?.is_sip ? "SIP" : "Onetime"}
                        </Badge>
                        <Badge variant={"outline"}>
                          <span className="text-muted-foreground">NAV:</span>
                          &nbsp;
                          {acct.mf?.nav}
                        </Badge>
                        <Badge variant={"outline"}>
                          <span className="text-muted-foreground">Units:</span>
                          &nbsp;
                          {acct.mf?.units}
                        </Badge>
                      </>
                    )}
                    {acct.inv_type === "equity" && (
                      <>
                        <Badge variant={"outline"}>
                          <span className="text-muted-foreground">Avg:</span>
                          &nbsp;
                          {acct.equity?.buy_price}
                        </Badge>
                        <Badge variant={"outline"}>
                          <span className="text-muted-foreground">LTP:</span>
                          &nbsp;
                          {acct.equity?.curr_price}
                        </Badge>
                        <Badge variant={"outline"}>
                          <span className="text-muted-foreground">Qty:</span>
                          &nbsp;
                          {acct.equity?.quantity}
                        </Badge>
                      </>
                    )}
                  </>
                )}
                <Badge variant={"outline"} className="whitespace-nowrap">
                  <span className="text-muted-foreground">As Of:</span>&nbsp;
                  {acct.as_of_date}
                </Badge>
              </div>
              <div className="relative w-fit">
                <AmountField
                  amount={acct.curr_value}
                  className="justify-start text-3xl"
                  full
                />
                {acct.type === "investment" && returns >= 0 && (
                  <CircleChevronUp className="bg-success text-success-foreground size-4 rounded-full absolute -right-8 top-1/2 -translate-y-1/2" />
                )}
                {acct.type === "investment" && returns < 0 && (
                  <CircleChevronUp className="bg-destructive text-destructive-foreground size-4 rounded-full " />
                )}
                {acct.type === "investment" && (
                  <span className="text-sm absolute -right-16 top-1/2 -translate-y-1/2">
                    {returns.toFixed()}%
                  </span>
                )}
              </div>
              {acct.type === "investment" && (
                <AmountField
                  amount={acct.balance}
                  className="justify-start text-sm text-muted-foreground"
                  full
                />
              )}

              <div className="flex items-center justify-end">
                <EditAcctBtn acct={acct} />
                <AcctDeleteForm id={acct.id} name={acct.name} />
              </div>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
