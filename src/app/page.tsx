import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/common/page-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <PageHeader className="max-w-3xl">
        <PageHeaderHeading className="text-balance">
          Building Blocks for the Web
        </PageHeaderHeading>
        <PageHeaderDescription>
          Beautifully designed. Copy and paste into your apps. Open Source.
        </PageHeaderDescription>
        <PageActions>
          <Link
            prefetch={false}
            href={"/auth"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Start Tracking
          </Link>
        </PageActions>
      </PageHeader>
    </main>
  );
}
