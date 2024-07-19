"use server";

import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "./supabase/db.types";
import { createClient } from "./supabase/server";

class SafeAction {
  supabase: unknown;
  user: unknown;
  error: string | null;

  constructor() {
    this.user = null;
    this.error = null;
  }

  async init(isAuthenticated: boolean = false) {
    const supabase = await createClient();
    this.supabase = supabase;
    if (isAuthenticated) {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user.id) {
        this.error = "Not authenticated";
      }
      this.user = data.user;
    }
    return this;
  }

  get() {
    return {
      user: this.user ? (this.user as User) : null,
      supabase: this.supabase as SupabaseClient<Database>,
    };
  }
}

export async function publicAction() {
  return new SafeAction().init();
}

export async function protectedAction() {
  return new SafeAction().init(true);
}
