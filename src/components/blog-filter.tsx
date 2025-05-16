'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import type { BlogItem } from '@/lib/get-blogs';
import { Input } from '@/components/ui/input';

interface BlogFilterProps {
    blogs: BlogItem[];
    onFilter: (filteredBlogs: BlogItem[]) => void;
}

export function BlogFilter({ blogs, onFilter }: BlogFilterProps) {
    const [searchQuery, setSearchQuery] = React.useState('');

    React.useEffect(() => {
        if (!searchQuery.trim()) {
            // If search is empty, return all blogs
            onFilter(blogs);
            return;
        }

        const query = searchQuery.toLowerCase().trim();

        const filteredBlogs = blogs.filter((blog) => {
            // Check title (which includes author and name)
            if (blog.title.toLowerCase().includes(query)) return true;

            // Check name separately
            if (blog.name.toLowerCase().includes(query)) return true;

            // Check author separately 
            if (blog.author.toLowerCase().includes(query)) return true;

            // Check slug
            if (blog.slug.toLowerCase().includes(query)) return true;

            // Check description
            if (blog.description.toLowerCase().includes(query)) return true;

            return false;
        });

        onFilter(filteredBlogs);
    }, [searchQuery, blogs, onFilter]);

    return (
        <div className="relative px-3 py-2">
            <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search blogs..."
                    className="pl-8 h-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
    );
} 