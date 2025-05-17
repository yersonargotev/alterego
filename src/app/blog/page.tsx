'use client';

import { useEffect, useState, useRef } from 'react';
import RepoCard, { type RepoCardProps } from '@/components/repo-card';
import { RepoCardSkeletonGrid } from '@/components/repo-card-skeleton';
import type { BlogItem } from '@/lib/get-blogs';

const BlogPage = () => {
  const [page, setPage] = useState(1);
  const [projects, setProjects] = useState<RepoCardProps[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const loadMoreProjects = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      // Fetch blogs from API
      const response = await fetch(`/api/blogs?page=${page}&pageSize=9`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const blogs = data.blogs as BlogItem[];

      setHasMore(data.hasMore);

      if (blogs.length === 0) {
        setHasMore(false);
      } else {
        // Map blog items to RepoCardProps including repository info
        const newProjects: RepoCardProps[] = blogs.map((blog) => ({
          author: blog.author,
          name: blog.name,
          avatar: blog.avatar,
          url: blog.url,
          description: blog.description,
          language: blog.language,
          languageColor: blog.languageColor,
          stars: blog.stars,
          forks: blog.forks,
          repoUrl: blog.url, // Add repository URL
        }));

        setProjects((prev) => [...prev, ...newProjects]);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
      setInitialLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadMoreProjects();
  }, []);

  // Load more when page changes
  useEffect(() => {
    if (page > 1) {
      loadMoreProjects();
    }
  }, [page]);

  // Setup intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 pb-12 overflow-hidden">
      <h1 className="head-text-lg mb-6 sm:mb-8 text-center break-words">Rust Projects Showcase</h1>

      {initialLoading ? (
        <RepoCardSkeletonGrid />
      ) : projects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 w-full">
            {projects.map((project, index) => (
              <RepoCard
                key={`${project.url || project.name || project.author}-${index}`}
                {...project}
              />
            ))}
          </div>

          {/* Loading indicator */}
          {hasMore && (
            <div
              ref={loaderRef}
              className="flex justify-center mt-6 sm:mt-8 h-16 sm:h-20 items-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-t-2 border-b-2 border-primary flex-shrink-0" />
              ) : (
                <div className="h-6 sm:h-8" />
              )}
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-muted-foreground px-2">
          There are no projects to show.
        </p>
      )}
    </div>
  );
};

export default BlogPage;
