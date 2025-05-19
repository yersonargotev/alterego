import { BlogSidebar } from '@/components/blog-sidebar';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { getPagedBlogs } from '@/lib/get-blogs';
import type { ReactNode } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ProtectedContent } from '@/components/auth/protected-content';

export default function Layout({ children }: { children: ReactNode }) {
  // Get initial set of blogs for the sidebar (first page)
  const initialBlogs = getPagedBlogs(1, 20);

  return (
    <ProtectedContent>
      <SidebarProvider
        defaultOpen={false}
        className="w-full h-full"
      >
        {/* Wrapper for the entire layout */}
        <div className="flex h-full w-full max-w-full overflow-x-hidden">
          {/* Blog Sidebar */}
          <Sidebar collapsible="icon" className="flex-shrink-0">
            <BlogSidebar initialBlogs={initialBlogs} />
          </Sidebar>

          {/* Main content area with fixed header */}
          <div className="flex-1 flex flex-col overflow-hidden w-full">
            {/* Fixed header that stays at the top */}
            <header className="flex h-14 sm:h-16 w-full shrink-0 items-center border-b bg-background px-2 sm:px-4 z-10">
              <div className="flex items-center gap-1 sm:gap-2 w-full overflow-hidden">
                <SidebarTrigger className="flex-shrink-0" />
                <Separator
                  orientation="vertical"
                  className="mr-1 sm:mr-2 flex-shrink-0 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb className="w-full overflow-hidden">
                  <BreadcrumbList className="flex-wrap">
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/blog" className="truncate">Blog</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="flex-shrink-0" />
                    <BreadcrumbItem className="min-w-0">
                      <BreadcrumbPage className="truncate">Rust Projects</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>

            {/* Main content with scroll */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden w-full">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedContent>
  );
}
