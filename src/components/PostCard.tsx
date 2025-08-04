'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Post } from '../lib/schema';

export default function PostCard({ post }: { post: Post }) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  const href = currentCategory
    ? `/blog/${post.slug}?category=${encodeURIComponent(currentCategory)}`
    : `/blog/${post.slug}`;

  return (
    <article className="post-card">
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <p className="post-meta">{post.date}</p>
      <Link href={href}>Read more →</Link>
    </article>
  );
}
