import { ProtectedPageHeader } from "@/components/common/protected-page-header";
import { Button } from "@/components/ui/button";
import { BadgeIndianRupeeIcon } from "lucide-react";
import { type ReactNode } from "react";
import AddTxnBtn from "./transactions/components/add-txn-btn";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="relative">
      <ProtectedPageHeader />
      {children}
      <AddTxnBtn>
        <Button className="fixed bottom-4 right-4 2xl:right-24 aspect-square size-16 p-2">
          <BadgeIndianRupeeIcon className="size-12 sm:mr-2" />
          <span className="text-lg">+</span>
        </Button>
      </AddTxnBtn>
    </main>
  );
}
