import { ReceiptIndianRupee, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AmountField } from "@/components/common/amt-field";
import { amountFormatter } from "@/lib/utils";
import { getAcctStats, getUserAccts } from "@/server/accounts.actions";
import type { AcctType } from "@/types";
import AcctList from "./components/acct-list";
import AcctTypeLeftNavBtn from "./components/acct-type-nav-left-btn";
import AcctTypeRightNavBtn from "./components/acct-type-nav-right-btn";
import AddAcctBtn from "./components/add-acct-btn";

type Props = {
  searchParams?: { type: string };
};

export default async function AccountsPage({ searchParams }: Props) {
  const type = searchParams?.type ?? "savings";

  const resp = await getAcctStats();
  if (resp?.error || !resp.data) throw new Error("Error getting account stats");
  const { stats } = resp.data;
  const currStat = stats.find((s) => s.type === type);

  const resp2 = await getUserAccts(type as AcctType);
  if (resp2?.error || !resp2.data)
    throw new Error("Error getting user accounts");
  const accounts = resp2.data;

  return (
    <main className="grid flex-1 items-start gap-4 md:gap-8">
      <div className="mx-auto grid flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <AcctTypeLeftNavBtn currType={type as AcctType} />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 capitalize">
            {type}
          </h1>
          <AcctTypeRightNavBtn currType={type as AcctType} />

          <Badge className="ml-auto sm:ml-0">
            {currStat?.count ?? 0} accounts
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <AddAcctBtn
              type={type as AcctType}
              button={
                <Button size="sm">
                  {/* <PlusCircle className="mr-2 size-4" /> */}
                  Add Account
                </Button>
              }
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium capitalize">
                  Total {type}
                </CardTitle>
                <ReceiptIndianRupee className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {amountFormatter(currStat?.tot_value ?? 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>

            <AcctList accounts={accounts ?? []} type={type as AcctType} />

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <ReceiptIndianRupee className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <AmountField amount={currStat?.tot_value ?? 0} />
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {/* <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src="/next.svg"
                    width="300"
                  /> */}
                  <div className="grid grid-cols-3 gap-2">
                    {/* <button>
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src="/next.svg"
                        width="84"
                      />
                    </button>
                    <button>
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src="/next.svg"
                        width="84"
                      />
                    </button> */}
                    <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-5">
              <CardHeader>
                <CardTitle>Archive Product</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div></div>
                <Button size="sm" variant="secondary">
                  Archive Product
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
