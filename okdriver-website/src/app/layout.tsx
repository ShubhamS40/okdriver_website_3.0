'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/Chatbot';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Set metadata dynamically
  useEffect(() => {
    document.title = 'OKDriver - Driver Management Platform';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'OKDriver is a platform for managing drivers, subscriptions, and support tickets.');
    }
  }, []);
  
  // Define routes where header and footer should be hidden
  const isDashboardRoute = pathname?.startsWith('/company/dashboard');
  
  return (
    <html lang="en">
      <head>
        <title>OKDriver - Driver Management Platform</title>
        <meta name="description" content="OKDriver is a platform for managing drivers, subscriptions, and support tickets." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-white text-black flex flex-col min-h-screen`}>
        {!isDashboardRoute && <Header />}
        <main className="flex-grow">{children}</main>
        {!isDashboardRoute && <Footer />}
        <ChatBot />
      </body>
    </html>
  );
}