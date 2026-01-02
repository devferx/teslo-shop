import Image, { type ImageProps } from 'next/image'

import { resolveProductImage } from '@/utils'

type Props = ImageProps & { src?: string }

export const ProductImage = ({ src, alt, ...props }: Props) => {
  const resolvedSrc = resolveProductImage(src)
  const imageSrc = resolvedSrc || '/imgs/placeholder.jpg'

  return <Image src={imageSrc} alt={alt} {...props} />
}
