import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-20 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Return to Home
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;