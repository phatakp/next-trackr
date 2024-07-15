import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  return (
    <div>
      DashboardPage
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}
