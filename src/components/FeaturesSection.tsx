
import { useEffect, useRef, useState } from 'react';
import { Leaf, Shield, Truck, Heart } from 'lucide-react';

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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
      icon: Leaf,
      title: "100% Natural",
      description: "All our products are sourced from natural, organic ingredients without any artificial additives."
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Rigorous quality control ensures every product meets our highest standards of excellence."
    },
    {
      icon: Truck,
      title: "Fresh Delivery",
      description: "Fast, reliable delivery service ensures your products arrive fresh and ready to enjoy."
    },
    {
      icon: Heart,
      title: "Health Focused",
      description: "Every product is designed with your health and wellness in mind, promoting a better lifestyle."
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Why Choose Refresh?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to delivering the freshest, highest quality products 
            that support your healthy lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className={`text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-white border border-green-100 transform transition-all duration-1000 hover:scale-105 hover:shadow-lg ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full mb-4">
                  <IconComponent size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
