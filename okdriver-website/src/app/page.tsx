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
import TailoredSolution from '@/components/TailoredSolution';
import Product from '@/components/Product';
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <OkDriverHero/>
      
      {/* Main Content Sections with proper spacing */}
      <div className=" md:space-y-24 lg:space-y-0">
        <FeaturesComponent/>
        <WhyOkDriver/>
        <Stats/>
        <Product/>
        <TailoredSolution/>
        <Testimonials/>
        {/* <Product></Product> */}
        {/* <OurVision/> */}
        {/* <HowItWorks/> */}
        <WhoIsItFor/>
        {/* <UseCases/> */}
        {/* <Hardware/> */}
      </div>
    </main>
  );
}