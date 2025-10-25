'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, Users, TrendingUp, Heart, Star, ArrowRight, Filter, Search } from 'lucide-react';
import Link from 'next/link';

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const departments = [
    { id: 'all', label: 'All Departments' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'product', label: 'Product' },
    { id: 'design', label: 'Design' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'sales', label: 'Sales' },
    { id: 'operations', label: 'Operations' }
  ];

  const locations = [
    { id: 'all', label: 'All Locations' },
    { id: 'remote', label: 'Remote' },
    { id: 'new-york', label: 'New York' },
    { id: 'san-francisco', label: 'San Francisco' },
    { id: 'london', label: 'London' },
    { id: 'singapore', label: 'Singapore' }
  ];

  const jobOpenings = [
    {
      id: 'senior-frontend-engineer',
      title: 'Senior Frontend Engineer',
      department: 'engineering',
      location: 'remote',
      type: 'Full-time',
      experience: '5+ years',
      salary: '$120k - $160k',
      description: 'We are looking for a Senior Frontend Engineer to join our team and help build the next generation of driver management tools.',
      requirements: [
        '5+ years of experience with React, Vue, or Angular',
        'Strong TypeScript/JavaScript skills',
        'Experience with modern build tools and CI/CD',
        'Knowledge of responsive design principles',
        'Experience with testing frameworks'
      ],
      benefits: ['Health insurance', '401k matching', 'Flexible PTO', 'Remote work'],
      postedDate: '2024-01-15',
      applicants: 45
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      department: 'product',
      location: 'san-francisco',
      type: 'Full-time',
      experience: '3+ years',
      salary: '$130k - $170k',
      description: 'Join our product team to drive the vision and strategy for OKDriver\'s core platform features.',
      requirements: [
        '3+ years of product management experience',
        'Experience with B2B SaaS products',
        'Strong analytical and problem-solving skills',
        'Experience with agile development methodologies',
        'Excellent communication and leadership skills'
      ],
      benefits: ['Health insurance', '401k matching', 'Stock options', 'Learning budget'],
      postedDate: '2024-01-12',
      applicants: 32
    },
    {
      id: 'ux-designer',
      title: 'UX Designer',
      department: 'design',
      location: 'new-york',
      type: 'Full-time',
      experience: '4+ years',
      salary: '$100k - $140k',
      description: 'Design intuitive and beautiful user experiences for our driver management platform.',
      requirements: [
        '4+ years of UX design experience',
        'Proficiency in Figma, Sketch, or Adobe XD',
        'Experience with user research and testing',
        'Strong portfolio demonstrating design thinking',
        'Experience with mobile and web design'
      ],
      benefits: ['Health insurance', '401k matching', 'Design tools budget', 'Conference attendance'],
      postedDate: '2024-01-10',
      applicants: 28
    },
    {
      id: 'backend-engineer',
      title: 'Backend Engineer',
      department: 'engineering',
      location: 'london',
      type: 'Full-time',
      experience: '4+ years',
      salary: '£80k - £110k',
      description: 'Build scalable backend services and APIs that power our driver management platform.',
      requirements: [
        '4+ years of backend development experience',
        'Proficiency in Node.js, Python, or Go',
        'Experience with databases (PostgreSQL, MongoDB)',
        'Knowledge of microservices architecture',
        'Experience with cloud platforms (AWS, GCP)'
      ],
      benefits: ['Health insurance', 'Pension scheme', 'Flexible working', 'Learning budget'],
      postedDate: '2024-01-08',
      applicants: 38
    },
    {
      id: 'marketing-manager',
      title: 'Marketing Manager',
      department: 'marketing',
      location: 'remote',
      type: 'Full-time',
      experience: '3+ years',
      salary: '$90k - $120k',
      description: 'Lead our marketing efforts to grow OKDriver\'s presence in the logistics industry.',
      requirements: [
        '3+ years of B2B marketing experience',
        'Experience with digital marketing channels',
        'Knowledge of marketing automation tools',
        'Strong analytical and creative skills',
        'Experience in the logistics/transportation industry'
      ],
      benefits: ['Health insurance', '401k matching', 'Marketing budget', 'Remote work'],
      postedDate: '2024-01-05',
      applicants: 22
    },
    {
      id: 'sales-engineer',
      title: 'Sales Engineer',
      department: 'sales',
      location: 'singapore',
      type: 'Full-time',
      experience: '2+ years',
      salary: 'S$80k - S$120k',
      description: 'Help potential customers understand how OKDriver can solve their driver management challenges.',
      requirements: [
        '2+ years of sales engineering experience',
        'Technical background in software or logistics',
        'Excellent presentation and communication skills',
        'Experience with CRM systems',
        'Ability to travel for customer meetings'
      ],
      benefits: ['Health insurance', 'Commission structure', 'Travel allowance', 'Learning budget'],
      postedDate: '2024-01-03',
      applicants: 18
    }
  ];

  const companyStats = [
    { label: 'Team Members', value: '150+', icon: Users },
    { label: 'Countries', value: '12', icon: MapPin },
    { label: 'Years Founded', value: '5', icon: TrendingUp },
    { label: 'Employee Satisfaction', value: '4.8/5', icon: Star }
  ];

  const cultureValues = [
    {
      title: 'Innovation First',
      description: 'We encourage creative thinking and embrace new technologies to solve complex problems.',
      icon: '💡'
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and cross-functional collaboration.',
      icon: '🤝'
    },
    {
      title: 'Growth Mindset',
      description: 'We invest in our people\'s development and provide opportunities for continuous learning.',
      icon: '📈'
    },
    {
      title: 'Work-Life Balance',
      description: 'We support flexible working arrangements and prioritize employee well-being.',
      icon: '⚖️'
    }
  ];

  const filteredJobs = jobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
    return matchesSearch && matchesDepartment && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Join Our <span className="text-yellow-300">Team</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Build the future of driver management with us. We're looking for passionate individuals to join our mission.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                <Briefcase className="w-5 h-5 inline mr-2" />
                View Open Positions
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                <Heart className="w-5 h-5 inline mr-2" />
                Learn About Culture
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Work at OKDriver?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're building the future of driver management technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Culture & Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cultureValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-white hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600">
              Find your next opportunity with us
            </p>
          </motion.div>

          {/* Filters */}
          <div className="mb-8 bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Department Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                        {job.type}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.experience}
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {job.salary}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                        <span key={benefitIndex} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          {benefit}
                        </span>
                      ))}
                      {job.benefits.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{job.benefits.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                      <span>Posted {job.postedDate}</span>
                      <span className="mx-2">•</span>
                      <span>{job.applicants} applicants</span>
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <Link href={`/careers/apply/${job.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
                      >
                        Apply Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Don't See Your Role?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                <Briefcase className="w-5 h-5 inline mr-2" />
                Submit Resume
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                <Heart className="w-5 h-5 inline mr-2" />
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
