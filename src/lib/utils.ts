import { FullTxn } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";

  // Make sure to include `https://` when not localhost.
  if (process.env.NODE_ENV === "production") {
    url = url.startsWith("http") ? url : `https://${url}`;
  }
  // Make sure to include a trailing `/`.
  url = url.endsWith("/") ? url : `${url}/`;
  return url;
};

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function amountFormatter(val: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    currencyDisplay: "code",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .formatToParts(val)
    .map((p) => (p.type != "literal" && p.type != "currency" ? p.value : ""))
    .join("");
}

export function shortAmount(amt: number, dec?: number) {
  if (amt > 10000000) {
    const num = (amt / 10000000).toFixed(dec ?? 2);
    return num + "Cr";
  }
  if (amt > 100000) {
    const num = (amt / 100000).toFixed(dec ?? 2);
    return num + "L";
  }
  if (amt >= 1000) {
    const num = (amt / 1000).toFixed(dec ?? 2);
    return num + "K";
  }
  return amt.toFixed();
}

export function acct_number_format(value: string | undefined) {
  if (!value) return value;

  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const parts = [];

  for (let i = 0; i < v.length; i += 4) {
    parts.push(v.slice(i, i + 4));
  }

  return parts.length > 1 ? parts.join("-") : value;
}
export function masked_acct(value: string | undefined) {
  if (!value) return value;
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  return "XXXX-" + v.slice(-4);
}

export function groupedByDate(data: FullTxn[]) {
  return data.reduce((x: { [key: string]: FullTxn[] }, y) => {
    (x[y.date] = x[y.date as any] || []).push(y);

    return x;
  }, {});
}
