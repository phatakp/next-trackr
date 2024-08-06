"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site-config";
import { IndentIncrease } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Logo from "../common/logo";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
          <IndentIncrease className="size-7" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="z-[100]">
        <nav className="grid gap-6 text-lg font-medium py-8 space-y-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
            onClick={close}
          >
            <Logo />
            <span className="sr-only">Acme Inc</span>
          </Link>

          {siteConfig.navLinks.map((link) => (
            <Link
              key={link}
              href={`/${link}`}
              onClick={close}
              className="grid gap-2 hover:text-foreground capitalize text-4xl font-extrabold title group"
            >
              {link}
              <span className="w-0 opacity-0 group-hover:opacity-90 group-hover:w-full h-2 bg-foreground rounded transition-all duration-500 ease-in-out" />
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
