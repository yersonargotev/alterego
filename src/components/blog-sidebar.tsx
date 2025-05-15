'use client';

import * as React from 'react';
import { BookOpen } from 'lucide-react';

import { BlogNav } from '@/components/blog-nav';
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
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <div className="flex items-center gap-2 px-6 py-4">
                    <BookOpen className="h-6 w-6" />
                    <h1 className="text-lg font-semibold">Blog</h1>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <BlogNav blogs={blogs} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
