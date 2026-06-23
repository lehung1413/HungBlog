import { supabase } from '@/lib/supabase'
import { parseLocalized, parseLocalizedArray } from '@/lib/parse'
import {
  DUMMY_CATEGORIES,
  DUMMY_EXPERIENCES,
  DUMMY_HERO,
  DUMMY_POSTS,
  DUMMY_PROFILE,
  DUMMY_PROJECTS,
  DUMMY_SKILLS,
  DUMMY_SOCIAL,
  DUMMY_TAGS,
  filterDummyPosts,
  getDummyPostBySlug,
  getDummyRelatedPosts,
} from '@/data/dummy'
import { queryWithDummy, withFallback } from '@/lib/fallback-data'
import type {
  Category,
  DashboardStats,
  Experience,
  HeroSettings,
  LocalizedText,
  Post,
  PostFilters,
  PostStatus,
  Profile,
  Project,
  Skill,
  SocialLinks,
  Tag,
} from '@/types/models'

function mapProfile(row: Record<string, unknown>): Profile {
  return {
    id: row.id as string,
    full_name: parseLocalized(row.full_name),
    job_title: parseLocalized(row.job_title),
    bio: parseLocalized(row.bio),
    avatar_url: (row.avatar_url as string) ?? null,
    is_admin: row.is_admin as boolean,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  }
}

function mapCategory(row: Record<string, unknown>): Category {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: parseLocalized(row.name),
    sort_order: row.sort_order as number,
  }
}

function mapTag(row: Record<string, unknown>): Tag {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: parseLocalized(row.name),
  }
}

function enrichPostThumbnail(post: Post): Post {
  if (post.thumbnail_url) return post
  return { ...post, thumbnail_url: `https://picsum.photos/seed/post-${post.slug}/1200/800` }
}

function enrichProjectThumbnail(project: Project): Project {
  if (project.thumbnail_url) return project
  return { ...project, thumbnail_url: `https://picsum.photos/seed/project-${project.slug}/900/600` }
}

function enrichProfileAvatar(profile: Profile): Profile {
  if (profile.avatar_url) return profile
  return { ...profile, avatar_url: 'https://picsum.photos/seed/hung-portrait/800/1000' }
}

function mapPost(row: Record<string, unknown>, category?: Category | null, tags?: Tag[]): Post {
  return {
    id: row.id as string,
    title: parseLocalized(row.title),
    slug: row.slug as string,
    excerpt: parseLocalized(row.excerpt),
    content: parseLocalized(row.content),
    thumbnail_url: (row.thumbnail_url as string) ?? null,
    category_id: (row.category_id as string) ?? null,
    status: row.status as Post['status'],
    reading_time_minutes: row.reading_time_minutes as number,
    published_at: (row.published_at as string) ?? null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
    category,
    tags,
  }
}

export async function getProfile(): Promise<Profile | null> {
  const profile = await queryWithDummy(
    async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_admin', true)
        .limit(1)
        .maybeSingle()
      if (error) throw error
      return data ? mapProfile(data) : null
    },
    DUMMY_PROFILE,
    (result) => result === null,
  )
  return profile ? enrichProfileAvatar(profile) : null
}

export async function getExperiences(): Promise<Experience[]> {
  return queryWithDummy(
    async () => {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('sort_order', { ascending: true })
      if (error) throw error
      return (data ?? []).map((row) => ({
        id: row.id,
        company_name: parseLocalized(row.company_name),
        position: parseLocalized(row.position),
        start_date: row.start_date,
        end_date: row.end_date,
        description: parseLocalized(row.description),
        achievements: parseLocalizedArray(row.achievements),
        sort_order: row.sort_order,
        created_at: row.created_at,
      }))
    },
    DUMMY_EXPERIENCES,
    (result) => result.length === 0,
  )
}

