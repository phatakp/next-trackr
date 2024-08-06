"use client";

import {
    getTotalAssets,
    getTotalLiabilities,
    getTotalLiquid,
} from "@/lib/utils";
import { AcctStat, AcctType, FullAccount, InvestmentType } from "@/types";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";

type AcctPageContextProps = {
    stats: AcctStat[] | null;
    accounts?: FullAccount[];
    type?: AcctType;
    invType?: InvestmentType;
};
const AcctPageContext = createContext({} as AcctPageContextProps);

type Props = PropsWithChildren & AcctPageContextProps;

export default function AcctPageProvider({
    children,
    accounts,
    stats,
    type = "savings",
    invType,
}: Props) {
    return (
        <AcctPageContext.Provider value={{ accounts, stats, type, invType }}>
            {children}
        </AcctPageContext.Provider>
    );
}

export const useAcctPageContext = () => {
    const context = useContext(AcctPageContext);
    if (!context)
        throw new Error("Acct Page Context should be used within a Provider");

    const { accounts, stats, type, invType } = context;
    const assets = getTotalAssets(stats ?? []);
    const liabilities = getTotalLiabilities(stats ?? []);
    const liquid = getTotalLiquid(stats ?? []);
    const totalInvestment =
        stats
            ?.filter((s) => s.type === "investment")
            .reduce((acc, b) => acc + b.tot_value, 0) ?? 0;

    let typeAccts = useMemo(() => {
        if (invType) return accounts?.filter((a) => a.inv_type === invType);
        return accounts?.filter((a) => a.type === type);
    }, [accounts, type, invType]);

    return {
        accounts,
        typeAccts,
        stats,
        type,
        invType,
        assets,
        liabilities,
        liquid,
        totalInvestment,
    };
};
