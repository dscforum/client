'use client';

import Button from '@components/Button';
import Link from 'next/link';
import { SignUpButton, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import getTopEntries from '@/request/getTopEntries';
import { TbLoader } from 'react-icons/tb';
import Image from 'next/image';

export default function RightSidebar() {
  const userData = useUser();

  const [topEntries, setTopEntries] = useState([]);
  const [entriesLoading, setEntriesLoading] = useState(true);

  useEffect(() => {
    setEntriesLoading(true);

    getTopEntries()
      .then(entries => setTopEntries(entries))
      .catch(error => console.error(error))
      .finally(() => setEntriesLoading(false));
  }, []);

  return (
    <div className='flex flex-col gap-y-8 px-8 2xl:px-0 2xl:mr-8 mt-8 mb-8 2xl:mb-0 2xl:max-w-[300px] h-full w-full'>
      {!userData.isSignedIn && (
        <div className='flex flex-col w-full p-5 border gap-y-2 border-primary h-max rounded-3xl bg-tertiary'>
          <h3 className='text-lg font-bold text-primary'>
            Welcome!
          </h3>

          <p className='text-sm text-secondary'>
            Welcome to the dscforum.com! This is a community forum for everything related to Discord.
          </p>

          <div className='flex w-full mt-2 gap-x-2'>
            <SignUpButton>
              <Button
                className='w-full text-xs'
                style='primary'
              >
              Join Community
              </Button>
            </SignUpButton>
          </div>
        </div>
      )}

      <div className='flex flex-col w-full p-5 border gap-y-2 border-primary h-max rounded-3xl bg-tertiary'>
        <h3 className='text-lg font-bold text-primary'>
          Community Rules
        </h3>

        <div className='prose prose-ol:text-secondary prose-li:marker:text-tertiary prose-li:font-medium prose-ol:text-sm'>
          <ol>
            <li>Stay on topic and respect others{'\''} opinions.</li>
            <li>No spamming or advertising without prior approval.</li>
            <li>Positive vibes only! No hate speech or harassment.</li>
          </ol>
        </div>
      </div>

      <div className='flex flex-col w-full p-5 border gap-y-2 border-primary h-max rounded-3xl bg-tertiary'>
        <h3 className='text-lg font-bold text-primary'>
          Popular Entries
        </h3>

        <div className='flex flex-col gap-y-1'>
          {entriesLoading ? (
            <p className='flex items-center text-sm text-secondary gap-x-2'>
              <TbLoader className='animate-spine' />
              Loading popular entries..
            </p>
          ) : (
            topEntries.length > 0 ? (
              topEntries
                .sort((a, b) => b.reply_count - a.reply_count)
                .slice(0, 5)
                .map(entry => (
                  <Link
                    className='flex items-center px-4 py-2 rounded-lg group hover:bg-quaternary gap-x-2'
                    key={`popular-entry-${entry._id}`}
                    href={`/entry/${entry._id}`}
                  >
                    <Image
                      src={entry.publisherMetadata.avatar}
                      alt={`Avatar for ${entry.publisherMetadata.username}`}
                      width={32}
                      height={32}
                      className='rounded-full'
                    />
                    
                    <span className='text-sm truncate text-secondary'>
                      {entry.title}
                    </span>
                  </Link>
                ))
            ) : (
              <p className='text-sm text-secondary'>
                No entries found.
              </p>
            ))
          }
        </div>
      </div>
    </div>
  );
}