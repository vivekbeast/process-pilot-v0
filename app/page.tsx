import React from 'react';
import { 
  Settings, 
  Users, 
  BarChart3, 
  CheckCircle, 
  ArrowRight, 
  Factory, 
  Clipboard, 
  Package, 
  TrendingUp,
  Shield,
  Zap,
  Globe
} from 'lucide-react';
import NavBar from '../components/NavBar';
import Link from 'next/link';
import Image from 'next/image';
const ProcessPilotLandingPage: React.FC = () => {
  const features = [
    {
      icon: <Factory className="w-8 h-8" />,
      title: "End-to-End Production Tracking",
      description: "Monitor your entire manufacturing process from order creation to final output with real-time visibility."
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Smart Inventory Management",
      description: "Track stock movements, raw material usage, and maintain accurate ledger balances automatically."
    },
    {
      icon: <Clipboard className="w-8 h-8" />,
      title: "Digital BOM Management",
      description: "Create, manage, and track Bills of Materials digitally, eliminating manual paperwork and errors."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Dynamic Dashboards",
      description: "Get instant insights with customizable dashboards and real-time filtering for quick decision making."
    }
  ];

  const userRoles = [
    {
      title: "Manufacturing Managers",
      description: "Oversee production orders and workflows with complete visibility",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Shop-floor Workers",
      description: "Execute work orders and update status in real-time",
      color: "bg-orange-50 border-orange-200"
    },
    {
      title: "Inventory Managers",
      description: "Track stock movement and raw material usage efficiently",
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Business Owners",
      description: "Monitor KPIs, generate reports, and ensure full traceability",
      color: "bg-purple-50 border-purple-200"
    }
  ];

  const benefits = [
    { icon: <Shield className="w-6 h-6" />, text: "Replace fragmented spreadsheets" },
    { icon: <Zap className="w-6 h-6" />, text: "Eliminate manual tracking errors" },
    { icon: <Globe className="w-6 h-6" />, text: "Centralized platform for all operations" },
    { icon: <TrendingUp className="w-6 h-6" />, text: "Improved production efficiency" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Space - Reserved for Layout */}
      <div className="h-20 border-r-2 border-l-2 border-solid border-amber-300 flex items-center justify-center">
        <NavBar />
      </div>

      {/* Hero Section */}
      <section className="relative bg-[#3F4F5F] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center bg-amber-500 bg-opacity-20 rounded-full px-4 py-2 text-sm font-medium text-amber-200 mb-8">
              <Factory className="w-4 h-4 mr-2" />
              Manufacturing Management Solution
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              From Order to Output,
              <span className="block text-amber-400">All in One Flow</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Replace fragmented spreadsheets with a centralized, digital platform that manages your entire manufacturing process seamlessly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/signup" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 flex items-center justify-center">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-amber-400 mb-2">{benefit.icon}</div>
                <p className="text-sm text-gray-300">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Streamline Your Manufacturing Operations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ProcessPilot provides everything you need to digitize and optimize your manufacturing workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-amber-500">
                <div className="text-slate-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Users Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Every Manufacturing Role
            </h2>
            <p className="text-xl text-gray-600">
              Tailored experiences for each member of your manufacturing team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {userRoles.map((role, index) => (
              <div key={index} className={`p-8 rounded-xl border-2 ${role.color} hover:shadow-lg transition-all duration-300`}>
                <div className="flex items-start">
                  <Users className="w-8 h-8 text-slate-600 mt-1 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h3>
                    <p className="text-gray-700">{role.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-20 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Solve Manufacturings Biggest Challenges
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-amber-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">End fragmented systems for orders, stock, and BOMs</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-amber-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">Gain complete visibility into production stages</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-amber-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">Dynamic dashboards for instant order status</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-amber-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">Seamless integration across all departments</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-amber-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">Eliminate manual paperwork and reduce errors</p>
                </div>
              </div>
            </div>
            <div className=" bg-[#3F4F5F] bg-opacity-10 p-8 rounded-xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 text-amber-400">Ready to Get Started?</h3>
              <p className="text-white mb-6">
                Join hundreds of manufacturers who have streamlined their operations with ProcessPilot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3F4F5F] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                {/* <Settings className="w-8 h-8 mr-3 text-amber-400" /> */}
                <Image src="/logo.png" alt="logo" width={60} height={60}  priority objectFit='cover' />
                <span className="text-2xl font-bold">ProcessPilot</span>
              </div>
              <p className="text-gray-400 mb-4">
                From Order to Output, All in One Flow
              </p>
              <p className="text-gray-400 text-sm">
                Streamline your manufacturing operations with our comprehensive digital platform.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-amber-400">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integration</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-amber-400">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 ProcessPilot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProcessPilotLandingPage;