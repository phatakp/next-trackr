import { capitalize } from "./utils";

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

    grpTxnTypes: ["split", "you-owe-full", "you-owe-none"] as const,

    acctTabOptions: [
        {
            label: "Investment",
            value: "investment",
            link: "/accounts?type=investment&invType=equity",
        },
        {
            label: "Non Investment",
            value: "non-investment",
            link: "/accounts?type=savings",
        },
    ],
};

export const investmentOptions = siteConfig.invTypes.map((t) => ({
    label: capitalize(t),
    value: t,
    link: `/accounts?type=investment&invType=${t}`,
}));
export const nonInvestmentOptions = siteConfig.acctTypes
    .filter((t) => t !== "investment")
    .map((t) => ({
        label: capitalize(t),
        value: t,
        link: `/accounts?type=${t}`,
    }));

export const categoryGlossary = {
    paneer: "food:Groceries",
    milk: "food:Groceries",
    onion: "food:Groceries",
    potato: "food:Groceries",
    aloo: "food:Groceries",
    jamun: "food:Groceries",
    apple: "food:Groceries",
    banana: "food:Groceries",
    veggies: "food:Groceries",
    vegetables: "food:Groceries",
    fruit: "food:Groceries",
    fruits: "food:Groceries",
    prakash: "food:Groceries",
    bb: "food:Groceries",
    "big basket": "food:Groceries",
    "big-basket": "food:Groceries",
    kk: "food:Groceries",
    kisaan: "food:Groceries",
    "kisaan connect": "food:Groceries",
    "kisaan konnect": "food:Groceries",
    khakhra: "food:Groceries",
    khakra: "food:Groceries",
    zomato: "food:Online",
    swiggy: "food:Online",
    sandwich: "food:Online",
    poha: "food:Online",
    vadapav: "food:Online",
    "vada pav": "food:Online",
};
