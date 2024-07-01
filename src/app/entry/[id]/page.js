import getEntry from '@/request/getEntry';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import SubmitReply from '@/app/entry/[id]/SubmitReply';
import Reply from '@/app/entry/[id]/Reply';
import { DeleteEntryButton } from '@/app/entry/[id]/DeleteButton';

export default async function Page({ params }) {
  const entry = await getEntry(params.id).catch(() => null);
  if (!entry) redirect('/');
    
  return (
    <div className='flex flex-col w-full mt-12 gap-y-4'>
      <h2 className='flex items-center text-2xl font-bold gap-x-4'>
        {entry.title}

        <DeleteEntryButton entry={entry} />
      </h2>

      <div className='flex gap-x-2'>
        <Image
          src={entry.publisherMetadata.avatar}
          alt={`Avatar for ${entry.publisherMetadata.username}`}
          width={40}
          height={40}
          className='rounded-full'
        />

        <div className='flex flex-col gap-y-1'>
          <span className='text-sm font-semibold text-secondary'>
            {entry.publisherMetadata.username}
          </span>
          <span className='text-xs text-tertiary'>
            {formatDistanceToNow(new Date(entry.publishedAt), { addSuffix: true })}
          </span>
        </div>
      </div>

      <div className='mt-4 text-sm font-medium'>
        {entry.content}
      </div>

      <div className='w-full h-[1px] my-8 bg-quinary' />

      <div className='flex flex-col gap-y-4'>
        <h3 className='text-base font-semibold text-primary'>
          Replies <span className='ml-2 text-xs text-tertiary'>{entry.replyCount}</span>
        </h3>

        <SubmitReply
          entryId={entry._id}
          replies={entry.replies}
        />

        {entry.replies.map(reply => (
          <Reply
            key={reply._id}
            entry={entry}
            reply={reply}
          />
        ))}
      </div>
    </div>
  );
}