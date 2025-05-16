'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { PlatformIcon, type Platform } from '@/components/icons/platforms';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

// Renderizado solo en cliente para evitar problemas de hidratación con SVG
const ClientPlatformIcon = dynamic(() => Promise.resolve(PlatformIcon), {
    ssr: false,
});

interface BadgeProps {
    platform?: Platform;
    text: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    fixedWidth?: boolean;
}

const PlatformBadge: React.FC<BadgeProps> = ({
    platform,
    text,
    className,
    size = 'md',
    fixedWidth = false,
}) => {
    const { resolvedTheme } = useTheme();
    const currentTheme = (resolvedTheme || 'light') as 'light' | 'dark';

    // Determine platform type from text if not explicitly provided
    const determinePlatform = (): Platform => {
        if (platform) return platform;

        const textLower = text.toLowerCase();
        if (textLower.includes('ios')) return 'ios';
        if (textLower.includes('chrome')) return 'chrome';
        if (textLower.includes('browser') || textLower.includes('web')) return 'browser';
        if (textLower.includes('java')) return 'java';
        if (textLower.includes('raspberry')) return 'raspberry';
        if (textLower.includes('windows')) return 'windows';
        if (textLower.includes('macos') || textLower.includes('mac os'))
            return 'macos';
        if (textLower.includes('apple') && !textLower.includes('android'))
            return 'apple';
        if (textLower.includes('linux')) return 'linux';
        if (textLower.includes('android')) return 'android';
        if (textLower.includes('docker')) return 'docker';
        if (textLower.includes('kubernetes') || textLower.includes('k8s'))
            return 'kubernetes';
        if (textLower.includes('cloud')) return 'cloud';
        if (textLower.includes('self') || textLower.includes('hosted'))
            return 'self';

        return 'desktop'; // default fallback
    };

    const platformType = determinePlatform();

    // Size classes based on the size prop
    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'text-xs py-0.5 px-2';
            case 'lg':
                return 'text-sm py-1 px-3';
            default:
                return 'text-xs py-0.5 px-2.5'; // md
        }
    };

    // Icon size classes based on badge size
    const getIconSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'w-3 h-3';
            case 'lg':
                return 'w-5 h-5';
            default:
                return 'w-4 h-4'; // md
        }
    };

    // Width classes based on fixedWidth prop
    const getWidthClasses = () => {
        if (!fixedWidth) return '';

        switch (size) {
            case 'sm':
                return 'w-8';
            case 'lg':
                return 'w-12';
            default:
                return 'w-10'; // md
        }
    };

    return (
        <Badge
            variant="secondary"
            className={`
                transition-colors 
                ${getSizeClasses()}
                ${getWidthClasses()}
                text-center
                bg-transparent
                ${fixedWidth ? 'justify-center' : ''}
                ${className || ''}
            `}
            title={text}
        >
            <div className={getIconSizeClasses()}>
                <ClientPlatformIcon platform={platformType} theme={currentTheme} />
            </div>
        </Badge>
    );
};

export default PlatformBadge;
