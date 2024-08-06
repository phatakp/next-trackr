"use client";

import { getCurrUserName } from "@/lib/supabase/server";
import { useQuery } from "@tanstack/react-query";
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
    const { isLoading, data: username } = useQuery({
        queryKey: ["user-name"],
        queryFn: async () => await getCurrUserName(),
    });

    if (isLoading)
        return (
            <div className="grid gap-4 mx-auto w-full text-balance text-center items-center">
                <Skeleton className="max-w-3xl h-12 w-full" />
                <Skeleton className="max-w-[750px] h-6 w-full" />
            </div>
        );

    return (
        <PageHeader className="max-w-3xl py-0 pb-4 gap-0">
            <PageHeaderHeading className="text-balance capitalize">
                {title}
            </PageHeaderHeading>
            <PageHeaderDescription>{username}</PageHeaderDescription>
        </PageHeader>
    );
}
