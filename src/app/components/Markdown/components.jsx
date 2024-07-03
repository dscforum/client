/* eslint-disable */

import Link from 'next/link';
import cn from '@/utils/cn';

const Heading = ({ level, children }) => {
  const Tag = `h${level}`;
  
  return (
    <div className="relative flex items-center">
      <Tag className={cn(
        'font-semibold',
        level === 1 && 'text-2xl',
        level === 2 && 'text-xl',
        level === 3 && 'text-lg',
        level === 4 && 'text-base',
        level === 5 && 'text-sm',
        level === 6 && 'text-xs',
      )}>
        {children}
      </Tag>

      <div className='absolute text-xs font-bold -left-6 text-tertiary'>
        H{level}
      </div>     
    </div>
  );
};

const markdownComponents = {
  h1: ({ children }) => <Heading level={1}>{children}</Heading>,
  h2: ({ children }) => <Heading level={2}>{children}</Heading>,
  h3: ({ children }) => <Heading level={3}>{children}</Heading>,
  h4: ({ children }) => <Heading level={4}>{children}</Heading>,
  h5: ({ children }) => <Heading level={5}>{children}</Heading>,
  h6: ({ children }) => <Heading level={6}>{children}</Heading>,
  blockquote: ({ children }) => (
    <blockquote
      className="pl-4 my-4 text-sm font-medium text-tertiary"
      style={{ borderLeft: '4px solid var(--color-border-primary)' }}
    >
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <div
      className='inline-flex items-center gap-x-1 px-2 py-0.5 mx-2 border rounded-md border-primary bg-tertiary text-primary'
      style={{ padding: '0 0.3rem'}}
    >
      <code>{children}</code>
    </div>
  ),
  a: ({ children, href }) => (
    <Link 
      href={href} 
      className='transition-colors text-secondary hover:text-primary'
      target='_blank'
      rel='noopener noreferrer'
    >
      {children}
    </Link>
  ),
  img: ({ src, alt }) => {
    return (
      <img
        src={src}
        alt={alt}
        width={'100%'}
        height={'auto'}
        className="my-4 rounded-xl"
      />
    );
  },
  ul: ({ children }) => (
    <ul
      className="my-4 text-tertiary"
      style={{ paddingLeft: '12px', listStyleType: 'disc', listStylePosition: 'inside' }}
    >
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol
      className="my-4 text-tertiary"
      style={{ paddingLeft: '12px', listStyleType: 'decimal', listStylePosition: 'inside' }}
    >
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  p: ({ children }) => <p className="my-4 text-tertiary">{children}</p>,
  hr: () => <hr className="my-4" style={{ borderTop: '1px solid rgba(var(--border-primary))' }} />
};

export default markdownComponents;