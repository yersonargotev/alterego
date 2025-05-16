import React from 'react';
import { Package } from 'lucide-react';
import { ComparisonBadge } from '@/components/badges';
import type { AlternativesData } from '@/types/alternatives';

interface MarketPositioningSectionProps {
    data: AlternativesData;
}

const MarketPositioningSection: React.FC<MarketPositioningSectionProps> = ({ data }) => {
    return (
        <section className="rounded-lg border border-border/70 p-6 bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <span>Market Positioning</span>
            </h2>
            <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {data.marketPositioning}
                </p>
            </div>
            {data.mostWellKnownAlternative && (
                <div className="mt-4 pt-4 border-t border-border/40 overflow-hidden">
                    <p className="text-sm flex flex-wrap items-center gap-x-2 overflow-hidden">
                        <span className="font-medium flex-shrink-0">
                            Often compared with:
                        </span>
                        <span className="flex flex-wrap gap-1.5 overflow-hidden">
                            <ComparisonBadge text={data.mostWellKnownAlternative} />
                        </span>
                    </p>
                </div>
            )}
        </section>
    );
};

export default MarketPositioningSection; 