'use client';

import MarkdownComponents from '@/app/components/Markdown/components';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

export default function Markdown({ children, className }) {
  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      components={MarkdownComponents}
      className={className}
    >
      {children}
    </ReactMarkdown>
  );
}