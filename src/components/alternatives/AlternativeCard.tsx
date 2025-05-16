'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckSquare, ChevronRight, ArrowRight, Server } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';
import { LicenseBadge, PlatformBadge } from '@/components/badges';
import type { Alternative } from '@/types/alternatives';

interface AlternativeCardProps {
    alternative: Alternative;
}

const AlternativeCard: React.FC<AlternativeCardProps> = ({
    alternative,
}) => {
    const [showAllFeatures, setShowAllFeatures] = useState(false);

    return (
        <Card className="flex flex-col h-full gap-0 bg-card text-card-foreground border border-border/60 hover:shadow-md transition-all duration-300 hover:border-border">
            <CardHeader className="pb-3">
                <CardTitle className="flex flex-col items-start gap-2 w-full">
                    <span className="w-full font-medium text-sm sm:text-base text-center line-clamp-2 break-words hyphens-auto">
                        {alternative.name}
                    </span>
                    <div className="w-full flex justify-center">
                        <LicenseBadge text={alternative.license} />
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-4 pb-2">
                <div className="w-full">
                    <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                        <CheckSquare className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="truncate">Main Features</span>
                    </h4>
                    <ul className="list-none text-sm space-y-2 w-full p-0">
                        {(showAllFeatures
                            ? alternative.mainFeatures
                            : alternative.mainFeatures.slice(0, 3)
                        ).map((feature) => (
                            <li
                                key={feature}
                                className="flex items-start gap-2 group w-full p-0"
                            >
                                <ChevronRight className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                                <span className="line-clamp-2 break-words hyphens-auto">
                                    {feature}
                                </span>
                            </li>
                        ))}
                        {!showAllFeatures && alternative.mainFeatures.length > 3 && (
                            <li
                                className="text-xs text-primary hover:text-primary/80 pl-5 cursor-pointer flex items-center gap-1 transition-colors"
                                onClick={() => setShowAllFeatures(true)}
                                title="Show all features"
                            >
                                <span className="italic">...and more</span>
                                <ChevronRight className="h-3 w-3 text-primary" />
                            </li>
                        )}
                        {showAllFeatures && alternative.mainFeatures.length > 3 && (
                            <li
                                className="text-xs text-primary hover:text-primary/80 pl-5 cursor-pointer flex items-center gap-1 transition-colors"
                                onClick={() => setShowAllFeatures(false)}
                                title="Show fewer features"
                            >
                                <span>Show less</span>
                                <ChevronRight className="h-3 w-3 text-primary rotate-90" />
                            </li>
                        )}
                    </ul>
                </div>
                <div className="w-full">
                    <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                        <Server className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="truncate">Platforms</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5 w-full">
                        {alternative.platforms.map((platform) => (
                            <PlatformBadge key={platform} text={platform} />
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-2 border-t border-border/10">
                <Link
                    href={alternative.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 group w-full justify-center rounded-md py-1.5 hover:bg-primary/5"
                >
                    <span className="truncate">Visit Website</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 flex-shrink-0" />
                </Link>
            </CardFooter>
        </Card>
    );
};

export default AlternativeCard; 