"use client";

import {
    ArrowLeftToLine,
    ArrowRightFromLine,
    ArrowRightLeft,
    ListFilter,
    Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FullTxn } from "@/types";
import Link from "next/link";
import { createContext, useContext } from "react";
import AddTxnBtn from "./add-txn-btn";
import TxnCard from "./txn-card";

type Props = {
    txns: { [key: string]: FullTxn[] | undefined } | null;
    page: number;
    pageSize: number;
};

const TxnListContext = createContext({} as Props);

export default function TxnList({ txns, page, pageSize }: Props) {
    return (
        <TxnListContext.Provider value={{ txns, page, pageSize }}>
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <Link href={`/transactions?type=all`}>
                            <TabsTrigger value="all">All</TabsTrigger>
                        </Link>
                        <Link href={`/transactions?type=expense`}>
                            <TabsTrigger value="expense">
                                <ArrowRightFromLine className="size-4 sm:hidden" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Expense
                                </span>
                            </TabsTrigger>
                        </Link>
                        <Link href={`/transactions?type=income`}>
                            <TabsTrigger value="income">
                                <ArrowLeftToLine className="size-4 sm:hidden" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Income
                                </span>
                            </TabsTrigger>
                        </Link>
                        <Link href={`/transactions?type=transfer`}>
                            <TabsTrigger value="transfer">
                                <ArrowRightLeft className="size-4 sm:hidden" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Transfer
                                </span>
                            </TabsTrigger>
                        </Link>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 gap-1"
                                >
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Filter
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Active
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Draft
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Archived
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <AddTxnBtn>
                            <Button size={"sm"} className="hidden sm:flex h-8">
                                <Plus className="size-4 mr-2" />
                                New Txn
                            </Button>
                        </AddTxnBtn>
                    </div>
                </div>
                <TabsContent value="all">
                    <TxnCard type="all" />
                </TabsContent>
                <TabsContent value="expense">
                    <TxnCard type="expense" />
                </TabsContent>
                <TabsContent value="income">
                    <TxnCard type="income" />
                </TabsContent>
                <TabsContent value="transfer">
                    <TxnCard type="transfer" />
                </TabsContent>
            </Tabs>
        </TxnListContext.Provider>
    );
}

export const useTxnListContext = () => useContext(TxnListContext);
