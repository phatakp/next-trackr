"use client";

import {
  ArrowLeftToLine,
  ArrowRightFromLine,
  ArrowRightLeft,
  ListFilter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { format } from "date-fns";
import EditTxnBtn from "./edit-txn-btn";
import TxnListItem from "./txn-list-item";

type Props = {
  txns: { [key: string]: FullTxn[] | undefined } | null;
};

export default function TxnList({ txns }: Props) {
  if (!txns) return;
  const dates = Object.keys(txns);
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="expense">
            <ArrowRightFromLine className="size-4 sm:hidden" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Expense
            </span>
          </TabsTrigger>
          <TabsTrigger value="income">
            <ArrowLeftToLine className="size-4 sm:hidden" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Income
            </span>
          </TabsTrigger>
          <TabsTrigger value="transfer">
            <ArrowRightLeft className="size-4 sm:hidden" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Transfer
            </span>
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
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
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
            <CardDescription>
              View / Edit / Delete your transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {dates &&
              dates.map((dt) => (
                <div key={dt} className="grid my-4">
                  <div className="uppercase bg-muted text-muted-foreground px-4 py-2 my-4">
                    {format(new Date(dt), "PPP")}
                  </div>
                  {txns[dt]?.map((txn) => (
                    <EditTxnBtn key={txn.id} txn={txn}>
                      <Button
                        variant={"ghost"}
                        size={"lg"}
                        className="w-full px-1 py-2 hover:bg-primary hover:text-primary-foreground group"
                      >
                        <TxnListItem txn={txn} />
                      </Button>
                    </EditTxnBtn>
                  ))}
                </div>
              ))}
          </CardContent>

          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>32</strong> products
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
