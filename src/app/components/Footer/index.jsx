'use client';

import Link from 'next/link';

export default function Footer() {
  const links = [
    {
      label: 'Privacy Policy',
      url: '/legal/privacy'
    },
    {
      label: 'Support',
      url: '/support'
    }
  ];

  return (
    <div className="flex flex-wrap items-center w-full gap-6 px-8 my-4">
      <span className="text-sm font-medium text-tertiary">
        © {new Date().getFullYear()} dscforum.com All rights reserved.
      </span>

      <div className="flex gap-x-4">
        {links.map(link => (
          <Link
            key={`footer-link-${link.label}`}
            href={link.url}
            className="text-sm text-primary hover:underline hover:text-secondary"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}