// components/Layout.jsx
// Main layout component with sidebar navigation and accessibility features
// Provides consistent structure across all pages

import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import ToastContainer from './ToastContainer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <TopBar />
        
        {/* Main Content */}
        <main 
          id="main-content"
          className="flex-1 focus:outline-none"
          role="main"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}