// components/Layout.jsx
// Updated layout component to use the new responsive sidebar navigation
// Provides consistent page structure with sidebar, main content, and toast notifications

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ToastContainer from './ToastContainer';

export default function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        setIsCollapsed={setSidebarCollapsed} 
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Main content where page-specific content is rendered */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
        
        {/* Footer with attribution */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <a
                href="https://bolt.new"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition"
              >
                <span className="text-sm">Built on</span>
                <div className="bg-black text-white px-2 py-1 rounded text-xs font-bold">
                  BOLT
                </div>
              </a>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Toast notification container for displaying alerts */}
      <ToastContainer />
    </div>
  );
}