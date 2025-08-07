import React from 'react';
import { ChevronRight, Award, Users, Target, Lightbulb } from 'lucide-react';
import ceo from '@/assets/about_image/ceo.png';
import Image from 'next/image';
const FounderProfile = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-black text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm mb-8 opacity-80">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Home</span>
            <ChevronRight size={16} />
            <span className="text-gray-300">CEO & Founder</span>
          </div>
          
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              CEO & FOUNDER
            </h1>
            <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white  shadow-2xl border border-gray-200 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative">
              <div className="aspect-square lg:aspect-[4/5] bg-gray-100 flex items-center justify-center">
                {/* Placeholder for CEO image */}
                
                <div className="w-full h-full bg-gray-50 flex items-center justify-center relative overflow-hidden">
                 
                  {/* Professional photo would go here */}
                   <Image src={ceo} alt="CEO Image" className="object-cover w-full h-full " />
                  <div className="absolute bottom-4 left-4 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-black shadow-lg">
                    CEO & Founder
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <p className="text-black font-semibold text-lg mb-2 opacity-80">CEO & Founder, OKDriver Technologies</p>
                <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
                  TUSHIT GUPTA
                </h2>
              </div>

              {/* Bio Content */}
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  He is the CEO & Founder of OKDriver Technologies. Before founding this innovative company, 
                  he gained extensive experience working with leading organizations including 
                  <span className="font-semibold text-black"> TCS (Tata Consultancy Services)</span> and 
                  <span className="font-semibold text-black"> Tikona Digital Networks</span>, bringing over 
                  <span className="font-semibold"> 5+ years of industry expertise</span> in technology and business operations.
                </p>

                <div className="bg-black text-white p-6 rounded-lg">
                  <p className="italic font-medium">
                    "Revolutionizing road safety through cutting-edge technology isn't just our mission—it's our 
                    commitment to creating safer roads for everyone. Together, we're building a future where 
                    technology and responsibility drive hand in hand."
                  </p>
                </div>

                <p>
                  Tushit Gupta is the visionary CEO and Founder of OKDriver Technologies. He holds a 
                  <span className="font-semibold"> Bachelor's degree in Electronics & Communication Engineering (B.Tech ECE)</span> from 
                  <span className="font-semibold text-black"> Galgotias University</span>. His diverse educational background 
                  in engineering combined with his practical industry experience has positioned him as a leader 
                  in the intersection of technology and transportation safety.
                </p>

                <p>
                  With his extensive experience at multinational corporations and his deep understanding of 
                  technology systems, Tushit has successfully led OKDriver Technologies to become a pioneering 
                  force in the road safety and driver training industry. His leadership continues to drive 
                  innovation and excellence in developing solutions that make roads safer for everyone.
                </p>
              </div>

              {/* Achievement Stats */}
              <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-black mb-2">5+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-black mb-2">B.Tech</div>
                  <div className="text-sm text-gray-600">ECE Graduate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                <Target className="text-black" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-black">Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To create a world where road safety is powered by intelligent technology, 
              ensuring every journey is safe, secure, and efficient for drivers everywhere.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mr-4">
                <Lightbulb className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-black">Innovation</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Leveraging cutting-edge technology and industry expertise to revolutionize 
              driver training, vehicle inspection, and road safety monitoring systems.
            </p>
          </div>
        </div>

        {/* Leadership Qualities */}
        <div className="bg-black rounded-3xl text-white p-8 lg:p-12 mt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Leadership Excellence</h3>
            <div className="w-16 h-1 bg-white mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={28} className="text-black" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Technical Expertise</h4>
              <p className="text-gray-300">
                Deep technical knowledge in ECE and extensive experience in technology implementations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={28} className="text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Industry Experience</h4>
              <p className="text-gray-300">
                5+ years of valuable experience with leading companies like TCS and Tikona.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={28} className="text-black" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Visionary Leadership</h4>
              <p className="text-gray-300">
                Leading OKDriver Technologies towards innovative solutions in road safety.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderProfile;