// lib/markdown.ts
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

export async function renderMarkdown(md: string): Promise<string> {
  const rawHtml = await marked(md);
  return DOMPurify.sanitize(rawHtml);
}
