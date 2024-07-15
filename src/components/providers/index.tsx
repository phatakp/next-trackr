"use client";

import { type ReactNode } from "react";
import ReactQueryProvider from "./react-query-provider";
import { ThemeProvider } from "./theme-provider";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      defaultTheme="dark"
      enableSystem={false}
      attribute="class"
      disableTransitionOnChange
    >
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ThemeProvider>
  );
}
