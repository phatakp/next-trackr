import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { FullAccount } from "@/types";
import { MoreHorizontal } from "lucide-react";
import AcctDeleteForm from "./acct-delete-form";
import EditAcctBtn from "./edit-acct-btn";

export default function AcctActionBtns({ acct }: { acct: FullAccount }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <EditAcctBtn acct={acct} />
        <AcctDeleteForm id={acct.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
