import { promises as fs } from 'node:fs';
import path from 'node:path';
import { Prose } from '@/components/mdx/prose-wrapper';
import AlternativesDisplay from '@/components/alternatives';
import type { AlternativesData } from '@/types/alternatives';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { BackButton } from '@/components/back-button';

// Force this page to be static at build time
export const dynamic = 'force-static';

// Helper function to get content directory names
async function getContentDirectories() {
  const contentPath = path.join(process.cwd(), 'src/content');
  const entries = await fs.readdir(contentPath, { withFileTypes: true });

  // Filter for directories only, excluding direct files in the content folder
  return entries.filter((entry) => entry.isDirectory()).map((dir) => dir.name);
}

// Helper function to find repository info in rust.json
async function findRepoInfo(projectName: string) {
  try {
    const rustJsonPath = path.join(process.cwd(), 'src/lib/constants/rust.json');
    const rustJsonContent = await fs.readFile(rustJsonPath, 'utf-8');
    const rustData = JSON.parse(rustJsonContent);

    // Find a matching project by name (case-insensitive)
    const matchingRepo = rustData.find((repo: any) =>
      repo.name.toLowerCase() === projectName.toLowerCase() ||
      repo.description?.toLowerCase().includes(projectName.toLowerCase())
    );

    if (matchingRepo) {
      return {
        author: matchingRepo.author,
        avatar: matchingRepo.avatar,
        url: matchingRepo.url
      };
    }

    return null;
  } catch (error) {
    console.error('Error finding repo info:', error);
    return null;
  }
}

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  try {
    // Load the alternatives.json file
    const alternativesPath = path.join(
      process.cwd(),
      `src/content/${slug}/alternatives.json`,
    );
    const alternativesJson = await fs.readFile(alternativesPath, 'utf-8');
    const alternativesData: AlternativesData = JSON.parse(alternativesJson);

    // Find repository information if available
    const repoInfo = await findRepoInfo(alternativesData.projectName);

    return (
      <Prose className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 w-full overflow-hidden">
        <div className="mb-6 sm:mb-8">
          <BackButton href="/blog" label="Back to Blog" />
        </div>
        <header className="mb-8 sm:mb-10 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <BookOpen className="h-4 w-4 flex-shrink-0" />
            <span className="break-words">Project Overview</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 break-words bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {alternativesData.projectName}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto break-words hyphens-auto">
            {alternativesData.projectPurpose}
          </p>
        </header>

        {/* Display the alternatives data using our component */}
        <AlternativesDisplay data={alternativesData} repoInfo={repoInfo ?? undefined} />

        {/* Add link to detailed page */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href={`/blog/${slug}/more`}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-secondary text-muted-foreground rounded-md hover:bg-secondary/90 transition-colors group"
          >
            <span className="break-words">View More Information</span>
            <ArrowRight className="h-4 w-4 flex-shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Prose>
    );
  } catch (error) {
    console.error('Error rendering page:', error);
    return (
      <div className="container mx-auto py-8 sm:py-12 px-3 sm:px-4 text-center w-full">
        <h1 className="text-xl sm:text-2xl font-bold text-red-500 break-words">
          Error Loading Content
        </h1>
        <p className="mt-4 break-words">
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
