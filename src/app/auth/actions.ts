"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
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

export async function loginWithPassword(input: Zod.infer<typeof LoginSchema>) {
  const supabase = await createClient();
  const { success } = LoginSchema.safeParse(input);
  if (!success) return { error: "Invalid Input" };
  const { data, error } = await supabase.auth.signInWithPassword(input);
  if (error) return { error: error.message };
  return data;
}

export async function register(input: Zod.infer<typeof RegisterSchema>) {
  const supabase = await createClient();
  const { data, success } = RegisterSchema.safeParse(input);
  if (!success) return { error: "Invalid Input" };
  const { error } = await supabase.auth.signUp({
    ...input,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
    },
  });
  if (error) return { error: error.message };
  return data;
}

export async function loginWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) return { error: error.message, url: null, provider: null };
  return redirect(data.url);
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut({ scope: "local" });

  if (error) return { error: error.message };
  return redirect("/");
}
