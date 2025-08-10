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
        {/* <Product></Product> */}
        {/* <OurVision/> */}
        {/* <HowItWorks/> */}
        <WhoIsItFor/>
        <Testimonials/>
           {/* CTA Section */}
        <div className="text-center bg-black ">
          <div className="relative inline-block">
            <div className=" p-8 rounded-3xl shadow-2xl shadow-blue-500/20 border border-blue-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-500 to-black  rounded-3xl blur-xl opacity-20 animate-pulse"></div>
              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  If you're on Indian roads — okDriver is for you.
                </h2>
                <div className="w-20 h-1 bg-white/40 mx-auto rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
       
        {/* <UseCases/> */}
        {/* <Hardware/> */}
      </div>
    </main>
  );
}