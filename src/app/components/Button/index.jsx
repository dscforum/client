'use client';

import cn from '@/utils/cn';
import { TbLoader } from 'react-icons/tb';

export default function Button({ children, style, className, loading, ...props }) {
  return (
    <button
      className={cn(
        'font-semibold flex items-center justify-center gap-x-2 truncate select-none text-sm px-3.5 py-1.5 rounded-xl text-white',
        style === 'primary' && 'bg-orange-500 hover:bg-orange-600',
        style === 'ghost' && 'text-secondary hover:text-primary hover:bg-quinary',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading && <TbLoader className='animate-spin' />}
      {children}
    </button>
  );
}