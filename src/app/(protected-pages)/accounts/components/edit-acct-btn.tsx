"use client";
import { Button } from "@/components/ui/button";
import ModalWrapper from "@/components/ui/custom/modal-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FullAccount, InvestmentType } from "@/types";
import { Edit2 } from "lucide-react";
import InvestmentFormWrapper from "./investment-form-wrapper";
import NonInvestmentFormWrapper from "./non-investment-form-wrapper";

type Props = {
  acct: FullAccount;
};

export default function EditAcctBtn({ acct }: Props) {
  return (
    <ModalWrapper
      title="Edit Account"
      description="Modify details for the account"
      button={
        <Button variant={"link"} className="group">
          <Edit2 className="size-4 text-muted-foreground group-hover:opacity-85" />
        </Button>
      }
    >
      <div className="w-full my-4">
        <Tabs
          defaultValue={
            acct.type === "investment" ? "investment" : "non-investment"
          }
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="non-investment" disabled={!!acct}>
              Non Investment
            </TabsTrigger>
            <TabsTrigger value="investment" disabled={!!acct}>
              Investment
            </TabsTrigger>
          </TabsList>
          <TabsContent value="non-investment">
            <NonInvestmentFormWrapper type={acct.type} acct={acct} />
          </TabsContent>
          <TabsContent value="investment">
            <InvestmentFormWrapper
              invType={acct.inv_type as InvestmentType}
              acct={acct}
            />
          </TabsContent>
        </Tabs>
      </div>
    </ModalWrapper>
  );
}
