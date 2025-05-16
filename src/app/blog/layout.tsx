import { BlogSidebar } from '@/components/blog-sidebar';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { getBlogs } from '@/lib/get-blogs';
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

export default function Layout({ children }: { children: ReactNode }) {
  const blogs = getBlogs();

  return (
    <SidebarProvider defaultOpen={true} className="grid h-dvh grid-rows-[auto_1fr]">
      {/* Wrapper for the entire layout */}
      <div className="flex h-full w-full">
        {/* Blog Sidebar */}
        <Sidebar collapsible="icon">
          <BlogSidebar blogs={blogs} />
        </Sidebar>

        {/* Main content area with fixed header */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Fixed header that stays at the top */}
          <header className="flex h-16 w-full shrink-0 items-center border-b bg-background px-4 z-10">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Rust Projects</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Main content with scroll */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
