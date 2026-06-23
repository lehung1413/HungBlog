import type {
  Category,
  Experience,
  HeroSettings,
  Post,
  Profile,
  Project,
  Skill,
  SocialLinks,
  Tag,
} from '@/types/models'

const now = new Date().toISOString()
const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString()

export const DUMMY_CATEGORIES: Category[] = [
  { id: 'dummy-cat-tech', slug: 'tech', name: { en: 'Technology', vi: 'Công nghệ' }, sort_order: 1 },
  { id: 'dummy-cat-career', slug: 'career', name: { en: 'Career', vi: 'Sự nghiệp' }, sort_order: 2 },
  { id: 'dummy-cat-tutorial', slug: 'tutorial', name: { en: 'Tutorial', vi: 'Hướng dẫn' }, sort_order: 3 },
  { id: 'dummy-cat-lifestyle', slug: 'lifestyle', name: { en: 'Lifestyle', vi: 'Phong cách sống' }, sort_order: 4 },
]

export const DUMMY_TAGS: Tag[] = [
  { id: 'dummy-tag-react', slug: 'react', name: { en: 'React', vi: 'React' } },
  { id: 'dummy-tag-ts', slug: 'typescript', name: { en: 'TypeScript', vi: 'TypeScript' } },
  { id: 'dummy-tag-supabase', slug: 'supabase', name: { en: 'Supabase', vi: 'Supabase' } },
  { id: 'dummy-tag-devops', slug: 'devops', name: { en: 'DevOps', vi: 'DevOps' } },
]

const cat = (slug: string) => DUMMY_CATEGORIES.find((c) => c.slug === slug) ?? DUMMY_CATEGORIES[0]

