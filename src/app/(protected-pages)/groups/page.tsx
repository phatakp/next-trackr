import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AcctSummaryChart from "./components/account-summary-chart";
import CombinedNetworth from "./components/combined-networth";
import CreateGroupBtn from "./components/create-group-btn";
import GroupProvider from "./components/group-context";
import { GroupSelect } from "./components/group-select";
import GroupTxnList from "./components/grp-txn-list";
import Settlement from "./components/settlement";

export default async function GroupsPage() {
  return (
    <GroupProvider>
      <main className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-4">
          <GroupSelect />
          <CreateGroupBtn>
            <Button>
              <PlusCircle className="size-4 sm:mr-2" />{" "}
              <span className="sr-only sm:not-sr-only">Create Group</span>
            </Button>
          </CreateGroupBtn>
        </div>
        <div className="w-full grid flex-1 items-start gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
          <Settlement />
          <CombinedNetworth />
          <div className="md:col-span-2 lg:col-span-1">
            <AcctSummaryChart />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <GroupTxnList />
          </div>
        </div>
      </main>
    </GroupProvider>
  );
}
