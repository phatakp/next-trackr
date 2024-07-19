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
import AcctListItem from "./acct-list-item";
import AddAcctBtn from "./add-acct-btn";

type Props = {
  accounts: FullAccount[];
  type: AcctType;
};

export default function AcctList({ accounts, type }: Props) {
  if (accounts.length === 0)
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[400px] container">
        <div className="flex flex-col items-center gap-2 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no {type} accounts
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start tracking as soon as you add one.
          </p>
          <AddAcctBtn
            button={
              <Button>
                <PlusCircle className="mr-2 size-4" />
                Add Account
              </Button>
            }
            type={type as AcctType}
          />
        </div>
      </div>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{type} accounts</CardTitle>
        <CardDescription>You have {accounts.length} accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={accounts[0].inv_type as string} className="w-full">
          <TabsList>
            <TabsTrigger value="equity">Equity</TabsTrigger>
            <TabsTrigger value="fund">Mutual Fund</TabsTrigger>
            <TabsTrigger value="fd">FD</TabsTrigger>
          </TabsList>
          <TabsContent value="equity">
            {accounts
              ?.filter((acct) => acct.inv_type === "equity")
              .map((acct) => (
                <AcctListItem key={acct.id} acct={acct} />
              ))}
          </TabsContent>
          <TabsContent value="fund">
            {accounts
              ?.filter((acct) => acct.inv_type === "fund")
              .map((acct) => (
                <AcctListItem key={acct.id} acct={acct} />
              ))}
          </TabsContent>
          <TabsContent value="fd">
            {accounts
              ?.filter((acct) => acct.inv_type === "fd")
              .map((acct) => (
                <AcctListItem key={acct.id} acct={acct} />
              ))}
          </TabsContent>
        </Tabs>
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