export const DUMMY_POSTS: Post[] = [
  {
    id: 'dummy-post-1',
    title: {
      en: 'Building a Modern Portfolio with React & MUI',
      vi: 'Xây dựng Portfolio hiện đại với React & MUI',
    },
    slug: 'building-modern-portfolio',
    excerpt: {
      en: 'How I designed HungBlog with a dark editorial theme inspired by Yaffo.',
      vi: 'Cách tôi thiết kế HungBlog với theme editorial tối lấy cảm hứng từ Yaffo.',
    },
    content: {
      en: '# Building HungBlog\n\nA walkthrough of architecture, theming, and CMS integration.\n\n```tsx\n<ThemeProvider theme={darkTheme}>\n  <App />\n</ThemeProvider>\n```',
      vi: '# Xây dựng HungBlog\n\nHướng dẫn kiến trúc, theme và tích hợp CMS.',
    },
    thumbnail_url: 'https://picsum.photos/seed/hungblog-hero/1400/900',
    category_id: cat('tech').id,
    status: 'published',
    reading_time_minutes: 8,
    published_at: daysAgo(2),
    created_at: daysAgo(5),
    updated_at: daysAgo(2),
    category: cat('tech'),
    tags: [DUMMY_TAGS[0], DUMMY_TAGS[1]],
  },
  {
    id: 'dummy-post-2',
    title: {
      en: '10 Lessons from My First Year as a Senior Dev',
      vi: '10 bài học từ năm đầu làm Senior Developer',
    },
    slug: 'senior-dev-lessons',
    excerpt: {
      en: 'Mentorship, code review culture, and learning to say no gracefully.',
      vi: 'Mentor, văn hóa code review và học cách từ chối một cách tinh tế.',
    },
    content: {
      en: '# Senior Dev Lessons\n\nReflections on growth and leadership.',
      vi: '# Bài học Senior\n\nSuy ngẫm về sự trưởng thành và lãnh đạo.',
    },
    thumbnail_url: 'https://picsum.photos/seed/career-desk/900/1200',
    category_id: cat('career').id,
    status: 'published',
    reading_time_minutes: 6,
    published_at: daysAgo(5),
    created_at: daysAgo(10),
    updated_at: daysAgo(5),
    category: cat('career'),
    tags: [DUMMY_TAGS[3]],
  },
  {
    id: 'dummy-post-3',
    title: {
      en: 'Supabase RLS: A Practical Guide',
      vi: 'Supabase RLS: Hướng dẫn thực tế',
    },
    slug: 'supabase-rls-guide',
    excerpt: {
      en: 'Row Level Security patterns for single-admin blogs and CMS apps.',
      vi: 'Các pattern Row Level Security cho blog và CMS một admin.',
    },
    content: {
      en: '# Supabase RLS\n\nSecure your data with policies.',
      vi: '# Supabase RLS\n\nBảo mật dữ liệu bằng policies.',
    },
    thumbnail_url: 'https://picsum.photos/seed/database/1000/700',
    category_id: cat('tutorial').id,
    status: 'published',
    reading_time_minutes: 12,
    published_at: daysAgo(8),
    created_at: daysAgo(12),
    updated_at: daysAgo(8),
    category: cat('tutorial'),
    tags: [DUMMY_TAGS[2]],
  },
  {
    id: 'dummy-post-4',
    title: {
      en: 'Morning Routines That Actually Stick',
      vi: 'Thói quen buổi sáng thực sự bền vững',
    },
    slug: 'morning-routines',
    excerpt: {
      en: 'Small habits, big impact — what works for remote developers.',
      vi: 'Thói quen nhỏ, tác động lớn — điều gì hiệu quả với dev làm remote.',
    },
    content: { en: '# Morning Routines', vi: '# Thói quen buổi sáng' },
    thumbnail_url: 'https://picsum.photos/seed/morning/800/1000',
    category_id: cat('lifestyle').id,
    status: 'published',
    reading_time_minutes: 4,
    published_at: daysAgo(12),
    created_at: daysAgo(15),
    updated_at: daysAgo(12),
    category: cat('lifestyle'),
    tags: [],
  },
  {
    id: 'dummy-post-5',
    title: {
      en: 'TypeScript Tips for Cleaner React Code',
      vi: 'Mẹo TypeScript cho React code sạch hơn',
    },
    slug: 'typescript-react-tips',
    excerpt: {
      en: 'Generics, discriminated unions, and component prop patterns.',
      vi: 'Generics, discriminated unions và pattern props component.',
    },
    content: { en: '# TypeScript Tips', vi: '# Mẹo TypeScript' },
    thumbnail_url: 'https://picsum.photos/seed/typescript/1100/750',
    category_id: cat('tech').id,
    status: 'published',
    reading_time_minutes: 7,
    published_at: daysAgo(18),
    created_at: daysAgo(20),
    updated_at: daysAgo(18),
    category: cat('tech'),
    tags: [DUMMY_TAGS[1]],
  },
  {
    id: 'dummy-post-6',
    title: {
      en: 'Deploying to Vercel: Zero to Production',
      vi: 'Deploy lên Vercel: Từ zero đến production',
    },
    slug: 'vercel-deploy-guide',
    excerpt: {
      en: 'Environment variables, preview deployments, and analytics setup.',
      vi: 'Biến môi trường, preview deployment và cấu hình analytics.',
    },
    content: { en: '# Vercel Deploy', vi: '# Deploy Vercel' },
    thumbnail_url: 'https://picsum.photos/seed/vercel/1200/800',
    category_id: cat('tutorial').id,
    status: 'published',
    reading_time_minutes: 5,
    published_at: daysAgo(25),
    created_at: daysAgo(30),
    updated_at: daysAgo(25),
    category: cat('tutorial'),
    tags: [DUMMY_TAGS[2], DUMMY_TAGS[3]],
  },
]

export const DUMMY_PROFILE: Profile = {
  id: 'dummy-profile',
  full_name: { en: 'Nguyen Van Hung', vi: 'Nguyễn Văn Hùng' },
  job_title: { en: 'Full-stack Developer', vi: 'Lập trình viên Full-stack' },
  bio: {
    en: 'I build elegant web experiences with React, TypeScript, and cloud-native backends. Passionate about clean architecture, developer experience, and sharing knowledge through writing.\n\nWhen I\'m not coding, you\'ll find me exploring coffee shops, reading tech blogs, or contributing to open source.',
    vi: 'Tôi xây dựng trải nghiệm web tinh tế với React, TypeScript và backend cloud-native. Đam mê kiến trúc sạch, trải nghiệm developer và chia sẻ kiến thức qua viết lách.\n\nKhi không code, bạn sẽ thấy tôi khám phá quán cà phê, đọc blog công nghệ hoặc đóng góp open source.',
  },
  avatar_url: 'https://picsum.photos/seed/hung-portrait/800/1000',
  is_admin: true,
  created_at: now,
  updated_at: now,
}

