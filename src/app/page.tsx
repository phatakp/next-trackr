import {
    PageActions,
    PageHeader,
    PageHeaderDescription,
    PageHeaderHeading,
} from "@/components/common/page-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <main className="h-full w-full bg-background dark:bg-grid-white/[0.1] bg-grid-black/[0.2] relative flex items-center justify-center min-h-screen">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <PageHeader className="max-w-3xl z-20 py-8">
                <Badge>
                    Trackr <ArrowRight className="size-4" />
                </Badge>
                <PageHeaderHeading className="text-balance title">
                    Finance at your fingertips
                </PageHeaderHeading>
                <PageHeaderDescription>
                    Graphically loaded. Track all your accounts. Know your
                    worth.
                </PageHeaderDescription>
                <PageActions>
                    <Link
                        prefetch={false}
                        href={"/auth"}
                        className={cn(
                            buttonVariants({ variant: "default" }),
                            "rounded-full"
                        )}
                    >
                        Start Tracking
                    </Link>
                </PageActions>
            </PageHeader>
        </main>
    );
}
