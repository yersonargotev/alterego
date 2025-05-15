'use client';

import NextImage from 'next/image';
import { cn } from '@/lib/utils';

interface ImageProps {
  src: string;
  alt: string;
  caption?: string;
  title?: string; // Optional title
  width?: number;
  height?: number;
  className?: string;
}

const Image = ({
  src,
  alt,
  caption,
  title,
  width = 700,
  height = 400,
  className,
}: ImageProps) => {
  return (
    <figure className="w-full mb-4">
      <div
        className={cn('relative overflow-hidden rounded-md border', className)}
      >
        <NextImage
          src={src}
          alt={alt}
          title={title || alt} // Use title if provided; fallback to alt
          width={width}
          height={height}
          className="w-full h-auto"
          style={{ objectFit: 'cover' }}
        />
      </div>
      {caption && (
        <figcaption className="text-sm text-muted-foreground mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default Image;
