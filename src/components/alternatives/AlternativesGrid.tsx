import React from 'react';
import { Layers } from 'lucide-react';
import Grid from '@/components/ui/grid';
import AlternativeCard from './AlternativeCard';
import type { Alternative } from '@/types/alternatives';

interface AlternativesGridProps {
    alternatives: Alternative[];
}

const AlternativesGrid: React.FC<AlternativesGridProps> = ({ alternatives }) => {
    if (!alternatives || alternatives.length === 0) {
        return null;
    }

    return (
        <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                <span>Alternative Tools</span>
            </h2>
            <Grid className="gap-6">
                {alternatives.map((alt) => (
                    <AlternativeCard key={alt.name} alternative={alt} />
                ))}
            </Grid>
        </section>
    );
};

export default AlternativesGrid; 