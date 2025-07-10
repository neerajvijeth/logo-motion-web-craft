
import { useEffect, useRef, useState } from 'react';
import { Cpu, Zap, Target, ArrowRight, Sparkles } from 'lucide-react';

const ProductsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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
      icon: Target,
      title: "Precision Harvesting",
      description: "Advanced computer vision and AI algorithms enable precise fruit and vegetable harvesting with minimal waste and maximum efficiency.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      icon: Zap,
      title: "Automated Operations",
      description: "24/7 operation capability with intelligent task scheduling and autonomous navigation between crop rows for continuous productivity.",
      image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gradient: "from-primary/20 to-blue-500/20"
    },
    {
      icon: Cpu,
      title: "Smart Integration",
      description: "Seamless integration with existing farm management systems and IoT sensors for data-driven decisions and optimal performance.",
      image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gradient: "from-purple-500/20 to-pink-500/20"
    }
  ];

  return (
    <section id="products" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-dots opacity-20" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Agricultural Innovation</span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="gradient-text">Next-Gen</span>
            <br />
            <span className="text-foreground">Robotics Arm</span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Our state-of-the-art robotics arm brings unprecedented precision, 
            efficiency, and automation to modern farming operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-1000 hover-lift ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Glass Container */}
                <div className="glass rounded-3xl overflow-hidden h-full border border-white/10 hover:border-primary/30 transition-all duration-500">
                  {/* Image Section with Overlay */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${feature.gradient} opacity-60`} />
                    
                    {/* Floating Icon */}
                    <div className="absolute top-6 right-6 p-3 glass rounded-2xl">
                      <IconComponent className={`w-6 h-6 text-primary transition-all duration-500 ${
                        hoveredCard === index ? 'rotate-12 scale-110' : ''
                      }`} />
                    </div>

                    {/* Animated Border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-3xl transition-all duration-500" />
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-foreground/70 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    
                    {/* CTA Button */}
                    <button className="group/btn relative px-6 py-3 bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/20 text-primary rounded-xl font-medium overflow-hidden hover:border-primary/40 transition-all duration-300">
                      <span className="relative z-10 flex items-center">
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </button>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500 -z-10`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
