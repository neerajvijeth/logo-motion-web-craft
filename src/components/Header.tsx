
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo - Made larger */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/6a15e91c-f372-4075-b626-ce095ce25ae6.png" 
              alt="Refresh Logo" 
              className="h-12 sm:h-16 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="/" 
              className={`transition-colors font-medium ${
                isActivePage('/') 
                  ? 'text-green-600' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Home
            </a>
            <a 
              href="/about" 
              className={`transition-colors font-medium ${
                isActivePage('/about') 
                  ? 'text-green-600' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              About
            </a>
            <a 
              href="/contact" 
              className={`bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors font-medium ${
                isActivePage('/contact') ? 'bg-green-700' : ''
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <a 
                href="/" 
                className={`font-medium px-4 transition-colors ${
                  isActivePage('/') 
                    ? 'text-green-600' 
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                Home
              </a>
              <a 
                href="/about" 
                className={`font-medium px-4 transition-colors ${
                  isActivePage('/about') 
                    ? 'text-green-600' 
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                About
              </a>
              <a 
                href="/contact" 
                className={`bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors font-medium mx-4 w-fit ${
                  isActivePage('/contact') ? 'bg-green-700' : ''
                }`}
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
