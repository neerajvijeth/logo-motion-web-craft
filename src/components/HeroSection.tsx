
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-green-300 rounded-full opacity-10 animate-pulse delay-1000" />
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          {/* Main Logo */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/6a15e91c-f372-4075-b626-ce095ce25ae6.png" 
              alt="Refresh Logo" 
              className="h-24 sm:h-32 lg:h-40 w-auto mx-auto mb-6"
            />
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Pure. Natural.
            <span className="text-green-600 block">Refreshing.</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the finest quality products, sourced directly from nature 
            and delivered fresh to your doorstep.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Explore Products
            </button>
            <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-green-600" size={32} />
      </div>
    </section>
  );
};

export default HeroSection;
