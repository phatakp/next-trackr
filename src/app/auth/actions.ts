"use server";
import { createClient } from "@/lib/supabase/server";
import { getURL } from "@/lib/utils";
import { redirect } from "next/navigation";
import { LoginSchema, RegisterSchema } from "./zod-schemas";

export async function loginWithPassword(input: Zod.infer<typeof LoginSchema>) {
  const supabase = await createClient();
  const { success } = LoginSchema.safeParse(input);
  if (!success) return { error: "Invalid Input", data: null };
  const { data, error } = await supabase.auth.signInWithPassword(input);
  if (error) return { error: error.message, data: null };
  return { data, error: null };
}

export async function register(input: Zod.infer<typeof RegisterSchema>) {
  const supabase = await createClient();
  const { data, success } = RegisterSchema.safeParse(input);
  if (!success) return { error: "Invalid Input", data: null };
  const { error } = await supabase.auth.signUp({
    ...input,
    options: {
      data: { first_name: input.first_name, last_name: input.last_name },
      emailRedirectTo: `${getURL()}/auth/confirm`,
    },
  });
  console.log(error);
  if (error) return { error: error.message, data: null };
  return { data, error: null };
}

export async function loginWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${getURL()}/auth/callback`,
    },
  });
  console.log(error);
  if (error) return { error: error.message, url: null, provider: null };
  return redirect(data.url);
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut({ scope: "local" });

  if (error) return { error: error.message };
  return redirect("/");
}

export async function getCurrUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  return data;
}

export async function getUsers() {
  const supabase = await createClient();
  const { data } = await supabase.from("profiles").select("*");
  console.log(data);

  return data;
}
