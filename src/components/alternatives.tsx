import React from 'react';
import type { AlternativesData } from '@/types/alternatives';
import ProjectInfoSection from '@/components/alternatives/project-info-section';
import AlternativesGrid from '@/components/alternatives/alternatives-grid';
import MarketPositioningSection from '@/components/alternatives/market-positioning-section';

interface AlternativesProps {
    data: AlternativesData | null; // Allow data to be null initially
}

const AlternativesDisplay: React.FC<AlternativesProps> = ({ data }) => {
    if (!data) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-muted-foreground">Loading project data...</p>
            </div>
        );
    }

    return (
        <section className="space-y-12">
            {/* Project Information Section */}
            <ProjectInfoSection data={data} />

            {/* Alternatives Section */}
            {data.alternatives && data.alternatives.length > 0 && (
                <AlternativesGrid alternatives={data.alternatives} />
            )}

            {/* Market Positioning Section */}
            <MarketPositioningSection data={data} />
        </section>
    );
};

export default AlternativesDisplay;
