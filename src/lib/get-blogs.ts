import fs from 'node:fs';
import path from 'node:path';

export type BlogItem = {
  slug: string;
  title: string;
};

/**
 * Get all blog posts from the content directory
 * @returns Array of blog items with slug and title
 */
export function getBlogs(): BlogItem[] {
  // Get the content directory path
  const contentDir = path.join(process.cwd(), 'src/content');

  // Read all files in the content directory with .mdx extension
  const files = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith('.mdx'));

  // Map files to blog items
  return files.map((file) => {
    // Remove the .mdx extension to get the slug
    const slug = file.replace(/\.mdx$/, '');

    // Capitalize the first letter of the slug for the title
    // This is a simple solution - in a real app you might want to extract the title from the MDX frontmatter
    const title = slug.charAt(0).toUpperCase() + slug.slice(1);

    return { slug, title };
  });
}
