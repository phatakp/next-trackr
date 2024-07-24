import { getUserTransactions } from "@/server/txn.actions";
import { TxnType } from "@/types";
import TxnList from "./components/txn-list";

type Props = {
  searchParams?: { type: string };
};

export default async function TransactionsPage({ searchParams }: Props) {
  const type = searchParams?.type ?? "all";
  const resp = await getUserTransactions(
    type !== "all" ? (type as TxnType) : undefined
  );

  if (resp?.error) throw new Error(resp.error);
  let txns = resp.data;

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 relative">
      <TxnList txns={txns} />
    </main>
  );
}
