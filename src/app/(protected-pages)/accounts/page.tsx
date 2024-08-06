import type { AcctType, InvestmentType } from "@/types";
import AcctPageWrapper from "./components/acct-page-wrapper";

type Props = {
  searchParams?: { type: string; invType?: string };
};

export default async function AccountsPage({ searchParams }: Props) {
  const type = searchParams?.type ?? "savings";
  const invType = searchParams?.invType;

  return (
    <main className="w-full grid flex-1 items-start gap-4 md:gap-8">
      <AcctPageWrapper
        type={type as AcctType}
        invType={invType as InvestmentType | undefined}
      />
    </main>
  );
}
