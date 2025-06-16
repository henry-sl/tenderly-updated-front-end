// components/Sidebar/LoadingState.tsx
// Loading state component for route transitions

import React from 'react';

interface LoadingStateProps {
  isCollapsed: boolean;
}

export default function LoadingState({ isCollapsed }: LoadingStateProps) {
  return (
    <div className="p-4">
      <div className={`animate-pulse ${isCollapsed ? 'space-y-3' : 'space-y-4'}`}>
        {/* Logo skeleton */}
        <div className="flex items-center space-x-3">
          <div className={`bg-gray-200 rounded-lg ${isCollapsed ? 'w-10 h-10' : 'w-12 h-12'}`} />
          {!isCollapsed && <div className="h-6 bg-gray-200 rounded w-24" />}
        </div>

        {/* Navigation items skeleton */}
        <div className="space-y-2 pt-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-3 p-2.5">
              <div className="w-5 h-5 bg-gray-200 rounded" />
              {!isCollapsed && <div className="h-4 bg-gray-200 rounded flex-1" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}