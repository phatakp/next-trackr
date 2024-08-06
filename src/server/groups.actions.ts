"use server";

import { createClient } from "@/lib/supabase/server";
import { groupedByDate } from "@/lib/utils";
import { FullTxn, Group, GrpStat } from "@/types";
import { NewGroupSchema } from "@/types/zod-schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getUserGroups() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated", data: [] as Group[] };

  const { data, error } = await supabase
    .from("groups")
    .select(`*,user:group_users("user_id")`);
  if (error) return { error: error.message, data: [] as Group[] };
  return {
    data: data
      .filter((d) => d.user.map((u) => u.user_id).includes(user.id))
      .map((d) => ({ id: d.id, name: d.name })) as Group[],
    error: null,
  };
}

export async function getGroupTxns(groupId: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return {
      error: "Not authenticated",
      data: {} as { [key: string]: FullTxn[] },
    };

  const { data, error } = await supabase
    .from("transactions")
    .select(
      `*,category:category_id(*),src:source_id(*),dest:destination_id(*),group:group_id(*)`
    )
    .eq("group_id", groupId)
    .eq("type", "expense")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false })
    .returns<FullTxn[]>();

  if (error)
    return { data: {} as { [key: string]: FullTxn[] }, error: error.message };
  return { data: groupedByDate(data), error: null };
}

export async function getGroupStats(groupId: number) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_group_stats", {
    groupid: groupId,
  });
  if (error) return { data: null, error: error.message };

  const stats = (data as GrpStat[]).reduce(
    (x: { [key: string]: GrpStat[] }, y) => {
      (x[y.name] = x[y.name as any] || []).push(y);
      return x;
    },
    {}
  );

  const result = Object.keys(stats).map((name) => ({
    name,
    assets: stats[name]
      .filter((a) => a.is_asset)
      .reduce((acc, b) => acc + b.tot_value, 0),
    liabilities: stats[name]
      .filter((a) => !a.is_asset)
      .reduce((acc, b) => acc + b.tot_value, 0),
    networth: stats[name].reduce(
      (acc, b) => (b.is_asset ? acc + b.tot_value : acc - b.tot_value),
      0
    ),
    investment: stats[name]
      .filter((a) => a.type === "investment")
      .reduce(
        (acc, b) => (b.is_asset ? acc + b.tot_value : acc - b.tot_value),
        0
      ),
  }));

  return { data: result, error: null };
}

//Mutations
export async function createGroup(values: z.infer<typeof NewGroupSchema>) {
  const { success } = NewGroupSchema.safeParse(values);
  if (!success) return { error: "Invalid Input", data: null };

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("create_group", values);
  console.log(error);

  if (error) return { data: null, error: error.message };

  revalidatePath("/groups");
  return { data, error: null };
}
