import getEntry from '@/request/getEntry';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import SubmitReply from '@/app/entry/[id]/SubmitReply';
import Reply from '@/app/entry/[id]/Reply';
import { DeleteEntryButton } from '@/app/entry/[id]/DeleteButton';
import { UnPinButton, PinButton } from '@/app/entry/[id]/PinButton';

export default async function Page({ params }) {
  const entry = await getEntry(params.id).catch(() => null);
  if (!entry) redirect('/');
    
  return (
    <div className='flex flex-col w-full px-8 mt-12 2xl:px-0 gap-y-4'>
      <h2 className='flex items-center text-2xl font-bold gap-x-4'>
        {entry.title}

        <DeleteEntryButton entry={entry} />
        {entry.flags.isPinned === true ? <UnPinButton entry={entry} /> : <PinButton entry={entry} />}
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
          <span className='flex items-center text-sm font-semibold text-secondary gap-x-4'>
            {entry.publisherMetadata.username}

            {entry.publisherMetadata.isAdmin === true && (
              <span className='font-semibold px-2.5 py-0.5 text-sm rounded-full bg-red-500/10 border-2 text-red-500 border-red-500/50'>
                Admin
              </span>
            )}
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