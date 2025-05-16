import type React from 'react';
import Link from 'next/link';

const CustomLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  // Automatically determine if the link is external based on the href value
  const isExternalLink = href.startsWith('http');

  const className =
    'relative inline-flex items-center text-primary underline-offset-4 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full focus:outline-ring';

  if (isExternalLink) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
        <svg
          className="ml-1 h-3 w-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    );
  }

  // For internal links, use Next.js' `Link` component
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};

export default CustomLink;
