// components/Sidebar/MobileToggle.tsx
// Mobile menu toggle button component

import React from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSidebar } from './SidebarContext';

interface MobileToggleProps {
  className?: string;
}

export default function MobileToggle({ className = '' }: MobileToggleProps) {
  const { isMobileOpen, toggleMobile } = useSidebar();

  return (
    <button
      onClick={toggleMobile}
      className={`
        lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200 
        hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
      aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isMobileOpen}
      aria-controls="sidebar-navigation"
    >
      {isMobileOpen ? (
        <XMarkIcon className="h-6 w-6 text-gray-600" />
      ) : (
        <Bars3Icon className="h-6 w-6 text-gray-600" />
      )}
    </button>
  );
}