import { Prose } from "@/components/mdx/prose-wrapper";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { default: Post } = await import(`@/content/${slug}.mdx`);

    return (
        <Prose>
            <Post />
        </Prose>
    );
}
export function generateStaticParams() {
    return [{ slug: 'welcome' }, { slug: 'about' }]
}

export const dynamicParams = false