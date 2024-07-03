'use client';

import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { DeleteReplyButton } from '@/app/entry/[id]/DeleteButton';
import Markdown from '@/app/components/Markdown';

export default function Reply({ entry, reply }) {
  return (
    <div className="flex flex-col w-full gap-y-4">
      <div className='flex gap-x-2'>
        <Image
          src={reply.publisherMetadata.avatar}
          alt={`Avatar for ${reply.publisherMetadata.username}`}
          width={40}
          height={40}
          className='rounded-full w-[40px] h-[40px]'
        />

        <div className='flex flex-col gap-y-1'>
          <span className='flex items-center text-sm font-semibold text-secondary gap-x-4'>
            {reply.publisherMetadata.username}

            {reply.publisherMetadata.isAdmin === true && (
              <span className='font-semibold px-2.5 py-0.5 text-xs rounded-full bg-orange-500/10 border-2 text-orange-500 border-orange-500/50'>
                Staff
              </span>
            )}

            <DeleteReplyButton entry={entry} reply={reply} />
          </span>
          <span className='text-xs text-tertiary'>
            {formatDistanceToNow(new Date(reply.publishedAt), { addSuffix: true })}
          </span>
        </div>
      </div>
      
      <div className='flex flex-col text-secondary'>
        <Markdown>
          {reply.content}
        </Markdown>
      </div>

      <div className='w-full h-[1px] my-8 bg-quinary' />
    </div>
  );
}