import { promises as fs } from 'node:fs';
import path from 'node:path';
import { Prose } from '@/components/mdx/prose-wrapper';
import AlternativesDisplay from '@/components/alternatives';
import type { AlternativesData } from '@/types/alternatives';
import { MDXRemote } from 'next-mdx-remote/rsc';

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

        // Load the readme.md file content
        const readmePath = path.join(
            process.cwd(),
            `src/content/${slug}/readme.md`,
        );
        const readmeContent = await fs.readFile(readmePath, 'utf-8');

        return (
            <div className="container mx-auto py-8">
                {/* Display the alternatives data using our component */}
                <AlternativesDisplay data={alternativesData} />

                {/* Display the README markdown content */}
                <div className="mt-12 border-t pt-8">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        Detailed Information
                    </h2>
                    <Prose>
                        <MDXRemote source={readmeContent} />
                    </Prose>
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
