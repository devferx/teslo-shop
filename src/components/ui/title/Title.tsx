import { titleFont } from '@/config/fonts'

interface Props {
  title: string
  subtitle?: string
  className?: string
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`mt ${className}`}>
      <h1
        className={`${titleFont.className} my-7 text-4xl font-semibold antialiased`}
      >
        {title}
      </h1>
      {subtitle && <h3 className="mb-5 text-xl">{subtitle}</h3>}
    </div>
  )
}
