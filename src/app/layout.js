import { GeistSans } from 'geist/font/sans';
import './globals.css';
import Header from '@components/Header';
import Categories from '@/app/Categories';
import RightSidebar from '@/app/RightSidebar';
import Footer from '@components/Footer';
import { ClerkProvider } from '@clerk/nextjs';
import { Suspense } from 'react';

export const metadata = {
  title: 'dscforum.com'
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorText: '#B3B3B3',
          colorNeutral: '#FFFFFF',
          colorTextSecondary: '#7A7A7A',
          colorBackground: '#1E1E1E',
          colorPrimary: '#FFFFFF',
          colorInputBackground: '#424242',
          colorInputText: '#B3B3B3',
          colorTextOnPrimaryBackground: 'black'
        },
        layout: {
          shimmer: false
        }
      }}
    >
      <html lang="en">
        <body className={GeistSans.className}>
          <div className="w-full h-full 2xl:px-6 2xl:pt-6 bg-primary">
            <div className="w-full min-h-[100dvh] bg-secondary 2xl:rounded-[2.5rem]">
              <Header />

              <div className='flex flex-col w-full h-full 2xl:flex-row gap-x-12'>
                <Suspense fallback={<></>}>
                  <Categories />
                </Suspense>

                <div className='flex flex-1 w-full h-full gap-y-4 gap-x-8'>                  
                  {children}
                </div>

                <RightSidebar />
              </div>
            </div>
          </div>

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
