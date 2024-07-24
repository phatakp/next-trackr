"use server";

import { siteConfig } from "@/lib/site-config";
import { createClient } from "@/lib/supabase/server";
import type { AcctStat, FullAccount } from "@/types";
import {
  NewAccountFormSchema,
  UpdAccountFormSchema,
} from "@/types/zod-schemas";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import { parse } from "node-html-parser";
import { z } from "zod";

export async function checkCashAcctExistsForUser(bankId: number) {
  if (!bankId) return { error: "Invalid Input", data: null };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated", data: null };

  const { data: acct } = await supabase
    .from("accounts")
    .select()
    .eq("bank_id", bankId)
    .eq("user_id", user.id)
    .single();

  return { data: acct, error: null };
}

export async function getAcctStats() {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_account_stats");
  if (error) return { data: null, error: error.message };

  return {
    data: (data as AcctStat[]).map((d) => ({
      ...d,
      returns:
        d.tot_balance > 0
          ? ((d.tot_value - d.tot_balance) / d.tot_balance) * 100
          : 0,
    })),
    error: null,
  };
}

export async function getUserAccts() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated", data: [] as FullAccount[] };

  const { data } = await supabase
    .from("accounts")
    .select(
      `
    *,
    bank:banks(*),
    mf:mf_accounts(*),
    equity:equity_accounts(*)
  `
    )
    .eq("user_id", user.id);

  return { data: data as FullAccount[], error: null };
}

export async function getEquityData(prefix: string, symbol: string) {
  const resp = await fetch(
    `https://www.moneycontrol.com/india/stockpricequote/${prefix}/${symbol}`,
    {
      method: "GET",
      next: { revalidate: 3600 }, // Revalidate every 60*60 seconds
    }
  );
  const html = await resp.text();
  const doc = parse(html);
  const price = doc.getElementById("nsespotval")?.attributes.value;
  const stockName = doc
    .getElementById("stockName")
    ?.querySelector("h1")?.innerHTML;

  const data = { stockName: stockName ?? "", price: parseFloat(price ?? "0") };

  return { data, error: null };
}

export async function getMFData(code: string) {
  const resp = await fetch(`https://api.mfapi.in/mf/${code}/latest`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    } as HeadersInit,
    next: { revalidate: 3600 }, // Revalidate every 60*60 seconds
  });
  const d = await resp.json();

  const data = {
    scheme_code: d.meta.scheme_code,
    scheme_name: d.meta.scheme_name,
    nav: parseFloat(d.data[0].nav),
    asOfDate: d.data[0].date,
  };
  return { data, error: null };
}

export async function getAccountBalance(id: number) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("accounts")
    .select("curr_value")
    .eq("id", id)
    .single();
  return data?.curr_value ?? 0;
}

// Mutations

export async function createAcct(values: z.infer<typeof NewAccountFormSchema>) {
  const { success } = NewAccountFormSchema.safeParse(values);
  if (!success) return { error: "Invalid Input", data: null };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated", data: null };
  const { inv_type, curr_value, ...rest } = values;

  const insertValues = {
    ...rest,
    investment_type: inv_type,
    curr_value: rest.type === "investment" ? curr_value : rest.balance,
    as_of_date: format(new Date(), "yyyy-MM-dd"),
  };

  const { data, error } = await supabase.rpc(
    "insert_into_accounts",
    insertValues
  );

  if (error) return { data: null, error: error.message };

  revalidatePath("/accounts");
  revalidatePath("/dashboard");
  return { data, error: null };
}

export async function updateAcct(values: z.infer<typeof UpdAccountFormSchema>) {
  const { success } = UpdAccountFormSchema.safeParse(values);
  if (!success) return { error: "Invalid Input", data: null };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated", data: null };
  const {
    id,
    balance,
    curr_value,
    curr_price,
    buy_price,
    quantity,
    units,
    nav,
    type,
  } = values;

  const updValues = {
    id_: id,
    bal: balance,
    asofdate: format(new Date(), "yyyy-MM-dd"),
    currvalue: type === "investment" ? curr_value : balance,
    currprice: curr_price ?? 0,
    buyprice: buy_price ?? 0,
    qty: quantity ?? 0,
    units_: units ?? 0,
    nav_: nav ?? 0,
  };

  const { data, error } = await supabase.rpc("update_accounts", updValues);

  if (error) return { data: null, error: error.message };

  revalidatePath("/accounts");
  revalidatePath("/dashboard");
  return { data, error: null };
}

export async function deleteAcct({ id, name }: { id: number; name: string }) {
  if (name === siteConfig.cashBankName)
    return { error: "Cannot delete Cash Acct", data: null };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated", data: null };

  const { data, error } = await supabase.from("accounts").delete().eq("id", id);

  if (error) return { data: null, error: error.message };

  revalidatePath("/accounts");
  revalidatePath("/dashboard");
  return { data, error: null };
}