export const DUMMY_EXPERIENCES: Experience[] = [
  {
    id: 'dummy-exp-1',
    company_name: { en: 'TechVision JSC', vi: 'Công ty TechVision' },
    position: { en: 'Senior Full-stack Developer', vi: 'Lập trình viên Full-stack Senior' },
    start_date: '2022-03-01',
    end_date: null,
    description: {
      en: 'Leading frontend architecture and mentoring a team of 5 developers on enterprise SaaS products.',
      vi: 'Dẫn dắt kiến trúc frontend và mentor team 5 developer trên sản phẩm SaaS doanh nghiệp.',
    },
    achievements: [
      { en: 'Reduced page load time by 45%', vi: 'Giảm thời gian tải trang 45%' },
      { en: 'Introduced design system used across 3 products', vi: 'Triển khai design system cho 3 sản phẩm' },
    ],
    sort_order: 1,
    created_at: now,
  },
  {
    id: 'dummy-exp-2',
    company_name: { en: 'Startup Labs', vi: 'Startup Labs' },
    position: { en: 'Full-stack Developer', vi: 'Lập trình viên Full-stack' },
    start_date: '2019-06-01',
    end_date: '2022-02-28',
    description: {
      en: 'Built MVPs from zero to launch for fintech and e-commerce clients.',
      vi: 'Xây dựng MVP từ zero đến launch cho khách hàng fintech và e-commerce.',
    },
    achievements: [
      { en: 'Shipped 4 products to production', vi: 'Đưa 4 sản phẩm lên production' },
      { en: 'Set up CI/CD pipelines on Azure', vi: 'Thiết lập CI/CD trên Azure' },
    ],
    sort_order: 2,
    created_at: now,
  },
  {
    id: 'dummy-exp-3',
    company_name: { en: 'Digital Agency Co.', vi: 'Công ty Agency Số' },
    position: { en: 'Junior Web Developer', vi: 'Lập trình viên Web Junior' },
    start_date: '2017-01-01',
    end_date: '2019-05-31',
    description: {
      en: 'Developed responsive websites and WordPress themes for local businesses.',
      vi: 'Phát triển website responsive và theme WordPress cho doanh nghiệp địa phương.',
    },
    achievements: [
      { en: 'Delivered 20+ client projects on time', vi: 'Hoàn thành 20+ dự án đúng hạn' },
    ],
    sort_order: 3,
    created_at: now,
  },
]

export const DUMMY_SKILLS: Skill[] = [
  { id: 'dummy-skill-1', skill_group: 'frontend', name: { en: 'React', vi: 'React' }, proficiency: 92, sort_order: 1 },
  { id: 'dummy-skill-2', skill_group: 'frontend', name: { en: 'TypeScript', vi: 'TypeScript' }, proficiency: 88, sort_order: 2 },
  { id: 'dummy-skill-3', skill_group: 'frontend', name: { en: 'MUI / Tailwind', vi: 'MUI / Tailwind' }, proficiency: 85, sort_order: 3 },
  { id: 'dummy-skill-4', skill_group: 'backend', name: { en: 'Node.js', vi: 'Node.js' }, proficiency: 82, sort_order: 1 },
  { id: 'dummy-skill-5', skill_group: 'backend', name: { en: '.NET Core', vi: '.NET Core' }, proficiency: 78, sort_order: 2 },
  { id: 'dummy-skill-6', skill_group: 'database', name: { en: 'PostgreSQL', vi: 'PostgreSQL' }, proficiency: 80, sort_order: 1 },
  { id: 'dummy-skill-7', skill_group: 'devops', name: { en: 'Docker', vi: 'Docker' }, proficiency: 75, sort_order: 1 },
  { id: 'dummy-skill-8', skill_group: 'cloud', name: { en: 'Azure', vi: 'Azure' }, proficiency: 72, sort_order: 1 },
  { id: 'dummy-skill-9', skill_group: 'management', name: { en: 'Agile / Scrum', vi: 'Agile / Scrum' }, proficiency: 80, sort_order: 1 },
  { id: 'dummy-skill-10', skill_group: 'soft_skills', name: { en: 'Technical Writing', vi: 'Viết kỹ thuật' }, proficiency: 85, sort_order: 1 },
]

