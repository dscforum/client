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
    <div className="w-full px-8 my-4 flex items-center gap-x-6">
      <span className="text-tertiary text-sm font-medium">
        © {new Date().getFullYear()} dscforum.com All rights reserved.
      </span>

      <div className="flex gap-x-4">
        {links.map(link => (
          <Link
            key={`footer-link-${link.label}`}
            href={link.url}
            className="text-primary hover:underline hover:text-secondary text-sm"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}