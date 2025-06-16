// components/Sidebar/Logo.tsx
// Logo component with responsive sizing and aspect ratio maintenance

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  isCollapsed: boolean;
  className?: string;
}

export default function Logo({ isCollapsed, className = '' }: LogoProps) {
  return (
    <Link 
      href="/tenders" 
      className={`flex items-center transition-all duration-300 ease-in-out ${className}`}
      aria-label="TenderHub - Go to dashboard"
    >
      {/* Logo icon - maintains 1:1 aspect ratio */}
      <div 
        className={`
          bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300
          ${isCollapsed ? 'w-10 h-10' : 'w-12 h-12'}
        `}
        style={{ minWidth: '40px', minHeight: '40px', maxWidth: '50px', maxHeight: '50px' }}
      >
        <span 
          className={`
            text-white font-bold transition-all duration-300
            ${isCollapsed ? 'text-sm' : 'text-lg'}
          `}
        >
          T
        </span>
      </div>

      {/* Logo text - fades in/out with opacity transition */}
      <div 
        className={`
          ml-3 transition-all duration-300 ease-in-out overflow-hidden
          ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
        `}
      >
        <span className="text-xl font-semibold text-gray-900 whitespace-nowrap">
          TenderHub
        </span>
      </div>
    </Link>
  );
}