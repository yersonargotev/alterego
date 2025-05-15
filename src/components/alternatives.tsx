import React from 'react';
import type { AlternativesData, Alternative } from '@/types/alternatives';
import Grid from '@/components/ui/grid';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface AlternativesProps {
    data: AlternativesData | null; // Allow data to be null initially
}

const AlternativeCard: React.FC<{ alternative: Alternative }> = ({
    alternative,
}) => {
    return (
        <Card className="flex flex-col h-full bg-card text-card-foreground">
            <CardHeader>
                <CardTitle>{alternative.name}</CardTitle>
                <CardDescription>{alternative.license}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <h4 className="font-semibold mb-2 text-sm">Main Features:</h4>
                <ul className="list-disc list-inside text-sm space-y-1 mb-3">
                    {alternative.mainFeatures.slice(0, 3).map((feature) => (
                        <li key={feature}>{feature}</li>
                    ))}
                    {alternative.mainFeatures.length > 3 && (
                        <li className="text-xs">...and more</li>
                    )}
                </ul>
                <h4 className="font-semibold mb-1 text-sm">Platforms:</h4>
                <div className="flex flex-wrap gap-1">
                    {alternative.platforms.map((platform) => (
                        <Badge key={platform} variant="secondary">
                            {platform}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Link
                    href={alternative.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                >
                    Visit Website
                </Link>
            </CardFooter>
        </Card>
    );
};

const AlternativesDisplay: React.FC<AlternativesProps> = ({ data }) => {
    if (!data) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-muted-foreground">Loading project data...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Project Information Section */}
            <section className="mb-12 p-6 border rounded-lg bg-card text-card-foreground shadow-lg">
                <h1 className="text-4xl font-extrabold mb-3 text-center tracking-tight lg:text-5xl">
                    {data.projectName}
                </h1>
                <p className="text-lg text-muted-foreground text-center mb-6 max-w-3xl mx-auto">
                    {data.projectPurpose}
                </p>

                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-6 text-sm">
                    <div>
                        <h3 className="font-semibold text-primary mb-1">Website:</h3>
                        <Link
                            href={data.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline break-all"
                        >
                            {data.website}
                        </Link>
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary mb-1">
                            Supported Platforms:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {data.platforms.map((platform) => (
                                <Badge key={platform} variant="outline">
                                    {platform}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-primary mb-2">Key Features:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {data.mainFeatures.map((feature) => (
                            <li key={feature}>{feature}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Alternatives Section */}
            {data.alternatives && data.alternatives.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        Alternative Tools
                    </h2>
                    <Grid className="gap-x-6 gap-y-8">
                        {data.alternatives.map((alt) => (
                            <AlternativeCard key={alt.name} alternative={alt} />
                        ))}
                    </Grid>
                </section>
            )}

            {/* Market Positioning Section */}
            <section className="p-6 border rounded-lg bg-card text-card-foreground shadow-lg">
                <h2 className="text-2xl font-semibold mb-3">Market Positioning</h2>
                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                    {data.marketPositioning}
                </p>
                {data.mostWellKnownAlternative &&
                    data.mostWellKnownAlternative.length > 0 && (
                        <p className="text-sm mt-3 text-muted-foreground">
                            <span className="font-semibold text-foreground">
                                Often compared with:
                            </span>{' '}
                            {data.mostWellKnownAlternative.join(', ')}
                        </p>
                    )}
            </section>
        </div>
    );
};

export default AlternativesDisplay;