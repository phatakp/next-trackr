import {
  ModalButton,
  ModalContent,
  ModalWrapper,
} from "@/components/ui/custom/modal-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AcctType, InvestmentType } from "@/types";
import { ReactNode } from "react";
import AcctFormWrapper from "./acct-form-wrapper";

type Props = {
  children: ReactNode;
  type?: AcctType;
  invType?: InvestmentType;
  className?: string;
};

export default function AddAcctBtn({
  className,
  children,
  type,
  invType,
}: Props) {
  return (
    <ModalWrapper>
      <ModalButton className={className}>{children}</ModalButton>
      <ModalContent
        title="Add New Account"
        description="Enter details for new account"
      >
        <div className="w-full my-4">
          <Tabs
            defaultValue={
              type === "investment" ? "investment" : "non-investment"
            }
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="non-investment">Non Investment</TabsTrigger>
              <TabsTrigger value="investment">Investment</TabsTrigger>
            </TabsList>
            <TabsContent value="non-investment">
              <AcctFormWrapper type={type as AcctType} />
            </TabsContent>
            <TabsContent value="investment">
              <AcctFormWrapper type="investment" invType={invType ?? "fund"} />
            </TabsContent>
          </Tabs>
        </div>
      </ModalContent>
    </ModalWrapper>
  );
}
