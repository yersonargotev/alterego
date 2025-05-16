'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import type { BlogItem } from '@/lib/get-blogs';
import { Input } from '@/components/ui/input';
import { useSidebar } from '@/components/ui/sidebar';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface BlogFilterProps {
    blogs: BlogItem[];
    onFilter: (filteredBlogs: BlogItem[]) => void;
}

export function BlogFilter({ blogs, onFilter }: BlogFilterProps) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';

    const inputRef = React.useRef<HTMLInputElement>(null);

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

    // Close search if sidebar collapses and search was open
    React.useEffect(() => {
        if (isCollapsed && isSearchOpen) {
            setIsSearchOpen(false);
        }
    }, [isCollapsed, isSearchOpen]);

    // Focus input when search is opened
    React.useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchOpen]);

    if (isCollapsed) {
        return (
            <div className="flex justify-center py-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSearchOpen(prev => !prev)}
                            className="h-8 w-8"
                        >
                            <Search className="h-4 w-4" />
                            <span className="sr-only">Search blogs</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        Search blogs
                    </TooltipContent>
                </Tooltip>

                {isSearchOpen && (
                    <div className="fixed left-12 top-20 z-50 bg-popover border shadow-md rounded-md p-2 w-64">
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                ref={inputRef}
                                type="search"
                                placeholder="Search blogs..."
                                className="pl-8 h-9 w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Escape') {
                                        setIsSearchOpen(false);
                                    }
                                }}
                                onBlur={() => setIsSearchOpen(false)}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }

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