"use client";

import { AmountField } from "@/components/common/amt-field";
import { Button } from "@/components/ui/button";
import { FormDatePicker } from "@/components/ui/custom/form-date-picker";
import FormInput from "@/components/ui/custom/form-input";
import FormSelect from "@/components/ui/custom/form-select";
import { useModalContext } from "@/components/ui/custom/modal-wrapper";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { capitalize, cn } from "@/lib/utils";
import { getAccountBalance } from "@/server/accounts.actions";
import {
  createTransaction,
  getAcctOptions,
  getCategoryOptions,
  getGroupOptions,
  updateTransaction,
} from "@/server/txn.actions";
import { FullTxn, TxnType } from "@/types";
import { NewTxnFormSchema } from "@/types/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import TxnDeleteForm from "./txn-delete-form";

type Props = {
  type: TxnType;
  txn?: FullTxn;
};
export default function TxnForm({ type, txn }: Props) {
  const { closeModal } = useModalContext();
  const [srcBalance, setSrcBalance] = useState(0);

  const form = useForm<z.infer<typeof NewTxnFormSchema>>({
    resolver: zodResolver(NewTxnFormSchema),
    defaultValues: {
      date: txn?.date,
      description: txn?.description ?? "",
      amount: txn?.amount ?? 0,
      type,
      category_id: txn?.category_id ?? undefined,
      source_id: txn?.source_id ?? undefined,
      destination_id: txn?.destination_id ?? undefined,
      group_id: txn?.group_id ?? undefined,
      is_recurring: !!txn?.recurring,
      start_date: txn?.recurring?.start_date,
      end_date: txn?.recurring?.end_date ?? undefined,
      frequency: txn?.recurring?.frequency,
    },
  });

  const formData = form.watch();

  const { data: grpOptions, isLoading: isGrpLoading } = useQuery({
    queryKey: ["group-options"],
    queryFn: async () => await getGroupOptions(),
  });

  const {
    data: catOptions,
    isLoading: isCatLoading,
    refetch,
  } = useQuery({
    queryKey: ["category-options"],
    queryFn: async () => await getCategoryOptions(type),
  });

  const { data: srcOptions, isLoading: isSrcLoading } = useQuery({
    queryKey: ["src-options"],
    queryFn: async () => await getAcctOptions(),
  });

  const {
    data: destOptions,
    isLoading: isDestLoading,
    refetch: refetchDestAccts,
  } = useQuery({
    queryKey: ["dest-options"],
    queryFn: async () => await getAcctOptions(formData.source_id),
    enabled: formData.type !== "expense",
  });

  useEffect(() => {
    if (!txn) {
      refetch();
    }
  }, [type, txn, refetch]);

  useEffect(() => {
    if (!txn) {
      refetchDestAccts();
    }
  }, [formData.source_id, txn, refetchDestAccts]);

  useEffect(() => {
    async function fetchBalance() {
      if (formData.source_id) {
        const bal = await getAccountBalance(formData.source_id);
        setSrcBalance(bal);
      }
    }
    fetchBalance();
  }, [formData.source_id]);

  const { mutateAsync: createTxnAction, status: createStatus } = useMutation({
    mutationFn: createTransaction,
    onError: (err) => toast.error(err.message),
  });
  const { mutateAsync: updateTxnAction, status: updateStatus } = useMutation({
    mutationFn: updateTransaction,
    onError: (err) => toast.error(err.message),
    onSuccess: () => closeModal(),
  });

  async function onSubmit(values: z.infer<typeof NewTxnFormSchema>) {
    console.log(values);
    const { error } = !txn
      ? await createTxnAction(values)
      : await updateTxnAction({ ...values, id: txn.id });
    if (error) toast.error(error);
    else {
      toast.success(
        `${capitalize(values.type)} ${
          !txn ? "created" : "updated"
        } successfully`
      );
      closeModal();
    }
  }

  if (isGrpLoading)
    return (
      <div className="space-y-8 my-4">
        <div className="grid sm:grid-cols-2 gap-x-4 space-y-8 sm:space-y-0 w-full">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <div className="grid sm:grid-cols-2 gap-x-4 space-y-8 sm:space-y-0 w-full items-center">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
        <div className="flex w-full items-center">
          <Skeleton className="h-10" />
        </div>
      </div>
    );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-4">
        {/* Group */}
        {grpOptions && grpOptions.length > 0 && (
          <FormSelect
            name="group_id"
            label={"Group"}
            options={grpOptions ?? []}
            value={formData.group_id}
            disabled={!!txn}
            isLoading={isGrpLoading}
          />
        )}

        <div className="grid sm:grid-cols-2 gap-x-4 space-y-8 sm:space-y-0 w-full">
          {/* Date */}
          <FormDatePicker name="date" label="Date" value={formData.date} />

          {/* Amount */}
          <FormInput
            name="amount"
            label="Amount"
            type="number"
            value={formData.amount}
            step={0.01}
          />
        </div>

        {/* Description */}
        <FormInput
          name="description"
          label="Description"
          value={formData.description}
        />

        <FormSelect
          name="category_id"
          label={"Category"}
          options={catOptions ?? []}
          value={formData.category_id}
          isLoading={isCatLoading}
        />

        <div className="grid sm:grid-cols-2 gap-x-4 space-y-8 sm:space-y-0 w-full items-start">
          {type !== "income" && (
            <div className="grid w-full">
              <FormSelect
                name="source_id"
                label={"Source"}
                options={srcOptions ?? []}
                value={formData.source_id}
                isLoading={isSrcLoading}
                className={cn(type === "expense" && "sm:col-span-2")}
              />
              <span className={cn("text-sm text-muted-foreground px-4")}>
                {srcBalance > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-input">Balance:</span>
                    <AmountField amount={srcBalance} className="text-sm" />
                  </div>
                )}
              </span>
            </div>
          )}
          {type !== "expense" && (
            <FormSelect
              name="destination_id"
              label={"Destination"}
              options={destOptions ?? []}
              value={formData.destination_id}
              isLoading={isDestLoading}
              className={cn(type === "income" && "sm:col-span-2")}
            />
          )}
        </div>

        <div className="flex w-full items-center gap-4">
          {txn && <TxnDeleteForm id={txn.id} />}
          <Button
            type="submit"
            className="w-full"
            isLoading={createStatus === "pending" || updateStatus === "pending"}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
