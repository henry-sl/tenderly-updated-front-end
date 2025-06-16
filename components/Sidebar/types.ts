// components/Sidebar/types.ts
// TypeScript type definitions for the sidebar component

export interface NavigationItem {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  badge?: string | number;
  disabled?: boolean;
}

export interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  className?: string;
  showOnHomepage?: boolean;
}

export interface SidebarContextType {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  toggleCollapse: () => void;
  toggleMobile: () => void;
  closeMobile: () => void;
}

export interface RouteChangeHandlers {
  onRouteChangeStart?: (url: string) => void;
  onRouteChangeComplete?: (url: string) => void;
  onRouteChangeError?: (err: Error, url: string) => void;
}

export interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  isLoading: boolean;
  error: string | null;
}