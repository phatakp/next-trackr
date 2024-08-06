"use client";
import {
    ModalButton,
    ModalContent,
    ModalWrapper,
} from "@/components/ui/custom/modal-wrapper";
import TabWrapper from "@/components/ui/custom/tab-wrapper";
import { TabsContent } from "@/components/ui/tabs";
import { siteConfig } from "@/lib/site-config";
import type { FullAccount, InvestmentType } from "@/types";
import { ReactNode } from "react";
import AcctFormWrapper from "./acct-form-wrapper";

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
                    <TabWrapper
                        tabOptions={siteConfig.acctTabOptions}
                        defaultValue={
                            acct.type === "investment"
                                ? "investment"
                                : "non-investment"
                        }
                        isDisabled
                    >
                        <TabsContent value="non-investment">
                            <AcctFormWrapper type={acct.type} acct={acct} />
                        </TabsContent>
                        <TabsContent value="investment">
                            <AcctFormWrapper
                                type="investment"
                                invType={acct.inv_type as InvestmentType}
                                acct={acct}
                            />
                        </TabsContent>
                    </TabWrapper>
                </div>
            </ModalContent>
        </ModalWrapper>
    );
}
