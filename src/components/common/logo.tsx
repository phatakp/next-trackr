import { ChevronFirst, Euro, IndianRupee, Type } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex flex-nowrap font-normal items-center bg-primary text-primary-foreground rounded-lg p-1 leading-tight tracking-tighter">
      <Type className="size-5" />
      <IndianRupee className="size-4" />
      <span className="text-xl">A</span>
      <Euro className="size-5" />
      <ChevronFirst className="size-6" />
      <span className="text-xl">R</span>
    </div>
  );
}
