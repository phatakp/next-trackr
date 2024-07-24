"use client";

import { usePathname } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "./page-header";

export function ProtectedPageHeader() {
  const path = usePathname();
  const title = path.slice(1);
  const isLoading = false;

  if (isLoading)
    return (
      <>
        <Skeleton className="mx-auto max-w-3xl py-0 gap-0 pb-4 text-center text-3xl font-extrabold md:text-5xl lg:leading-[1.1]">
          #
        </Skeleton>
        <Skeleton className="max-w-[750px] text-center text-lg">#</Skeleton>
      </>
    );

  return (
    <PageHeader className="max-w-3xl py-0 pb-4 gap-0">
      <PageHeaderHeading className="text-balance capitalize">
        {title}
      </PageHeaderHeading>
      <PageHeaderDescription>
        {/* {user?.given_name} {user?.family_name} */}
        Praveen Phatak
      </PageHeaderDescription>
    </PageHeader>
  );
}
