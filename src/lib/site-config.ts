export const siteConfig = {
  name: "Trackr",
  description: "Personal Finance Management app created in NextJS",
  navLinks: ["dashboard", "accounts", "transactions", "groups"] as const,
  cashBankName: "Cash",
  acctTypes: [
    "savings",
    "credit-card",
    "wallet",
    "investment",
    "mortgage",
  ] as const,

  txnTypes: ["expense", "income", "transfer"] as const,

  invTypes: ["fund", "equity", "fd"] as const,

  categoryTypes: [
    "food",
    "health",
    "household",
    "income",
    "miscellaneous",
    "personal",
    "transfer",
    "transportation",
    "utitlities",
  ] as const,

  frequency: [
    "daily",
    "weekly",
    "biweekly",
    "monthly",
    "quarterly",
    "half-yearly",
    "annually",
  ] as const,
};
