"use client";

import { Button } from "@/components/ui/button";
import { getGroupTxns } from "@/server/groups.actions";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import EditTxnBtn from "../../transactions/components/edit-txn-btn";
import { useGroupContext } from "./group-context";
import GrpTxnListItem from "./grp-txn-list-item";

export default function GroupTxnList() {
  const { currGroup } = useGroupContext();
  const { data: txns, isLoading } = useQuery({
    queryKey: ["grp-txns", currGroup],
    queryFn: () => getGroupTxns(currGroup),
  });

  if (isLoading) return <Loader2 className="animate-spin size-4" />;
  if (!txns?.data) return;

  const dates = Object.keys(txns.data);

  return (
    <div className="grid w-full gap-4">
      {dates &&
        dates.map((dt) => (
          <div key={dt} className="grid my-4">
            <div className="uppercase bg-muted text-muted-foreground px-4 py-1 my-4">
              {format(new Date(dt), "PPP")}
            </div>
            {txns.data[dt]?.map((txn, i) => (
              <motion.div
                key={txn.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.15 }}
                className="py-2"
              >
                <EditTxnBtn txn={txn}>
                  <Button
                    variant={"ghost"}
                    size={"lg"}
                    className="w-full px-2 py-4 hover:bg-primary hover:text-primary-foreground group"
                  >
                    <GrpTxnListItem txn={txn} />
                  </Button>
                </EditTxnBtn>
              </motion.div>
            ))}
          </div>
        ))}
    </div>
  );
}
