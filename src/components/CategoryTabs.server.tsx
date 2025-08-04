// components/CategoryTabs.server.tsx

import CategoryTabs from './CategoryTabsClient';
import { getAllCategories } from '../lib/posts';

export default function CategoryTabsServer() {
  const categories = getAllCategories();
  return <CategoryTabs categories={categories} />;
}
