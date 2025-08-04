'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type Props = {
  categories: string[];
};

export default function CategoryTabs({ categories }: Props) {
  const searchParams = useSearchParams();
  const current = searchParams.get('category') || 'All';

  return (
    <nav className="category-tabs">
      <ul>
        {categories.map((cat) => {
          const isActive = cat.toLowerCase() === current.toLowerCase();
          return (
            <li key={cat}>
              <Link
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className={isActive ? 'tab active' : 'tab'}
              >
                {cat}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
