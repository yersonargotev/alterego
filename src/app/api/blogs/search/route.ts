import { NextResponse } from 'next/server';
import { getBlogs } from '@/lib/get-blogs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  // Si no hay consulta, devolver array vacío
  if (!query.trim()) {
    return NextResponse.json({ blogs: [] });
  }

  // Obtener todos los blogs
  const allBlogs = getBlogs();

  // Realizar búsqueda en todos los blogs
  const searchTerm = query.toLowerCase().trim();
  const results = allBlogs.filter((blog) => {
    // Check title (which includes author and name)
    if (blog.title?.toLowerCase().includes(searchTerm)) return true;

    // Check name separately
    if (blog.name?.toLowerCase().includes(searchTerm)) return true;

    // Check author separately
    if (blog.author?.toLowerCase().includes(searchTerm)) return true;

    // Check slug
    if (blog.slug?.toLowerCase().includes(searchTerm)) return true;

    // Check description
    if (blog.description?.toLowerCase().includes(searchTerm)) return true;

    return false;
  });

  return NextResponse.json({
    blogs: results,
  });
}
