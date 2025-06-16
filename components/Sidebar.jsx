// components/Sidebar.jsx
// Sidebar navigation component with accessibility features
// Provides navigation between different sections of the application

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  DocumentTextIcon,
  UserIcon,
  PencilSquareIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const router = useRouter();

  // Navigation items configuration
  const navigationItems = [
    {
      name: 'Tenders',
      href: '/tenders',
      icon: DocumentTextIcon,
      ariaLabel: 'Browse available tenders'
    },
    {
      name: 'Profile',
      href: '/company-profile',
      icon: UserIcon,
      ariaLabel: 'Manage company profile'
    },
    {
      name: 'Proposals',
      href: '/proposals',
      icon: PencilSquareIcon,
      ariaLabel: 'View and manage proposals'
    },
    {
      name: 'Reputation',
      href: '/reputation',
      icon: ShieldCheckIcon,
      ariaLabel: 'View reputation and blockchain proofs'
    },
    {
      name: 'Help',
      href: '/help',
      icon: QuestionMarkCircleIcon,
      ariaLabel: 'Get help and support'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Cog6ToothIcon,
      ariaLabel: 'Manage account settings'
    }
  ];

  // Check if a route is active
  const isActiveRoute = (href) => {
    if (href === '/tenders') {
      return router.pathname === '/' || router.pathname === '/tenders' || router.pathname.startsWith('/tenders/');
    }
    return router.pathname === href || router.pathname.startsWith(href);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event, href) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      router.push(href);
    }
  };

  return (
    <aside 
      className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 z-30"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo and Brand */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="text-xl font-bold text-gray-900">TenderHub</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6" role="menu">
        <ul className="space-y-2" role="none">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href);
            
            return (
              <li key={item.name} role="none">
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  role="menuitem"
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? 'page' : undefined}
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, item.href)}
                >
                  <Icon 
                    className={`h-5 w-5 mr-3 ${
                      isActive ? 'text-blue-600' : 'text-gray-400'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <div>TenderHub Pro</div>
          <div>Version 1.0.0</div>
        </div>
      </div>
    </aside>
  );
}