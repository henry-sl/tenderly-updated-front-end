import '../styles/globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import Layout from '../components/Layout';

//This is the main entry point for your Next.js application. It wraps all your pages with the AuthProvider to make authentication context available throughout the app, and also includes the Layout component, ensuring that the navigation, footer, and toast container are present on every page.

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}