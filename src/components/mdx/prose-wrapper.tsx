import React from 'react';

/**
 * Wrapper para aplicar estilos de tipografía globales (prose) al contenido MDX.
 * Usar este componente para envolver el contenido principal de MDX.
 */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`prose prose-lg max-w-none dark:prose-invert 
      prose-headings:font-heading prose-headings:tracking-tight prose-headings:leading-tight
      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
      prose-img:rounded-lg prose-img:shadow-sm
      prose-blockquote:border-l-4 prose-blockquote:border-primary/20 prose-blockquote:bg-accent/50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
      ${className || ''}`}
    >
      {children}
    </div>
  );
}
