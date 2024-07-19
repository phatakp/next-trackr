"use server";

import { siteConfig } from "@/lib/site-config";
import { createClient } from "@/lib/supabase/server";
import { AcctType } from "@/types";

export async function getBankForCashAcct() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("banks")
    .select("id")
    .eq("name", siteConfig.cashBankName)
    .single();

  return { data: data?.id, error: null };
}

export async function getBankOptions(type: AcctType) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("banks")
    .select("id,name")
    .eq("type", type);
  return (
    data
      ?.filter((d) => d.name !== siteConfig.cashBankName)
      .map((d) => ({ label: d.name, value: d.id })) ?? []
  );
}
