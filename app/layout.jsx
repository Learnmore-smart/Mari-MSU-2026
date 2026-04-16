'use client'

import './theme.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className={`flex-1 ${!isAdmin ? 'pb-16' : ''}`}>{children}</main>
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}
