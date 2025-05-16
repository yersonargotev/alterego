import React from 'react';
import { Badge } from '@/components/ui/badge';

interface BadgeProps {
    text: string;
    className?: string;
}

const PlatformBadge: React.FC<BadgeProps> = ({ text, className }) => {
    const getBadgeStyle = () => {
        const isCloud = text.toLowerCase().includes('cloud');
        const isKubernetes = text.toLowerCase().includes('kubernetes');
        const isDocker = text.toLowerCase().includes('docker');
        const isSelfHosted = text.toLowerCase().includes('self-hosted');
        const isMultiPlatform = text.toLowerCase().includes('multi-platform');

        if (isCloud && !isMultiPlatform)
            return 'bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-800/40';
        if (isKubernetes)
            return 'bg-indigo-100 dark:bg-indigo-900/20 hover:bg-indigo-200 dark:hover:bg-indigo-800/40';
        if (isDocker)
            return 'bg-sky-100 dark:bg-sky-900/20 hover:bg-sky-200 dark:hover:bg-sky-800/40';
        if (isSelfHosted && !isMultiPlatform)
            return 'bg-emerald-100 dark:bg-emerald-900/20 hover:bg-emerald-200 dark:hover:bg-emerald-800/40';
        if (isMultiPlatform)
            return 'bg-purple-100 dark:bg-purple-900/20 hover:bg-purple-200 dark:hover:bg-purple-800/40';

        return 'bg-slate-100 dark:bg-slate-800/40 hover:bg-slate-200 dark:hover:bg-slate-700/60';
    };

    // Determinar el ancho máximo basado en la longitud del texto
    const getMaxWidth = () => {
        if (text.length > 15) return 'max-w-[200px]';
        if (text.length > 10) return 'max-w-[150px]';
        return 'max-w-[90px]';
    };

    return (
        <Badge
            variant="secondary"
            className={`transition-colors ${getMaxWidth()} overflow-hidden ${getBadgeStyle()} ${className || ''}`}
            title={text}
        >
            <span className="truncate block">{text}</span>
        </Badge>
    );
};

export default PlatformBadge; 