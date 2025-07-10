
import { Heart, Sparkles, ArrowUp, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-dots opacity-10" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo and Description */}
            <div className="md:col-span-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                  <img 
                    src="/lovable-uploads/c316a4e3-055f-45ec-8e75-527099637b8c.png" 
                    alt="eRefresh Logo" 
                    className="relative h-12 w-auto hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="ml-3 text-2xl font-bold gradient-text">eRefresh</span>
              </div>
              
              <p className="text-foreground/70 leading-relaxed mb-6 max-w-md mx-auto md:mx-0">
                eRefresh Robotics is pioneering the future of agriculture with intelligent 
                automation solutions that increase efficiency and reduce labor costs.
              </p>

              {/* Social Links */}
              <div className="flex justify-center md:justify-start space-x-4">
                {[
                  { icon: Github, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Linkedin, href: "#" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="group p-3 glass rounded-2xl hover:bg-primary/10 transition-all duration-300 hover-lift"
                  >
                    <social.icon className="w-5 h-5 text-foreground/60 group-hover:text-primary transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center justify-center md:justify-start">
                <Sparkles className="w-5 h-5 text-primary mr-2" />
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About" },
                  { href: "#products", label: "Products" },
                  { href: "/contact", label: "Contact" }
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-foreground/70 hover:text-primary transition-colors duration-300 relative group"
                    >
                      <span className="relative z-10">{link.label}</span>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-blue-500 group-hover:w-full transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-foreground mb-6">Contact</h3>
              <ul className="space-y-3 text-foreground/70">
                <li className="hover:text-primary transition-colors duration-300">
                  +1 (555) ROBOT-ARM
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  info@erefreshrobotics.com
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  456 Innovation Drive<br />
                  Tech Valley, CA 94301
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-foreground/70 flex items-center mb-4 md:mb-0">
                Made with <Heart className="text-red-500 mx-2 animate-pulse" size={16} /> by eRefresh Robotics Team
              </p>
              
              <div className="flex items-center space-x-4">
                <p className="text-foreground/50 text-sm">
                  © 2024 eRefresh Robotics. All rights reserved.
                </p>
                
                {/* Scroll to Top Button */}
                <button
                  onClick={scrollToTop}
                  className="group p-3 glass rounded-2xl hover:bg-primary/10 transition-all duration-300 hover-lift"
                  aria-label="Scroll to top"
                >
                  <ArrowUp className="w-5 h-5 text-foreground/60 group-hover:text-primary transition-colors duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
