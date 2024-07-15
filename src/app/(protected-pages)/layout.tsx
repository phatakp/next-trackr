import { syncUser } from "@/server/users.actions";
import { type ReactNode } from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [, err] = await syncUser();
  // if (err) console.error(err);
  return <>{children}</>;
}
