import { promises as fs } from 'node:fs';
import path from 'node:path';
import { Prose } from '@/components/mdx/prose-wrapper';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import ReadingProgress from '@/components/mdx/reading-progress';

// Force this page to be static at build time
export const dynamic = 'force-static';

// Helper function to get content directories (reused from parent page)
async function getContentDirectories() {
  const contentPath = path.join(process.cwd(), 'src/content');
  const entries = await fs.readdir(contentPath, { withFileTypes: true });

  // Filter for directories only, excluding direct files in the content folder
  return entries.filter((entry) => entry.isDirectory()).map((dir) => dir.name);
}

export default async function MorePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    // Load the readme.md file content
    const readmePath = path.join(
      process.cwd(),
      `src/content/${slug}/readme.md`,
    );
    const readmeContent = await fs.readFile(readmePath, 'utf-8');

    return (
      <>
        <ReadingProgress />
        <div className="container max-w-3xl mx-auto px-3 sm:px-4 py-8 sm:py-12 w-full overflow-hidden">
          {/* Back button to main page */}
          <div className="mb-6 sm:mb-8">
            <Link
              href={`/blog/${slug}`}
              className="group inline-flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 flex-shrink-0 group-hover:transform group-hover:-translate-x-1 transition-transform duration-200"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span className="break-words">Back to Overview</span>
            </Link>
          </div>

          {/* Display the README markdown content */}
          <article className="bg-card rounded-lg shadow-sm p-4 sm:p-6 md:p-8 border border-border w-full">
            <h1 className="head-text-md mb-6 sm:mb-8 text-center break-words">
              More Information
            </h1>
            <div className="w-full h-[1px] bg-border mb-6 sm:mb-8" />
            <Prose className="text-card-foreground max-w-full overflow-hidden break-words">
              <ReactMarkdown>{readmeContent}</ReactMarkdown>
            </Prose>
          </article>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error rendering page:', error);
    return (
      <div className="container max-w-3xl mx-auto px-3 sm:px-4 py-8 sm:py-12 text-center w-full">
        <div className="bg-card rounded-lg shadow-sm p-4 sm:p-8 border border-destructive">
          <h1 className="head-text-sm text-destructive mb-4 break-words">
            Error Loading Content
          </h1>
          <p className="text-muted-foreground mb-6 break-words">
            The detailed content could not be loaded. Please try again later.
          </p>
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center px-3 sm:px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Back to Main Page
          </Link>
        </div>
      </div>
    );
  }
}

export async function generateStaticParams() {
  // Get the rust project directory names
  const directories = await getContentDirectories();

  // Create params for each directory (excluding welcome and about which don't have more pages)
  return directories.map((dir) => ({
    slug: dir,
  }));
}

export const dynamicParams = false;
