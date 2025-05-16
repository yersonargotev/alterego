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
    onFilter: (filteredBlogs: BlogItem[], searchTerm: string) => void;
}

export function BlogFilter({ blogs, onFilter }: BlogFilterProps) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const [isSearching, setIsSearching] = React.useState(false);
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';

    const inputRef = React.useRef<HTMLInputElement>(null);

    // Debounce para evitar demasiadas peticiones durante escritura rápida
    const debouncedSearchTerm = useDebounce(searchQuery, 300);

    // Efecto para manejar la búsqueda cuando cambia el término debounced
    React.useEffect(() => {
        const performSearch = async () => {
            if (!debouncedSearchTerm.trim()) {
                // Si la búsqueda está vacía, mostrar todos los blogs cargados
                onFilter(blogs, '');
                return;
            }

            try {
                setIsSearching(true);

                // Buscar en todos los blogs disponibles en el servidor
                const response = await fetch(`/api/blogs/search?q=${encodeURIComponent(debouncedSearchTerm)}`);

                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }

                const data = await response.json();
                onFilter(data.blogs, debouncedSearchTerm);
            } catch (error) {
                console.error('Error al buscar blogs:', error);
                // En caso de error, filtrar localmente como fallback
                const filteredBlogs = filterBlogsLocally(blogs, debouncedSearchTerm);
                onFilter(filteredBlogs, debouncedSearchTerm);
            } finally {
                setIsSearching(false);
            }
        };

        performSearch();
    }, [debouncedSearchTerm, blogs, onFilter]);

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

    // Función de filtrado local como fallback
    const filterBlogsLocally = (blogs: BlogItem[], query: string): BlogItem[] => {
        const searchTerm = query.toLowerCase().trim();
        return blogs.filter((blog) => {
            if (blog.title?.toLowerCase().includes(searchTerm)) return true;
            if (blog.name?.toLowerCase().includes(searchTerm)) return true;
            if (blog.author?.toLowerCase().includes(searchTerm)) return true;
            if (blog.slug?.toLowerCase().includes(searchTerm)) return true;
            if (blog.description?.toLowerCase().includes(searchTerm)) return true;
            return false;
        });
    };

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
                            {isSearching && (
                                <div className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2">
                                    <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-primary" />
                                </div>
                            )}
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
                {isSearching && (
                    <div className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2">
                        <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-primary" />
                    </div>
                )}
            </div>
        </div>
    );
}

// Hook de debounce para evitar demasiadas peticiones durante la escritura
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
} 