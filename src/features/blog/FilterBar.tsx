import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useLocalized } from '@/hooks/useLocale'
import type { Category, Tag } from '@/types/models'

interface FilterBarProps {
  search: string
  categoryId: string
  tagId: string
  categories: Category[]
  tags: Tag[]
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onTagChange: (value: string) => void
}

export function FilterBar({
  search,
  categoryId,
  tagId,
  categories,
  tags,
  onSearchChange,
  onCategoryChange,
  onTagChange,
}: FilterBarProps) {
  const { t: tr } = useTranslation()
  const { t } = useLocalized()

  return (
    <div className="sticky top-16 z-40 -mx-4 border-b border-border bg-background/95 px-4 py-4 backdrop-blur-md md:-mx-6 md:px-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder={tr('blog.searchPlaceholder')}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="sm:flex-1"
        />
        <Select value={categoryId || 'all'} onValueChange={(v) => onCategoryChange(v === 'all' ? '' : v)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={tr('blog.allCategories')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{tr('blog.allCategories')}</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {t(cat.name)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={tagId || 'all'} onValueChange={(v) => onTagChange(v === 'all' ? '' : v)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={tr('blog.allTags')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{tr('blog.allTags')}</SelectItem>
            {tags.map((tag) => (
              <SelectItem key={tag.id} value={tag.id}>
                {t(tag.name)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
