"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteAcct } from "@/server/accounts.actions";
import { AcctType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type Props = {
  id: number;
  name: string;
  type: AcctType;
};

export default function AcctDeleteForm({ id, name, type }: Props) {
  const { mutateAsync, status } = useMutation({
    mutationFn: deleteAcct,
    onError: (err) => toast.error(err.message),
    onSuccess: () => toast.success("Account Deleted successfully"),
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"link"} className="group">
          <Trash2 className="size-4 text-destructive group-hover:opacity-85" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="sm:text-center">
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. <br /> This will permanently delete
            your account!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => await mutateAsync({ id, name, type })}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
