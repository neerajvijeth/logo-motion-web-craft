
import { useEffect, useState } from 'react';
import { ChevronDown, Tractor } from 'lucide-react';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with parallax effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />
      
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-pattern opacity-30" />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-100/40 via-transparent to-green-50/40 animate-pulse" style={{ animationDuration: '4s' }} />
      
      {/* Enhanced decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-emerald-200 to-green-400 rounded-full opacity-10 animate-pulse delay-1000" />
      <div className="absolute top-1/3 left-20 w-24 h-24 bg-gradient-to-br from-green-300 to-emerald-300 rounded-full opacity-15 animate-pulse delay-500" />
      <div className="absolute bottom-1/3 left-10 w-16 h-16 bg-gradient-to-br from-emerald-200 to-green-200 rounded-full opacity-25 animate-pulse delay-2000" />
      <div className="absolute top-1/2 right-20 text-green-200 opacity-30">
        <Tractor size={60} />
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="animate-fade-in">
          {/* Main Logo */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/6a15e91c-f372-4075-b626-ce095ce25ae6.png" 
              alt="Refresh Logo" 
              className="h-24 sm:h-32 lg:h-40 w-auto mx-auto mb-6"
            />
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight text-shadow">
            Automated. Precise.
            <span className="text-green-600 block">Revolutionary.</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your agricultural operations with our advanced robotics arm 
            designed for precision farming and automated crop management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-green-600 text-white border-2 border-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-green-600 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto">
              View Demo
            </button>
            <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 hover:text-white transform hover:scale-105 transition-all duration-300 w-full sm:w-auto">
              Request Quote
            </button>
          </div>
        </div>
      </div>
      
      {/* Perfectly centered scroll indicator */}
      <div className="absolute bottom-8 w-full flex justify-center z-20">
        <div className="animate-bounce">
          <ChevronDown className="text-green-600" size={32} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
