import { redirect } from "next/navigation";

import { protectedProcedure, publicProcedure } from "@/lib/zsa";
import { LoginSchema, RegisterSchema } from "./zod-schemas";

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.startsWith("http") ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.endsWith("/") ? url : `${url}/`;
  return url;
};

export const loginWithPassword = publicProcedure
  .createServerAction()
  .input(LoginSchema)
  .handler(async ({ ctx, input }) => {
    const { error } = await ctx.supabase.auth.signInWithPassword(input);
    if (error) throw error.message;
  });

export const loginWithGoogle = publicProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { data, error } = await ctx.supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });
    if (error) throw error.message;
    return data;
  });

export const register = publicProcedure
  .createServerAction()
  .input(RegisterSchema)
  .handler(async ({ ctx, input }) => {
    const { error } = await ctx.supabase.auth.signUp({
      ...input,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
      },
    });
    if (error) throw new Error(error.message);
  });

export const logout = protectedProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { error } = await ctx.supabase.auth.signOut({ scope: "local" });
    if (error) throw error.message;
    redirect("/");
  });
