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
      prefetch={false}
      href={`/${link}`}
      className={cn(
        "text-foreground  relative grid gap-2 capitalize transition-colors ease-in-out",
        !isActive && "hover:text-primary",
      )}
    >
      {link}
      <Separator
        className={cn(
          "bg-primary absolute -bottom-2 h-1 opacity-0 transition-opacity duration-500 ease-in-out ",
          isActive && "opacity-100",
        )}
      />
    </Link>
  );
}
