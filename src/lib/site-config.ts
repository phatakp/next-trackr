export enum ACCT_TYPE {
  SAVINGS = "savings",
  INVESTMENT = "investment",
  CREDITCARD = "credit-card",
  MORTGAGE = "mortgage",
  WALLET = "wallet",
}

export enum TXN_TYPE {
  EXPENSE = "expense",
  INCOME = "income",
  TRANSFER = "transfer",
}

export enum INVESTMENT_TYPE {
  MUTUALFUND = "fund",
  EQUITY = "equity",
  DEPOSIT = "fd",
}

export enum CATEGORY_TYPE {
  FOOD = "food",
  TRANSPORTATION = "transportation",
  HOUSEHOLD = "household",
  UTILITIES = "utilities",
  HEALTH = "health",
  PERSONAL = "personal",
  INCOME = "income",
  TRANSFER = "transfer",
  MISC = "miscellaneous",
}

export enum FREQUENCY {
  DAILY = "daily",
  WEEKLY = "weekly",
  BIWEEKLY = "biweekly",
  MONTHLY = "monthly",
  QUARTERLY = "quarterly",
  HALFYEARLY = "half-yearly",
  ANNUALLY = "annually",
}

export const siteConfig = {
  name: "Trackr",
  description: "Personal Finance Management app created in NextJS",
  navLinks: ["dashboard", "accounts", "transactions", "groups"] as const,
  cashBankName: "Cash",
  acctTypes: [
    ACCT_TYPE.SAVINGS,
    ACCT_TYPE.CREDITCARD,
    ACCT_TYPE.WALLET,
    ACCT_TYPE.INVESTMENT,
    ACCT_TYPE.MORTGAGE,
  ] as const,

  txnTypes: [TXN_TYPE.EXPENSE, TXN_TYPE.INCOME, TXN_TYPE.TRANSFER] as const,

  invTypes: [
    INVESTMENT_TYPE.MUTUALFUND,
    INVESTMENT_TYPE.EQUITY,
    INVESTMENT_TYPE.DEPOSIT,
  ] as const,

  categoryTypes: [
    CATEGORY_TYPE.FOOD,
    CATEGORY_TYPE.HEALTH,
    CATEGORY_TYPE.HOUSEHOLD,
    CATEGORY_TYPE.INCOME,
    CATEGORY_TYPE.MISC,
    CATEGORY_TYPE.PERSONAL,
    CATEGORY_TYPE.TRANSFER,
    CATEGORY_TYPE.TRANSPORTATION,
    CATEGORY_TYPE.UTILITIES,
  ] as const,

  frequency: [
    FREQUENCY.DAILY,
    FREQUENCY.WEEKLY,
    FREQUENCY.BIWEEKLY,
    FREQUENCY.MONTHLY,
    FREQUENCY.QUARTERLY,
    FREQUENCY.HALFYEARLY,
    FREQUENCY.ANNUALLY,
  ] as const,
};
