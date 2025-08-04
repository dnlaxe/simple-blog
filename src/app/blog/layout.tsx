import { Suspense } from 'react';
import CategoryTabsServer from '../../components/CategoryTabs.server';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="blog-layout">
      <Suspense fallback={null}>
        <CategoryTabsServer />
      </Suspense>
      <div className="blog-content">{children}</div>
    </div>
  );
}
