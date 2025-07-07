
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <img 
              src="/lovable-uploads/6a15e91c-f372-4075-b626-ce095ce25ae6.png" 
              alt="Refresh Logo" 
              className="h-12 w-auto mb-4 filter brightness-0 invert"
            />
            <p className="text-gray-300 leading-relaxed mb-4 max-w-md">
              Refresh is dedicated to bringing you the finest natural products, 
              sourced responsibly and delivered fresh to support your healthy lifestyle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-green-400 transition-colors">Home</a></li>
              <li><a href="#products" className="text-gray-300 hover:text-green-400 transition-colors">Products</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-green-400 transition-colors">About</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-green-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>+1 (555) 123-4567</li>
              <li>hello@refresh.com</li>
              <li>123 Fresh Street<br />Natural City, NC 12345</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 flex items-center justify-center">
            Made with <Heart className="text-red-500 mx-1" size={16} /> by Refresh Team
          </p>
          <p className="text-gray-400 text-sm mt-2">
            © 2024 Refresh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
