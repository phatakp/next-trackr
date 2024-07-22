"use server";

import { createClient } from "@/lib/supabase/server";
import { capitalize, groupedByDate } from "@/lib/utils";
import { FullTxn, TxnType } from "@/types";
import { NewTxnFormSchema, UpdTxnFormSchema } from "@/types/zod-schemas";
import { format } from "date-fns";
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

export async function getAcctOptions(sourceId?: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let resp = await supabase
    .from("accounts")
    .select("id,name,type")
    .eq("user_id", user?.id!)
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

export async function getUserTransactions(type?: TxnType) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated", data: null };

  const { data } = await supabase
    .from("transactions")
    .select(
      `*,category:category_id(*),src:source_id(*),dest:destination_id(*),group:group_id(*),recurring:recurring_id(*)`
    )
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false })
    .returns<FullTxn[]>();

  if (!data) return { data: null, error: null };

  if (type)
    return {
      data: groupedByDate(data.filter((a) => a.type === type)),
      error: null,
    };
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
    };

  if (values.is_recurring)
    insertValues = {
      ...insertValues,
      is_recurring: !!values.is_recurring,
      start_date: values.start_date,
      end_date: values.end_date,
      frequency: values.frequency,
    };

  const { data, error } = await supabase.rpc("insert_into_transactions", {
    ...insertValues,
    last_txn_date: values.is_recurring
      ? format(new Date(), "yyyy-MM-dd")
      : undefined,
  });

  if (error) return { data: null, error: error.message };

  revalidatePath("/", "layout");
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
  };

  const { data, error } = await supabase.rpc("update_transactions", updValues);

  if (error) return { data: null, error: error.message };

  revalidatePath("/", "layout");
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

  revalidatePath("/", "layout");
  return { data, error: null };
}
