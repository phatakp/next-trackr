import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import EditTxnBtn from "./edit-txn-btn";
import { useTxnListContext } from "./txn-list";
import TxnListItem from "./txn-list-item";

type Props = {
    type: "all" | "expense" | "income" | "transfer";
};

export default function TxnCard({ type }: Props) {
    const { page, txns, pageSize } = useTxnListContext();

    if (!txns || Object.keys(txns).length === 0)
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="capitalize">
                        {type} Transactions
                    </CardTitle>
                    <CardDescription>
                        View / Edit / Delete your transactions
                    </CardDescription>
                </CardHeader>
                <CardContent>No records to display</CardContent>
            </Card>
        );

    const dates = Object.keys(txns);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="capitalize">
                    {type} Transactions
                </CardTitle>
                <CardDescription>
                    View / Edit / Delete your transactions
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AnimatePresence>
                    {dates &&
                        dates.map((dt) => (
                            <div key={dt} className="grid my-4">
                                <div className="uppercase bg-muted text-muted-foreground px-4 py-2 my-4">
                                    {format(new Date(dt), "PPP")}
                                </div>
                                {txns[dt]?.map((txn, i) => (
                                    <motion.div
                                        key={txn.id}
                                        initial={{
                                            opacity: 0,
                                            x: 100,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            delay: i * 0.15,
                                        }}
                                    >
                                        <EditTxnBtn txn={txn}>
                                            <Button
                                                variant={"ghost"}
                                                size={"lg"}
                                                className="w-full px-1 py-2 hover:bg-primary hover:text-primary-foreground group"
                                            >
                                                <TxnListItem txn={txn} />
                                            </Button>
                                        </EditTxnBtn>
                                    </motion.div>
                                ))}
                            </div>
                        ))}
                </AnimatePresence>
            </CardContent>

            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing records{" "}
                    <strong>
                        {(page - 1) * pageSize + 1}-
                        {(page - 1) * pageSize + pageSize}
                    </strong>
                </div>
                <div className="ml-auto mr-0 w-auto flex items-center gap-4">
                    <Link
                        href={`/transactions?type=${type}&page=${page - 1}`}
                        className={cn(
                            buttonVariants({
                                variant: "outline",
                                size: "icon",
                            }),
                            "size-6",
                            page === 1 &&
                                "cursor-default pointer-events-none bg-muted"
                        )}
                    >
                        <ChevronLeft className="h-3.5 w-3.5" />
                        <span className="sr-only">Previous Order</span>
                    </Link>
                    <Link
                        href={`/transactions?type=${type}&page=${page + 1}`}
                        className={cn(
                            buttonVariants({
                                variant: "outline",
                                size: "icon",
                            }),
                            "size-6"
                        )}
                    >
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="sr-only">Previous Order</span>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
