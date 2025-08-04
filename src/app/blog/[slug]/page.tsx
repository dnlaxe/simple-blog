import { renderMarkdown } from '../../../lib/markdown';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Post } from '../../../lib/schema';
import { getAllPosts, getPostBySlug } from '../../../lib/posts';

// This is now correct in Next.js 15
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// --- Dynamic Metadata ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // ✅ REQUIRED in Next.js 15
  const post: Post | null = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

// --- Page Function ---
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params; // ✅ REQUIRED in Next.js 15
  const post: Post | null = getPostBySlug(slug);
  if (!post) return notFound();

  const html = await renderMarkdown(post.content);

  return (
    <article className="blog-post">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-meta">
        <span>{post.date}</span>
      </p>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
