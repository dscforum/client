'use client';

import categories from '@/categories';
import useCategoryStore from '@/stores/category';
import cn from '@/utils/cn';
import { useEffect } from 'react';
import fetchEntries from '@/request/fetchEntries';
import useEntriesStore from '@/stores/entries';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Button from '@components/Button';
import Link from 'next/link';

export default function Categories() {
  const pathname = usePathname();

  const currentCategory = useCategoryStore(state => state.currentCategory);
  const setCurrentCategory = useCategoryStore(state => state.setCurrentCategory);
  const page = useEntriesStore(state => state.page);
  
  const setEntries = useEntriesStore(state => state.setEntries);
  const loadingEntries = useEntriesStore(state => state.loading);
  const setLoadingEntries = useEntriesStore(state => state.setLoading);

  useEffect(() => {
    setLoadingEntries(true);

    fetchEntries(currentCategory, page)
      .then(data => setEntries(data))
      .catch(error => console.error(error))
      .finally(() => setLoadingEntries(false));
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory]);

  const router = useRouter();
  const userData = useUser();

  return (
    <div className='2xl:sticky top-2 flex flex-col gap-y-1 px-8 2xl:px-0 2xl:ml-8 mt-8 2xl:max-w-[300px] h-full w-full'>
      {userData.isSignedIn && (
        <Button
          style='primary'
          className='block py-3 mb-4 sm:hidden'
          disabled={currentCategory === 'announcements' && userData.user.publicMetadata.role !== 'admin'}
        >
          <div>
            <Link href={`/create-entry/${currentCategory}`}>
            Create Entry
            </Link>
          </div>
        </Button>
      )}

      {categories.map(category => (
        <div
          className={cn(
            'flex cursor-pointer select-none font-medium gap-x-4 items-center rounded-xl h-[50px] w-full',
            (pathname === '/' && currentCategory === category.name) ? 'pointer-events-none bg-quaternary text-primary' : 'hover:bg-tertiary hover:text-primary text-secondary',
            loadingEntries && 'opacity-50 pointer-events-none'
          )}
          key={`category-${category.name}`}
          onClick={() => {
            setCurrentCategory(category.name);
            if (pathname !== '/') {
              router.push('/');
            }
          }}
        >
          <category.icon className='ml-4' size={20} />
          #{category.name}
        </div>
      ))}
    </div>
  );
}