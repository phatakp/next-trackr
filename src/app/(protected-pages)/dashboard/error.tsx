"use client";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/common/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between container">
      <PageHeader className="max-w-3xl">
        <PageHeaderHeading className="text-balance">
          Uh Oh! Crap
        </PageHeaderHeading>
        <PageHeaderDescription>
          Something is not right <br />
          <pre>{JSON.stringify(error, null, 4)}</pre>
        </PageHeaderDescription>
        <PageActions>
          <Button onClick={() => reset()}>Retry</Button>
          <Link
            prefetch={false}
            href={"/"}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Back to Home
          </Link>
        </PageActions>
      </PageHeader>
    </main>
  );
}
