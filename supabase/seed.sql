-- Seed data for HungBlog

INSERT INTO categories (slug, name, sort_order) VALUES
  ('tech', '{"en":"Technology","vi":"Công nghệ"}', 1),
  ('lifestyle', '{"en":"Lifestyle","vi":"Phong cách sống"}', 2),
  ('tutorial', '{"en":"Tutorial","vi":"Hướng dẫn"}', 3)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO tags (slug, name) VALUES
  ('react', '{"en":"React","vi":"React"}'),
  ('typescript', '{"en":"TypeScript","vi":"TypeScript"}'),
  ('lifestyle', '{"en":"Life Style","vi":"Life Style"}'),
  ('devops', '{"en":"DevOps","vi":"DevOps"}')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO settings (key, value) VALUES
  ('hero', '{"title":{"en":"Hi, I''m Hung","vi":"Xin chào, tôi là Hung"},"description":{"en":"Full-stack developer, ordinary person.","vi":"Lập trình viên full-stack, người bình thường."},"resume_url":""}'),
  ('social', '{"github":"https://github.com/lehung1413","linkedin":"https://www.linkedin.com/in/lehung1413/","facebook":"https://www.facebook.com/hungnaruto6613","email":"lehung.1413@gmail.com"}')
ON CONFLICT (key) DO NOTHING;

INSERT INTO skills (skill_group, name, proficiency, sort_order) VALUES
  ('backend', '{"en":".NET","vi":".NET"}', 80, 1),
  ('frontend', '{"en":"React","vi":"React"}', 70, 1),
  ('frontend', '{"en":"TypeScript","vi":"TypeScript"}', 88, 2),
  ('database', '{"en":"SQL Server","vi":"SQL Server"}', 82, 1),
  ('devops', '{"en":"Azure DevOps","vi":"Azure DevOps"}', 75, 1),
  ('cloud', '{"en":"Azure","vi":"Azure"}', 70, 1),
  ('management', '{"en":"Agile/Scrum","vi":"Agile/Scrum"}', 78, 1),
  ('soft_skills', '{"en":"Communication","vi":"Giao tiếp"}', 90, 1),
  ('other', '{"en":"Gym Bro","vi":"Gym Bro"}', 90, 1)
ON CONFLICT DO NOTHING;

INSERT INTO experiences (company_name, position, start_date, end_date, description, achievements, sort_order) VALUES
  (
    '{"en":"Tech Company","vi":"Công ty Công nghệ"}',
    '{"en":"Senior Developer","vi":"Lập trình viên Senior"}',
    '2022-01-01',
    NULL,
    '{"en":"Leading development of web applications.","vi":"Dẫn dắt phát triển ứng dụng web."}',
    '[{"en":"Reduced load time by 40%","vi":"Giảm thời gian tải 40%"},{"en":"Mentored junior developers","vi":"Hướng dẫn lập trình viên junior"}]',
    1
  ),
  (
    '{"en":"Startup Inc","vi":"Startup Inc"}',
    '{"en":"Full-stack Developer","vi":"Lập trình viên Full-stack"}',
    '2019-06-01',
    '2021-12-31',
    '{"en":"Built MVP products from scratch.","vi":"Xây dựng sản phẩm MVP từ đầu."}',
    '[{"en":"Launched 3 products","vi":"Ra mắt 3 sản phẩm"}]',
    2
  )
ON CONFLICT DO NOTHING;

INSERT INTO projects (name, slug, description, role, tech_stack, status, featured, sort_order) VALUES
  (
    '{"en":"HungBlog","vi":"HungBlog"}',
    'hungblog',
    '{"en":"Personal portfolio and blog platform.","vi":"Nền tảng portfolio và blog cá nhân."}',
    '{"en":"Full-stack Developer","vi":"Lập trình viên Full-stack"}',
    ARRAY['React', 'TypeScript', 'Supabase', 'TailwindCSS'],
    'in_progress',
    true,
    1
  ),
  (
    '{"en":"E-Commerce API","vi":"E-Commerce API"}',
    'ecommerce-api',
    '{"en":"RESTful API for online store.","vi":"API RESTful cho cửa hàng trực tuyến."}',
    '{"en":"Backend Developer","vi":"Lập trình viên Backend"}',
    ARRAY['.NET', 'PostgreSQL', 'Redis'],
    'completed',
    true,
    2
  ),
  (
    '{"en":"Task Manager","vi":"Quản lý công việc"}',
    'task-manager',
    '{"en":"Collaborative task management app.","vi":"Ứng dụng quản lý công việc cộng tác."}',
    '{"en":"Lead Developer","vi":"Lead Developer"}',
    ARRAY['React', 'Node.js', 'MongoDB'],
    'completed',
    true,
    3
  )
ON CONFLICT (slug) DO NOTHING;

-- Sample published post (run after categories exist)
INSERT INTO posts (title, slug, excerpt, content, category_id, status, reading_time_minutes, published_at)
SELECT
  '{"en":"Welcome to HungBlog","vi":"Chào mừng đến HungBlog"}',
  'welcome-to-hungblog',
  '{"en":"My first blog post about this portfolio site.","vi":"Bài viết đầu tiên về trang portfolio này."}',
  '{"en":"# Welcome\n\nThis is my personal blog for fun.\n\n```typescript\nconst hello = \"world\"\nconsole.log(hello)\n```\n\n> Building in public, one commit at a time.","vi":"# Chào mừng\n\nĐây là blog cá nhân mình làm vì quá rảnh."}',
  c.id,
  'published',
  3,
  now()
FROM categories c WHERE c.slug = 'tech'
ON CONFLICT (slug) DO NOTHING;

-- Link tags to welcome post
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id
FROM posts p, tags t
WHERE p.slug = 'welcome-to-hungblog' AND t.slug IN ('react', 'typescript', 'supabase')
ON CONFLICT DO NOTHING;
