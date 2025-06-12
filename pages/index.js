import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { 
  CheckCircleIcon, 
  PencilSquareIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // If user is logged in, redirect to tenders page
  useEffect(() => {
    if (!loading && user) {
      router.push('/tenders');
    }
  }, [user, loading, router]);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is logged in, don't show the landing page (will redirect)
  if (user) {
    return null;
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-r from-blue-50 to-teal-50 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Win More Government Tenders with AI
              </h1>
              <p className="text-lg text-gray-700 mt-4 leading-relaxed">
                Tenderly uses artificial intelligence to help SMEs navigate government procurement, 
                draft winning proposals, and build verifiable reputation on the blockchain.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/signup" className="btn btn-primary text-center">
                  Get Started
                </Link>
                <Link href="/tenders" className="btn btn-secondary text-center">
                  Explore Tenders
                </Link>
              </div>
            </div>
            
            {/* Hero Image Placeholder */}
            <div className="flex justify-center md:justify-end">
              <div className="h-64 w-full max-w-md bg-gray-300 rounded-lg shadow-lg flex items-center justify-center">
                <span className="text-gray-600 text-lg">Laptop Screenshot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: AI Eligibility Check */}
            <div className="card transform hover:scale-105 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <CheckCircleIcon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                AI Eligibility Check
              </h3>
              <p className="text-gray-600 mt-2">
                Instantly verify if your company meets tender requirements before investing time.
              </p>
            </div>

            {/* Feature 2: Instant Proposal Drafting */}
            <div className="card transform hover:scale-105 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-teal-50 flex items-center justify-center">
                  <PencilSquareIcon className="h-6 w-6 text-secondary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Instant Proposal Drafting
              </h3>
              <p className="text-gray-600 mt-2">
                Generate professional proposal drafts in minutes, not days.
              </p>
            </div>

            {/* Feature 3: Blockchain Reputation Proof */}
            <div className="card transform hover:scale-105 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-yellow-50 flex items-center justify-center">
                  <ShieldCheckIcon className="h-6 w-6 text-accent" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Blockchain Reputation Proof
              </h3>
              <p className="text-gray-600 mt-2">
                Build immutable proof of your tender participation and track record.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Tenderly Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Problem/Solution Text */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Public Procurement is Broken. <br className="hidden md:block" />
                We're Fixing It.
              </h2>
              
              {/* Pain Points */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Problems:</h3>
                <ul className="list-disc list-inside space-y-3 text-gray-700">
                  <li>
                    <strong>Opaque Process:</strong> Lack of transparency in tendering requirements and evaluation.
                  </li>
                  <li>
                    <strong>Manual Paperwork:</strong> Hours spent on repetitive documentation and compliance checks.
                  </li>
                  <li>
                    <strong>Who-You-Know Bias:</strong> Established players have unfair advantages over newcomers.
                  </li>
                </ul>
              </div>

              {/* Tenderly Benefits */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tenderly's Solutions:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Transparent Matching:</strong> AI-powered eligibility checks and clear requirement analysis.
                  </li>
                  <li>
                    <strong>Fast Drafts:</strong> Automated proposal generation saves hours of manual work.
                  </li>
                  <li>
                    <strong>Fairer Access:</strong> Blockchain reputation system levels the playing field.
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Illustration Placeholder */}
            <div className="flex justify-center">
              <div className="max-w-sm h-64 bg-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 text-lg">Process Diagram</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-gray-500 uppercase mb-2">
            Trusted by
          </p>
          <p className="text-xl text-gray-800 mb-8">
            Helping level the field for SMEs across ASEAN.
          </p>
          
          {/* Logo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex justify-center">
                <div className={`h-8 bg-gray-300 rounded flex items-center justify-center ${
                  i % 3 === 0 ? 'w-24' : i % 3 === 1 ? 'w-32' : 'w-28'
                }`}>
                  <span className="text-gray-600 text-xs">Logo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-To-Action Footer */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Join Tenderly today and win more tenders — with less stress.
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Focus on growing your business, not the paperwork.
          </p>
          
          {/* Email Signup Form */}
          <div className="max-w-md mx-auto mb-8">
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white text-gray-900 rounded-t-md sm:rounded-l-md sm:rounded-t-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-accent hover:bg-yellow-300 text-gray-900 px-6 py-3 font-medium rounded-b-md sm:rounded-r-md sm:rounded-b-md transition"
              >
                Notify Me
              </button>
            </form>
          </div>
          
          {/* Quick Links */}
          <div className="flex justify-center space-x-6 text-sm text-white mb-4">
            <Link href="/login" className="hover:underline">Login</Link>
            <span className="text-blue-200">|</span>
            <Link href="/tenders" className="hover:underline">Tenders</Link>
            <span className="text-blue-200">|</span>
            <Link href="/company" className="hover:underline">Company</Link>
            <span className="text-blue-200">|</span>
            <Link href="/reputation" className="hover:underline">Reputation</Link>
          </div>
          
          {/* Copyright */}
          <p className="text-xs text-gray-200">
            © 2025 Tenderly. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
}