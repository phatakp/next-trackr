"use client";
import {
  ModalButton,
  ModalContent,
  ModalWrapper,
} from "@/components/ui/custom/modal-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FullAccount, InvestmentType } from "@/types";
import { ReactNode } from "react";
import InvestmentFormWrapper from "./investment-form-wrapper";
import NonInvestmentFormWrapper from "./non-investment-form-wrapper";

type Props = {
  acct: FullAccount;
  children: ReactNode;
};

export default function EditAcctBtn({ acct, children }: Props) {
  return (
    <ModalWrapper>
      <ModalButton>{children}</ModalButton>
      <ModalContent
        title="Edit Account"
        description="Modify details for the account"
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
      </ModalContent>
    </ModalWrapper>
  );
}
