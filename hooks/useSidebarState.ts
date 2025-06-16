// hooks/useSidebarState.ts
// Custom hook for managing sidebar state with persistence and responsive behavior

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

interface UseSidebarStateOptions {
  persistState?: boolean;
  defaultCollapsed?: boolean;
  hideOnHomepage?: boolean;
}

interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  isVisible: boolean;
  isLoading: boolean;
}

interface SidebarActions {
  toggleCollapse: () => void;
  toggleMobile: () => void;
  closeMobile: () => void;
  setCollapsed: (collapsed: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export function useSidebarState(options: UseSidebarStateOptions = {}): [SidebarState, SidebarActions] {
  const {
    persistState = true,
    defaultCollapsed = false,
    hideOnHomepage = true
  } = options;

  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate visibility based on current route
  const isVisible = !hideOnHomepage || router.pathname !== '/';

  // Load persisted state on mount
  useEffect(() => {
    if (persistState && typeof window !== 'undefined') {
      const savedState = localStorage.getItem('sidebar-collapsed');
      if (savedState !== null) {
        try {
          setIsCollapsed(JSON.parse(savedState));
        } catch (error) {
          console.warn('Failed to parse saved sidebar state:', error);
        }
      }
    }
  }, [persistState]);

  // Persist state changes
  useEffect(() => {
    if (persistState && typeof window !== 'undefined') {
      localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed));
    }
  }, [isCollapsed, persistState]);

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle route changes
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);
      setIsMobileOpen(false); // Close mobile menu on route change
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
  }, [router.events]);

  // Actions
  const toggleCollapse = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const toggleMobile = useCallback(() => {
    setIsMobileOpen(prev => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const setCollapsed = useCallback((collapsed: boolean) => {
    setIsCollapsed(collapsed);
  }, []);

  const setLoadingState = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const state: SidebarState = {
    isCollapsed,
    isMobileOpen,
    isVisible,
    isLoading
  };

  const actions: SidebarActions = {
    toggleCollapse,
    toggleMobile,
    closeMobile,
    setCollapsed,
    setLoading: setLoadingState
  };

  return [state, actions];
}