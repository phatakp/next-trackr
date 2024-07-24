"use client";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/custom/form-input";
import FormSelect from "@/components/ui/custom/form-select";
import { useModalContext } from "@/components/ui/custom/modal-wrapper";
import { Form } from "@/components/ui/form";
import { acct_number_format, amountFormatter, cn } from "@/lib/utils";
import {
  createAcct,
  getEquityData,
  getMFData,
  updateAcct,
} from "@/server/accounts.actions";
import { getBankOptions } from "@/server/banks.actions";
import type { AcctType, FullAccount, InvestmentType } from "@/types";
import { NewAccountFormSchema } from "@/types/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  type: AcctType;
  invType?: InvestmentType;
  acct?: FullAccount;
};

export default function AcctForm({ type, invType, acct }: Props) {
  const { setModalOpen } = useModalContext();
  const router = useRouter();
  const form = useForm<z.infer<typeof NewAccountFormSchema>>({
    resolver: zodResolver(NewAccountFormSchema),
    defaultValues: {
      name: acct?.name ?? "",
      number: acct?.number ?? "",
      type,
      bank_id: acct?.bank_id,
      inv_type: invType,
      balance: acct?.balance ?? 0,
      curr_value: acct?.curr_value ?? 0,
      prefix: acct?.equity?.money_control_prefix,
      buy_price: acct?.equity?.buy_price,
      curr_price: acct?.equity?.curr_price,
      quantity: acct?.equity?.quantity,
      nav: acct?.mf?.nav,
      units: acct?.mf?.units,
      is_sip: acct?.mf?.is_sip,
    },
  });

  const formData = form.watch();

  const {
    data: bankOptions,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["bank-options"],
    queryFn: async () => await getBankOptions(type as AcctType),
  });

  useEffect(() => {
    if (!acct) {
      console.log("running refetch");

      refetch();
    }
  }, [refetch, type, acct]);

  const { data: fund, isLoading: isFundLoading } = useQuery({
    queryKey: ["mf-data", formData.number],
    queryFn: async () => await getMFData(formData.number),
    enabled:
      formData.inv_type === "fund" &&
      !!formData.number &&
      formData.number.length > 4,
  });

  const { data: equity, isLoading: isEquityLoading } = useQuery({
    queryKey: ["equity-data", formData.prefix, formData.number],
    queryFn: async () => await getEquityData(formData.prefix!, formData.number),
    enabled:
      formData.inv_type === "equity" &&
      !!formData.prefix &&
      !!formData.number &&
      formData.number.length > 1,
  });

  const { mutateAsync: createAcctAction, status: createStatus } = useMutation({
    mutationFn: createAcct,
    onError: (err) => toast.error(err.message),
  });
  const { mutateAsync: updateAcctAction, status: updateStatus } = useMutation({
    mutationFn: updateAcct,
    onError: (err) => toast.error(err.message),
    onSuccess: () => setModalOpen(false),
  });

  useEffect(() => {
    if (formData.inv_type === "fund" && !!fund) {
      form.setValue("name", fund.data.scheme_name);
      form.setValue("nav", fund.data.nav);
      if (formData.units && formData.units > 0)
        form.setValue("curr_value", formData.units * fund.data.nav);
    }
  }, [form, fund, formData.inv_type, formData.units]);

  useEffect(() => {
    if (formData.inv_type === "equity" && !!equity) {
      form.setValue("name", equity.data.stockName!);
      form.setValue("curr_price", equity.data.price);
      if (formData.quantity && formData.quantity > 0)
        form.setValue("curr_value", formData.quantity * equity.data.price);
    }
  }, [form, equity, formData.inv_type, formData.quantity]);

  if (isError) toast.error(error.message);

  async function onSubmit(values: z.infer<typeof NewAccountFormSchema>) {
    const { error } = !acct
      ? await createAcctAction(values)
      : await updateAcctAction({ ...values, id: acct.id });
    if (error) toast.error(error);
    else {
      toast.success(`Account ${!acct ? "created" : "updated"} successfully`);
      setModalOpen(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Bank or Broker */}
        <FormSelect
          name="bank_id"
          label={
            formData.inv_type && formData.inv_type !== "fd" ? "Broker" : "Bank"
          }
          options={bankOptions ?? []}
          value={formData.bank_id}
          disabled={!!acct}
          isLoading={isLoading}
        />

        {/* Mutual Fund Accounts */}
        {formData.inv_type === "fund" && (
          <>
            <div className="grid w-full">
              {/* Scheme Code from api.mf.in */}
              <FormInput
                name="number"
                label="MF API Scheme Code"
                value={formData.number}
                disabled={!!acct}
              />

              {/* Name fetched from MF API */}
              <span className={cn("text-sm text-muted-foreground")}>
                {isFundLoading && <Loader2 className="animate-spin size-4" />}
                {!!formData.name && `Name: ${formData.name}`}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:gap-x-4 space-y-8 sm:space-y-0 w-full items-start justify-start">
              <div className="grid w-full">
                {/* Units purchased */}
                <FormInput
                  name="units"
                  label="Units"
                  type="number"
                  step={0.001}
                  value={formData.units}
                />
                {/* NAV fetched from MF API */}
                <span className={cn("text-sm text-muted-foreground")}>
                  {isFundLoading && <Loader2 className="animate-spin size-4" />}
                  {!!formData.nav && `Nav: ${formData.nav}`}
                </span>
              </div>

              <div className="grid w-full">
                {/* Invested Amount */}
                <FormInput
                  name="balance"
                  label="Invested Amt"
                  type="number"
                  step={0.01}
                  value={formData.balance}
                />
                {/* Curr value calculated*/}
                <span className={cn("text-sm text-muted-foreground")}>
                  {isFundLoading && <Loader2 className="animate-spin size-4" />}
                  {formData.curr_value > 0 &&
                    `Curr Value: ${amountFormatter(formData.curr_value)}`}
                </span>
              </div>
            </div>
          </>
        )}

        {/* Equity Accounts */}
        {formData.inv_type === "equity" && (
          <>
            <div className="grid sm:grid-cols-3 gap-x-4 w-full items-center">
              {/* Prefix from moneycontrol.com */}
              <FormInput
                name="prefix"
                label="Money Control prefix"
                value={formData.prefix}
                disabled={!!acct}
                className="sm:col-span-2 my-4 sm:my-0"
              />

              {/* Stock code from moneycontrol.com */}
              <FormInput
                name="number"
                label="Stock Code"
                value={formData.number}
                disabled={!!acct}
                className="my-4 sm:my-0"
              />

              {/* Name fetched from Money Control API */}
              <span
                className={cn("sm:col-span-3 text-sm text-muted-foreground")}
              >
                {isEquityLoading && <Loader2 className="animate-spin size-4" />}
                {!!formData.name && `Name: ${formData.name}`}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-4 w-full">
              <div className="grid w-full">
                {/* Quantity of stocks */}
                <FormInput
                  name="quantity"
                  label="Quantity"
                  type="number"
                  value={formData.quantity}
                />
                {/* Curr Value calculated */}
                <span
                  className={cn(
                    "text-sm text-muted-foreground opacity-0",
                    !!formData.curr_value && "opacity-100"
                  )}
                >
                  {isEquityLoading && (
                    <Loader2 className="animate-spin size-4" />
                  )}
                  {formData.curr_value > 0 &&
                    `Curr Value: ${amountFormatter(formData.curr_value)}`}
                </span>
              </div>

              <div className="grid w-full">
                {/* Buying Price for Stock */}
                <FormInput
                  name="buyPrice"
                  label="Avg Buy Price"
                  type="number"
                  step={0.01}
                  value={formData.buy_price}
                />

                {/* Curr Price fetched from Money Control API */}
                <span
                  className={cn(
                    "text-sm text-muted-foreground opacity-0",
                    !!formData.curr_price && "opacity-100"
                  )}
                >
                  {isEquityLoading && (
                    <Loader2 className="animate-spin size-4" />
                  )}
                  {!!formData.curr_price &&
                    `Curr Price: ${formData.curr_price}`}
                </span>
              </div>
            </div>
          </>
        )}

        {(!formData.inv_type ||
          !["equity", "fund"].includes(formData.inv_type)) && (
          <>
            <FormInput
              name="name"
              label="Acct Name"
              value={formData.name}
              disabled={!!acct}
            />
            <FormInput
              name="number"
              label="Acct Number"
              value={acct_number_format(formData.number)}
              disabled={!!acct}
            />
            <FormInput
              name="balance"
              label="Balance"
              type="number"
              value={formData.balance}
              step={0.01}
            />
          </>
        )}

        {formData.inv_type && formData.inv_type === "fd" && (
          <FormInput
            name="curr_value"
            label="Curr Value"
            type="number"
            value={formData.curr_value}
            step={0.01}
          />
        )}

        <div className="flex w-full items-center justify-end">
          <Button
            type="submit"
            size={"sm"}
            isLoading={createStatus === "pending" || updateStatus === "pending"}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
