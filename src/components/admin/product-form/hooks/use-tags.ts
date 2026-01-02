import { useMemo, useState } from 'react'
import type { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import type { ProductFormInputs } from '@/schemas'

interface UseTagsProps {
  setValue: UseFormSetValue<ProductFormInputs>
  watch: UseFormWatch<ProductFormInputs>
}

export const useTags = ({ setValue, watch }: UseTagsProps) => {
  const [tagDraft, setTagDraft] = useState('')

  const watchedTags = watch('tags') ?? ''
  const parsedTags = useMemo(
    () =>
      watchedTags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    [watchedTags],
  )

  const addTag = () => {
    if (!tagDraft.trim()) return

    const currentTags = new Set(parsedTags)
    currentTags.add(tagDraft.trim())
    setValue('tags', Array.from(currentTags).join(', '), {
      shouldDirty: true,
      shouldValidate: true,
    })
    setTagDraft('')
  }

  const removeTag = (tag: string) => {
    console.log('🚀 ~ removeTag ~ tag:', tag)
    const filtered = parsedTags.filter((item) => item !== tag)
    setValue('tags', filtered.join(', '), {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  return {
    tagDraft,
    setTagDraft,
    watchedTags,
    parsedTags,
    addTag,
    removeTag,
  }
}
