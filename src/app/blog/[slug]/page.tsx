import { promises as fs } from 'node:fs';
import path from 'node:path';
import { Prose } from '@/components/mdx/prose-wrapper';
import AlternativesDisplay from '@/components/alternatives';
import type { AlternativesData } from '@/types/alternatives';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

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
    // Load the alternatives.json file
    const alternativesPath = path.join(
      process.cwd(),
      `src/content/${slug}/alternatives.json`,
    );
    const alternativesJson = await fs.readFile(alternativesPath, 'utf-8');
    const alternativesData: AlternativesData = JSON.parse(alternativesJson);

    return (
      <Prose className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <BookOpen className="h-4 w-4" />
            <span>Project Overview</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {alternativesData.projectName}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {alternativesData.projectPurpose}
          </p>
        </header>

        {/* Display the alternatives data using our component */}
        <AlternativesDisplay data={alternativesData} />

        {/* Add link to detailed page */}
        <div className="mt-12 text-center">
          <Link
            href={`/blog/${slug}/more`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors group"
          >
            <span>View Detailed Information</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Prose>
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
  // Get the project directory names
  const directories = await getContentDirectories();

  // Create params for each directory
  return directories.map((dir) => ({
    slug: dir,
  }));
}

export const dynamicParams = false;
