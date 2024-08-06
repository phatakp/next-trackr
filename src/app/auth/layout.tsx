import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full grid lg:grid-cols-2 ">
      <div className="py-20">{children}</div>
      <div className="hidden lg:flex">
        <Image src="/auth.svg" alt="logo" width={500} height={300} />
      </div>
    </div>
  );
}
