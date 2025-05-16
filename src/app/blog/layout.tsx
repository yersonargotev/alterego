import { BlogSidebar } from '@/components/blog-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getBlogs } from '@/lib/get-blogs';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const blogs = getBlogs();

  return (
    <SidebarProvider
      defaultOpen={true}
      className="grid h-dvh grid-rows-[auto_1fr]"
    >
      <div className="flex h-full">
        <BlogSidebar blogs={blogs} />
        <main className="flex-1 overflow-auto">
          <div className="flex-1 px-4">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
