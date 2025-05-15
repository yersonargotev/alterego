import type React from "react";
import Link from "next/link";

const CustomLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  // Automatically determine if the link is external based on the href value
  const isExternalLink = href.startsWith("http");

  const className = "text-primary hover:underline hover:text-primary/90 transition-colors";

  if (isExternalLink) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
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
