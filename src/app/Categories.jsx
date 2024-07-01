'use client';

import categories from '@/categories';
import useCategoryStore from '@/stores/category';
import cn from '@/utils/cn';
import { useEffect } from 'react';
import fetchEntries from '@/request/fetchEntries';
import useEntriesStore from '@/stores/entries';
import { usePathname, useRouter } from 'next/navigation';

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

  return (
    <div className='sticky top-2 flex flex-col gap-y-1 ml-8 mt-8 max-w-[300px] h-full w-full'>
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