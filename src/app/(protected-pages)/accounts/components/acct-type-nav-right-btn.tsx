import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { AcctType } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  currType: AcctType;
};

export default function AcctTypeRightNavBtn({ currType }: Props) {
  const getType = () => {
    let idx = siteConfig.acctTypes.indexOf(currType as AcctType);
    idx++;
    return siteConfig.acctTypes.at(
      idx === siteConfig.acctTypes.length ? 0 : idx
    );
  };

  return (
    <Link
      href={`/accounts?type=${getType()}`}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "size-7"
      )}
    >
      <ChevronRight className="h-4 w-4" />
      <span className="sr-only">Next</span>
    </Link>
  );
}
