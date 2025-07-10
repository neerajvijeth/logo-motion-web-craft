
import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Send, Sparkles, ArrowRight, Zap } from 'lucide-react';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-500/10" />
      <div className="absolute inset-0 bg-dots opacity-20" />
      
      {/* Animated Background Orbs */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary mr-2 animate-pulse" />
            <span className="text-sm font-medium text-primary">Get In Touch</span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-foreground">Ready to</span>
            <br />
            <span className="gradient-text">Transform</span>
            <br />
            <span className="text-foreground">Your Farm?</span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Let's discuss how our revolutionary robotics solutions can 
            revolutionize your agricultural operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="glass rounded-3xl p-8 border border-white/10 hover:border-primary/30 transition-all duration-500">
              <h3 className="text-3xl font-bold text-foreground mb-8 flex items-center">
                <Zap className="w-8 h-8 text-primary mr-3" />
                Contact Information
              </h3>
              
              <div className="space-y-8">
                {[
                  { icon: Phone, title: "Phone", content: "+1 (555) ROBOT-ARM", subtitle: "+1 (555) 762-6827" },
                  { icon: Mail, title: "Email", content: "info@refreshrobotics.com", subtitle: "support@refreshrobotics.com" },
                  { icon: MapPin, title: "Address", content: "456 Innovation Drive", subtitle: "Tech Valley, CA 94301" }
                ].map((item, index) => (
                  <div key={index} className="group flex items-start space-x-4 p-4 rounded-2xl hover:bg-primary/5 transition-all duration-300">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-lg">{item.title}</div>
                      <div className="text-foreground/80">{item.content}</div>
                      {item.subtitle && <div className="text-foreground/60 text-sm">{item.subtitle}</div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 space-y-4">
                <button className="w-full group relative px-6 py-4 bg-gradient-to-r from-primary to-blue-500 text-primary-foreground rounded-2xl font-semibold overflow-hidden hover-lift transition-all duration-300">
                  <span className="relative z-10 flex items-center justify-center">
                    <Phone className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    Schedule a Call
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                
                <button className="w-full group glass border-2 border-primary/30 text-foreground px-6 py-4 rounded-2xl font-semibold hover:border-primary/50 hover:text-primary transition-all duration-300">
                  <span className="flex items-center justify-center">
                    <Sparkles className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    Live Chat
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div className="glass rounded-3xl p-8 border border-white/10 hover:border-primary/30 transition-all duration-500">
              <h3 className="text-3xl font-bold text-foreground mb-8">Send Message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 glass rounded-2xl border border-white/10 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 glass rounded-2xl border border-white/10 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                    />
                  </div>
                </div>
                
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 glass rounded-2xl border border-white/10 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                />
                
                <textarea 
                  rows={5}
                  name="message"
                  placeholder="Tell us about your farming operation and how we can help transform it..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 glass rounded-2xl border border-white/10 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 resize-none custom-scrollbar"
                />
                
                <button 
                  type="submit"
                  className="group relative w-full px-6 py-5 bg-gradient-to-r from-primary to-blue-500 text-primary-foreground rounded-2xl font-semibold overflow-hidden hover-lift hover-glow transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <Send className="mr-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    Send Message
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
