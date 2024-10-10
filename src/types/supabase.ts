export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      documents: {
        Row: {
          category: Database["public"]["Enums"]["document_category"]
          created_at: string
          id: number
          name: string
          original_file_name: string
          path: string
          user_id: string
        }
        Insert: {
          category: Database["public"]["Enums"]["document_category"]
          created_at?: string
          id?: number
          name: string
          original_file_name: string
          path: string
          user_id?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["document_category"]
          created_at?: string
          id?: number
          name?: string
          original_file_name?: string
          path?: string
          user_id?: string
        }
        Relationships: []
      }
      drones: {
        Row: {
          created_at: string
          frame_id: number
          id: number
          image: string | null
          nickname: string | null
          status: number
          user_id: string
        }
        Insert: {
          created_at?: string
          frame_id: number
          id?: number
          image?: string | null
          nickname?: string | null
          status?: number
          user_id?: string
        }
        Update: {
          created_at?: string
          frame_id?: number
          id?: number
          image?: string | null
          nickname?: string | null
          status?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "drones_frame_fkey"
            columns: ["frame_id"]
            isOneToOne: false
            referencedRelation: "frames"
            referencedColumns: ["id"]
          },
        ]
      }
      frame_variants: {
        Row: {
          created_at: string
          frame_id: number
          id: number
          layout: number
          prop_size: number
        }
        Insert: {
          created_at?: string
          frame_id: number
          id?: number
          layout: number
          prop_size: number
        }
        Update: {
          created_at?: string
          frame_id?: number
          id?: number
          layout?: number
          prop_size?: number
        }
        Relationships: [
          {
            foreignKeyName: "frame_variants_frame_id_fkey"
            columns: ["frame_id"]
            isOneToOne: false
            referencedRelation: "frames"
            referencedColumns: ["id"]
          },
        ]
      }
      frames: {
        Row: {
          created_at: string
          id: number
          is_public: boolean
          manufacturer_id: number | null
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_public?: boolean
          manufacturer_id?: number | null
          name: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          is_public?: boolean
          manufacturer_id?: number | null
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "frames_manufacturer_fkey"
            columns: ["manufacturer_id"]
            isOneToOne: false
            referencedRelation: "manufacturers"
            referencedColumns: ["id"]
          },
        ]
      }
      manufacturers: {
        Row: {
          created_at: string
          id: number
          is_public: boolean
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_public?: boolean
          name: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          is_public?: boolean
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      pilots: {
        Row: {
          bannerHref: string | null
          bio: string | null
          contact_email: string | null
          contact_phone: string | null
          contact_website: string | null
          created_at: string
          facebook_handle: string | null
          id: number
          instagram_handle: string | null
          logoHref: string | null
          name: string | null
          nickname: string | null
          share_handle: string
          tiktok_handle: string | null
          user_id: string
          youtube_handle: string | null
        }
        Insert: {
          bannerHref?: string | null
          bio?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          contact_website?: string | null
          created_at?: string
          facebook_handle?: string | null
          id?: number
          instagram_handle?: string | null
          logoHref?: string | null
          name?: string | null
          nickname?: string | null
          share_handle?: string
          tiktok_handle?: string | null
          user_id?: string
          youtube_handle?: string | null
        }
        Update: {
          bannerHref?: string | null
          bio?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          contact_website?: string | null
          created_at?: string
          facebook_handle?: string | null
          id?: number
          instagram_handle?: string | null
          logoHref?: string | null
          name?: string | null
          nickname?: string | null
          share_handle?: string
          tiktok_handle?: string | null
          user_id?: string
          youtube_handle?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      refresh_drone_nickname: {
        Args: {
          drone_id: number
        }
        Returns: undefined
      }
    }
    Enums: {
      document_category: "legal" | "miscellaneous" | "insurance"
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

