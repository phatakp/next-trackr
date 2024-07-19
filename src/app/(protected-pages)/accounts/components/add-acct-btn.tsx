import ModalWrapper from "@/components/ui/custom/modal-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AcctType, InvestmentType } from "@/types";
import { ReactNode } from "react";
import InvestmentFormWrapper from "./investment-form-wrapper";
import NonInvestmentFormWrapper from "./non-investment-form-wrapper";

type Props = {
  button: ReactNode;
  type?: AcctType;
  invType?: InvestmentType;
};

export default function AddAcctBtn({ button, type, invType }: Props) {
  return (
    <ModalWrapper
      title="Add New Account"
      description="Enter details for new account"
      button={button}
    >
      <div className="w-full my-4">
        <Tabs
          defaultValue={type === "investment" ? "investment" : "non-investment"}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="non-investment">Non Investment</TabsTrigger>
            <TabsTrigger value="investment">Investment</TabsTrigger>
          </TabsList>
          <TabsContent value="non-investment">
            <NonInvestmentFormWrapper type={type as AcctType} />
          </TabsContent>
          <TabsContent value="investment">
            <InvestmentFormWrapper invType={invType ?? "fund"} />
          </TabsContent>
        </Tabs>
      </div>
    </ModalWrapper>
  );
}
