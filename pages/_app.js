// pages/_app.js
// This is the main entry point for the Next.js application
// It wraps all pages with global providers and layout

import '../styles/globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import Layout from '../components/Layout';

// The App component receives the Component to render and its pageProps
export default function App({ Component, pageProps }) {
  return (
    // AuthProvider makes authentication state available throughout the app
    <AuthProvider>
      {/* Layout provides consistent page structure with navbar, footer, etc. */}
      <Layout>
        {/* Render the current page component with its props */}
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}