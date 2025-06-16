// components/Navbar.jsx
// Updated navbar component that works with the new sidebar layout
// Simplified since main navigation is now in the sidebar

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  // Get authentication state and functions from the auth context
  const { user, signOut } = useAuth();
  const router = useRouter();
  // State for mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle user sign out
  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  // This component is now simplified since main navigation is in the sidebar
  // It only handles mobile menu and user authentication for pages without sidebar
  const isAuthPage = router.pathname === '/login' || router.pathname === '/signup';

  if (!isAuthPage) {
    // For main app pages, navigation is handled by the sidebar
    return null;
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link href="/tenders" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold text-gray-900">TenderHub</span>
            </Link>
          </div>

          {/* User Menu - shows user email and logout button when logged in, or login button when logged out */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700">{user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="btn btn-secondary text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="btn btn-primary text-sm">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}