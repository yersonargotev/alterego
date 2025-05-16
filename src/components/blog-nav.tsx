'use client';

import { FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { BlogItem } from '@/lib/get-blogs';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';

export function BlogNav({ blogs }: { blogs: BlogItem[] }) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Blogs</SidebarGroupLabel>
      <SidebarMenu>
        {blogs.length === 0 ? (
          <div className={`px-3 py-2 text-sm text-muted-foreground ${isCollapsed ? "hidden" : ""}`}>
            No blogs found
          </div>
        ) : (
          blogs.map((blog) => {
            const isActive = pathname === `/blog/${blog.slug}`;

            return (
              <SidebarMenuItem key={blog.slug}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={blog.title}
                >
                  <Link href={`/blog/${blog.slug}`}>
                    <FileText className="h-4 w-4" />
                    <span>{blog.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
