"use client";

import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";

type PaginationValue = {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    start: number;
    end: number;
    pageSize: number;
};
const PaginationContext = createContext({} as PaginationValue);

type Props = {
    pageSize?: number;
    dataLength: number;
    children: ReactNode;
};

export default function PaginationWrapper({
    children,
    pageSize = 5,
    dataLength = 0,
}: Partial<Props>) {
    const [page, setPage] = useState(1);

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return (
        <PaginationContext.Provider
            value={{
                page,
                setPage,
                start,
                end,
                pageSize,
            }}
        >
            {children}
        </PaginationContext.Provider>
    );
}

export const usePagination = (dataLength = 0) => {
    const context = useContext(PaginationContext);
    if (!context) throw new Error("Pagination context not within a provider");
    const { page, setPage, start, end, pageSize } = context;
    const totalPages = Math.ceil(dataLength / pageSize);
    const isPaginated = totalPages > 1;
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    const showPrevPage = useCallback(() => {
        if (page > 1) setPage((prev) => prev - 1);
    }, [page, setPage]);

    const showNextPage = useCallback(() => {
        if (page < totalPages) setPage((prev) => prev + 1);
    }, [page, totalPages, setPage]);

    return {
        page,
        setPage,
        start,
        end,
        isPaginated,
        hasNextPage,
        hasPrevPage,
        showPrevPage,
        showNextPage,
    };
};
