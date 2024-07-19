"use server";

import { createClient } from "@/lib/supabase/server";
import {
  checkCashAcctExistsForUser,
  createCashAcctForUser,
} from "./accounts.actions";
import { getBankForCashAcct } from "./banks.actions";

export async function syncUser() {
  const supabase = await createClient();
  // Get Bank ID for Cash
  const { data: bankId, error } = await getBankForCashAcct();
  if (!bankId) return { error: error ?? "Bank not found" };

  //Check Cash Account exists for user
  const { data: acct } = await checkCashAcctExistsForUser(bankId);

  if (!acct) {
    const { error } = await createCashAcctForUser(bankId);
    if (error) throw new Error(error);
  }
}
