import fs from 'fs';
import path from 'path';
import { postSchema, Post } from './schema'; // ✅ FROM schema.ts

const postsDirectory = path.join(process.cwd(), 'src/content');

// ✅ getAllPosts with validation
export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.flatMap((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf-8');

    try {
      const parsed = JSON.parse(fileContents);
      return [postSchema.parse(parsed)];
    } catch (error) {
      console.warn(`❌ Skipping invalid post file: ${fileName}`, error);
      return []; // skip invalid file
    }
  });
}

// ✅ getPostBySlug with validation
export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.json`);
  if (!fs.existsSync(fullPath)) return null;

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const parsed = JSON.parse(fileContents);
    return postSchema.parse(parsed);
  } catch (error) {
    console.warn(`❌ Failed to parse post: ${slug}`, error);
    return null;
  }
}

// ✅ No changes needed here
export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = posts.map((post) => post.category?.trim());
  const unique = Array.from(new Set(categories.filter(Boolean)));
  return ['All', ...unique.sort()];
}
