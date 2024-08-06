import { Skeleton } from "@/components/ui/skeleton";

export default function AccountsLoading() {
  return (
    <main className="w-full grid flex-1 items-start gap-4 md:gap-8">
      <div className="grid gap-6 md:grid-cols-[1fr_300px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-6 lg:col-span-2 lg:gap-8">
          <Skeleton className="h-[150px]" />
          <Skeleton className="h-[550px]" />
        </div>
        <div className="grid auto-rows-max items-start gap-6 lg:gap-8">
          <Skeleton className="size-[280px]" />
          <Skeleton className="h-[400px]" />
        </div>
      </div>
    </main>
  );
}
