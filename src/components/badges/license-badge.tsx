import React from 'react';
import { Badge } from '@/components/ui/badge';

interface BadgeProps {
    text: string;
    className?: string;
}

const LicenseBadge: React.FC<BadgeProps> = ({ text, className }) => {
    const getLicenseBadgeStyle = () => {
        if (text.toLowerCase().includes('apache')) {
            return 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800';
        } else if (text.toLowerCase().includes('proprietary')) {
            return 'bg-amber-100 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
        } else if (text.toLowerCase().includes('mit')) {
            return 'bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
        }
        return 'bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700';
    };

    return (
        <Badge
            variant="outline"
            className={`max-w-[90%] text-xs font-normal overflow-hidden ${getLicenseBadgeStyle()} ${className || ''}`}
            title={text}
        >
            <span className="truncate block">{text}</span>
        </Badge>
    );
};

export default LicenseBadge; 