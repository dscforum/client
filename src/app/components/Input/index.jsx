'use client';

import cn from '@/utils/cn';

export default function Input({ style, disabled, className, ...props }) {
  return (
    <>
      {style === 'short' && (
        <input
          className={cn(
            'bg-tertiary placeholder-tertiary outline-none focus-visible:text-secondary focus-visible:caret-secondary focus-visible:bg-quaternary focus-visible:border-orange-500 rounded-lg p-2 font-medium text-sm caret-tertiary text-tertiary border-2 border-primary',
            disabled && 'pointer-events-none opacity-50',
            className
          )}
          {...props}
        />
      )}

      {style === 'paragraph' && (
        <textarea
          className={cn(
            'bg-tertiary w-full h-[150px] resize-none placeholder-tertiary outline-none focus-visible:text-secondary focus-visible:caret-secondary focus-visible:bg-quaternary focus-visible:border-orange-500 rounded-lg p-2 font-medium text-sm caret-tertiary text-tertiary border-2 border-primary',
            disabled && 'pointer-events-none opacity-50',
            className
          )}
          {...props}
        />
      )}
    </>
  );
}