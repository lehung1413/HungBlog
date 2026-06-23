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
      profiles: {
        Row: {
          id: string
          full_name: Json
          job_title: Json
          bio: Json
          avatar_url: string | null
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: Json
          job_title?: Json
          bio?: Json
          avatar_url?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: Json
          job_title?: Json
          bio?: Json
          avatar_url?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      experiences: {
        Row: {
          id: string
          company_name: Json
          position: Json
          start_date: string
          end_date: string | null
          description: Json
          achievements: Json
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          company_name?: Json
          position?: Json
          start_date: string
          end_date?: string | null
          description?: Json
          achievements?: Json
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          company_name?: Json
          position?: Json
          start_date?: string
          end_date?: string | null
          description?: Json
          achievements?: Json
          sort_order?: number
          created_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          id: string
          skill_group: Database['public']['Enums']['skill_group']
          name: Json
          proficiency: number
          sort_order: number
        }
        Insert: {
          id?: string
          skill_group: Database['public']['Enums']['skill_group']
          name?: Json
          proficiency?: number
          sort_order?: number
        }
        Update: {
          id?: string
          skill_group?: Database['public']['Enums']['skill_group']
          name?: Json
          proficiency?: number
          sort_order?: number
        }
        Relationships: []
      }
      projects: {
        Row: {
          id: string
          name: Json
          slug: string
          description: Json
          thumbnail_url: string | null
          github_url: string | null
          demo_url: string | null
          role: Json
          tech_stack: string[]
          status: Database['public']['Enums']['project_status']
          featured: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name?: Json
          slug: string
          description?: Json
          thumbnail_url?: string | null
          github_url?: string | null
          demo_url?: string | null
          role?: Json
          tech_stack?: string[]
          status?: Database['public']['Enums']['project_status']
          featured?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: Json
          slug?: string
          description?: Json
          thumbnail_url?: string | null
          github_url?: string | null
          demo_url?: string | null
          role?: Json
          tech_stack?: string[]
          status?: Database['public']['Enums']['project_status']
          featured?: boolean
          sort_order?: number
          created_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: string
          slug: string
          name: Json
          sort_order: number
        }
        Insert: {
          id?: string
          slug: string
          name?: Json
          sort_order?: number
        }
        Update: {
          id?: string
          slug?: string
          name?: Json
          sort_order?: number
        }
        Relationships: []
      }
      tags: {
        Row: {
          id: string
          slug: string
          name: Json
        }
        Insert: {
          id?: string
          slug: string
          name?: Json
        }
        Update: {
          id?: string
          slug?: string
          name?: Json
        }
        Relationships: []
      }
      posts: {
        Row: {
          id: string
          title: Json
          slug: string
          excerpt: Json
          content: Json
          thumbnail_url: string | null
          category_id: string | null
          status: Database['public']['Enums']['post_status']
          reading_time_minutes: number
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title?: Json
          slug: string
          excerpt?: Json
          content?: Json
          thumbnail_url?: string | null
          category_id?: string | null
          status?: Database['public']['Enums']['post_status']
          reading_time_minutes?: number
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: Json
          slug?: string
          excerpt?: Json
          content?: Json
          thumbnail_url?: string | null
          category_id?: string | null
          status?: Database['public']['Enums']['post_status']
          reading_time_minutes?: number
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'posts_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
        ]
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'post_tags_post_id_fkey'
            columns: ['post_id']
            isOneToOne: false
            referencedRelation: 'posts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'post_tags_tag_id_fkey'
            columns: ['tag_id']
            isOneToOne: false
            referencedRelation: 'tags'
            referencedColumns: ['id']
          },
        ]
      }
      settings: {
        Row: {
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          key: string
          value?: Json
          updated_at?: string
        }
        Update: {
          key?: string
          value?: Json
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      is_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
    }
    CompositeTypes: Record<string, never>
    Enums: {
      skill_group:
        | 'backend'
        | 'frontend'
        | 'database'
        | 'devops'
        | 'cloud'
        | 'management'
        | 'soft_skills'
      post_status: 'draft' | 'published'
      project_status: 'completed' | 'in_progress' | 'archived'
    }
  }
}
