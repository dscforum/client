'use client';

import Logo from '@/public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@components/Button';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { Suspense } from 'react';
import useCategoryStore from '@/stores/category';

export default function Header() {
  const userData = useUser();
  const currentCategory = useCategoryStore(state => state.currentCategory);

  return (
    <div className="h-[80px] border-b border-b-primary justify-between lg:rounded-t-[2.5rem] w-full bg-tertiary flex items-center px-6">
      <Link
        className='flex items-center gap-x-4 hover:opacity-70'
        href="/"
      >
        <Image
          src={Logo}
          alt="dscforum.com Logo"
          width={32}
          height={32}
        />

        <h1 className="text-xl font-semibold text-primary">
          dscforum.com
        </h1>
      </Link>

      <div className='flex items-center gap-x-4'>
        <Suspense fallback={null}>
          {userData.isSignedIn ? (
            <>
              <UserButton showName={true} />
              
              <Button
                style='primary'
                disabled={currentCategory === 'announcements' && userData.user.publicMetadata.role !== 'admin'}
              >
                <div>
                  <Link href={`/create-entry/${currentCategory}`}>
                    Create Entry
                  </Link>
                </div>
              </Button>
            </>
          ) : (
            <>
              <SignInButton mode='modal'> 
                <Button style='ghost'>
                  Login
                </Button>
              </SignInButton>

              <SignUpButton mode='modal'>
                <Button style='primary'>
                  Sign up
                </Button>
              </SignUpButton>
            </>
          )}
        </Suspense>
      </div>
    </div>
  );
}