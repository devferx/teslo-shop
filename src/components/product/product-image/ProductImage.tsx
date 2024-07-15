import Image, { type ImageProps } from 'next/image'

type Props = ImageProps & { src?: string }

export const ProductImage = ({ src, alt, ...props }: Props) => {
  const localSrc = src
    ? src.startsWith('http')
      ? src
      : `/products/${src}`
    : `/imgs/placeholder.jpg`

  return <Image src={localSrc} alt={alt} {...props} />
}
