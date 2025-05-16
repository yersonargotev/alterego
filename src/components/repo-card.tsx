'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
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
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative rounded-lg border border-card bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
      {/* GitHub link in the bottom-right corner */}
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 p-2 rounded-full bg-background hover:bg-muted transition-colors"
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
              src={imgError ? '/images/repo-image-not-found.webp' : avatar}
              alt={`${author}'s avatar`}
              width={40}
              height={40}
              className="rounded-md mr-3"
              onError={() => setImgError(true)}
            />
            <h3 className="text-xl font-semibold font-heading tracking-tight text-primary capitalize">
              {name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
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
                <span>{stars?.toLocaleString() || '0'}</span>
              </div>
              <div className="flex items-center">
                <GitFork className="w-4 h-4 mr-1 text-blue-500" />
                <span>{forks?.toLocaleString() || '0'}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RepoCard;
