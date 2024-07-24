import {
  ModalButton,
  ModalContent,
  ModalWrapper,
} from "@/components/ui/custom/modal-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FullTxn } from "@/types";
import { ReactNode } from "react";
import TxnForm from "./txn-form";

type Props = {
  children: ReactNode;
  txn: FullTxn;
};

export default function EditTxnBtn({ children, txn }: Props) {
  return (
    <ModalWrapper>
      <ModalButton>{children}</ModalButton>
      <ModalContent
        title="Update Transaction"
        description="Enter details to change"
      >
        <div className="w-full my-4">
          <Tabs defaultValue={txn.type} className="w-full">
            <TabsList>
              <TabsTrigger value="expense" disabled>
                Expense
              </TabsTrigger>
              <TabsTrigger value="income" disabled>
                Income
              </TabsTrigger>
              <TabsTrigger value="transfer" disabled>
                Transfer
              </TabsTrigger>
            </TabsList>
            <TabsContent value="expense">
              <TxnForm type={"expense"} txn={txn} />
            </TabsContent>
            <TabsContent value="income">
              <TxnForm type={"income"} txn={txn} />
            </TabsContent>
            <TabsContent value="transfer">
              <TxnForm type={"transfer"} txn={txn} />
            </TabsContent>
          </Tabs>
        </div>
      </ModalContent>
    </ModalWrapper>
  );
}
