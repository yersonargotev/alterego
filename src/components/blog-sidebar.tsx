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
} from '@/components/ui/sidebar';

export function BlogSidebar({
  blogs,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  blogs: BlogItem[];
}) {
  const [filteredBlogs, setFilteredBlogs] = React.useState<BlogItem[]>(blogs);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link
          href="/blog"
          className="flex items-center gap-2 group-data-[state=expanded]:px-6 group-data-[state=collapsed]:px-1 py-4 hover:bg-muted/50 transition-colors overflow-hidden whitespace-nowrap"
        >
          <BookOpen className="h-6 w-6 flex-shrink-0" />
          <span className="text-lg font-semibold truncate group-data-[state=collapsed]:hidden">
            Blog
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <BlogFilter blogs={blogs} onFilter={setFilteredBlogs} />
        <BlogNav blogs={filteredBlogs} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
