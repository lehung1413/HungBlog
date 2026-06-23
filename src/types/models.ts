export type LocalizedText = {
  en: string
  vi: string
}

export type SkillGroup =
  | 'backend'
  | 'frontend'
  | 'database'
  | 'devops'
  | 'cloud'
  | 'management'
  | 'soft_skills'

export type PostStatus = 'draft' | 'published'
export type ProjectStatus = 'completed' | 'in_progress' | 'archived'

export interface Profile {
  id: string
  full_name: LocalizedText
  job_title: LocalizedText
  bio: LocalizedText
  avatar_url: string | null
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface Experience {
  id: string
  company_name: LocalizedText
  position: LocalizedText
  start_date: string
  end_date: string | null
  description: LocalizedText
  achievements: LocalizedText[]
  sort_order: number
  created_at: string
}

export interface Skill {
  id: string
  skill_group: SkillGroup
  name: LocalizedText
  proficiency: number
  sort_order: number
}

export interface Project {
  id: string
  name: LocalizedText
  slug: string
  description: LocalizedText
  thumbnail_url: string | null
  github_url: string | null
  demo_url: string | null
  role: LocalizedText
  tech_stack: string[]
  status: ProjectStatus
  featured: boolean
  sort_order: number
  created_at: string
}

export interface Category {
  id: string
  slug: string
  name: LocalizedText
  sort_order: number
}

export interface Tag {
  id: string
  slug: string
  name: LocalizedText
}

export interface Post {
  id: string
  title: LocalizedText
  slug: string
  excerpt: LocalizedText
  content: LocalizedText
  thumbnail_url: string | null
  category_id: string | null
  status: PostStatus
  reading_time_minutes: number
  published_at: string | null
  created_at: string
  updated_at: string
  category?: Category | null
  tags?: Tag[]
}

export interface PostTag {
  post_id: string
  tag_id: string
}

export interface Setting {
  key: string
  value: unknown
  updated_at: string
}

export interface SocialLinks {
  github?: string
  linkedin?: string
  facebook?: string
  email?: string
}

export interface HeroSettings {
  title: LocalizedText
  description: LocalizedText
  resume_url?: string
  image_url?: string
}

export interface DashboardStats {
  totalPosts: number
  totalProjects: number
  draftPosts: number
  publishedPosts: number
}

export interface PostFilters {
  search?: string
  categoryId?: string
  tagId?: string
  page?: number
  pageSize?: number
}
