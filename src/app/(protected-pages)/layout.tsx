import { ProtectedPageHeader } from "@/components/common/protected-page-header";
import { syncUser } from "@/server/users.actions";
import { type ReactNode } from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  await syncUser();
  // if (err) console.error(err);
  return (
    <>
      <ProtectedPageHeader />
      {children}
    </>
  );
}
