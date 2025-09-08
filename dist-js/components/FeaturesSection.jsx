import { useEffect, useRef, useState } from 'react';
import { Cpu, Battery, Wifi, Settings } from 'lucide-react';
const FeaturesSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => observer.disconnect();
    }, []);
    const features = [
        {
            icon: Cpu,
            title: "AI-Powered Vision",
            description: "Advanced machine learning algorithms identify ripe crops and optimize harvesting patterns for maximum yield."
        },
        {
            icon: Battery,
            title: "Extended Runtime",
            description: "High-capacity battery system provides up to 12 hours of continuous operation with fast charging capabilities."
        },
        {
            icon: Wifi,
            title: "Remote Monitoring",
            description: "Real-time monitoring and control through our mobile app and web dashboard for complete operational oversight."
        },
        {
            icon: Settings,
            title: "Easy Maintenance",
            description: "Modular design with self-diagnostic features makes maintenance simple and minimizes downtime."
        }
    ];
    return (<section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Advanced Technology Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built with cutting-edge technology to deliver reliable, efficient, 
            and intelligent agricultural automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (<div key={index} className={`text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-white border border-green-100 transform transition-all duration-1000 hover:scale-105 hover:shadow-lg relative overflow-hidden group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                {/* Smooth border tracing animation */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl border-tracing-line"></div>
                </div>

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={28}/>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>);
        })}
        </div>
      </div>
    </section>);
};
export default FeaturesSection;
