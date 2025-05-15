import RepoCard, { type RepoCardProps } from '@/components/repo-card';
import rustProjectsData from '@/lib/constants/rust.json';

// Define a more specific type for the items in rust.json to help with mapping
interface RustProjectJsonItem {
    author: string;
    name: string;
    avatar: string;
    url: string;
    description: string;
    language: string;
    languageColor?: string; // Already optional
    stars: number;
    fork: number; // Note: this is 'fork' not 'forks'
    // other properties from json like sponsor, currentPeriodStars, builtBy can be listed here if needed elsewhere
}

const BlogPage = () => {
    // Map the imported JSON data to match RepoCardProps
    const projects: RepoCardProps[] = (
        rustProjectsData as RustProjectJsonItem[]
    ).map((item) => ({
        author: item.author,
        name: item.name,
        avatar: item.avatar,
        url: item.url,
        description: item.description,
        language: item.language,
        languageColor: item.languageColor, // Pass through if available
        stars: item.stars,
        forks: item.fork, // Map 'fork' to 'forks'
    }));

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="head-text-lg mb-8 text-center">Rust Projects Showcase</h1>
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
