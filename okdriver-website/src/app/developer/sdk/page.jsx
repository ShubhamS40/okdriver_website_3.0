'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Code, Terminal, Package, CheckCircle, Copy, ExternalLink, Star, Users, Zap } from 'lucide-react';

export default function SdkPage() {
  const [copiedCode, setCopiedCode] = useState(null);

  const sdks = [
    {
      name: 'JavaScript/Node.js',
      version: '2.1.0',
      downloads: '15.2k',
      rating: 4.8,
      description: 'Official JavaScript SDK for browser and Node.js environments',
      installCommand: 'npm install okdriver-sdk',
      icon: '🟨',
      features: ['TypeScript support', 'Promise-based API', 'Automatic retries', 'Request/Response interceptors'],
      codeExample: `import { OKDriver } from 'okdriver-sdk';

// Initialize the SDK
const client = new OKDriver({
  apiKey: 'your-api-key',
  environment: 'production' // or 'sandbox'
});

// Register a vehicle
const vehicle = await client.dms.vehicles.create({
  companyId: 'comp_123',
  vehicleType: 'truck',
  licensePlate: 'ABC-1234',
  capacity: 5000
});

// Send message to assistant
const response = await client.assistant.chat({
  message: 'What is my next delivery?',
  driverId: 'drv_456',
  context: 'delivery_schedule'
});

console.log(response.data);`
    },
    {
      name: 'Python',
      version: '1.8.2',
      downloads: '8.7k',
      rating: 4.7,
      description: 'Python SDK with async support and comprehensive type hints',
      installCommand: 'pip install okdriver',
      icon: '🐍',
      features: ['Async/await support', 'Type hints', 'Pydantic models', 'Automatic pagination'],
      codeExample: `from okdriver import OKDriver
import asyncio

# Initialize the SDK
client = OKDriver(
    api_key='your-api-key',
    environment='production'
)

async def main():
    # Register a vehicle
    vehicle = await client.dms.vehicles.create(
        company_id='comp_123',
        vehicle_type='truck',
        license_plate='ABC-1234',
        capacity=5000
    )
    
    # Send message to assistant
    response = await client.assistant.chat(
        message='What is my next delivery?',
        driver_id='drv_456',
        context='delivery_schedule'
    )
    
    print(response.data)

# Run the async function
asyncio.run(main())`
    },
    {
      name: 'PHP',
      version: '1.5.1',
      downloads: '3.2k',
      rating: 4.6,
      description: 'PHP SDK with Laravel integration and comprehensive documentation',
      installCommand: 'composer require okdriver/sdk',
      icon: '🐘',
      features: ['Laravel integration', 'PSR-4 autoloading', 'Guzzle HTTP client', 'Laravel service provider'],
      codeExample: `<?php
require_once 'vendor/autoload.php';

use OKDriver\\OKDriver;

// Initialize the SDK
$client = new OKDriver([
    'api_key' => 'your-api-key',
    'environment' => 'production'
]);

// Register a vehicle
$vehicle = $client->dms->vehicles->create([
    'company_id' => 'comp_123',
    'vehicle_type' => 'truck',
    'license_plate' => 'ABC-1234',
    'capacity' => 5000
]);

// Send message to assistant
$response = $client->assistant->chat([
    'message' => 'What is my next delivery?',
    'driver_id' => 'drv_456',
    'context' => 'delivery_schedule'
]);

echo json_encode($response->data);`
    },
    {
      name: 'Java',
      version: '1.3.0',
      downloads: '2.1k',
      rating: 4.5,
      description: 'Java SDK with Spring Boot integration and comprehensive error handling',
      installCommand: 'mvn dependency:get -Dartifact=com.okdriver:sdk:1.3.0',
      icon: '☕',
      features: ['Spring Boot integration', 'Builder pattern', 'Comprehensive error handling', 'Retrofit HTTP client'],
      codeExample: `import com.okdriver.OKDriver;
import com.okdriver.models.Vehicle;
import com.okdriver.models.ChatRequest;

// Initialize the SDK
OKDriver client = OKDriver.builder()
    .apiKey("your-api-key")
    .environment("production")
    .build();

// Register a vehicle
Vehicle vehicle = client.dms().vehicles().create(Vehicle.builder()
    .companyId("comp_123")
    .vehicleType("truck")
    .licensePlate("ABC-1234")
    .capacity(5000)
    .build());

// Send message to assistant
ChatRequest request = ChatRequest.builder()
    .message("What is my next delivery?")
    .driverId("drv_456")
    .context("delivery_schedule")
    .build();

var response = client.assistant().chat(request);
System.out.println(response.getData());`
    },
    {
      name: 'C#',
      version: '1.2.0',
      downloads: '1.8k',
      rating: 4.4,
      description: '.NET SDK with async support and dependency injection',
      installCommand: 'dotnet add package OKDriver.SDK',
      icon: '🔷',
      features: ['Async/await support', 'Dependency injection', 'Configuration binding', 'HttpClient integration'],
      codeExample: `using OKDriver.SDK;
using OKDriver.SDK.Models;

// Initialize the SDK
var client = new OKDriverClient(new OKDriverOptions
{
    ApiKey = "your-api-key",
    Environment = "production"
});

// Register a vehicle
var vehicle = await client.DMS.Vehicles.CreateAsync(new VehicleRequest
{
    CompanyId = "comp_123",
    VehicleType = "truck",
    LicensePlate = "ABC-1234",
    Capacity = 5000
});

// Send message to assistant
var response = await client.Assistant.ChatAsync(new ChatRequest
{
    Message = "What is my next delivery?",
    DriverId = "drv_456",
    Context = "delivery_schedule"
});

Console.WriteLine(response.Data);`
    },
    {
      name: 'Go',
      version: '1.0.5',
      downloads: '1.2k',
      rating: 4.3,
      description: 'Go SDK with context support and comprehensive testing',
      installCommand: 'go get github.com/okdriver/go-sdk',
      icon: '🐹',
      features: ['Context support', 'Interface-based design', 'Comprehensive testing', 'gRPC support'],
      codeExample: `package main

import (
    "context"
    "fmt"
    "github.com/okdriver/go-sdk"
)

func main() {
    // Initialize the SDK
    client := okdriver.NewClient(&okdriver.Config{
        APIKey:     "your-api-key",
        Environment: "production",
    })
    
    ctx := context.Background()
    
    // Register a vehicle
    vehicle, err := client.DMS.Vehicles.Create(ctx, &okdriver.VehicleRequest{
        CompanyID:    "comp_123",
        VehicleType:  "truck",
        LicensePlate: "ABC-1234",
        Capacity:     5000,
    })
    if err != nil {
        panic(err)
    }
    
    // Send message to assistant
    response, err := client.Assistant.Chat(ctx, &okdriver.ChatRequest{
        Message:  "What is my next delivery?",
        DriverID: "drv_456",
        Context:  "delivery_schedule",
    })
    if err != nil {
        panic(err)
    }
    
    fmt.Println(response.Data)
}`
    }
  ];

  const copyToClipboard = async (code, sdkName) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(sdkName);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const features = [
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized for speed with connection pooling and request batching'
    },
    {
      icon: CheckCircle,
      title: 'Reliable',
      description: 'Built-in retry logic and error handling for production environments'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Open source SDKs with active community support and contributions'
    },
    {
      icon: Code,
      title: 'Type Safe',
      description: 'Full TypeScript support and comprehensive type definitions'
    }
  ];

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
              Official <span className="text-yellow-300">SDKs</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Get started quickly with our official SDKs. Available in multiple languages with comprehensive documentation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                <Download className="w-5 h-5 inline mr-2" />
                Download SDKs
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                <ExternalLink className="w-5 h-5 inline mr-2" />
                View on GitHub
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our SDKs?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built by developers, for developers. Our SDKs are designed to make integration seamless and efficient.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SDKs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Available SDKs
            </h2>
            <p className="text-xl text-gray-600">
              Choose the SDK that fits your technology stack
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sdks.map((sdk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* SDK Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{sdk.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{sdk.name}</h3>
                        <p className="text-sm text-gray-500">v{sdk.version}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {sdk.rating}
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {sdk.downloads}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{sdk.description}</p>
                  
                  {/* Install Command */}
                  <div className="bg-gray-100 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <code className="text-sm font-mono text-gray-800">{sdk.installCommand}</code>
                      <button
                        onClick={() => copyToClipboard(sdk.installCommand, sdk.name)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {copiedCode === sdk.name ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {sdk.features.map((feature, featureIndex) => (
                      <span key={featureIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Code Example */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-900">Quick Start</h4>
                    <button
                      onClick={() => copyToClipboard(sdk.codeExample, sdk.name)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {copiedCode === sdk.name ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{sdk.codeExample}</code>
                  </pre>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Getting Started
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Follow these simple steps to integrate OKDriver into your application
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get API Key</h3>
              <p className="text-gray-600">
                Sign up for a free account and get your API key from the developer dashboard
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Install SDK</h3>
              <p className="text-gray-600">
                Install the SDK for your preferred language using the package manager
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Building</h3>
              <p className="text-gray-600">
                Initialize the client and start making API calls to integrate driver management
              </p>
            </motion.div>
          </div>
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
              Ready to Start Building?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Join thousands of developers using OKDriver SDKs to build amazing driver management solutions
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                <Package className="w-5 h-5 inline mr-2" />
                Get Started Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                <Terminal className="w-5 h-5 inline mr-2" />
                View Examples
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