export async function getSkills(): Promise<Skill[]> {
  return queryWithDummy(
    async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('sort_order', { ascending: true })
      if (error) throw error
      return (data ?? []).map((row) => ({
        id: row.id,
        skill_group: row.skill_group,
        name: parseLocalized(row.name),
        proficiency: row.proficiency,
        sort_order: row.sort_order,
      }))
    },
    DUMMY_SKILLS,
    (result) => result.length === 0,
  )
}

export async function getProjects(featuredOnly = false): Promise<Project[]> {
  return queryWithDummy(
    async () => {
      let query = supabase.from('projects').select('*').order('sort_order', { ascending: true })
      if (featuredOnly) query = query.eq('featured', true).limit(3)
      const { data, error } = await query
      if (error) throw error
      return (data ?? []).map((row) => enrichProjectThumbnail({
        id: row.id,
        name: parseLocalized(row.name),
        slug: row.slug,
        description: parseLocalized(row.description),
        thumbnail_url: row.thumbnail_url,
        github_url: row.github_url,
        demo_url: row.demo_url,
        role: parseLocalized(row.role),
        tech_stack: row.tech_stack ?? [],
        status: row.status,
        featured: row.featured,
        sort_order: row.sort_order,
        created_at: row.created_at,
      }))
    },
    featuredOnly ? DUMMY_PROJECTS.filter((p) => p.featured).slice(0, 3) : DUMMY_PROJECTS,
    (result) => result.length === 0,
  )
}

export async function getCategories(): Promise<Category[]> {
  return queryWithDummy(
    async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true })
      if (error) throw error
      return (data ?? []).map(mapCategory)
    },
    DUMMY_CATEGORIES,
    (result) => result.length === 0,
  )
}

export async function getTags(): Promise<Tag[]> {
  return queryWithDummy(
    async () => {
      const { data, error } = await supabase.from('tags').select('*').order('slug')
      if (error) throw error
      return (data ?? []).map(mapTag)
    },
    DUMMY_TAGS,
    (result) => result.length === 0,
  )
}

export async function getPosts(filters: PostFilters = {}, admin = false): Promise<{ posts: Post[]; total: number }> {
  const page = filters.page ?? 1
  const pageSize = filters.pageSize ?? 9
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  if (!admin) {
    return queryWithDummy(
      async () => {
        let query = supabase
          .from('posts')
          .select('*, categories(*), post_tags(tags(*))', { count: 'exact' })
          .order('published_at', { ascending: false, nullsFirst: false })
          .eq('status', 'published')

        if (filters.categoryId) {
          query = query.eq('category_id', filters.categoryId)
        }

        if (filters.search) {
          query = query.or(
            `title->>en.ilike.%${filters.search}%,title->>vi.ilike.%${filters.search}%,excerpt->>en.ilike.%${filters.search}%,excerpt->>vi.ilike.%${filters.search}%`,
          )
        }

        const { data, error, count } = await query.range(from, to)
        if (error) throw error

        let posts = (data ?? []).map((row) => {
          const category = row.categories ? mapCategory(row.categories as Record<string, unknown>) : null
          const tags = ((row.post_tags as Array<{ tags: Record<string, unknown> }>) ?? [])
            .map((pt) => (pt.tags ? mapTag(pt.tags) : null))
            .filter(Boolean) as Tag[]
          return enrichPostThumbnail(mapPost(row as Record<string, unknown>, category, tags))
        })

        if (filters.tagId) {
          posts = posts.filter((post) => post.tags?.some((tag) => tag.id === filters.tagId))
        }

        return { posts, total: count ?? posts.length }
      },
      filterDummyPosts(filters),
      (result) => result.posts.length === 0,
    )
  }

  let query = supabase
    .from('posts')
    .select('*, categories(*), post_tags(tags(*))', { count: 'exact' })
    .order('published_at', { ascending: false, nullsFirst: false })

  if (filters.categoryId) {
    query = query.eq('category_id', filters.categoryId)
  }

  if (filters.search) {
    query = query.or(
      `title->>en.ilike.%${filters.search}%,title->>vi.ilike.%${filters.search}%,excerpt->>en.ilike.%${filters.search}%,excerpt->>vi.ilike.%${filters.search}%`,
    )
  }

  const { data, error, count } = await query.range(from, to)
  if (error) throw error

  let posts = (data ?? []).map((row) => {
    const category = row.categories ? mapCategory(row.categories as Record<string, unknown>) : null
    const tags = ((row.post_tags as Array<{ tags: Record<string, unknown> }>) ?? [])
      .map((pt) => (pt.tags ? mapTag(pt.tags) : null))
      .filter(Boolean) as Tag[]
    return enrichPostThumbnail(mapPost(row as Record<string, unknown>, category, tags))
  })

  if (filters.tagId) {
    posts = posts.filter((post) => post.tags?.some((tag) => tag.id === filters.tagId))
  }

  return { posts, total: count ?? posts.length }
}

