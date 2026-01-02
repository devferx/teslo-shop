export const resolveProductImage = (image?: string) => {
  if (!image) return ''
  if (isUrl(image)) return image
  if (image.startsWith('/')) return image
  return `/products/${image}`
}

const isUrl = (value?: string) => {
  if (!value) return false
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}
