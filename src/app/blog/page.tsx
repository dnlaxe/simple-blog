import { getAllPosts } from '../../lib/posts';
import PostCard from '../../components/PostCard';
import { Post } from '../../lib/schema';

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category = 'All' } = await searchParams;

  const allPosts: Post[] = getAllPosts();
  const filteredPosts =
    category === 'All'
      ? allPosts
      : allPosts.filter(
          (post) => post.category.toLowerCase() === category.toLowerCase()
        );

  return (
    <main>
      <section className="post-list">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))
        ) : (
          <p>No posts found in this category.</p>
        )}
      </section>
    </main>
  );
}
