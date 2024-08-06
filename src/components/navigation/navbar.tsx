import { ThemeToggle } from "@/components/common/theme-toggle";
import { siteConfig } from "@/lib/site-config";

import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Logo from "../common/logo";
import UserDropdown from "../common/user-dropdown";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";

export async function Navbar() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <header className="bg-background sticky top-0 border-b px-4 md:px-0 inset-x-0 z-[99]">
            <div className="container flex h-16 items-center gap-4 justify-between w-full">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        prefetch={false}
                        href="/"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <Logo />
                    </Link>

                    {user &&
                        siteConfig.navLinks.map((link) => (
                            <NavLink key={link} link={link} />
                        ))}
                </nav>
                <MobileNav />
                <div className="flex items-center gap-4 ml-auto md:gap-2 lg:gap-4">
                    <ThemeToggle />
                    <UserDropdown />
                    {/* {(await isAuthenticated()) && (
            <LogoutLink className={cn(buttonVariants({ size: "sm" }))}>
              Logout
            </LogoutLink>
          )} */}
                </div>
            </div>
        </header>
    );
}
