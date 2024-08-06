import {
    ModalButton,
    ModalContent,
    ModalWrapper,
} from "@/components/ui/custom/modal-wrapper";
import TabWrapper from "@/components/ui/custom/tab-wrapper";
import { TabsContent } from "@/components/ui/tabs";
import { siteConfig } from "@/lib/site-config";
import { capitalize } from "@/lib/utils";
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
                    <TabWrapper
                        tabOptions={siteConfig.txnTypes.map((o) => ({
                            label: capitalize(o),
                            value: o,
                        }))}
                        defaultValue={txn.type}
                        isDisabled
                    >
                        {siteConfig.txnTypes.map((o) => (
                            <TabsContent key={o} value={o}>
                                <TxnForm type={o} txn={txn} />
                            </TabsContent>
                        ))}
                    </TabWrapper>
                </div>
            </ModalContent>
        </ModalWrapper>
    );
}
