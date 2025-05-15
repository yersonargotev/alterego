import { promises as fs } from 'node:fs';
import path from 'node:path';
import { Prose } from '@/components/mdx/prose-wrapper';
import AlternativesDisplay from '@/components/alternatives';
import type { AlternativesData } from '@/types/alternatives';
import Link from 'next/link';

// Helper function to get content directory names
async function getContentDirectories() {
    const contentPath = path.join(process.cwd(), 'src/content');
    const entries = await fs.readdir(contentPath, { withFileTypes: true });

    // Filter for directories only, excluding direct files in the content folder
    return entries.filter((entry) => entry.isDirectory()).map((dir) => dir.name);
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;

    try {
        // If slug is 'welcome' or 'about', just render the MDX file
        if (slug === 'welcome' || slug === 'about') {
            const { default: Content } = await import(`@/content/${slug}.mdx`);
            return (
                <Prose>
                    <Content />
                </Prose>
            );
        }

        // Otherwise, it's a Rust project page
        // Load the alternatives.json file
        const alternativesPath = path.join(
            process.cwd(),
            `src/content/${slug}/alternatives.json`,
        );
        const alternativesJson = await fs.readFile(alternativesPath, 'utf-8');
        const alternativesData: AlternativesData = JSON.parse(alternativesJson);

        return (
            <div className="container mx-auto py-8">
                {/* Display the alternatives data using our component */}
                <AlternativesDisplay data={alternativesData} />

                {/* Add link to detailed page */}
                <div className="mt-8 text-center">
                    <Link
                        href={`/blog/${slug}/more`}
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        View Detailed Information
                    </Link>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error rendering page:', error);
        return (
            <div className="container mx-auto py-12 text-center">
                <h1 className="text-2xl font-bold text-red-500">
                    Error Loading Content
                </h1>
                <p className="mt-4">
                    The requested content could not be loaded. Please try again later.
                </p>
            </div>
        );
    }
}

export async function generateStaticParams() {
    // Include the static MDX files
    const staticParams = [{ slug: 'welcome' }, { slug: 'about' }];

    // Get the rust project directory names
    const directories = await getContentDirectories();

    // Create params for each directory
    const directoryParams = directories.map((dir) => ({
        slug: dir,
    }));

    // Combine all params
    return [...staticParams, ...directoryParams];
}

export const dynamicParams = false;
