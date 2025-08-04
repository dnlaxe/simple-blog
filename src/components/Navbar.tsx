'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/">@dnlaxe</Link>
      </div>
      <ul className="navbar-menu">
        {[
          { href: '/blog', label: 'Blog' },
          { href: '/portfolio', label: 'Portfolio' },
          { href: '/about', label: 'About' },
        ].map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={pathname.startsWith(href) ? 'nav-link active' : 'nav-link'}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
