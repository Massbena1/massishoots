import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  ratio?: '1/1' | '4/3' | '3/4' | '16/9'
  priority?: boolean
  className?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  objectPosition?: string
}

export default function OptimizedImage({
  src,
  alt,
  ratio = '4/3',
  priority = false,
  className = '',
  objectFit = 'cover',
  objectPosition = 'center'
}: OptimizedImageProps) {
  return (
    <div
      style={{
        aspectRatio: ratio,
        position: 'relative',
        overflow: 'hidden',
        width: '100%'
      }}
      className={className}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        style={{
          objectFit,
          objectPosition
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}