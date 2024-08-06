"use client";
import { usePagination } from "@/components/common/pagination-wrapper";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AcctType } from "@/types";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { useAcctPageContext } from "../contexts/acct-page-context";
import AcctListItem from "./acct-list-item";
import AcctPagination from "./acct-pagination";
import AddAcctBtn from "./add-acct-btn";
import EmptyAcctList from "./empty-acct-list";

export default function AcctList() {
    const { type, invType, typeAccts } = useAcctPageContext();
    const { start, end } = usePagination(typeAccts?.length);
    const pageData = typeAccts?.slice(start, end);
    const totalAccts = typeAccts?.length ?? 0;

    return (
        <Card>
            <CardHeader className="bg-muted/50 relative">
                <CardTitle className="capitalize">{type} accounts</CardTitle>
                <CardDescription>
                    You have {totalAccts} account{totalAccts > 1 && "s"}
                </CardDescription>

                <AddAcctBtn
                    type={type as AcctType}
                    className="absolute top-4 right-4"
                >
                    <Button size="sm">
                        <PlusCircle className="sm:mr-2 size-4" />
                        <span className="sr-only sm:not-sr-only">
                            Add Account
                        </span>
                    </Button>
                </AddAcctBtn>
            </CardHeader>
            <CardContent className="py-4">
                {pageData?.map((acct, i) => (
                    <motion.div
                        key={acct.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.2 }}
                    >
                        <AcctListItem acct={acct} />
                    </motion.div>
                ))}
            </CardContent>

            <CardFooter
                className={cn(
                    "w-full",
                    totalAccts > 0 && "px-4 py-2 bg-muted/50"
                )}
            >
                {totalAccts > 0 ? (
                    <AcctPagination />
                ) : (
                    <EmptyAcctList type={type!} invType={invType} />
                )}
            </CardFooter>
        </Card>
    );
}
