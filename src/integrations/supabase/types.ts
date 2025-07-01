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
      applications: {
        Row: {
          course_id: string | null
          documents: Json | null
          id: string
          institution_id: string | null
          notes: string | null
          personal_data: Json
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          student_id: string | null
          submitted_at: string | null
        }
        Insert: {
          course_id?: string | null
          documents?: Json | null
          id?: string
          institution_id?: string | null
          notes?: string | null
          personal_data: Json
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          student_id?: string | null
          submitted_at?: string | null
        }
        Update: {
          course_id?: string | null
          documents?: Json | null
          id?: string
          institution_id?: string | null
          notes?: string | null
          personal_data?: Json
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          student_id?: string | null
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string | null
          description: string | null
          duration_years: number | null
          id: string
          institution_id: string | null
          level: string
          name: string
          requirements: string | null
          tuition: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_years?: number | null
          id?: string
          institution_id?: string | null
          level: string
          name: string
          requirements?: string | null
          tuition?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_years?: number | null
          id?: string
          institution_id?: string | null
          level?: string
          name?: string
          requirements?: string | null
          tuition?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          file_path: string
          id: string
          uploaded_at: string | null
          user_id: string | null
        }
        Insert: {
          file_path: string
          id?: string
          uploaded_at?: string | null
          user_id?: string | null
        }
        Update: {
          file_path?: string
          id?: string
          uploaded_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      followers: {
        Row: {
          created_at: string | null
          follower_id: string | null
          id: string
          institution_id: string | null
        }
        Insert: {
          created_at?: string | null
          follower_id?: string | null
          id?: string
          institution_id?: string | null
        }
        Update: {
          created_at?: string | null
          follower_id?: string | null
          id?: string
          institution_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "followers_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institutions: {
        Row: {
          address: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          email: string | null
          id: string
          institution_type: string
          latitude: number | null
          logo_url: string | null
          longitude: number | null
          municipality: string | null
          name: string
          phone: string | null
          province: string
          status: string | null
          subscription_plan: string | null
          tuition_high_school: number | null
          tuition_primary: number | null
          tuition_secondary: number | null
          tuition_university: number | null
          updated_at: string | null
          video_url: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          email?: string | null
          id?: string
          institution_type: string
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          municipality?: string | null
          name: string
          phone?: string | null
          province: string
          status?: string | null
          subscription_plan?: string | null
          tuition_high_school?: number | null
          tuition_primary?: number | null
          tuition_secondary?: number | null
          tuition_university?: number | null
          updated_at?: string | null
          video_url?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          email?: string | null
          id?: string
          institution_type?: string
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          municipality?: string | null
          name?: string
          phone?: string | null
          province?: string
          status?: string | null
          subscription_plan?: string | null
          tuition_high_school?: number | null
          tuition_primary?: number | null
          tuition_secondary?: number | null
          tuition_university?: number | null
          updated_at?: string | null
          video_url?: string | null
          website?: string | null
        }
        Relationships: []
      }
      internal_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          institution_id: string | null
          read_at: string | null
          recipient_id: string | null
          sender_id: string | null
          subject: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          institution_id?: string | null
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          subject: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          institution_id?: string | null
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "internal_messages_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      invites: {
        Row: {
          created_at: string | null
          email: string
          expires_at: string
          id: string
          institution: string | null
          role: string
          token: string | null
          used: boolean | null
        }
        Insert: {
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          institution?: string | null
          role: string
          token?: string | null
          used?: boolean | null
        }
        Update: {
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          institution?: string | null
          role?: string
          token?: string | null
          used?: boolean | null
        }
        Relationships: []
      }
      platform_stats: {
        Row: {
          active_users: number | null
          id: string
          total_courses: number | null
          total_institutions: number | null
          total_students: number | null
          updated_at: string
        }
        Insert: {
          active_users?: number | null
          id?: string
          total_courses?: number | null
          total_institutions?: number | null
          total_students?: number | null
          updated_at?: string
        }
        Update: {
          active_users?: number | null
          id?: string
          total_courses?: number | null
          total_institutions?: number | null
          total_students?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      post_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          post_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string | null
          comments_count: number | null
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          institution_id: string | null
          likes_count: number | null
          title: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          author_id?: string | null
          comments_count?: number | null
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          institution_id?: string | null
          likes_count?: number | null
          title: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          author_id?: string | null
          comments_count?: number | null
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          institution_id?: string | null
          likes_count?: number | null
          title?: string
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          institution_type: string | null
          name: string | null
          province: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          institution_type?: string | null
          name?: string | null
          province?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          institution_type?: string | null
          name?: string | null
          province?: string | null
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          id: string
          is_active: boolean | null
          last_seen: string
          user_id: string
        }
        Insert: {
          id?: string
          is_active?: boolean | null
          last_seen?: string
          user_id: string
        }
        Update: {
          id?: string
          is_active?: boolean | null
          last_seen?: string
          user_id?: string
        }
        Relationships: []
      }
      verification_codes: {
        Row: {
          code: string
          created_at: string
          email: string
          expires_at: string
          id: string
          user_data: Json
          user_type: string
          verified: boolean | null
        }
        Insert: {
          code: string
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          user_data: Json
          user_type: string
          verified?: boolean | null
        }
        Update: {
          code?: string
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          user_data?: Json
          user_type?: string
          verified?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_platform_stats: {
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
