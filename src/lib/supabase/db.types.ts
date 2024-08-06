export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          as_of_date: string
          balance: number
          bank_id: number
          curr_value: number
          id: number
          inv_type: Database["public"]["Enums"]["investment_type_enum"] | null
          is_default: boolean
          name: string
          number: string
          type: Database["public"]["Enums"]["account_type_enum"]
          user_id: string
        }
        Insert: {
          as_of_date: string
          balance?: number
          bank_id: number
          curr_value?: number
          id?: number
          inv_type?: Database["public"]["Enums"]["investment_type_enum"] | null
          is_default?: boolean
          name: string
          number: string
          type: Database["public"]["Enums"]["account_type_enum"]
          user_id?: string
        }
        Update: {
          as_of_date?: string
          balance?: number
          bank_id?: number
          curr_value?: number
          id?: number
          inv_type?: Database["public"]["Enums"]["investment_type_enum"] | null
          is_default?: boolean
          name?: string
          number?: string
          type?: Database["public"]["Enums"]["account_type_enum"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounts_bank_id_fkey"
            columns: ["bank_id"]
            isOneToOne: false
            referencedRelation: "banks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      banks: {
        Row: {
          id: number
          name: string
          type: Database["public"]["Enums"]["account_type_enum"]
        }
        Insert: {
          id?: number
          name: string
          type: Database["public"]["Enums"]["account_type_enum"]
        }
        Update: {
          id?: number
          name?: string
          type?: Database["public"]["Enums"]["account_type_enum"]
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: number
          name: string
          type: Database["public"]["Enums"]["category_type_enum"]
        }
        Insert: {
          id?: number
          name: string
          type: Database["public"]["Enums"]["category_type_enum"]
        }
        Update: {
          id?: number
          name?: string
          type?: Database["public"]["Enums"]["category_type_enum"]
        }
        Relationships: []
      }
      common_tags: {
        Row: {
          category_id: number
          id: number
          text: string
        }
        Insert: {
          category_id: number
          id?: number
          text: string
        }
        Update: {
          category_id?: number
          id?: number
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "common_tags_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      equity_accounts: {
        Row: {
          acct_id: number
          buy_price: number
          curr_price: number
          money_control_prefix: string
          quantity: number
        }
        Insert: {
          acct_id: number
          buy_price?: number
          curr_price?: number
          money_control_prefix: string
          quantity?: number
        }
        Update: {
          acct_id?: number
          buy_price?: number
          curr_price?: number
          money_control_prefix?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "equity_accounts_acct_id_fkey"
            columns: ["acct_id"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      group_users: {
        Row: {
          group_id: number
          user_id: string
        }
        Insert: {
          group_id: number
          user_id?: string
        }
        Update: {
          group_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_users_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      mf_accounts: {
        Row: {
          acct_id: number
          is_sip: boolean
          nav: number
          units: number
        }
        Insert: {
          acct_id: number
          is_sip?: boolean
          nav?: number
          units?: number
        }
        Update: {
          acct_id?: number
          is_sip?: boolean
          nav?: number
          units?: number
        }
        Relationships: [
          {
            foreignKeyName: "mf_aacounts_acct_id_fkey"
            columns: ["acct_id"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          first_name: string
          id: string
          last_name: string | null
        }
        Insert: {
          first_name: string
          id?: string
          last_name?: string | null
        }
        Update: {
          first_name?: string
          id?: string
          last_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          category_id: number | null
          created_at: string
          date: string
          description: string | null
          destination_id: number | null
          group_id: number | null
          grp_split_amt: number | null
          grp_txn_type: Database["public"]["Enums"]["grp_txn_type_enum"] | null
          id: number
          source_id: number | null
          type: Database["public"]["Enums"]["transaction_type_enum"]
          user_id: string
        }
        Insert: {
          amount: number
          category_id?: number | null
          created_at?: string
          date: string
          description?: string | null
          destination_id?: number | null
          group_id?: number | null
          grp_split_amt?: number | null
          grp_txn_type?: Database["public"]["Enums"]["grp_txn_type_enum"] | null
          id?: number
          source_id?: number | null
          type: Database["public"]["Enums"]["transaction_type_enum"]
          user_id?: string
        }
        Update: {
          amount?: number
          category_id?: number | null
          created_at?: string
          date?: string
          description?: string | null
          destination_id?: number | null
          group_id?: number | null
          grp_split_amt?: number | null
          grp_txn_type?: Database["public"]["Enums"]["grp_txn_type_enum"] | null
          id?: number
          source_id?: number | null
          type?: Database["public"]["Enums"]["transaction_type_enum"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_group: {
        Args: {
          name: string
          users: string[]
        }
        Returns: number
      }
      credit_acct: {
        Args: {
          id_: number
          amt: number
        }
        Returns: undefined
      }
      debit_acct: {
        Args: {
          id_: number
          amt: number
        }
        Returns: undefined
      }
      delete_transactions: {
        Args: {
          id_: number
        }
        Returns: number
      }
      get_account_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_group_stats: {
        Args: {
          groupid: number
        }
        Returns: Json
      }
      get_monthly_expense_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_top_expenses: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      insert_into_accounts: {
        Args: {
          name: string
          type: string
          number: string
          balance: number
          curr_value: number
          bank_id: number
          as_of_date: string
          investment_type?: string
          curr_price?: number
          buy_price?: number
          quantity?: number
          prefix?: string
          is_sip?: boolean
          units?: number
          nav?: number
        }
        Returns: number
      }
      insert_into_transactions: {
        Args: {
          date: string
          amount: number
          category_id: number
          type: string
          description?: string
          source_id?: number
          destination_id?: number
          group_id?: number
          grp_txn_type?: string
        }
        Returns: number
      }
      update_accounts: {
        Args: {
          id_: number
          bal: number
          asofdate: string
          currvalue?: number
          currprice?: number
          buyprice?: number
          qty?: number
          units_?: number
          nav_?: number
        }
        Returns: number
      }
      update_transactions: {
        Args: {
          id_: number
          dt: string
          amt: number
          catid: number
          descr?: string
          srcid?: number
          destid?: number
          grpid?: number
          grptxntype?: string
        }
        Returns: number
      }
    }
    Enums: {
      account_type_enum:
        | "savings"
        | "credit-card"
        | "wallet"
        | "investment"
        | "mortgage"
      category_type_enum:
        | "food"
        | "transportation"
        | "household"
        | "utilities"
        | "health"
        | "personal"
        | "income"
        | "transfer"
        | "miscellaneous"
      grp_txn_type_enum: "split" | "you-owe-full" | "you-owe-none"
      investment_type_enum: "equity" | "fund" | "fd"
      transaction_type_enum: "expense" | "income" | "transfer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
