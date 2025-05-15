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
} from '@/components/ui/sidebar';

export function BlogNav({ blogs }: { blogs: BlogItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Blogs</SidebarGroupLabel>
      <SidebarMenu>
        {blogs.map((blog) => {
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
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
