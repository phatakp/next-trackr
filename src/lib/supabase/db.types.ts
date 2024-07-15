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
          inv_type: Database["public"]["Enums"]["Investment Type Enum"] | null
          is_default: boolean
          name: string
          number: string
          type: Database["public"]["Enums"]["Acct Type Enum"]
          user_id: string
        }
        Insert: {
          as_of_date: string
          balance?: number
          bank_id: number
          curr_value?: number
          id?: number
          inv_type?: Database["public"]["Enums"]["Investment Type Enum"] | null
          is_default?: boolean
          name: string
          number: string
          type: Database["public"]["Enums"]["Acct Type Enum"]
          user_id?: string
        }
        Update: {
          as_of_date?: string
          balance?: number
          bank_id?: number
          curr_value?: number
          id?: number
          inv_type?: Database["public"]["Enums"]["Investment Type Enum"] | null
          is_default?: boolean
          name?: string
          number?: string
          type?: Database["public"]["Enums"]["Acct Type Enum"]
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
          type: Database["public"]["Enums"]["Acct Type Enum"]
        }
        Insert: {
          id?: number
          name: string
          type: Database["public"]["Enums"]["Acct Type Enum"]
        }
        Update: {
          id?: number
          name?: string
          type?: Database["public"]["Enums"]["Acct Type Enum"]
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: number
          name: string
          type: Database["public"]["Enums"]["Category Type Enum"]
        }
        Insert: {
          id?: number
          name: string
          type: Database["public"]["Enums"]["Category Type Enum"]
        }
        Update: {
          id?: number
          name?: string
          type?: Database["public"]["Enums"]["Category Type Enum"]
        }
        Relationships: []
      }
      equity_accounts: {
        Row: {
          acct_id: number
          buy_price: number
          curr_price: number
          id: number
          money_control_prefix: string
          quantity: number
        }
        Insert: {
          acct_id: number
          buy_price?: number
          curr_price?: number
          id?: number
          money_control_prefix: string
          quantity?: number
        }
        Update: {
          acct_id?: number
          buy_price?: number
          curr_price?: number
          id?: number
          money_control_prefix?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "equity_accounts_acct_id_fkey"
            columns: ["acct_id"]
            isOneToOne: false
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
          id: number
          is_sip: boolean
          nav: number
          units: number
        }
        Insert: {
          acct_id: number
          id?: number
          is_sip?: boolean
          nav?: number
          units?: number
        }
        Update: {
          acct_id?: number
          id?: number
          is_sip?: boolean
          nav?: number
          units?: number
        }
        Relationships: [
          {
            foreignKeyName: "mf_aacounts_acct_id_fkey"
            columns: ["acct_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      recurring_txns: {
        Row: {
          end_date: string | null
          frequency: Database["public"]["Enums"]["Frequency Type Enum"]
          id: number
          start_date: string
          txn_id: number
        }
        Insert: {
          end_date?: string | null
          frequency: Database["public"]["Enums"]["Frequency Type Enum"]
          id?: number
          start_date: string
          txn_id: number
        }
        Update: {
          end_date?: string | null
          frequency?: Database["public"]["Enums"]["Frequency Type Enum"]
          id?: number
          start_date?: string
          txn_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "recurring_txns_txn_id_fkey"
            columns: ["txn_id"]
            isOneToOne: false
            referencedRelation: "transactions"
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
          id: number
          source_id: number | null
          type: Database["public"]["Enums"]["Transaction Type Enum"]
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
          id?: number
          source_id?: number | null
          type: Database["public"]["Enums"]["Transaction Type Enum"]
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
          id?: number
          source_id?: number | null
          type?: Database["public"]["Enums"]["Transaction Type Enum"]
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
      get_account_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
    }
    Enums: {
      "Acct Type Enum":
        | "savings"
        | "credit-card"
        | "wallet"
        | "investment"
        | "mortgage"
      "Category Type Enum":
        | "food"
        | "transportation"
        | "household"
        | "utilities"
        | "health"
        | "personal"
        | "income"
        | "transfer"
        | "miscellaneous"
      "Frequency Type Enum":
        | "daily"
        | "weekly"
        | "biweekly"
        | "monthly"
        | "quarterly"
        | "half-yearly"
        | "annually"
      "Investment Type Enum": "equity" | "fund" | "fd"
      "Transaction Type Enum": "expense" | "income" | "transfer"
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
