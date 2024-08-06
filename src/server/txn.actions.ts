"use server";

import { createClient } from "@/lib/supabase/server";
import { capitalize, groupedByDate } from "@/lib/utils";
import { ExpStat, FullTxn, MonthWiseExpStat, TxnType } from "@/types";
import { NewTxnFormSchema, UpdTxnFormSchema } from "@/types/zod-schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getGroupOptions() {
    const supabase = await createClient();

    const { data } = await supabase.from("groups").select("id,name");
    return data?.map((d) => ({ label: d.name, value: d.id })) ?? [];
}

export async function getCategoryOptions(type: TxnType) {
    const supabase = await createClient();
    let resp;
    if (type === "expense") {
        resp = await supabase
            .from("categories")
            .select()
            .neq("type", "income")
            .neq("type", "transfer");
    } else {
        resp = await supabase.from("categories").select().eq("type", type);
    }
    return (
        resp?.data?.map((d) => ({
            label: `${capitalize(d.type)}-${d.name}`,
            value: d.id,
        })) ?? []
    );
}

export async function getAcctOptions({
    sourceId,
    userId,
}: {
    sourceId?: number;
    userId?: string;
}) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const user_id = userId ?? user?.id!;
    let resp = await supabase
        .from("accounts")
        .select("id,name,type")
        .eq("user_id", user_id)
        .in("type", ["savings", "credit-card", "wallet"])
        .order("type");

    if (sourceId)
        return (
            resp?.data
                ?.filter((d) => d.id !== sourceId)
                .map((d) => ({
                    label: `${capitalize(d.type)}:${d.name}`,
                    value: d.id,
                })) ?? []
        );
    return (
        resp?.data?.map((d) => ({
            label: `${capitalize(d.type)}:${d.name}`,
            value: d.id,
        })) ?? []
    );
}

export async function getExpenseStats() {
    const supabase = await createClient();
    const { data } = await supabase.rpc("get_top_expenses");

    return {
        data: data as ExpStat[],
        error: null,
    };
}

export async function getMonthlyExpenseStats() {
    const supabase = await createClient();
    const { data } = await supabase.rpc("get_monthly_expense_stats");

    return {
        data: (data as MonthWiseExpStat[]).map((d) => ({
            key: `${d.month}${d.year}`,
            expense: d.type === "expense" ? d.tot_amt : 0,
            income: d.type === "income" ? d.tot_amt : 0,
        })),
        error: null,
    };
}

export async function getUserTransactions(
    start: number,
    end: number,
    type?: TxnType
) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated", data: null };

    const query = supabase
        .from("transactions")
        .select(
            `*,category:category_id(*),src:source_id(*),dest:destination_id(*),group:group_id(*)`
        )
        .eq("user_id", user.id)
        .order("date", { ascending: false })
        .order("created_at", { ascending: false });

    if (type) {
        const { data } = await query
            .eq("type", type)
            .range(start, end)
            .returns<FullTxn[]>();
        if (!data) return { data: null, error: null };
        return {
            data: groupedByDate(data.filter((a) => a.type === type)),
            error: null,
        };
    }

    const { data } = await query.range(start, end).returns<FullTxn[]>();
    if (!data) return { data: null, error: null };
    return { data: groupedByDate(data), error: null };
}

// Mutations

export async function createTransaction(
    values: z.infer<typeof NewTxnFormSchema>
) {
    const { success } = NewTxnFormSchema.safeParse(values);
    if (!success) return { error: "Invalid Input", data: null };

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated", data: null };

    let insertValues: z.infer<typeof NewTxnFormSchema> = {
        type: values.type,
        amount: values.amount,
        category_id: values.category_id,
        date: values.date,
        user_id: values.user_id,
    };

    if (values.description)
        insertValues = {
            ...insertValues,
            description: values.description,
        };

    if (values.destination_id)
        insertValues = {
            ...insertValues,
            destination_id: values.destination_id,
        };

    if (values.source_id)
        insertValues = {
            ...insertValues,
            source_id: values.source_id,
        };

    if (values.group_id)
        insertValues = {
            ...insertValues,
            group_id: values.group_id,
            grp_txn_type: values.grp_txn_type,
        };

    const { data, error } = await supabase.rpc(
        "insert_into_transactions",
        insertValues
    );

    if (error) return { data: null, error: error.message };

    revalidatePath("/transactions");
    revalidatePath("/accounts");
    revalidatePath("/dashboard");
    revalidatePath("/groups");
    return { data, error: null };
}

export async function updateTransaction(
    values: z.infer<typeof UpdTxnFormSchema>
) {
    const { success } = UpdTxnFormSchema.safeParse(values);
    if (!success) return { error: "Invalid Input", data: null };

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated", data: null };

    const updValues = {
        id_: values.id,
        dt: values.date,
        amt: values.amount,
        descr: values.description,
        srcid: values.source_id,
        destid: values.destination_id,
        catid: values.category_id,
        grpid: values.group_id,
        grptxntype: values.grp_txn_type,
    };

    const { data, error } = await supabase.rpc(
        "update_transactions",
        updValues
    );

    if (error) return { data: null, error: error.message };

    revalidatePath("/transactions");
    revalidatePath("/accounts");
    revalidatePath("/dashboard");
    revalidatePath("/groups");
    return { data, error: null };
}

export async function deleteTransaction({ id }: { id: number }) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated", data: null };

    const { data, error } = await supabase.rpc("delete_transactions", {
        id_: id,
    });
    console.log(error);

    if (error) return { data: null, error: error.message };

    revalidatePath("/transactions");
    revalidatePath("/accounts");
    revalidatePath("/dashboard");
    revalidatePath("/groups");
    return { data, error: null };
}
