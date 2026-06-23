import { supabase } from '@/lib/supabase'

export type StorageBucket = 'avatars' | 'blog-images' | 'project-images'

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase()
}

export async function uploadImage(
  bucket: StorageBucket,
  file: File,
): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `${crypto.randomUUID()}-${sanitizeFilename(file.name.replace(`.${ext}`, ''))}.${ext}`

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) throw error

  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export async function deleteImage(bucket: StorageBucket, url: string): Promise<void> {
  const parts = url.split(`/${bucket}/`)
  if (parts.length < 2) return
  const path = parts[1]
  const { error } = await supabase.storage.from(bucket).remove([path])
  if (error) throw error
}
