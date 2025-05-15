import { promises as fs } from 'node:fs';
import path from 'node:path';
import { Prose } from '@/components/mdx/prose-wrapper';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

// Helper function to get content directories (reused from parent page)
async function getContentDirectories() {
  const contentPath = path.join(process.cwd(), 'src/content');
  const entries = await fs.readdir(contentPath, { withFileTypes: true });

  // Filter for directories only, excluding direct files in the content folder
  return entries.filter((entry) => entry.isDirectory()).map((dir) => dir.name);
}

export default async function MorePage({
  params,
}: { params: { slug: string } }) {
  const { slug } = params;

  try {
    // If slug is 'welcome' or 'about', redirect to main page as these don't have a "more" page
    if (slug === 'welcome' || slug === 'about') {
      // For server components, we need to handle this differently
      // We'll show an error message with a link back
      return (
        <div className="container mx-auto py-8 text-center">
          <h1 className="text-2xl font-bold text-red-500">
            Page Not Available
          </h1>
          <p className="mt-4">This content doesn't have a detailed page.</p>
          <div className="mt-6">
            <Link
              href={`/blog/${slug}`}
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Main Page
            </Link>
          </div>
        </div>
      );
    }

    // Load the readme.md file content
    const readmePath = path.join(
      process.cwd(),
      `src/content/${slug}/readme.md`,
    );
    const readmeContent = await fs.readFile(readmePath, 'utf-8');

    return (
      <div className="container mx-auto py-8">
        {/* Back button to main page */}
        <div className="mb-8">
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Overview
          </Link>
        </div>

        {/* Display the README markdown content */}
        <div className="border-t pt-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Detailed Information
          </h1>
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
          The detailed content could not be loaded. Please try again later.
        </p>
        <div className="mt-6">
          <Link
            href={`/blog/${slug}`}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
