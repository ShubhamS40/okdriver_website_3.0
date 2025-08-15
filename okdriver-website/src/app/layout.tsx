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
    document.title = 'OKDriver Smart Dashcam Private Limited';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'OKDriver Smart Dashcam Private Limited is a platform that provides full software solutions for fleet management and driver safety.'
      );
    }
  }, []);
  
  // Define routes where header and footer should be hidden
  const isCompanyDashboardRoute = pathname?.startsWith('/company');
  const isAdminDashboardRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en">
      <head>
        <title>OKDriver Smart Dashcam Private Limited</title>
        <meta
          name="description"
          content="OKDriver Smart Dashcam Private Limited is a platform for managing drivers, subscriptions, and support tickets."
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-white text-black flex flex-col min-h-screen`}>
        {!isCompanyDashboardRoute && !isAdminDashboardRoute && <Header />}
        
        <main className="flex-grow">{children}</main>
        
        {!isCompanyDashboardRoute && !isAdminDashboardRoute && <Footer />}
        
        <ChatBot />
      </body>
    </html>
  );
}
