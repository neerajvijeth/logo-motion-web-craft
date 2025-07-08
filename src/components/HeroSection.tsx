
import { useEffect, useState } from 'react';
import { ChevronDown, Tractor, ArrowRight, PlayCircle } from 'lucide-react';

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
          <div className="w-full h-full bg-gradient-to-br from-green-800 via-green-700 to-green-900" />
        </video>
        
        {/* Green overlay for cohesive green theme */}
        <div className="absolute inset-0 bg-green-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-green-800/20 to-green-700/30" />
      </div>
      
      {/* Enhanced green agricultural pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-gradient-to-br from-green-400/20 via-transparent to-green-600/25" />
        <div className="absolute inset-0 bg-pattern opacity-50" />
      </div>
      
      {/* Floating green agricultural elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-green-400/30 rounded-full opacity-70 animate-pulse backdrop-blur-sm" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-green-300/25 rounded-full opacity-60 animate-pulse delay-1000 backdrop-blur-sm" />
      <div className="absolute top-1/3 left-20 w-16 h-16 bg-green-500/35 rounded-full opacity-65 animate-pulse delay-500 backdrop-blur-sm" />
      <div className="absolute bottom-1/4 left-12 w-20 h-20 bg-green-400/30 rounded-full opacity-55 animate-pulse delay-2000 backdrop-blur-sm" />
      <div className="absolute top-1/2 right-24 text-green-300/50">
        <Tractor size={70} className="animate-pulse delay-700" />
      </div>
      
      {/* Green crop silhouettes */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-900/40 to-transparent" />
      
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
            <span className="text-green-200 block">Revolutionary.</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-green-50 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Transform your agricultural operations with our advanced robotics arm 
            designed for precision farming and automated crop management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-green-500/90 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-400/25 border border-green-400/30 flex items-center gap-2">
              <PlayCircle size={20} />
              Watch Demo
            </button>
            <button className="border-2 border-green-300/80 text-green-100 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-500/80 hover:text-white transition-all duration-300 backdrop-blur-sm shadow-xl flex items-center gap-2">
              Get Started
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Enhanced green scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-green-200 drop-shadow-lg" size={32} />
      </div>
    </section>
  );
};

export default HeroSection;
