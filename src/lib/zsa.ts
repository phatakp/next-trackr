import { createClient } from "@/lib/supabase/client";
import { createServerActionProcedure } from "zsa";

export const publicProcedure = createServerActionProcedure().handler(
  async () => {
    const supabase = createClient();
    return { supabase };
  }
);

export const protectedProcedure = createServerActionProcedure(
  publicProcedure
).handler(async ({ ctx }) => {
  const { data, error } = await ctx.supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return { user: data, ...ctx };
});
