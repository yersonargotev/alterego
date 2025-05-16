import fs from 'node:fs';
import path from 'node:path';
import rustProjectsData from '@/lib/constants/rust.json';

// Import the RustProjectJsonItem type to match with rust.json data
interface RustProjectJsonItem {
  author: string;
  name: string;
  avatar: string;
  url: string;
  description: string;
  language: string;
  languageColor?: string;
  stars: number;
  fork: number;
}

export type BlogItem = {
  slug: string;
  title: string;
  author: string;
  name: string;
  description: string;
  url: string;
  avatar: string;
  stars: number;
  forks: number;
};

/**
 * Get all blog posts from the content directory that match projects in rust.json
 * @returns Array of blog items with slug and title
 */
export function getBlogs(): BlogItem[] {
  // Get the content directory path
  const contentDir = path.join(process.cwd(), 'src/content');

  // Read all directories in the content directory
  const contentDirectories = fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  // Create a set of directory names for faster lookup
  const directorySet = new Set(contentDirectories);

  const result: BlogItem[] = [];

  // Process each project from rust.json
  (rustProjectsData as RustProjectJsonItem[]).forEach((project) => {
    // Check all possible directory name formats
    const standardDirName = `${project.author}-${project.name}`;

    // Find a matching directory in content folder
    const matchingDir = contentDirectories.find((dirName) => {
      // Standard case: author-name
      if (dirName === standardDirName) {
        return true;
      }

      // Special case for astral-sh-uv and similar
      // This checks if the directory contains both the author and name in the right order
      const authorIndex = dirName.indexOf(project.author);
      const nameIndex = dirName.indexOf(project.name);

      return authorIndex !== -1 && nameIndex !== -1 && authorIndex < nameIndex;
    });

    // If a matching directory is found, add to results
    if (matchingDir) {
      result.push({
        slug: matchingDir, // Use the actual directory name as slug
        title: `${project.name} by ${project.author}`,
        author: project.author,
        name: project.name,
        description: project.description,
        url: project.url,
        avatar: project.avatar,
        stars: project.stars,
        forks: project.fork,
      });
    }
  });

  return result;
}
