import React from 'react';
import { Badge } from '@/components/ui/badge';

interface BadgeProps {
    text: string;
    className?: string;
}

const ComparisonBadge: React.FC<BadgeProps> = ({ text, className }) => {
    return (
        <Badge
            variant="secondary"
            className={`bg-primary/10 hover:bg-primary/20 transition-colors max-w-[150px] overflow-hidden ${className || ''}`}
            title={text}
        >
            <span className="truncate block">{text}</span>
        </Badge>
    );
};

export default ComparisonBadge; 