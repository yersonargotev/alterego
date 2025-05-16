import RepoCard, { type RepoCardProps } from '@/components/repo-card';
import { getBlogs } from '@/lib/get-blogs';

const BlogPage = () => {
  // Get blog items from the getBlogs function
  const blogs = getBlogs();

  // Map blog items to RepoCardProps
  const projects: RepoCardProps[] = blogs.map((blog) => ({
    author: blog.author,
    name: blog.name,
    avatar: blog.avatar,
    url: blog.url,
    description: blog.description,
    language: blog.language,
    languageColor: blog.languageColor,
    stars: blog.stars,
    forks: blog.forks,
  }));

  return (
    <div className="max-w-7xl mx-auto w-full p-6 pb-16">
      <h1 className="head-text-lg mb-8 text-center">
        Rust Projects Showcase
      </h1>
      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <RepoCard key={project.url || project.name} {...project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No projects to display.
        </p>
      )}
    </div>
  );
};

export default BlogPage;