export async function getPostBySlug(slug: string, admin = false): Promise<Post | null> {
  if (!admin) {
    return queryWithDummy(
      async () => {
        const { data, error } = await supabase
          .from('posts')
          .select('*, categories(*), post_tags(tags(*))')
          .eq('slug', slug)
          .eq('status', 'published')
          .maybeSingle()
        if (error) throw error
        if (!data) return null

        const category = data.categories ? mapCategory(data.categories as Record<string, unknown>) : null
        const tags = ((data.post_tags as Array<{ tags: Record<string, unknown> }>) ?? [])
          .map((pt) => (pt.tags ? mapTag(pt.tags) : null))
          .filter(Boolean) as Tag[]

        return enrichPostThumbnail(mapPost(data as Record<string, unknown>, category, tags))
      },
      getDummyPostBySlug(slug),
      (result) => result === null,
    )
  }

  let query = supabase
    .from('posts')
    .select('*, categories(*), post_tags(tags(*))')
    .eq('slug', slug)

  const { data, error } = await query.maybeSingle()
  if (error) throw error
  if (!data) return null

  const category = data.categories ? mapCategory(data.categories as Record<string, unknown>) : null
  const tags = ((data.post_tags as Array<{ tags: Record<string, unknown> }>) ?? [])
    .map((pt) => (pt.tags ? mapTag(pt.tags) : null))
    .filter(Boolean) as Tag[]

  return enrichPostThumbnail(mapPost(data as Record<string, unknown>, category, tags))
}

export async function getRelatedPosts(categoryId: string | null, excludeId: string): Promise<Post[]> {
  return queryWithDummy(
    async () => {
      if (!categoryId) return []
      const { data, error } = await supabase
        .from('posts')
        .select('*, categories(*)')
        .eq('status', 'published')
        .eq('category_id', categoryId)
        .neq('id', excludeId)
        .order('published_at', { ascending: false })
        .limit(3)

      if (error) throw error
      return (data ?? []).map((row) => {
        const category = row.categories ? mapCategory(row.categories as Record<string, unknown>) : null
        return enrichPostThumbnail(mapPost(row as Record<string, unknown>, category))
      })
    },
    getDummyRelatedPosts(categoryId, excludeId),
    (result) => result.length === 0,
  )
}

export async function getLatestPosts(limit = 3): Promise<Post[]> {
  const { posts } = await getPosts({ page: 1, pageSize: limit })
  return withFallback(posts, DUMMY_POSTS.slice(0, limit))
}

export async function getHeroSettings(): Promise<HeroSettings> {
  return queryWithDummy(
    async () => {
      const { data, error } = await supabase.from('settings').select('value').eq('key', 'hero').maybeSingle()
      if (error) throw error
      const value = (data?.value ?? {}) as Record<string, unknown>
      return {
        title: parseLocalized(value.title),
        description: parseLocalized(value.description),
        resume_url: (value.resume_url as string) ?? '',
      }
    },
    DUMMY_HERO,
    (result) => !result.title?.en && !result.title?.vi,
  )
}

