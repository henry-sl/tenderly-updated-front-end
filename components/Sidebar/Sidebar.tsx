// components/Sidebar/Sidebar.tsx
// Main sidebar component with responsive design and smooth animations

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { 
  DocumentTextIcon,
  UserIcon,
  PencilSquareIcon,
  StarIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

import { NavigationItem, SidebarProps, RouteChangeHandlers } from './types';
import { useSidebar } from './SidebarContext';
import Logo from './Logo';
import NavigationItem from './NavigationItem';
import MobileToggle from './MobileToggle';
import LoadingState from './LoadingState';
import SidebarErrorBoundary from './ErrorBoundary';

// Navigation configuration
const navigationItems: NavigationItem[] = [
  {
    id: 'tenders',
    name: 'Tenders',
    href: '/tenders',
    icon: DocumentTextIcon,
    description: 'Browse available tenders',
    badge: '4'
  },
  {
    id: 'profile',
    name: 'Profile',
    href: '/company',
    icon: UserIcon,
    description: 'Manage company profile'
  },
  {
    id: 'proposals',
    name: 'Proposals',
    href: '/proposals',
    icon: PencilSquareIcon,
    description: 'View and edit proposals'
  },
  {
    id: 'reputation',
    name: 'Reputation',
    href: '/reputation',
    icon: StarIcon,
    description: 'Track reputation and proofs'
  },
  {
    id: 'help',
    name: 'Help',
    href: '/help',
    icon: QuestionMarkCircleIcon,
    description: 'Get help and support'
  },
  {
    id: 'settings',
    name: 'Settings',
    href: '/settings',
    icon: Cog6ToothIcon,
    description: 'Account settings'
  }
];

export default function Sidebar({ 
  className = '', 
  showOnHomepage = false 
}: Omit<SidebarProps, 'isCollapsed' | 'setIsCollapsed'>) {
  const router = useRouter();
  const { isCollapsed, isMobileOpen, toggleCollapse, closeMobile } = useSidebar();
  const [isLoading, setIsLoading] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);

  // Handle conditional rendering based on route
  useEffect(() => {
    const isHomepage = router.pathname === '/';
    setShouldShow(!isHomepage || showOnHomepage);
  }, [router.pathname, showOnHomepage]);

  // Route change handlers for loading states
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);
      closeMobile();
    };

    const handleRouteChangeError = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router.events, closeMobile]);

  // Don't render sidebar on homepage unless explicitly allowed
  if (!shouldShow) {
    return null;
  }

  return (
    <SidebarErrorBoundary>
      {/* Mobile toggle button */}
      <MobileToggle />

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        id="sidebar-navigation"
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40 
          transition-all duration-300 ease-in-out shadow-lg lg:shadow-none
          ${isCollapsed ? 'w-16' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:relative lg:translate-x-0
          ${className}
        `}
        aria-label="Main navigation"
        role="navigation"
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 min-h-[73px]">
          <Logo isCollapsed={isCollapsed} />
          
          {/* Desktop collapse toggle */}
          <button
            onClick={toggleCollapse}
            className={`
              hidden lg:flex items-center justify-center p-1.5 rounded-md 
              hover:bg-gray-100 active:bg-gray-200 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${isCollapsed ? 'ml-0' : 'ml-2'}
            `}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRightIcon className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronLeftIcon className="h-4 w-4 text-gray-500" />
            )}
          </button>
        </div>

        {/* Navigation content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {isLoading ? (
            <LoadingState isCollapsed={isCollapsed} />
          ) : (
            <nav className="flex-1 p-4 overflow-y-auto scrollbar-hide" role="navigation">
              <ul className="space-y-1" role="list">
                {navigationItems.map((item) => (
                  <NavigationItem key={item.id} item={item} />
                ))}
              </ul>
            </nav>
          )}

          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div 
              className={`
                transition-all duration-300 ease-in-out
                ${isCollapsed ? 'text-center' : 'text-left'}
              `}
            >
              {!isCollapsed ? (
                <div className="space-y-1">
                  <div className="text-xs font-medium text-gray-900">TenderHub Pro</div>
                  <div className="text-xs text-gray-500">Version 1.0.0</div>
                </div>
              ) : (
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-xs font-bold text-blue-600">v1</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Spacer for desktop layout */}
      <div 
        className={`
          hidden lg:block transition-all duration-300 ease-in-out flex-shrink-0
          ${isCollapsed ? 'w-16' : 'w-64'}
        `} 
        aria-hidden="true"
      />
    </SidebarErrorBoundary>
  );
}