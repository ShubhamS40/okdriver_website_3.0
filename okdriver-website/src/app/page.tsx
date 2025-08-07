import OkDriverHero from '@/components/Hero';
import WhyOkDriver from '@/components/Whyokdriver';
import FeaturesComponent from '@/components/Feature';
import Hardware from '@/components/Hardware';
import Stats from '@/components/Stats';
import UseCases from '@/components/UseCases';
import WhoIsItFor from '@/components/WhoIsItFor';
import HowItWorks from '@/components/HowItWorks';
import OurVision from '@/components/OurVision';
import Image from 'next/image';
import Link from 'next/link';


export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <OkDriverHero/>
      
      {/* Main Content Sections with proper spacing */}
      <div className="space-y-16 md:space-y-24 lg:space-y-0">
        <WhyOkDriver/>
        <Stats/>
        <FeaturesComponent/>
        {/* <OurVision/> */}
        {/* <HowItWorks/> */}
        <WhoIsItFor/>
        {/* <UseCases/> */}
        <Hardware/>
      </div>
    </main>
  );
}