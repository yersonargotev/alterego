import React from 'react';
import Link from 'next/link';
import { Globe, Server, Star, CheckSquare, ExternalLink, GitBranch } from 'lucide-react';
import { PlatformBadge } from '@/components/badges';
import type { AlternativesData } from '@/types/alternatives';
import Image from 'next/image';

interface ProjectInfoSectionProps {
    data: AlternativesData;
    repoInfo?: {
        author?: string;
        avatar?: string;
        url?: string;
    };
}

const ProjectInfoSection: React.FC<ProjectInfoSectionProps> = ({ data, repoInfo }) => {
    return (
        <div className="rounded-lg border border-border/70 p-6 bg-card/50 backdrop-blur-sm">
            {repoInfo && (repoInfo.author || repoInfo.avatar || repoInfo.url) && (
                <div className="flex flex-col md:flex-row items-start gap-6 mb-6 pb-6 border-b border-border/70">
                    <div className="flex items-center gap-4">
                        {repoInfo.avatar && (
                            <div className="h-12 w-12 rounded-full overflow-hidden">
                                <Image
                                    src={repoInfo.avatar}
                                    alt={repoInfo.author || 'Repository logo'}
                                    width={48}
                                    height={48}
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div>
                            {repoInfo.author && (
                                <p className="text-sm font-medium">{repoInfo.author}</p>
                            )}
                            {repoInfo.url && (
                                <Link
                                    href={repoInfo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 group text-sm"
                                >
                                    <GitBranch className="h-3.5 w-3.5" />
                                    <span className="truncate">Repository</span>
                                    <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5 flex-shrink-0" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                <div className="flex-1 overflow-hidden">
                    <div className="flex items-center gap-2 mb-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-medium text-sm text-muted-foreground">
                            Website
                        </h3>
                    </div>
                    <Link
                        href={data.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 group truncate"
                    >
                        <span className="truncate">{data.website}</span>
                        <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 flex-shrink-0" />
                    </Link>
                </div>
                <div className="flex-1 overflow-hidden">
                    <div className="flex items-center gap-2 mb-2">
                        <Server className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-medium text-sm text-muted-foreground">
                            Supported Platforms
                        </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5 overflow-hidden">
                        {data.platforms.map((platform) => (
                            <PlatformBadge
                                key={platform}
                                text={platform}
                                className=""
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                    <Star className="h-4 w-4 text-amber-500" />
                    <h3 className="font-medium text-sm text-muted-foreground">
                        Key Features
                    </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.mainFeatures.map((feature) => (
                        <div
                            key={feature}
                            className="flex items-start gap-2 group overflow-hidden"
                        >
                            <CheckSquare className="h-4 w-4 mt-0.5 text-primary group-hover:scale-110 transition-transform flex-shrink-0" />
                            <span className="text-sm truncate">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectInfoSection; 