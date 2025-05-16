import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alterego-amber.vercel.app';

  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sign-in`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/sign-up`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // En una aplicación real, aquí podrías obtener dinámicamente los artículos de blog
  // o los repositorios para incluirlos en el sitemap.
  // Ejemplo:
  // const blogPosts = getBlogPosts();
  // const blogSitemapEntries = blogPosts.map(post => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.modifiedAt,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  // }));
  //
  // return [...routes, ...blogSitemapEntries];

  return routes;
}
