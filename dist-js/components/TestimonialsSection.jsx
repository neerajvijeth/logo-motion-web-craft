import { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
const TestimonialsSection = () => {
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
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Health Enthusiast",
            content: "Refresh has completely transformed my daily routine. The quality and freshness of their products is unmatched!",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b332e234?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            name: "Michael Chen",
            role: "Fitness Coach",
            content: "I recommend Refresh to all my clients. Their natural products perfectly complement a healthy lifestyle.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            name: "Emma Davis",
            role: "Busy Professional",
            content: "The convenience and quality of Refresh products have made maintaining my health goals so much easier.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        }
    ];
    return (<section ref={sectionRef} className="py-20 bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made Refresh part of their daily wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (<div key={index} className={`bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-1000 hover:scale-105 hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 200}ms` }}>
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (<Star key={i} className="text-yellow-400 fill-current" size={20}/>))}
              </div>
              <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4"/>
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-green-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>))}
        </div>
      </div>
    </section>);
};
export default TestimonialsSection;
