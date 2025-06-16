// components/Sidebar/NavigationItem.tsx
// Individual navigation item component with hover effects and active states

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavigationItem } from './types';
import { useSidebar } from './SidebarContext';

interface NavigationItemProps {
  item: NavigationItem;
  className?: string;
}

export default function NavigationItem({ item, className = '' }: NavigationItemProps) {
  const router = useRouter();
  const { isCollapsed, closeMobile } = useSidebar();
  const Icon = item.icon;

  // Check if the current route is active
  const isActive = router.pathname === item.href || router.pathname.startsWith(item.href + '/');

  const handleClick = () => {
    closeMobile();
  };

  return (
    <li className={`relative group ${className}`}>
      <Link
        href={item.href}
        onClick={handleClick}
        className={`
          flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${isActive 
            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
          }
          ${isCollapsed ? 'justify-center px-2' : 'justify-start'}
          ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        aria-current={isActive ? 'page' : undefined}
        aria-label={isCollapsed ? item.name : undefined}
        title={isCollapsed ? item.description || item.name : undefined}
        tabIndex={item.disabled ? -1 : 0}
      >
        {/* Icon */}
        <Icon 
          className={`
            h-5 w-5 flex-shrink-0 transition-colors duration-200
            ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}
            ${isCollapsed ? '' : 'mr-3'}
          `}
          aria-hidden="true"
        />
        
        {/* Text label with fade transition */}
        <span 
          className={`
            truncate transition-all duration-300 ease-in-out
            ${isCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}
          `}
        >
          {item.name}
        </span>

        {/* Badge */}
        {!isCollapsed && item.badge && (
          <span 
            className={`
              ml-auto px-2 py-0.5 text-xs rounded-full transition-colors duration-200
              ${isActive 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
              }
            `}
          >
            {item.badge}
          </span>
        )}

        {/* Active indicator */}
        {isActive && !isCollapsed && (
          <div 
            className="ml-auto w-2 h-2 bg-blue-600 rounded-full" 
            aria-hidden="true" 
          />
        )}
      </Link>

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div 
          className={`
            absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-md
            opacity-0 invisible group-hover:opacity-100 group-hover:visible
            transition-all duration-200 ease-in-out whitespace-nowrap z-50 pointer-events-none
            transform translate-y-0 group-hover:translate-y-0
          `}
          role="tooltip"
        >
          <div className="flex flex-col">
            <span className="font-medium">{item.name}</span>
            {item.description && (
              <span className="text-xs text-gray-300 mt-1">{item.description}</span>
            )}
          </div>
          
          {/* Tooltip arrow */}
          <div 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"
            aria-hidden="true"
          />
        </div>
      )}
    </li>
  );
}