import { Database } from "@/lib/supabase/db.types";

//Enum Types
export type AcctType = Database["public"]["Enums"]["account_type_enum"];
export type InvestmentType =
  Database["public"]["Enums"]["investment_type_enum"];
export type TxnType = Database["public"]["Enums"]["transaction_type_enum"];
export type CategoryType = Database["public"]["Enums"]["category_type_enum"];
export type Frequency = Database["public"]["Enums"]["frequency_type_enum"];

//DB Table Types
export type Bank = Database["public"]["Tables"]["banks"]["Row"];
export type Account = Database["public"]["Tables"]["accounts"]["Row"];
export type NewAccount = Database["public"]["Tables"]["accounts"]["Insert"];
export type MFAccount = Database["public"]["Tables"]["mf_accounts"]["Row"];
export type EquityAccount =
  Database["public"]["Tables"]["equity_accounts"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Transaction = Database["public"]["Tables"]["transactions"]["Row"];
export type Group = Database["public"]["Tables"]["groups"]["Row"];
export type GroupUser = Database["public"]["Tables"]["group_users"]["Row"];

//Custom Types
export type SelectOption = {
  label: string;
  value: string | number;
};

export type AcctStat = {
  type: AcctType;
  count: number;
  tot_balance: number;
  tot_value: number;
  is_asset: boolean;
  change: number;
};

export type FullAccount = Account & {
  bank: Bank;
  mf: MFAccount | null;
  equity: EquityAccount | null;
};
