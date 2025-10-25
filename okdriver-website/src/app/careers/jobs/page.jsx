'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, TrendingUp, Filter, Search, ArrowRight, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

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

  const jobTypes = [
    { id: 'all', label: 'All Types' },
    { id: 'full-time', label: 'Full-time' },
    { id: 'part-time', label: 'Part-time' },
    { id: 'contract', label: 'Contract' },
    { id: 'internship', label: 'Internship' }
  ];

  const jobOpenings = [
    {
      id: 'senior-frontend-engineer',
      title: 'Senior Frontend Engineer',
      department: 'engineering',
      location: 'remote',
      type: 'full-time',
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
      applicants: 45,
      urgent: false
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      department: 'product',
      location: 'san-francisco',
      type: 'full-time',
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
      applicants: 32,
      urgent: true
    },
    {
      id: 'ux-designer',
      title: 'UX Designer',
      department: 'design',
      location: 'new-york',
      type: 'full-time',
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
      applicants: 28,
      urgent: false
    },
    {
      id: 'backend-engineer',
      title: 'Backend Engineer',
      department: 'engineering',
      location: 'london',
      type: 'full-time',
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
      applicants: 38,
      urgent: false
    },
    {
      id: 'marketing-manager',
      title: 'Marketing Manager',
      department: 'marketing',
      location: 'remote',
      type: 'full-time',
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
      applicants: 22,
      urgent: false
    },
    {
      id: 'sales-engineer',
      title: 'Sales Engineer',
      department: 'sales',
      location: 'singapore',
      type: 'full-time',
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
      applicants: 18,
      urgent: true
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      department: 'engineering',
      location: 'remote',
      type: 'full-time',
      experience: '3+ years',
      salary: '$110k - $150k',
      description: 'Analyze driver behavior and optimize routes using machine learning and data science techniques.',
      requirements: [
        '3+ years of data science experience',
        'Proficiency in Python, R, or SQL',
        'Experience with machine learning frameworks',
        'Knowledge of statistical analysis',
        'Experience with big data tools'
      ],
      benefits: ['Health insurance', '401k matching', 'Research budget', 'Conference attendance'],
      postedDate: '2024-01-01',
      applicants: 25,
      urgent: false
    },
    {
      id: 'devops-engineer',
      title: 'DevOps Engineer',
      department: 'engineering',
      location: 'san-francisco',
      type: 'full-time',
      experience: '4+ years',
      salary: '$130k - $170k',
      description: 'Build and maintain our cloud infrastructure to ensure high availability and scalability.',
      requirements: [
        '4+ years of DevOps experience',
        'Experience with AWS, GCP, or Azure',
        'Knowledge of containerization (Docker, Kubernetes)',
        'Experience with CI/CD pipelines',
        'Knowledge of infrastructure as code'
      ],
      benefits: ['Health insurance', '401k matching', 'Stock options', 'Learning budget'],
      postedDate: '2023-12-28',
      applicants: 35,
      urgent: false
    }
  ];

  const filteredJobs = jobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
    const matchesType = selectedType === 'all' || job.type === selectedType;
    return matchesSearch && matchesDepartment && matchesLocation && matchesType;
  });

  const getDepartmentColor = (department) => {
    const colors = {
      engineering: 'bg-blue-100 text-blue-800',
      product: 'bg-purple-100 text-purple-800',
      design: 'bg-pink-100 text-pink-800',
      marketing: 'bg-green-100 text-green-800',
      sales: 'bg-yellow-100 text-yellow-800',
      operations: 'bg-gray-100 text-gray-800'
    };
    return colors[department] || 'bg-gray-100 text-gray-800';
  };

  const getLocationDisplay = (location) => {
    return location.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Open Positions</h1>
            <p className="text-gray-600">Find your next opportunity with OKDriver</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

            {/* Job Type Filter */}
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {jobTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} of {jobOpenings.length} positions
          </p>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                      {job.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getDepartmentColor(job.department)}`}>
                      {job.department.replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    {job.urgent && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">
                        Urgent
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {getLocationDisplay(job.location)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.experience}
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {job.applicants} applicants
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

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded">1</button>
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700">2</button>
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700">3</button>
              <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                Next
              </button>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Don't See Your Role?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Submit Resume
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn About Culture
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
