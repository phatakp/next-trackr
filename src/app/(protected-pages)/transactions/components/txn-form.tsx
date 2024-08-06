"use client";

import { getCurrUser } from "@/app/auth/actions";
import { AmountField } from "@/components/common/amt-field";
import { Button } from "@/components/ui/button";
import { FormDatePicker } from "@/components/ui/custom/form-date-picker";
import FormInput from "@/components/ui/custom/form-input";
import FormSelect from "@/components/ui/custom/form-select";
import { useModalContext } from "@/components/ui/custom/modal-wrapper";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/lib/site-config";
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
import { format } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import TxnDeleteForm from "./txn-delete-form";

const splitOptions = siteConfig.grpTxnTypes.map((g) => ({
    label: capitalize(g),
    value: g,
}));

type Props = {
    type: TxnType;
    txn?: FullTxn;
};
export default function TxnForm({ type, txn }: Props) {
    const { setModalOpen } = useModalContext();

    const { data: currUser, isLoading: isUserLoading } = useQuery({
        queryKey: ["curr-user"],
        queryFn: async () => await getCurrUser(),
    });

    const form = useForm<z.infer<typeof NewTxnFormSchema>>({
        resolver: zodResolver(NewTxnFormSchema),
        defaultValues: {
            date: txn?.date ?? format(new Date(), "yyyy-MM-dd"),
            description: txn?.description ?? "",
            amount: txn?.amount ?? 0,
            type,
            category_id: txn?.category_id ?? undefined,
            source_id: txn?.source_id ?? undefined,
            destination_id: txn?.destination_id ?? undefined,
            group_id: txn?.group_id ?? undefined,
            grp_txn_type: txn?.grp_txn_type ?? "split",
            user_id: txn?.user_id ?? currUser?.id,
        },
    });
    const { setValue } = form;
    const formData = form.watch();

    const { data: grpOptions, isLoading: isGrpLoading } = useQuery({
        queryKey: ["group-options"],
        queryFn: async () => await getGroupOptions(),
    });

    const { data: catOptions, isLoading: isCatLoading } = useQuery({
        queryKey: ["category-options", type],
        queryFn: async () => await getCategoryOptions(type),
    });

    const { data: srcOptions, isLoading: isSrcLoading } = useQuery({
        queryKey: ["src-options"],
        queryFn: async () => await getAcctOptions({ userId: txn?.user_id }),
    });

    const sourceId = formData.source_id ?? 0;

    const { data: destOptions, isLoading: isDestLoading } = useQuery({
        queryKey: ["dest-options", sourceId],
        queryFn: async () =>
            await getAcctOptions({ sourceId, userId: txn?.user_id }),
        enabled: formData.type !== "expense",
    });

    const { data: srcBalance, isLoading: isSrcBalLoading } = useQuery({
        queryKey: ["src-balance", sourceId],
        queryFn: async () => await getAccountBalance(sourceId),
        enabled: sourceId !== 0,
    });

    const { mutateAsync: createTxnAction, status: createStatus } = useMutation({
        mutationFn: createTransaction,
        onError: (err) => toast.error(err.message),
    });
    const { mutateAsync: updateTxnAction, status: updateStatus } = useMutation({
        mutationFn: updateTransaction,
        onError: (err) => toast.error(err.message),
        onSuccess: () => setModalOpen(false),
    });

    useEffect(() => {
        if (grpOptions && grpOptions.length > 0)
            setValue("group_id", grpOptions[0].value);
    }, [setValue, grpOptions]);

    useEffect(() => {
        if (!isUserLoading && currUser && !txn)
            setValue("user_id", currUser.id);
    }, [setValue, isUserLoading, currUser, txn]);

    async function onSubmit(values: z.infer<typeof NewTxnFormSchema>) {
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
            setModalOpen(false);
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
            <form className="space-y-8 my-4" id="txn-form" method="POST">
                <div className="grid grid-cols-2 gap-x-4 w-full">
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
                    {formData.group_id && formData.group_id > 0 && (
                        <FormSelect
                            name="group_txn_type"
                            label={"How to settle"}
                            options={splitOptions}
                            value={formData.grp_txn_type}
                        />
                    )}
                </div>

                <div className="grid sm:grid-cols-2 gap-x-4 space-y-8 sm:space-y-0 w-full">
                    {/* Date */}
                    <FormDatePicker
                        name="date"
                        label="Date"
                        value={formData.date}
                    />

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
                        <div
                            className={cn(
                                "grid w-full",
                                type === "expense" && "sm:col-span-2"
                            )}
                        >
                            <FormSelect
                                name="source_id"
                                label={"Source"}
                                options={srcOptions ?? []}
                                value={formData.source_id}
                                isLoading={isSrcLoading}
                                disabled={txn?.user_id !== currUser?.id}
                            />
                            <span
                                className={cn(
                                    "text-sm text-muted-foreground px-4"
                                )}
                            >
                                {srcBalance && srcBalance > 0 && (
                                    <div className="flex items-center gap-1">
                                        <span className="text-input">
                                            Balance:
                                        </span>
                                        <AmountField
                                            amount={srcBalance}
                                            className="text-sm"
                                        />
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
                            disabled={txn?.user_id !== currUser?.id}
                        />
                    )}
                </div>
            </form>
            <div className="flex w-full items-center gap-4">
                {txn && <TxnDeleteForm id={txn.id} />}
                <Button
                    form="txn-form"
                    onClick={form.handleSubmit(onSubmit)}
                    className="w-full"
                    isLoading={
                        createStatus === "pending" || updateStatus === "pending"
                    }
                >
                    Submit
                </Button>
            </div>
        </Form>
    );
}
