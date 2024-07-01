'use client';

import Button from '@/app/components/Button';
import Input from '@components/Input';
import { useState } from 'react';
import createEntry from '@/request/createEntry';
import { useRouter } from 'next/navigation';

export default function Page({ params }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function continueCreateEntry() {
    setLoading(true);

    createEntry({ category: params.category, title, content })
      .then(data => {
        router.push(`/entry/${data._id}`);
        
        setTitle('');
        setContent('');
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  return (
    <div className="mt-8">
      <h3 className="text-3xl font-bold">Create Entry</h3>
      <p className="mt-2 text-secondary">
        This is the page for creating an entry in the <strong>{params.category}</strong> category.
      </p>

      <div className="flex flex-col mt-12 gap-y-8 max-w-[500px]">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="title" className="font-semibold text-primary">Title</label>
          <Input 
            placeholder='Whats on your mind?'
            value={title}
            onChange={event => setTitle(event.target.value)}
            id="title"
            style='short'
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="title" className="font-semibold text-primary">Content</label>
          <Input 
            placeholder='Write your thoughts here...'
            value={content}
            onChange={event => setContent(event.target.value)}
            id="content"
            style='paragraph'
          />
        </div>

        <Button
          style='primary'
          onClick={continueCreateEntry}
          loading={loading}
        >
          Create {title ? `"${title}"` : 'Entry'}
        </Button>
      </div>
    </div>
  );
}