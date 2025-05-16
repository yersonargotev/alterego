'use client';

import NextImage from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  caption?: string;
  title?: string;
  width?: number;
  height?: number;
  className?: string;
}

const Image = ({
  src,
  alt,
  caption,
  title,
  width = 800,
  height = 450,
  className,
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <figure className="w-full my-8">
      <div
        className={cn(
          'relative overflow-hidden rounded-lg shadow-md border border-border',
          isLoading ? 'bg-muted animate-pulse' : '',
          className
        )}
      >
        <NextImage
          src={src}
          alt={alt}
          title={title || alt}
          width={width}
          height={height}
          className={cn(
            'w-full h-auto transition-all duration-500',
            isLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'
          )}
          onLoadingComplete={() => setLoading(false)}
          style={{ objectFit: 'cover' }}
          priority={true}
        />
      </div>
      {caption && (
        <figcaption className="text-sm text-muted-foreground mt-3 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default Image;
