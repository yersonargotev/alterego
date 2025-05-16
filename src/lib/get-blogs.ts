import fs from 'node:fs';
import path from 'node:path';
import rustProjectsData from '@/lib/constants/rust.json';

// Interface for project data from any language JSON file
interface ProjectJsonItem {
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
  language: string;
  languageColor?: string;
};

/**
 * Get all blog posts from the content directory that match projects in language JSON files
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

  const result: BlogItem[] = [];

  // For now, we only have rust.json, but this could be expanded to include other languages
  const projectsDataSources: {
    data: ProjectJsonItem[];
    language: string;
    color: string;
  }[] = [
    {
      data: rustProjectsData as ProjectJsonItem[],
      language: 'Rust',
      color: '#dea584',
    },
    // Future languages can be added here, for example:
    // { data: jsProjectsData as ProjectJsonItem[], language: 'JavaScript', color: '#f1e05a' },
    // { data: pythonProjectsData as ProjectJsonItem[], language: 'Python', color: '#3572A5' },
  ];

  // Process each language's projects
  projectsDataSources.forEach(({ data, language, color }) => {
    // Process each project from the current language file
    data.forEach((project) => {
      // Check all possible directory name formats
      const standardDirName = `${project.author}-${project.name}`;

      // Find a matching directory in content folder
      const matchingDir = contentDirectories.find((dirName) => {
        // Standard case: author-name
        if (dirName === standardDirName) {
          return true;
        }

        // Special case for directories with different format
        // This checks if the directory contains both the author and name in the right order
        const authorIndex = dirName.indexOf(project.author);
        const nameIndex = dirName.indexOf(project.name);

        return (
          authorIndex !== -1 && nameIndex !== -1 && authorIndex < nameIndex
        );
      });

      // If a matching directory is found, add to results
      if (matchingDir) {
        result.push({
          slug: matchingDir, // Use the actual directory name as slug
          title: `${project.name.charAt(0).toUpperCase() + project.name.slice(1)} by ${project.author.charAt(0).toUpperCase() + project.author.slice(1)}`,
          author: project.author,
          name: project.name,
          description: project.description,
          url: project.url,
          avatar: project.avatar,
          stars: project.stars || 0,
          forks: project.fork || 0, // Map 'fork' to 'forks' and ensure it's never null
          language: project.language || language, // Use project language if available, fallback to file language
          languageColor: project.languageColor || color, // Use project color if available, fallback to file color
        });
      }
    });
  });

  return result;
}
