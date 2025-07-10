
import { useEffect, useState } from 'react';
import { ChevronDown, Sparkles, Zap, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-full blur-3xl animate-float"
          style={{ 
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` 
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-primary/40 rounded-full blur-3xl animate-float"
          style={{ 
            animationDelay: '2s',
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)` 
          }}
        />
        <div 
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-purple-500/25 to-pink-500/25 rounded-full blur-2xl animate-pulse-slow"
          style={{ 
            animationDelay: '1s',
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)` 
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-pulse" />
          <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/3 right-20 w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="animate-fade-in-up">
          {/* Enhanced Logo with Glow */}
          <div className="mb-12 relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-glow" />
            <img 
              src="/lovable-uploads/6a15e91c-f372-4075-b626-ce095ce25ae6.png" 
              alt="eRefresh Logo" 
              className="relative h-32 sm:h-40 lg:h-48 w-auto mx-auto mb-6 hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          {/* Main Heading with Gradient Text */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="block gradient-text animate-shimmer bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-[length:200%_100%]">
              Automated.
            </span>
            <span className="block text-foreground mt-2">
              Precise.
            </span>
            <span className="block gradient-text-warm animate-shimmer bg-gradient-to-r from-pink-500 via-primary to-blue-500 bg-[length:200%_100%] mt-2">
              Revolutionary.
            </span>
          </h1>
          
          {/* Enhanced Description */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-foreground/80 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Transform your agricultural operations with our 
            <span className="text-primary font-semibold"> AI-powered robotics arm </span>
            designed for precision farming and automated crop management.
          </p>
          
          {/* CTA Buttons with Enhanced Design */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="group relative px-10 py-5 bg-gradient-to-r from-primary to-blue-500 text-primary-foreground rounded-2xl text-lg font-semibold overflow-hidden hover-lift hover-glow transition-all duration-300 min-w-[200px]">
              <span className="relative z-10 flex items-center justify-center">
                <Sparkles size={20} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                View Demo
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button className="group relative px-10 py-5 glass border-2 border-primary/30 text-foreground rounded-2xl text-lg font-semibold overflow-hidden hover-lift transition-all duration-300 min-w-[200px] hover:border-primary/50">
              <span className="relative z-10 flex items-center justify-center group-hover:text-primary transition-colors duration-300">
                Request Quote
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Floating Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Zap, title: "24/7 Operation", delay: "0ms" },
              { icon: Sparkles, title: "AI-Powered", delay: "200ms" },
              { icon: ArrowRight, title: "Easy Integration", delay: "400ms" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="glass rounded-2xl p-6 hover-lift hover-glow transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: feature.delay }}
              >
                <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-lg animate-pulse" />
          <div className="relative glass rounded-full p-3">
            <ChevronDown className="text-primary w-6 h-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
