'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/Chatbot';
import LoadingBar from '@/components/LoadingBar';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import GlobalLoadingOverlay from '@/components/GlobalOverlayLoading';
import { FetchProvider, useFetch } from '@/components/FetchProviders';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [showPage, setShowPage] = useState(true);
  
  // Set comprehensive SEO metadata dynamically
  useEffect(() => {
    // Page title
    document.title = 'OKDriver - Smart Dashcam & Fleet Management Platform | AI-Powered Driver Safety Solutions';
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'OKDriver provides intelligent fleet management, driver safety monitoring, and AI-powered dashcam solutions for fleet operators, cab drivers, and individual vehicle owners. Features include real-time vehicle tracking, driver drowsiness detection, SOS emergency alerts, and pothole detection for safer Indian roads. Founded by Tushit Gupta.'
      );
    }
    
    // Meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute(
      'content',
      'fleet management software, smart dashcam India, driver safety monitoring, vehicle tracking system, AI dashcam, driver drowsiness detection, SOS emergency alert, pothole detection, road safety India, fleet operators platform, cab driver safety, driver monitoring system, real-time vehicle tracking, accident prevention technology, Indian road safety, fleet tracking software, driver behavior monitoring, voice-activated assistant, OKDriver, smart transportation, Tushit Gupta, Shubham Singh'
    );
    
    // Meta author
    let metaAuthor = document.querySelector('meta[name="author"]');
    if (!metaAuthor) {
      metaAuthor = document.createElement('meta');
      metaAuthor.setAttribute('name', 'author');
      document.head.appendChild(metaAuthor);
    }
    metaAuthor.setAttribute('content', 'Tushit Gupta (CEO & Founder), Shubham Singh (CTO) - OKDriver Smart Dashcam Private Limited');
    
    // Open Graph meta tags for social sharing
    const ogTags = [
      { property: 'og:title', content: 'OKDriver - AI-Powered Fleet Management & Driver Safety Platform' },
      { property: 'og:description', content: 'Transform your fleet operations with OKDriver\'s intelligent dashcam system. Real-time tracking, driver safety monitoring, emergency alerts, and pothole detection for safer roads. Founded by Tushit Gupta.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://okdriver.in' },
      { property: 'og:image', content: 'https://okdriver.in/og-image.jpg' },
      { property: 'og:site_name', content: 'OKDriver' },
    ];
    
    ogTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', tag.property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });
    
    // Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'OKDriver - Smart Fleet Management & Driver Safety Solutions' },
      { name: 'twitter:description', content: 'AI-powered dashcam platform for fleet operators and drivers. Track vehicles, monitor safety, prevent accidents, and contribute to better Indian roads.' },
      { name: 'twitter:image', content: 'https://okdriver.in/twitter-image.jpg' },
    ];
    
    twitterTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', tag.name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });
    
    // Additional SEO meta tags
    const additionalTags = [
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'language', content: 'English' },
      { name: 'geo.region', content: 'IN' },
      { name: 'geo.placename', content: 'India' },
      { name: 'classification', content: 'Fleet Management, Driver Safety, Transportation Technology' },
    ];
    
    additionalTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', tag.name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });
    
    // Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', `https://okdriver.in${pathname}`);
    
    // Structured Data (JSON-LD) for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "OKDriver",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Android, iOS, Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1250"
      },
      "description": "OKDriver is an intelligent fleet management and driver safety platform that provides real-time vehicle tracking, AI-powered driver monitoring, emergency alerts, and pothole detection to make Indian roads safer.",
      "featureList": [
        "Real-time vehicle tracking",
        "Driver drowsiness detection",
        "SOS emergency alerts",
        "Voice-activated AI assistant",
        "Driver behavior monitoring",
        "Pothole detection and reporting",
        "Fleet operator dashboard",
        "Client access management",
        "Accident prevention technology"
      ],
      "founder": [
        {
          "@type": "Person",
          "name": "Tushit Gupta",
          "jobTitle": "Chief Executive Officer & Founder",
          "affiliation": {
            "@type": "Organization",
            "name": "OKDriver Smart Dashcam Private Limited"
          }
        }
      ],
      "creator": [
        {
          "@type": "Person",
          "name": "Tushit Gupta",
          "jobTitle": "Chief Executive Officer & Founder",
          "affiliation": {
            "@type": "Organization",
            "name": "OKDriver Smart Dashcam Private Limited"
          }
        },
        {
          "@type": "Person",
          "name": "Shubham Singh",
          "jobTitle": "Chief Technology Officer",
          "affiliation": {
            "@type": "Organization",
            "name": "OKDriver Smart Dashcam Private Limited"
          }
        }
      ],
      "provider": {
        "@type": "Organization",
        "name": "OKDriver Smart Dashcam Private Limited",
        "url": "https://okdriver.in",
        "logo": "https://okdriver.in/logo.png",
        "founder": {
          "@type": "Person",
          "name": "Tushit Gupta",
          "jobTitle": "CEO & Founder"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Customer Support",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi"]
        }
      }
    };
    
    // Organization Structured Data
    const organizationData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "OKDriver Smart Dashcam Private Limited",
      "alternateName": "OKDriver",
      "url": "https://okdriver.in",
      "logo": "https://okdriver.in/logo.png",
      "description": "Leading provider of AI-powered fleet management and driver safety solutions in India",
      "founder": {
        "@type": "Person",
        "name": "Tushit Gupta",
        "jobTitle": "CEO & Founder"
      },
      "employee": [
        {
          "@type": "Person",
          "name": "Tushit Gupta",
          "jobTitle": "Chief Executive Officer & Founder"
        },
        {
          "@type": "Person",
          "name": "Shubham Singh",
          "jobTitle": "Chief Technology Officer"
        }
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      },
      "sameAs": [
        "https://www.linkedin.com/company/okdriver",
        "https://twitter.com/okdriver",
        "https://www.facebook.com/okdriver"
      ]
    };
    
    // Update or create script tags for structured data
    let scriptTag = document.querySelector('script[type="application/ld+json"][data-schema="software"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('data-schema', 'software');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
    
    let orgScriptTag = document.querySelector('script[type="application/ld+json"][data-schema="organization"]');
    if (!orgScriptTag) {
      orgScriptTag = document.createElement('script');
      orgScriptTag.setAttribute('type', 'application/ld+json');
      orgScriptTag.setAttribute('data-schema', 'organization');
      document.head.appendChild(orgScriptTag);
    }
    orgScriptTag.textContent = JSON.stringify(organizationData);
    
  }, [pathname]);
  
  // Define routes where header and footer should be hidden
  const isCompanyDashboardRoute = pathname?.startsWith('/company');
  const isAdminDashboardRoute = pathname?.startsWith('/admin');
  const isUserDashboardRoute = pathname?.startsWith('/user');

  return (
    <html lang="en">
      <head>
        <title>OKDriver - Smart Dashcam & Fleet Management Platform | AI-Powered Driver Safety Solutions</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta 
          name="description" 
          content="OKDriver provides intelligent fleet management, driver safety monitoring, and AI-powered dashcam solutions for fleet operators, cab drivers, and individual vehicle owners. Features include real-time vehicle tracking, driver drowsiness detection, SOS emergency alerts, and pothole detection for safer Indian roads. Founded by Tushit Gupta." 
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.className} bg-white text-black flex flex-col min-h-screen`}>
        <SessionProvider>
          <FetchProvider>
            <OverlayGate />
            {showPage && (
              <>
                {!isCompanyDashboardRoute && !isAdminDashboardRoute && !isUserDashboardRoute  && <Header />}
                
                <main className="flex-grow">{children}</main>
                
                {!isCompanyDashboardRoute && !isAdminDashboardRoute && !isUserDashboardRoute  && <Footer />}
                
                <ChatBot />
              </>
            )}
          </FetchProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

function OverlayGate() {
  const { activeRequests } = useFetch();
  return <GlobalLoadingOverlay visible={activeRequests > 0} />;
}