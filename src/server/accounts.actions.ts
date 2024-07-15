import { ACCT_TYPE, siteConfig } from "@/lib/site-config";
import { protectedProcedure } from "@/lib/zsa";
import { format } from "date-fns";
import { z } from "zod";

export const checkCashAcctExistsForUser = protectedProcedure
  .createServerAction()
  .input(z.number())
  .handler(async ({ ctx, input: bankId }) => {
    const { data } = await ctx.supabase
      .from("accounts")
      .select()
      .eq("bank_id", bankId)
      .eq("user_id", ctx.user.id)
      .single();

    return data;
  });

export const createCashAcctForUser = protectedProcedure
  .createServerAction()
  .input(z.number())
  .handler(async ({ ctx, input: bankId }) => {
    const { data, error } = await ctx.supabase
      .from("accounts")
      .insert([
        {
          name: siteConfig.cashBankName,
          number: "XXXX-Cash",
          type: ACCT_TYPE.SAVINGS,
          balance: 0,
          curr_value: 0,
          as_of_date: format(new Date(), "yyyy-MM-dd"),
          bank_id: bankId,
          user_id: ctx.user.id,
        },
      ])
      .select();

    if (error) throw error.message;
    return data;
  });
