"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon, Plus } from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";

type Props = {
    tabOptions: {
        label: string;
        value: string;
        link?: string;
        icon?: LucideIcon;
        withIcon?: boolean;
    }[];
    children: ReactNode;
    defaultValue?: string;
    value?: string;
    isDisabled?: boolean;
};

export default function TabWrapper({
    tabOptions,
    defaultValue,
    children,
    value,
    isDisabled = false,
}: Props) {
    return (
        <Tabs defaultValue={defaultValue} value={value} className="w-full">
            <TabsList>
                {tabOptions.map(
                    ({
                        label,
                        value,
                        link,
                        icon: Icon = Plus,
                        withIcon = false,
                    }) => {
                        if (link)
                            return (
                                <Link key={value} href={link}>
                                    <TabsTrigger
                                        value={value}
                                        disabled={isDisabled}
                                    >
                                        {withIcon ? (
                                            <>
                                                <Icon className="size-4 sm:hidden" />
                                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                    {label}
                                                </span>
                                            </>
                                        ) : (
                                            label
                                        )}
                                    </TabsTrigger>
                                </Link>
                            );
                        return (
                            <TabsTrigger
                                key={value}
                                value={value}
                                disabled={isDisabled}
                            >
                                {withIcon ? (
                                    <>
                                        <Icon className="size-4 sm:hidden" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            {label}
                                        </span>
                                    </>
                                ) : (
                                    label
                                )}
                            </TabsTrigger>
                        );
                    }
                )}
            </TabsList>
            {children}
        </Tabs>
    );
}
