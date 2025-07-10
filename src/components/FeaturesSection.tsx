
import { useEffect, useRef, useState } from 'react';
import { Cpu, Battery, Wifi, Settings, Sparkles, ArrowRight } from 'lucide-react';

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Cpu,
      title: "AI-Powered Vision",
      description: "Advanced machine learning algorithms identify ripe crops and optimize harvesting patterns for maximum yield and efficiency.",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Battery,
      title: "Extended Runtime",
      description: "High-capacity battery system provides up to 12 hours of continuous operation with fast charging capabilities.",
      color: "from-primary to-blue-500"
    },
    {
      icon: Wifi,
      title: "Remote Monitoring",
      description: "Real-time monitoring and control through our mobile app and web dashboard for complete operational oversight.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Settings,
      title: "Easy Maintenance",
      description: "Modular design with self-diagnostic features makes maintenance simple and minimizes downtime.",
      color: "from-pink-500 to-primary"
    }
  ];

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-purple-500/5 to-background" />
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      {/* Animated Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary mr-2 animate-pulse" />
            <span className="text-sm font-medium text-primary">Advanced Technology</span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-foreground">Cutting-Edge</span>
            <br />
            <span className="gradient-text">Features</span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Built with revolutionary technology to deliver reliable, efficient, 
            and intelligent agricultural automation solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className={`group relative transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                {/* Main Card */}
                <div className="relative h-full p-8 glass rounded-3xl border border-white/10 hover:border-primary/30 transition-all duration-500 hover-lift overflow-hidden">
                  
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    
                    {/* Icon Glow Effect */}
                    <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-foreground/70 leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    {/* Learn More Button */}
                    <button className="group/btn inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300">
                      <span className="text-sm font-medium">Learn More</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>

                  {/* Hover Border Animation */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <div className={`absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:${feature.color} rounded-3xl transition-all duration-500`} />
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-primary/30 rounded-full group-hover:bg-primary group-hover:w-3 group-hover:h-3 transition-all duration-300" />
                </div>

                {/* External Glow on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-500 -z-10 scale-95 group-hover:scale-100`} />
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '800ms' }}>
          <button className="group relative px-10 py-5 bg-gradient-to-r from-primary to-blue-500 text-primary-foreground rounded-2xl text-lg font-semibold overflow-hidden hover-lift hover-glow transition-all duration-300">
            <span className="relative z-10 flex items-center">
              <Sparkles className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Explore All Features
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
