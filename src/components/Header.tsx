
import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'glass-dark shadow-2xl border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo with glow effect */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-slow"></div>
              <img 
                src="/lovable-uploads/6a15e91c-f372-4075-b626-ce095ce25ae6.png" 
                alt="eRefresh Logo" 
                className="relative h-12 sm:h-16 w-auto hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-bold gradient-text">eRefresh</span>
            </div>
          </div>

          {/* Desktop Navigation with glass morphism */}
          <nav className="hidden md:flex items-center space-x-2">
            {[
              { href: '/', label: 'Home', isActive: isActivePage('/') },
              { href: '/about', label: 'About', isActive: isActivePage('/about') },
            ].map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className={`relative px-6 py-3 rounded-full transition-all duration-300 font-medium overflow-hidden group ${
                  item.isActive 
                    ? 'text-primary bg-primary/10 glass' 
                    : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {item.isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                )}
              </a>
            ))}
            
            <a 
              href="/contact" 
              className="relative ml-4 px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full font-semibold overflow-hidden group hover-lift hover-glow transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
                <Zap size={16} className="mr-2" />
                Contact
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </nav>

          {/* Enhanced Mobile Menu Button */}
          <button 
            className="md:hidden relative z-50 p-3 rounded-full glass transition-all duration-300 hover:bg-primary/10 group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="relative w-6 h-6">
              {isMobileMenuOpen ? (
                <X 
                  size={24} 
                  className="absolute inset-0 text-primary transform transition-all duration-300 rotate-0 group-hover:rotate-90" 
                />
              ) : (
                <Menu 
                  size={24} 
                  className="absolute inset-0 text-foreground group-hover:text-primary transition-colors duration-300" 
                />
              )}
            </div>
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 transition-all duration-500 ease-out ${
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="mx-4 mt-4 glass-dark rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="p-6 space-y-2">
              {[
                { href: '/', label: 'Home', isActive: isActivePage('/') },
                { href: '/about', label: 'About', isActive: isActivePage('/about') },
                { href: '/contact', label: 'Contact', isActive: isActivePage('/contact') }
              ].map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`
                    block relative px-6 py-4 rounded-2xl font-medium transition-all duration-300 group overflow-hidden
                    ${isMobileMenuOpen ? 'animate-fade-in-up' : ''}
                    ${item.href === '/contact' 
                      ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/25'
                      : `hover:bg-primary/10 ${item.isActive ? 'text-primary bg-primary/5' : 'text-foreground/80 hover:text-primary'}`
                    }
                  `}
                  style={{ 
                    animationDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms',
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="relative z-10 flex items-center">
                    {item.href === '/contact' && <Zap size={18} className="mr-2" />}
                    {item.label}
                  </span>
                  
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-[-100%] group-hover:translate-x-0"></div>
                  
                  {/* Active indicator */}
                  {item.isActive && item.href !== '/contact' && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-r-full"></div>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
