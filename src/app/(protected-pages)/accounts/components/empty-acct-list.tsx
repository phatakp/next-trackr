import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AcctType } from "@/types";
import { PlusCircle } from "lucide-react";
import AddAcctBtn from "./add-acct-btn";

export default function EmptyAcctList({ type }: { type: AcctType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{type} accounts</CardTitle>
        <CardDescription>You have no accounts</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
