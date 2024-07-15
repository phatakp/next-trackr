import { siteConfig } from "@/lib/site-config";
import { publicProcedure } from "@/lib/zsa";

export const getBankForCashAcct = publicProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from("banks")
      .select("id")
      .eq("name", siteConfig.cashBankName)
      .single();

    if (error) throw error.message;
    return data?.id;
  });
