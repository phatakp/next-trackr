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
import { useModalContext } from "@/components/ui/custom/modal-wrapper";
import { deleteTransaction } from "@/server/txn.actions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
  id: number;
};

export default function TxnDeleteForm({ id }: Props) {
  const { setModalOpen } = useModalContext();
  const { mutateAsync, status } = useMutation({
    mutationFn: deleteTransaction,
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      toast.success("Transaction Deleted successfully");
      setModalOpen(false);
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} className="w-full" type="button">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="sm:text-center">
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. <br /> This will permanently delete
            this transaction!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={async () => await mutateAsync({ id })}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
