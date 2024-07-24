import type { AcctType, InvestmentType } from "@/types";
import AcctCard from "./components/acct-card";
import AcctListWrapper from "./components/acct-list-wrapper";

type Props = {
  searchParams?: { type: string; invType?: string };
};

export default async function AccountsPage({ searchParams }: Props) {
  const type = searchParams?.type ?? "savings";
  const invType = searchParams?.invType;

  return (
    <main className="grid flex-1 items-start gap-4 md:gap-8">
      <div className="mx-auto grid flex-1 auto-rows-max gap-4">
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <AcctListWrapper
            type={type as AcctType}
            invType={invType as InvestmentType | undefined}
          />
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <AcctCard />
          </div>
        </div>
      </div>
    </main>
  );
}
