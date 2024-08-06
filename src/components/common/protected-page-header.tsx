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
        <div className="h-[8rem] w-full bg-background  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <PageHeader className="max-w-3xl py-0 pb-4 gap-0 relative z-20">
                <PageHeaderHeading className="text-balance capitalize title">
                    {title}
                </PageHeaderHeading>
                <PageHeaderDescription>{username}</PageHeaderDescription>
            </PageHeader>
        </div>
    );
}
