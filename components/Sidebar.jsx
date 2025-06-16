// components/Sidebar.jsx
// Responsive sidebar navigation component that matches the TenderHub design
// Supports collapsed/expanded states with smooth animations and accessibility features

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  DocumentTextIcon,
  UserIcon,
  PencilSquareIcon,
  StarIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Navigation items configuration
  const navigationItems = [
    {
      name: 'Tenders',
      href: '/tenders',
      icon: DocumentTextIcon,
      description: 'Browse available tenders'
    },
    {
      name: 'Profile',
      href: '/company',
      icon: UserIcon,
      description: 'Manage company profile'
    },
    {
      name: 'Proposals',
      href: '/proposals',
      icon: PencilSquareIcon,
      description: 'View and edit proposals'
    },
    {
      name: 'Reputation',
      href: '/reputation',
      icon: StarIcon,
      description: 'Track reputation and proofs'
    },
    {
      name: 'Help',
      href: '/help',
      icon: QuestionMarkCircleIcon,
      description: 'Get help and support'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Cog6ToothIcon,
      description: 'Account settings'
    }
  ];

  // Check if a route is currently active
  const isActiveRoute = (href) => {
    return router.pathname === href || router.pathname.startsWith(href + '/');
  };

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Handle desktop sidebar collapse
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="Toggle navigation menu"
      >
        {isMobileOpen ? (
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-gray-600" />
        )}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-16' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:relative lg:translate-x-0
        `}
        aria-label="Main navigation"
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">TenderHub</span>
            </div>
          )}
          
          {isCollapsed && (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-sm">T</span>
            </div>
          )}

          {/* Desktop collapse button */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:block p-1.5 rounded-md hover:bg-gray-100 transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Bars3Icon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4" role="navigation">
          <ul className="space-y-2" role="list">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.href);

              return (
                <li key={item.name} role="listitem">
                  <Link
                    href={item.href}
                    className={`
                      group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                      ${isCollapsed ? 'justify-center' : 'justify-start'}
                    `}
                    onClick={() => setIsMobileOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <Icon 
                      className={`
                        h-5 w-5 flex-shrink-0 transition-colors duration-200
                        ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}
                        ${isCollapsed ? '' : 'mr-3'}
                      `}
                      aria-hidden="true"
                    />
                    
                    {!isCollapsed && (
                      <span className="truncate">{item.name}</span>
                    )}

                    {/* Active indicator */}
                    {isActive && !isCollapsed && (
                      <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full" aria-hidden="true" />
                    )}
                  </Link>

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="hidden lg:block absolute left-16 top-0 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                      {item.name}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          {!isCollapsed ? (
            <div className="text-xs text-gray-500 text-center">
              <div className="font-medium">TenderHub Pro</div>
              <div>Version 1.0.0</div>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-xs font-medium text-gray-600">v1</span>
            </div>
          )}
        </div>
      </aside>

      {/* Main content spacer for desktop */}
      <div 
        className={`hidden lg:block transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-16' : 'w-64'
        }`} 
        aria-hidden="true"
      />
    </>
  );
}