import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2 ">
      <div className="py-16">{children}</div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/vercel.svg"
          alt="logo"
          width="500"
          height="300"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
