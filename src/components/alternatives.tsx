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
import { ExternalLink, Star, Server, Package, CheckSquare, Globe, Layers } from 'lucide-react';

interface AlternativesProps {
    data: AlternativesData | null; // Allow data to be null initially
}

const AlternativeCard: React.FC<{ alternative: Alternative }> = ({
    alternative,
}) => {
    return (
        <Card className="flex flex-col h-full bg-card text-card-foreground border border-border/60 hover:shadow-md transition-all duration-300 hover:border-border">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-start justify-between">
                    <span>{alternative.name}</span>
                    {alternative.license.toLowerCase().includes('apache') && (
                        <Badge variant="outline" className="text-xs font-normal bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                            {alternative.license}
                        </Badge>
                    )}
                    {alternative.license.toLowerCase().includes('proprietary') && (
                        <Badge variant="outline" className="text-xs font-normal bg-amber-100 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                            {alternative.license}
                        </Badge>
                    )}
                </CardTitle>
                <CardDescription className="line-clamp-2 h-10">{alternative.license}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4 pb-2">
                <div>
                    <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                        <CheckSquare className="h-4 w-4 text-primary" />
                        <span>Main Features</span>
                    </h4>
                    <ul className="list-none text-sm space-y-1.5">
                        {alternative.mainFeatures.slice(0, 3).map((feature) => (
                            <li key={feature} className="flex items-start gap-1.5">
                                <span className="text-primary mt-0.5">•</span>
                                <span>{feature}</span>
                            </li>
                        ))}
                        {alternative.mainFeatures.length > 3 && (
                            <li className="text-xs text-muted-foreground pl-4">...and more</li>
                        )}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-1.5 text-sm flex items-center gap-2">
                        <Server className="h-4 w-4 text-primary" />
                        <span>Platforms</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                        {alternative.platforms.map((platform) => {
                            const isCloud = platform.toLowerCase().includes('cloud');
                            const isKubernetes = platform.toLowerCase().includes('kubernetes');
                            const isDocker = platform.toLowerCase().includes('docker');
                            const isSelfHosted = platform.toLowerCase().includes('self-hosted');

                            let badgeClass = "bg-slate-100 dark:bg-slate-800/40 hover:bg-slate-200 dark:hover:bg-slate-700/60";

                            if (isCloud) badgeClass = "bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-800/40";
                            if (isKubernetes) badgeClass = "bg-indigo-100 dark:bg-indigo-900/20 hover:bg-indigo-200 dark:hover:bg-indigo-800/40";
                            if (isDocker) badgeClass = "bg-sky-100 dark:bg-sky-900/20 hover:bg-sky-200 dark:hover:bg-sky-800/40";
                            if (isSelfHosted) badgeClass = "bg-emerald-100 dark:bg-emerald-900/20 hover:bg-emerald-200 dark:hover:bg-emerald-800/40";

                            return (
                                <Badge
                                    key={platform}
                                    variant="secondary"
                                    className={`transition-colors ${badgeClass}`}
                                >
                                    {platform}
                                </Badge>
                            );
                        })}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-2">
                <Link
                    href={alternative.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 group"
                >
                    <span>Visit Website</span>
                    <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
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
        <section className="space-y-12">
            {/* Project Information Section */}
            <div className="rounded-lg border border-border/70 p-6 bg-card/50 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <h3 className="font-medium text-sm text-muted-foreground">Website</h3>
                        </div>
                        <Link
                            href={data.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 group"
                        >
                            <span>{data.website}</span>
                            <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Server className="h-4 w-4 text-muted-foreground" />
                            <h3 className="font-medium text-sm text-muted-foreground">Supported Platforms</h3>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {data.platforms.map((platform) => (
                                <Badge key={platform} variant="outline" className="bg-card">
                                    {platform}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Star className="h-4 w-4 text-amber-500" />
                        <h3 className="font-medium text-sm text-muted-foreground">Key Features</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {data.mainFeatures.map((feature) => (
                            <div key={feature} className="flex items-start gap-2 group">
                                <CheckSquare className="h-4 w-4 mt-0.5 text-primary group-hover:scale-110 transition-transform" />
                                <span className="text-sm">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Alternatives Section */}
            {data.alternatives && data.alternatives.length > 0 && (
                <section>
                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <Layers className="h-5 w-5 text-primary" />
                        <span>Alternative Tools</span>
                    </h2>
                    <Grid className="gap-6">
                        {data.alternatives.map((alt) => (
                            <AlternativeCard key={alt.name} alternative={alt} />
                        ))}
                    </Grid>
                </section>
            )}

            {/* Market Positioning Section */}
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
                {data.mostWellKnownAlternative &&
                    data.mostWellKnownAlternative.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-border/40">
                            <p className="text-sm flex flex-wrap items-center gap-x-2">
                                <span className="font-medium">Often compared with:</span>
                                {data.mostWellKnownAlternative.map((alt, index) => (
                                    <React.Fragment key={alt}>
                                        <Badge variant="secondary" className="bg-primary/10 hover:bg-primary/20 transition-colors">
                                            {alt}
                                        </Badge>
                                        {index < data.mostWellKnownAlternative.length - 1 && ''}
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>
                    )}
            </section>
        </section>
    );
};

export default AlternativesDisplay;