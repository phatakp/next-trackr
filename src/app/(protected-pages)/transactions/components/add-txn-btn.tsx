import {
  ModalButton,
  ModalContent,
  ModalWrapper,
} from "@/components/ui/custom/modal-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";
import TxnForm from "./txn-form";

export default function AddTxnBtn({ children }: { children: ReactNode }) {
  return (
    <ModalWrapper>
      <ModalButton>{children}</ModalButton>
      <ModalContent
        title="Add New Transaction"
        description="Enter details for new txn"
      >
        <div className="w-full my-4">
          <Tabs defaultValue={"expense"} className="w-full">
            <TabsList>
              <TabsTrigger value="expense">Expense</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="transfer">Transfer</TabsTrigger>
            </TabsList>
            <TabsContent value="expense">
              <TxnForm type={"expense"} />
            </TabsContent>
            <TabsContent value="income">
              <TxnForm type={"income"} />
            </TabsContent>
            <TabsContent value="transfer">
              <TxnForm type={"transfer"} />
            </TabsContent>
          </Tabs>
        </div>
      </ModalContent>
    </ModalWrapper>
  );
}