export async function getSocialLinks(): Promise<SocialLinks> {
  return queryWithDummy(
    async () => {
      const { data, error } = await supabase.from('settings').select('value').eq('key', 'social').maybeSingle()
      if (error) throw error
      return (data?.value ?? {}) as SocialLinks
    },
    DUMMY_SOCIAL,
    (result) => !result.github && !result.linkedin && !result.facebook && !result.email,
  )
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [postsRes, projectsRes] = await Promise.all([
    supabase.from('posts').select('status', { count: 'exact' }),
    supabase.from('projects').select('id', { count: 'exact', head: true }),
  ])

  if (postsRes.error) throw postsRes.error
  if (projectsRes.error) throw projectsRes.error

  const posts = postsRes.data ?? []
  return {
    totalPosts: posts.length,
    totalProjects: projectsRes.count ?? 0,
    draftPosts: posts.filter((p) => p.status === 'draft').length,
    publishedPosts: posts.filter((p) => p.status === 'published').length,
  }
}

export async function upsertPost(
  post: Partial<Post> & { slug: string; tagIds?: string[] },
  id?: string,
): Promise<Post> {
  const contentEn = post.content?.en ?? ''
  const contentVi = post.content?.vi ?? ''
  const readingTime = Math.max(
    1,
    Math.ceil((contentEn.split(/\s+/).length + contentVi.split(/\s+/).length) / 2 / 200),
  )

  const payload = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    thumbnail_url: post.thumbnail_url,
    category_id: post.category_id,
    status: post.status as PostStatus,
    reading_time_minutes: readingTime,
    published_at: post.status === 'published' ? post.published_at ?? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  }

  let postId = id
  if (id) {
    const { error } = await supabase.from('posts').update(payload).eq('id', id)
    if (error) throw error
  } else {
    const { data, error } = await supabase.from('posts').insert(payload).select('id').single()
    if (error) throw error
    postId = data.id
  }

  if (post.tagIds && postId) {
    await supabase.from('post_tags').delete().eq('post_id', postId)
    if (post.tagIds.length > 0) {
      const { error } = await supabase.from('post_tags').insert(
        post.tagIds.map((tagId) => ({ post_id: postId!, tag_id: tagId })),
      )
      if (error) throw error
    }
  }

  const saved = await getPostBySlug(post.slug, true)
  if (!saved) throw new Error('Failed to save post')
  return saved
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) throw error
}

export async function upsertProject(project: Partial<Project> & { slug: string }, id?: string): Promise<void> {
  const payload = {
    name: project.name,
    slug: project.slug,
    description: project.description,
    thumbnail_url: project.thumbnail_url,
    github_url: project.github_url,
    demo_url: project.demo_url,
    role: project.role,
    tech_stack: project.tech_stack,
    status: project.status,
    featured: project.featured,
    sort_order: project.sort_order,
  }

  if (id) {
    const { error } = await supabase.from('projects').update(payload).eq('id', id)
    if (error) throw error
  } else {
    const { error } = await supabase.from('projects').insert(payload)
    if (error) throw error
  }
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
}

export async function updateSettings(key: string, value: unknown): Promise<void> {
  const { error } = await supabase.from('settings').upsert({
    key,
    value: value as import('@/types/database').Json,
    updated_at: new Date().toISOString(),
  })
  if (error) throw error
}

export async function updateProfile(updates: {
  full_name?: LocalizedText
  job_title?: LocalizedText
  bio?: LocalizedText
  avatar_url?: string | null
}): Promise<void> {
  const { data: session } = await supabase.auth.getSession()
  if (!session.session?.user.id) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', session.session.user.id)

  if (error) throw error
}

export async function promoteAdminIfEligible(userId: string, email: string): Promise<boolean> {
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL
  if (!adminEmail || email.toLowerCase() !== adminEmail.toLowerCase()) {
    return false
  }

  const { error } = await supabase
    .from('profiles')
    .update({ is_admin: true, updated_at: new Date().toISOString() })
    .eq('id', userId)

  if (error) throw error
  return true
}
