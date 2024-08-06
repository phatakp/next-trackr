import { getUserTransactions } from "@/server/txn.actions";
import { TxnType } from "@/types";
import TxnList from "./components/txn-list";

const TXN_PAGE_SIZE = 25;

type Props = {
    searchParams?: { type: string; page: number };
};

export default async function TransactionsPage({ searchParams }: Props) {
    const type = searchParams?.type ?? "all";
    const page = searchParams?.page ?? "1";
    const start = (Number(page) - 1) * TXN_PAGE_SIZE;
    const end = start + TXN_PAGE_SIZE;
    const resp = await getUserTransactions(
        start,
        end,
        type !== "all" ? (type as TxnType) : undefined
    );

    if (resp?.error) throw new Error(resp.error);
    let txns = resp.data;

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 relative">
            <TxnList txns={txns} page={Number(page)} pageSize={TXN_PAGE_SIZE} />
        </main>
    );
}
