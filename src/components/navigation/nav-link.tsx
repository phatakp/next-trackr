"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ link }: { link: string }) {
  const path = usePathname();
  const isActive = path.slice(1) === link;

  return (
    <Link
      href={`/${link}`}
      className={cn(
        "text-foreground  relative grid gap-1 capitalize transition-colors ease-in-out duration-500",
        !isActive && "hover:text-primary"
      )}
    >
      {link}
      <Separator
        className={cn(
          "bg-primary h-1 opacity-0 w-0 transition-all duration-500 ease-in-out ",
          isActive && "w-full opacity-100"
        )}
      />
    </Link>
  );
}
