
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
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <source src="https://videos.pexels.com/video-files/2795405/2795405-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="w-full h-full bg-gradient-to-br from-green-600 via-green-500 to-emerald-600" />
        </video>
        
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </div>
      
      {/* Enhanced agricultural pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-green-100/30 via-transparent to-green-200/30" />
        <div className="absolute inset-0 bg-pattern opacity-40" />
      </div>
      
      {/* Floating agricultural elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-green-400/20 rounded-full opacity-60 animate-pulse backdrop-blur-sm" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-emerald-300/15 rounded-full opacity-40 animate-pulse delay-1000 backdrop-blur-sm" />
      <div className="absolute top-1/3 left-20 w-16 h-16 bg-green-500/25 rounded-full opacity-50 animate-pulse delay-500 backdrop-blur-sm" />
      <div className="absolute bottom-1/4 left-12 w-20 h-20 bg-emerald-400/20 rounded-full opacity-45 animate-pulse delay-2000 backdrop-blur-sm" />
      <div className="absolute top-1/2 right-24 text-green-300/40">
        <Tractor size={70} className="animate-pulse delay-700" />
      </div>
      
      {/* Subtle wheat/crop silhouettes */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-900/30 to-transparent" />
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          {/* Main Logo with enhanced visibility */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/6a15e91c-f372-4075-b626-ce095ce25ae6.png" 
              alt="Refresh Logo" 
              className="h-24 sm:h-32 lg:h-40 w-auto mx-auto mb-6 drop-shadow-2xl"
            />
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            Automated. Precise.
            <span className="text-green-300 block">Revolutionary.</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-green-50 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Transform your agricultural operations with our advanced robotics arm 
            designed for precision farming and automated crop management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-green-600/90 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/25 border border-green-500/30">
              View Demo
            </button>
            <button className="border-2 border-green-400/80 text-green-100 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600/80 hover:text-white transition-all duration-300 backdrop-blur-sm shadow-xl">
              Request Quote
            </button>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-green-300 drop-shadow-lg" size={32} />
      </div>
    </section>
  );
};

export default HeroSection;
