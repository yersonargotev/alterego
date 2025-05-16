'use client';

import * as React from 'react';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

import { BlogNav } from '@/components/blog-nav';
import { BlogFilter } from '@/components/blog-filter';
import type { BlogItem } from '@/lib/get-blogs';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function BlogSidebar({
  initialBlogs,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  initialBlogs: BlogItem[];
}) {
  const [page, setPage] = React.useState(1);
  const [loadedBlogs, setLoadedBlogs] = React.useState<BlogItem[]>(initialBlogs);
  const [filteredBlogs, setFilteredBlogs] = React.useState<BlogItem[]>(initialBlogs);
  const [hasMore, setHasMore] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isSearchResults, setIsSearchResults] = React.useState(false);
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const loaderRef = React.useRef<HTMLDivElement>(null);

  // Function to load more blogs
  const loadMoreBlogs = React.useCallback(async () => {
    if (isLoading || !hasMore || searchTerm) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/blogs?page=${page + 1}&pageSize=20`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      // Check if there are more blogs to load
      setHasMore(data.hasMore);

      if (data.blogs.length === 0) {
        setHasMore(false);
      } else {
        // Add new blogs to existing ones, avoiding duplicates
        setLoadedBlogs(prev => {
          const newBlogs = data.blogs.filter(
            (newBlog: BlogItem) => !prev.some(existingBlog => existingBlog.slug === newBlog.slug)
          );
          return [...prev, ...newBlogs];
        });
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore, searchTerm]);

  // Set up intersection observer for infinite scroll
  React.useEffect(() => {
    if (isSearchResults) return; // No cargar más blogs si estamos mostrando resultados de búsqueda

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !searchTerm) {
          loadMoreBlogs();
        }
      },
      { threshold: 0.5 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMoreBlogs, searchTerm, isSearchResults]);

  // Handle filtering and search
  const handleFilter = React.useCallback((filtered: BlogItem[], term: string) => {
    setFilteredBlogs(filtered);
    setSearchTerm(term);
    setIsSearchResults(!!term); // Marcar que estamos mostrando resultados de búsqueda si hay un término
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/blog"
              className="flex items-center gap-2 group-data-[state=expanded]:px-6 group-data-[state=collapsed]:px-1 py-4 hover:bg-muted/50 transition-colors overflow-hidden whitespace-nowrap"
            >
              <BookOpen className="h-6 w-6 flex-shrink-0" />
              <span className="text-lg font-semibold truncate group-data-[state=collapsed]:hidden">
                Blog
              </span>
            </Link>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">
              Blog
            </TooltipContent>
          )}
        </Tooltip>
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto">
        <BlogFilter blogs={loadedBlogs} onFilter={handleFilter} />

        {/* Mostrar estado de búsqueda cuando no hay resultados */}
        {isSearchResults && filteredBlogs.length === 0 && !isLoading && (
          <div className="px-3 py-2 text-sm text-muted-foreground">
            No se encontraron blogs que coincidan con "{searchTerm}"
          </div>
        )}

        <BlogNav
          blogs={filteredBlogs}
          isLoading={isLoading && filteredBlogs.length === 0}
        />

        {/* Loader para infinite scroll - solo se muestra cuando no hay búsqueda activa */}
        {!isSearchResults && hasMore && (
          <div
            ref={loaderRef}
            className="px-3 py-4 flex justify-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary" />
            ) : (
              <div className="h-5" />
            )}
          </div>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
