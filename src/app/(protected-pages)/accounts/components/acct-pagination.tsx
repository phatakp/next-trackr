import { usePagination } from "@/components/common/pagination-wrapper";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AcctPagination() {
    const {
        showPrevPage,
        showNextPage,
        isPaginated,
        hasPrevPage,
        hasNextPage,
    } = usePagination();

    if (!isPaginated) return;

    return (
        <Pagination className="ml-auto mr-0 w-auto">
            <PaginationContent>
                <PaginationItem>
                    <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6"
                        onClick={showPrevPage}
                        disabled={!hasPrevPage}
                    >
                        <ChevronLeft className="h-3.5 w-3.5" />
                        <span className="sr-only">Previous Order</span>
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6"
                        onClick={showNextPage}
                        disabled={!hasNextPage}
                    >
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="sr-only">Next Order</span>
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
