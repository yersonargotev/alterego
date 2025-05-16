'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, GitFork } from 'lucide-react';
import { GitHubDark, GitHubLight } from '@ridemountainpig/svgl-react';

export interface RepoCardProps {
  author: string;
  name: string;
  avatar: string;
  url: string;
  description: string;
  language: string;
  languageColor?: string;
  stars: number;
  forks: number;
  // currentPeriodStars: number; // Not directly displayed as "last commit"
  // builtBy?: { href: string; avatar: string; username: string }[]; // Not shown in the target image's main cards
  // sponsor?: string | null; // Not shown in the target image's main cards
}

const RepoCard: React.FC<RepoCardProps> = ({
  author,
  name,
  avatar,
  url,
  description,
  language,
  languageColor,
  stars,
  forks,
}) => {
  return (
    <div className="relative rounded-lg border border-card bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
      {/* GitHub link in the top-right corner */}
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 right-3 p-2 rounded-full bg-background hover:bg-muted transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <GitHubDark className="w-5 h-5 hidden dark:block" />
        <GitHubLight className="w-5 h-5 dark:hidden" />
      </Link>

      {/* Main card link to blog/author */}
      <Link href={`/blog/${author}-${name}`} className="block h-full">
        <div className="flex flex-col h-full p-5">
          <div className="flex items-center mb-3">
            <Image
              src={avatar}
              alt={`${author}'s avatar`}
              width={40}
              height={40}
              className="rounded-md mr-3"
            />
            <h3 className="text-xl font-semibold font-heading tracking-tight text-primary capitalize">
              {name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4 flex-grow clamp-3">
            {description}
          </p>
          <div className="mt-auto">
            <div className="flex items-center text-xs text-muted-foreground mb-2">
              {language && (
                <span className="flex items-center">
                  <span
                    className="w-3 h-3 rounded-full mr-1.5"
                    style={{
                      backgroundColor: languageColor || 'var(--foreground)',
                    }}
                  />
                  {language}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                <span>{stars.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <GitFork className="w-4 h-4 mr-1 text-blue-500" />
                <span>{forks.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RepoCard;

// Basic clamp utility for description text (won't be perfect without JS)
// For a pure CSS solution, consider line-clamp if browser support is adequate
// or ensure descriptions are of a manageable length.
// This style is a fallback.
const styles = `
  .clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 3.75em; /* Assuming line-height of 1.25em, for 3 lines */
  }
`;

// Inject styles for clamping. In a real app, this might go into a global CSS
// or be handled by a CSS-in-JS solution if not using Tailwind's line-clamp plugin.
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