export const DUMMY_PROJECTS: Project[] = [
  {
    id: 'dummy-proj-1',
    name: { en: 'HungBlog', vi: 'HungBlog' },
    slug: 'hungblog',
    description: {
      en: 'Personal portfolio and bilingual blog with admin CMS, inspired by Yaffo Dark theme.',
      vi: 'Portfolio cá nhân và blog song ngữ với CMS admin, lấy cảm hứng từ theme Yaffo Dark.',
    },
    thumbnail_url: 'https://picsum.photos/seed/project-hungblog/900/600',
    github_url: 'https://github.com',
    demo_url: null,
    role: { en: 'Creator & Lead Developer', vi: 'Người tạo & Lead Developer' },
    tech_stack: ['React', 'TypeScript', 'MUI', 'Supabase', 'Vercel'],
    status: 'in_progress',
    featured: true,
    sort_order: 1,
    created_at: now,
  },
  {
    id: 'dummy-proj-2',
    name: { en: 'E-Commerce Platform', vi: 'Nền tảng E-Commerce' },
    slug: 'ecommerce-platform',
    description: {
      en: 'Full-stack online store with payment integration, inventory, and admin dashboard.',
      vi: 'Cửa hàng trực tuyến full-stack với thanh toán, quản lý kho và dashboard admin.',
    },
    thumbnail_url: 'https://picsum.photos/seed/project-shop/900/600',
    github_url: 'https://github.com',
    demo_url: 'https://example.com',
    role: { en: 'Backend Lead', vi: 'Lead Backend' },
    tech_stack: ['.NET', 'PostgreSQL', 'Redis', 'React'],
    status: 'completed',
    featured: true,
    sort_order: 2,
    created_at: now,
  },
  {
    id: 'dummy-proj-3',
    name: { en: 'TaskFlow', vi: 'TaskFlow' },
    slug: 'taskflow',
    description: {
      en: 'Real-time collaborative task manager with drag-and-drop boards and team chat.',
      vi: 'Ứng dụng quản lý công việc realtime với bảng kéo-thả và chat nhóm.',
    },
    thumbnail_url: 'https://picsum.photos/seed/project-tasks/900/600',
    github_url: 'https://github.com',
    demo_url: 'https://example.com',
    role: { en: 'Full-stack Developer', vi: 'Lập trình viên Full-stack' },
    tech_stack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    status: 'completed',
    featured: true,
    sort_order: 3,
    created_at: now,
  },
  {
    id: 'dummy-proj-4',
    name: { en: 'Weather Dashboard', vi: 'Dashboard Thời tiết' },
    slug: 'weather-dashboard',
    description: {
      en: 'Beautiful weather app with 7-day forecast and location search.',
      vi: 'Ứng dụng thời tiết đẹp mắt với dự báo 7 ngày và tìm kiếm vị trí.',
    },
    thumbnail_url: 'https://picsum.photos/seed/project-weather/900/600',
    github_url: 'https://github.com',
    demo_url: null,
    role: { en: 'Frontend Developer', vi: 'Lập trình viên Frontend' },
    tech_stack: ['React', 'OpenWeather API', 'Chart.js'],
    status: 'archived',
    featured: false,
    sort_order: 4,
    created_at: now,
  },
]

export const DUMMY_HERO: HeroSettings = {
  title: { en: "Hi, I'm Hung", vi: 'Xin chào, tôi là Hùng' },
  description: {
    en: 'Full-stack developer crafting dark, editorial web experiences.',
    vi: 'Lập trình viên full-stack tạo ra trải nghiệm web editorial tối.',
  },
  resume_url: '#',
}

export const DUMMY_SOCIAL: SocialLinks = {
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  facebook: 'https://facebook.com',
  email: 'hello@hungblog.dev',
}

export function filterDummyPosts(filters: {
  search?: string
  categoryId?: string
  tagId?: string
  page?: number
  pageSize?: number
}): { posts: Post[]; total: number } {
  const page = filters.page ?? 1
  const pageSize = filters.pageSize ?? 9
  let posts = [...DUMMY_POSTS]

  if (filters.categoryId) {
    posts = posts.filter((p) => p.category_id === filters.categoryId)
  }

  if (filters.tagId) {
    posts = posts.filter((p) => p.tags?.some((t) => t.id === filters.tagId))
  }

  if (filters.search) {
    const q = filters.search.toLowerCase()
    posts = posts.filter(
      (p) =>
        p.title.en.toLowerCase().includes(q) ||
        p.title.vi.toLowerCase().includes(q) ||
        p.excerpt.en.toLowerCase().includes(q) ||
        p.excerpt.vi.toLowerCase().includes(q),
    )
  }

  const total = posts.length
  const from = (page - 1) * pageSize
  return { posts: posts.slice(from, from + pageSize), total }
}

export function getDummyPostBySlug(slug: string): Post | null {
  return DUMMY_POSTS.find((p) => p.slug === slug) ?? null
}

export function getDummyRelatedPosts(categoryId: string | null, excludeId: string): Post[] {
  if (!categoryId) return DUMMY_POSTS.filter((p) => p.id !== excludeId).slice(0, 3)
  return DUMMY_POSTS.filter((p) => p.category_id === categoryId && p.id !== excludeId).slice(0, 3)
}
