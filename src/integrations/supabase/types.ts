export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      certifications: {
        Row: {
          category: string | null
          created_at: string | null
          credential_url: string | null
          id: string
          provider: string | null
          sort_order: number | null
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          credential_url?: string | null
          id?: string
          provider?: string | null
          sort_order?: number | null
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          credential_url?: string | null
          id?: string
          provider?: string | null
          sort_order?: number | null
          title?: string
        }
        Relationships: []
      }
      experience: {
        Row: {
          bullet_points: Json | null
          company: string
          created_at: string | null
          description: string | null
          end_year: string | null
          id: string
          is_current: boolean | null
          location: string | null
          sort_order: number | null
          start_year: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          bullet_points?: Json | null
          company: string
          created_at?: string | null
          description?: string | null
          end_year?: string | null
          id?: string
          is_current?: boolean | null
          location?: string | null
          sort_order?: number | null
          start_year?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          bullet_points?: Json | null
          company?: string
          created_at?: string | null
          description?: string | null
          end_year?: string | null
          id?: string
          is_current?: boolean | null
          location?: string | null
          sort_order?: number | null
          start_year?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          budget: string | null
          company: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          project_type: string | null
          status: string | null
        }
        Insert: {
          budget?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          project_type?: string | null
          status?: string | null
        }
        Update: {
          budget?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          project_type?: string | null
          status?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          author_name: string | null
          body_md: string | null
          category: string | null
          cover_url: string | null
          created_at: string | null
          excerpt: string | null
          featured: boolean | null
          gallery: Json | null
          hero_description: string | null
          hero_title: string | null
          id: string
          key_takeaways: Json | null
          published_at: string | null
          reading_time: string | null
          related_services: Json | null
          sections: Json | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string | null
          tags: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_name?: string | null
          body_md?: string | null
          category?: string | null
          cover_url?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          gallery?: Json | null
          hero_description?: string | null
          hero_title?: string | null
          id?: string
          key_takeaways?: Json | null
          published_at?: string | null
          reading_time?: string | null
          related_services?: Json | null
          sections?: Json | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string | null
          tags?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_name?: string | null
          body_md?: string | null
          category?: string | null
          cover_url?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          gallery?: Json | null
          hero_description?: string | null
          hero_title?: string | null
          id?: string
          key_takeaways?: Json | null
          published_at?: string | null
          reading_time?: string | null
          related_services?: Json | null
          sections?: Json | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string | null
          tags?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          approach: string | null
          business_impact: Json | null
          category: string | null
          challenges: Json | null
          created_at: string | null
          data_sources: Json | null
          description: string | null
          featured: boolean | null
          gallery: Json | null
          github_url: string | null
          hero_description: string | null
          hero_title: string | null
          id: string
          image_url: string | null
          key_features: Json | null
          live_url: string | null
          metrics: Json | null
          outcome: string | null
          problem: string | null
          project_goal: string | null
          short_description: string | null
          slug: string
          solution_steps: Json | null
          sort_order: number | null
          status: string | null
          technologies: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          approach?: string | null
          business_impact?: Json | null
          category?: string | null
          challenges?: Json | null
          created_at?: string | null
          data_sources?: Json | null
          description?: string | null
          featured?: boolean | null
          gallery?: Json | null
          github_url?: string | null
          hero_description?: string | null
          hero_title?: string | null
          id?: string
          image_url?: string | null
          key_features?: Json | null
          live_url?: string | null
          metrics?: Json | null
          outcome?: string | null
          problem?: string | null
          project_goal?: string | null
          short_description?: string | null
          slug: string
          solution_steps?: Json | null
          sort_order?: number | null
          status?: string | null
          technologies?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          approach?: string | null
          business_impact?: Json | null
          category?: string | null
          challenges?: Json | null
          created_at?: string | null
          data_sources?: Json | null
          description?: string | null
          featured?: boolean | null
          gallery?: Json | null
          github_url?: string | null
          hero_description?: string | null
          hero_title?: string | null
          id?: string
          image_url?: string | null
          key_features?: Json | null
          live_url?: string | null
          metrics?: Json | null
          outcome?: string | null
          problem?: string | null
          project_goal?: string | null
          short_description?: string | null
          slug?: string
          solution_steps?: Json | null
          sort_order?: number | null
          status?: string | null
          technologies?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      service_images: {
        Row: {
          alt_text: string | null
          created_at: string | null
          id: string
          image_url: string
          service_id: string
          sort_order: number | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          id?: string
          image_url: string
          service_id: string
          sort_order?: number | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          id?: string
          image_url?: string
          service_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "service_images_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_projects: {
        Row: {
          created_at: string | null
          id: string
          project_id: string
          service_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          project_id: string
          service_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          project_id?: string
          service_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_projects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_projects_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          benefits: Json | null
          created_at: string | null
          cta_description: string | null
          cta_title: string | null
          deliverables: Json | null
          faq: Json | null
          full_description: string | null
          hero_description: string | null
          hero_title: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          problems_solved: Json | null
          process_steps: Json | null
          short_description: string | null
          slug: string
          sort_order: number | null
          technologies: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          benefits?: Json | null
          created_at?: string | null
          cta_description?: string | null
          cta_title?: string | null
          deliverables?: Json | null
          faq?: Json | null
          full_description?: string | null
          hero_description?: string | null
          hero_title?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          problems_solved?: Json | null
          process_steps?: Json | null
          short_description?: string | null
          slug: string
          sort_order?: number | null
          technologies?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          benefits?: Json | null
          created_at?: string | null
          cta_description?: string | null
          cta_title?: string | null
          deliverables?: Json | null
          faq?: Json | null
          full_description?: string | null
          hero_description?: string | null
          hero_title?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          problems_solved?: Json | null
          process_steps?: Json | null
          short_description?: string | null
          slug?: string
          sort_order?: number | null
          technologies?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string | null
          id: string
          level: number | null
          name: string
          sort_order: number | null
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          level?: number | null
          name: string
          sort_order?: number | null
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          level?: number | null
          name?: string
          sort_order?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "user"
      lead_budget: "under_5k" | "5k_15k" | "15k_50k" | "50k_plus" | "not_sure"
      post_status: "draft" | "published"
      project_status: "draft" | "published"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "user"],
      lead_budget: ["under_5k", "5k_15k", "15k_50k", "50k_plus", "not_sure"],
      post_status: ["draft", "published"],
      project_status: ["draft", "published"],
    },
  },
} as const

