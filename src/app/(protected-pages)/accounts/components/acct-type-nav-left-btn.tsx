import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { AcctType } from "@/types";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  currType: AcctType;
};

export default function AcctTypeLeftNavBtn({ currType }: Props) {
  const getType = () => {
    const idx = siteConfig.acctTypes.indexOf(currType as AcctType);
    return siteConfig.acctTypes.at(idx - 1);
  };

  return (
    <Link
      href={`/accounts?type=${getType()}`}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "size-7"
      )}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Back</span>
    </Link>
  );
}
