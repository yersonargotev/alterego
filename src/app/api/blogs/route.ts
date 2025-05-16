import { NextResponse } from 'next/server';
import { getPagedBlogs, getBlogsCount } from '@/lib/get-blogs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get('page') || '1', 10);
  const pageSize = Number.parseInt(searchParams.get('pageSize') || '9', 10);

  const blogs = getPagedBlogs(page, pageSize);
  const total = getBlogsCount();

  return NextResponse.json({
    blogs,
    total,
    hasMore: page * pageSize < total,
  });
}
