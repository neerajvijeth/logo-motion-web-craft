
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2 text-center md:text-left">
            <img 
              src="/lovable-uploads/c316a4e3-055f-45ec-8e75-527099637b8c.png" 
              alt="Refresh Logo" 
              className="h-12 w-auto mb-4 mx-auto md:mx-0"
            />
            <p className="text-gray-300 leading-relaxed mb-4 max-w-md mx-auto md:mx-0">
              Refresh Robotics is pioneering the future of agriculture with intelligent 
              automation solutions that increase efficiency and reduce labor costs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-green-400 transition-colors">Home</a></li>
              <li><a href="#products" className="text-gray-300 hover:text-green-400 transition-colors">Product</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-green-400 transition-colors">Technology</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-green-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>+1 (555) ROBOT-ARM</li>
              <li>info@refreshrobotics.com</li>
              <li>456 Innovation Drive<br />Tech Valley, CA 94301</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 flex items-center justify-center">
            Made with <Heart className="text-red-500 mx-1" size={16} /> by Refresh Robotics Team
          </p>
          <p className="text-gray-400 text-sm mt-2">
            © 2024 Refresh Robotics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
