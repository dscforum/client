'use client';

import { formatDistance } from 'date-fns';
import cn from '@/utils/cn';
import Link from 'next/link';
import { GoInfo, GoPin } from 'react-icons/go';
import Image from 'next/image';
import useCategoryStore from '@/stores/category';
import useEntriesStore from '@/stores/entries';
import { TbLoader } from 'react-icons/tb';
import Button from '@components/Button';
import fetchEntries from '@/request/fetchEntries';

export default function Page() {
  const entries = useEntriesStore(state => state.entries);
  const setEntries = useEntriesStore(state => state.setEntries);

  const loadingEntries = useEntriesStore(state => state.loading);
  const setLoadingEntries = useEntriesStore(state => state.setLoading);
  const page = useEntriesStore(state => state.page);
  const setPage = useEntriesStore(state => state.setPage);

  const categoryData = useCategoryStore(state => state.categoryData);
  if (!categoryData) return null;

  function handlePreviousPage() {
    setLoadingEntries(true);
    setPage(page - 1);

    fetchEntries(categoryData.name, page - 1)
      .then(data => setEntries(data))
      .catch(error => console.error(error))
      .finally(() => setLoadingEntries(false));
  }

  function handleNextPage() {
    setLoadingEntries(true);
    setPage(page + 1);

    fetchEntries(categoryData.name, page + 1)
      .then(data => setEntries(data))
      .catch(error => console.error(error))
      .finally(() => setLoadingEntries(false));
  }

  return (
    <div className='flex flex-col w-full px-8 mt-8 2xl:px-0 gap-y-4'>
      <div className='border-2 border-primary relative w-full rounded-3xl h-[150px] sm:h-[250px] bg-tertiary'>
        <Image
          src={categoryData.image}
          alt={`Category banner for ${categoryData.name}`}
          className='object-cover w-full h-full rounded-3xl'
        />

        <div className='w-full flex p-8 flex-col gap-y-2 justify-end h-full rounded-[1.47rem] absolute top-0 left-0 bg-gradient-to-t from-black/90 via-black/45'>
          <h2 className='flex items-center text-xl font-bold sm:text-3xl text-primary gap-x-4'>
            <categoryData.icon />
            {categoryData.label}
          </h2>

          <p className='text-sm text-secondary'>
            {categoryData.description}
          </p>
        </div>
      </div>
      
      <div className='flex flex-col w-full mt-8 mb-8 gap-y-2'>
        <div className='flex items-center justify-between mb-4'>
          <Button
            style='ghost'
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous Page
          </Button>

          <Button
            style='ghost'
            onClick={handleNextPage}
            disabled={entries.length === 0}
          >
            Next Page
          </Button>
        </div>
        
        {!loadingEntries && entries
          ?.map?.(entry => (
            <Link
              className={cn(
                'relative px-4 group py-6 flex items-center rounded-xl border-2 cursor-pointer border-[var(--color-background-tertiary)] hover:bg-quaternary bg-tertiary w-full gap-x-4',
                entry.flags.isPinned ? 'bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/15' : 'hover:border-[var(--color-background-quaternary)]'
              )}
              key={`entry-${entry._id}`}
              href={`/entry/${entry._id}`}
            >
              {entry.flags.isPinned && (
                <div className='absolute flex right-4 top-4 items-center gap-x-1.5 text-sm font-semibold text-orange-500'>
                  <GoPin strokeWidth={1.5} />
                  Pinned
                </div>
              )}
              <Image
                src={entry.publisherMetadata.avatar}
                alt={`Avatar of ${entry.publisherMetadata.username}`}
                className='rounded-full'
                width={32}
                height={32}
              />

              <div className='flex flex-col gap-y-1'>
                <h3 className='font-bold text-primary'>{entry.title}</h3>
                <div className='flex items-center text-sm text-secondary gap-x-2'>
                  <span>
                    {entry.publisherMetadata.username}
                  </span>
                      
                  <div className='bg-[var(--color-text-tertiary)] w-[5px] h-[5px] rounded-full' />

                  <span className='text-tertiary'>
                    {formatDistance(entry.publishedAt, new Date(), { addSuffix: true })}
                  </span>

                  {entry.reply_count > 0 && (
                    <>
                      <div className='bg-[var(--color-text-tertiary)] w-[5px] h-[5px] rounded-full' />

                      <span className='flex items-center text-tertiary gap-x-1'>
                        {entry.reply_count} replie{entry.reply_count > 1 ? 's' : ''}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}

        {(!loadingEntries && entries.length === 0) && (
          <div className='flex flex-col items-center gap-y-2'>
            <div className='flex items-center text-lg font-semibold gap-x-2'>
              <GoInfo />
              Hmm, nothing here yet.
            </div>
            
            <p className='text-center text-secondary'>
              Seems like there are no entries.
              <br />
              Be the first to <Link href={`/create-entry/${categoryData.name}`} className='text-primary hover:underline'>create one</Link>!
            </p>
          </div>
        )}

        {loadingEntries && (
          <div className='flex flex-col items-center gap-y-2'>
            <div className='flex items-center text-lg font-semibold gap-x-2'>
              <TbLoader className='animate-spin' />
              Wait a moment..
            </div>
          
            <p className='text-center text-secondary'>
              We are fetching the latest entries for you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}