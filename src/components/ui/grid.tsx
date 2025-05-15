import React from 'react';
import { cn } from '@/lib/utils';

interface GridProps {
    children: React.ReactNode;
    className?: string;
    cols?: 1 | 2 | 3 | 4;
}

const Grid: React.FC<GridProps> = ({
    children,
    className,
    cols = 3
}) => {
    // Define column classes based on the cols prop
    const columnClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    };

    return (
        <div
            className={cn(
                'grid',
                columnClasses[cols],
                'gap-6 animate-in fade-in-50 duration-500',
                className
            )}
        >
            {children}
        </div>
    );
};

export default Grid; 