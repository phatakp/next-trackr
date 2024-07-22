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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AcctType, FullAccount } from "@/types";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import AcctListItem from "./acct-list-item";
import AddAcctBtn from "./add-acct-btn";
import EmptyAcctList from "./empty-acct-list";

type Props = {
  accounts: FullAccount[];
  type: AcctType;
};

export default function AcctList({ accounts, type }: Props) {
  const { start, end } = usePagination();
  const pageData = accounts.slice(start, end);
  if (accounts.length === 0) return <EmptyAcctList type={type} />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{type} accounts</CardTitle>
        <CardDescription>You have {accounts.length} accounts</CardDescription>
      </CardHeader>
      <CardContent>
        {type !== "investment" && (
          <div className="grid">
            <div className="flex items-center justify-between px-4 w-full border-b-2 pb-2">
              <span>Account</span>
              <span>Balance</span>
            </div>

            {pageData.map((acct) => (
              <AcctListItem key={acct.id} acct={acct} />
            ))}
          </div>
        )}
        {type === "investment" && (
          <Tabs
            defaultValue={accounts[0].inv_type as string}
            className="w-full"
          >
            <TabsList>
              <Link href={"/accounts?type=investment&invType=equity"}>
                <TabsTrigger value="equity">Equity</TabsTrigger>
              </Link>
              <Link href={"/accounts?type=investment&invType=fund"}>
                <TabsTrigger value="fund">Mutual Fund</TabsTrigger>
              </Link>
              <Link href={"/accounts?type=investment&invType=fd"}>
                <TabsTrigger value="fd">FD</TabsTrigger>
              </Link>
            </TabsList>
            <TabsContent value="equity">
              {pageData.map((acct) => (
                <AcctListItem key={acct.id} acct={acct} />
              ))}
            </TabsContent>
            <TabsContent value="fund">
              {pageData.map((acct) => (
                <AcctListItem key={acct.id} acct={acct} />
              ))}
            </TabsContent>
            <TabsContent value="fd">
              {pageData.map((acct) => (
                <AcctListItem key={acct.id} acct={acct} />
              ))}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <AddAcctBtn
          type={type as AcctType}
          button={
            <Button variant={"ghost"} size="sm">
              <PlusCircle className="mr-2 size-4" />
              Add Account
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
}
