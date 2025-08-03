import { useState, useEffect } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

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

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
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
              className={`transition-colors font-medium ${
                isActivePage('/contact') 
                  ? 'text-green-600' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Contact
            </a>
            {user ? (
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <div className="flex items-center space-x-4">
                <a 
                  href="/auth" 
                  className={`transition-colors font-medium ${
                    isActivePage('/auth') 
                      ? 'text-green-600' 
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  Login
                </a>
                <a 
                  href="/auth" 
                  className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors font-medium"
                >
                  Sign Up
                </a>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 relative z-50 transition-transform duration-300 hover:scale-110"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="relative">
              {isMobileMenuOpen ? (
                <X 
                  size={24} 
                  className="transform rotate-0 transition-transform duration-300 animate-in spin-in-90" 
                />
              ) : (
                <Menu 
                  size={24} 
                  className="transform rotate-0 transition-transform duration-300" 
                />
              )}
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 py-4 rounded-b-2xl shadow-xl mx-4 mb-4">
            <nav className="flex flex-col space-y-2 px-4">
              {[
                { href: '/', label: 'Home', isActive: isActivePage('/') },
                { href: '/about', label: 'About', isActive: isActivePage('/about') },
                { href: '/contact', label: 'Contact', isActive: isActivePage('/contact') },
                ...(user ? [{ href: '#', label: 'Logout', isActive: false, isLogout: true }] : [
                  { href: '/auth', label: 'Login', isActive: isActivePage('/auth') },
                  { href: '/auth', label: 'Sign Up', isActive: isActivePage('/auth'), isSignUp: true }
                ])
              ].map((item, index) => {
                if (item.isLogout) {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className={`
                        group relative font-medium px-4 py-3 rounded-xl transition-all duration-300
                        transform hover:scale-105 hover:shadow-lg w-full text-left
                        ${isMobileMenuOpen ? 'animate-in slide-in-from-left-5' : ''}
                        bg-green-600 text-white hover:bg-green-700 hover:shadow-green-200
                      `}
                      style={{ 
                        animationDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms',
                        animationFillMode: 'both'
                      }}
                    >
                      <span className="relative z-10 flex items-center">
                        <LogOut className="w-4 h-4 mr-2" />
                        {item.label}
                      </span>
                    </button>
                  );
                }
                
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`
                      group relative font-medium px-4 py-3 rounded-xl transition-all duration-300
                      transform hover:scale-105 hover:shadow-lg
                      ${isMobileMenuOpen ? 'animate-in slide-in-from-left-5' : ''}
                      ${item.isSignUp || item.href === '/auth' && item.label === 'Sign Up'
                        ? `bg-green-600 text-white hover:bg-green-700 hover:shadow-green-200 ${
                            item.isActive ? 'bg-green-700' : ''
                          }`
                        : item.href === '/auth' && item.label === 'Login'
                        ? `text-green-600 hover:bg-green-50 hover:text-green-700 border border-green-600 ${
                            item.isActive ? 'text-green-700 bg-green-50' : ''
                          }`
                        : `text-gray-700 hover:bg-green-50 hover:text-green-600 ${
                            item.isActive ? 'text-green-600 bg-green-50' : ''
                          }`
                      }
                    `}
                    style={{ 
                      animationDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms',
                      animationFillMode: 'both'
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Animated background for non-auth items */}
                    {!item.href.includes('/auth') && (
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    )}
                    
                    {/* Active indicator */}
                    {item.isActive && !item.href.includes('/auth') && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-green-600 rounded-r-full animate-in slide-in-from-left-1"></div>
                    )}
                    
                    {/* Hover glow effect */}
                    <div className={`
                      absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm
                      ${item.href.includes('/auth') ? 'bg-green-400' : 'bg-green-300'}
                    `}></div>
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;