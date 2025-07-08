export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      contact_reveals: {
        Row: {
          id: string
          investor_id: string | null
          revealed_at: string
          user_id: string | null
        }
        Insert: {
          id?: string
          investor_id?: string | null
          revealed_at?: string
          user_id?: string | null
        }
        Update: {
          id?: string
          investor_id?: string | null
          revealed_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_reveals_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "investors"
            referencedColumns: ["id"]
          },
        ]
      }
      investors: {
        Row: {
          bio: string | null
          check_sizes: string | null
          company: string | null
          company_url: string | null
          contact: string
          contact_type: string | null
          created_at: string
          funding_description: string | null
          funding_industries: string[] | null
          funding_stage: string | null
          funding_type: string | null
          id: string
          image_url: string | null
          location: string | null
          name: string
          updated_at: string
          verified: boolean | null
        }
        Insert: {
          bio?: string | null
          check_sizes?: string | null
          company?: string | null
          company_url?: string | null
          contact?: string
          contact_type?: string | null
          created_at?: string
          funding_description?: string | null
          funding_industries?: string[] | null
          funding_stage?: string | null
          funding_type?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          name: string
          updated_at?: string
          verified?: boolean | null
        }
        Update: {
          bio?: string | null
          check_sizes?: string | null
          company?: string | null
          company_url?: string | null
          contact?: string
          contact_type?: string | null
          created_at?: string
          funding_description?: string | null
          funding_industries?: string[] | null
          funding_stage?: string | null
          funding_type?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          name?: string
          updated_at?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          access_limit: number | null
          access_reset_date: string | null
          access_used: number | null
          avatar_url: string | null
          billing_cycle: string | null
          bio: string | null
          company: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          stripe_customer_id: string | null
          subscription_end: string | null
          subscription_price: number | null
          subscription_tier: string | null
          updated_at: string
        }
        Insert: {
          access_limit?: number | null
          access_reset_date?: string | null
          access_used?: number | null
          avatar_url?: string | null
          billing_cycle?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          stripe_customer_id?: string | null
          subscription_end?: string | null
          subscription_price?: number | null
          subscription_tier?: string | null
          updated_at?: string
        }
        Update: {
          access_limit?: number | null
          access_reset_date?: string | null
          access_used?: number | null
          avatar_url?: string | null
          billing_cycle?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          stripe_customer_id?: string | null
          subscription_end?: string | null
          subscription_price?: number | null
          subscription_tier?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      saved_investors: {
        Row: {
          created_at: string
          id: string
          investor_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          investor_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          investor_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_investors_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "investors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      reset_monthly_access: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
