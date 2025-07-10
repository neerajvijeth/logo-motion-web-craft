
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Send, MessageCircle, Sparkles, ArrowRight, Zap, Clock, Award } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section with Modern Design */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/10 to-purple-500/10" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        {/* Animated Orbs */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary mr-2 animate-pulse" />
              <span className="text-sm font-medium text-primary">Contact Us</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6">
              <span className="text-foreground">Get In</span>
              <br />
              <span className="gradient-text">Touch</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
              Ready to revolutionize your agricultural operations? We'd love to hear from you 
              and help you find the perfect robotics solution for your farm.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form with Enhanced Design */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info with Modern Cards */}
            <div className="space-y-8">
              <div className="glass rounded-3xl p-8 border border-white/10 hover:border-primary/30 transition-all duration-500">
                <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
                  <Zap className="w-8 h-8 text-primary mr-3" />
                  Contact Information
                </h2>
                
                <div className="space-y-6 mb-8">
                  {[
                    { 
                      icon: Phone, 
                      title: "Phone", 
                      content: "+1 (555) ROBOT-ARM", 
                      subtitle: "+1 (555) 762-6827",
                      color: "from-primary to-blue-500"
                    },
                    { 
                      icon: Mail, 
                      title: "Email", 
                      content: "info@erefreshrobotics.com", 
                      subtitle: "support@erefreshrobotics.com",
                      color: "from-blue-500 to-purple-500"
                    },
                    { 
                      icon: MapPin, 
                      title: "Address", 
                      content: "456 Innovation Drive", 
                      subtitle: "Tech Valley, CA 94301",
                      color: "from-purple-500 to-pink-500"
                    }
                  ].map((item, index) => (
                    <div key={index} className="group flex items-start space-x-4 p-4 rounded-2xl hover:bg-primary/5 transition-all duration-300">
                      <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
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

                {/* Quick Contact Buttons */}
                <div className="space-y-4">
                  <button className="w-full group relative px-6 py-4 bg-gradient-to-r from-primary to-blue-500 text-primary-foreground rounded-2xl font-semibold overflow-hidden hover-lift transition-all duration-300">
                    <span className="relative z-10 flex items-center justify-center">
                      <Phone className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      Schedule a Call
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                  
                  <button className="w-full group glass border-2 border-primary/30 text-foreground px-6 py-4 rounded-2xl font-semibold hover:border-primary/50 hover:text-primary transition-all duration-300">
                    <span className="flex items-center justify-center">
                      <MessageCircle className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      Live Chat
                    </span>
                  </button>
                </div>
              </div>

              {/* Additional Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-6 text-center border border-white/10 hover:border-primary/30 transition-all duration-300 hover-lift">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Response Time</h3>
                  <p className="text-foreground/70 text-sm">Within 24 hours</p>
                </div>
                
                <div className="glass rounded-2xl p-6 text-center border border-white/10 hover:border-primary/30 transition-all duration-300 hover-lift">
                  <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Support</h3>
                  <p className="text-foreground/70 text-sm">24/7 Available</p>
                </div>
              </div>
            </div>

            {/* Enhanced Contact Form */}
            <div className="glass rounded-3xl p-8 border border-white/10 hover:border-primary/30 transition-all duration-500">
              <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
                <Send className="w-8 h-8 text-primary mr-3" />
                Send Us a Message
              </h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="First Name"
                      className="w-full px-6 py-4 glass rounded-2xl border border-white/10 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 group-hover:border-white/20"
                    />
                  </div>
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Last Name"
                      className="w-full px-6 py-4 glass rounded-2xl border border-white/10 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 group-hover:border-white/20"
                    />
                  </div>
                </div>
                
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="w-full px-6 py-4 glass rounded-2xl border border-white/10 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 hover:border-white/20"
                />
                
                <input 
                  type="tel" 
                  placeholder="Phone Number"
                  className="w-full px-6 py-4 glass rounded-2xl border border-white/10 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 hover:border-white/20"
                />
                
                <select className="w-full px-6 py-4 glass rounded-2xl border border-white/10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 hover:border-white/20">
                  <option value="">Select Inquiry Type</option>
                  <option value="demo">Product Demo</option>
                  <option value="quote">Request Quote</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
                
                <textarea 
                  rows={5}
                  placeholder="Tell us about your farming operation and how we can help..."
                  className="w-full px-6 py-4 glass rounded-2xl border border-white/10 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 resize-none custom-scrollbar hover:border-white/20"
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
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
