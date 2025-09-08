import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
const Contact = () => {
    return (<div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 mb-6">
              Get In <span className="text-green-600">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to revolutionize your agricultural operations? We'd love to hear from you 
              and help you find the perfect robotics solution for your farm.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Information</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Phone className="text-green-600" size={20}/>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Phone</div>
                    <div className="text-gray-600">+1 (555) ROBOT-ARM</div>
                    <div className="text-gray-600">+1 (555) 762-6827</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Mail className="text-green-600" size={20}/>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Email</div>
                    <div className="text-gray-600">info@refreshrobotics.com</div>
                    <div className="text-gray-600">support@refreshrobotics.com</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="text-green-600" size={20}/>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Address</div>
                    <div className="text-gray-600">456 Innovation Drive</div>
                    <div className="text-gray-600">Tech Valley, CA 94301</div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Options */}
              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Contact</h3>
                <div className="space-y-3">
                  <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
                    <Phone size={20} className="mr-2"/>
                    Schedule a Call
                  </button>
                  <button className="w-full border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors flex items-center justify-center">
                    <MessageCircle size={20} className="mr-2"/>
                    Live Chat
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-green-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Send Us a Message</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"/>
                  <input type="text" placeholder="Last Name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"/>
                </div>
                
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"/>
                
                <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"/>
                
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Select Inquiry Type</option>
                  <option value="demo">Product Demo</option>
                  <option value="quote">Request Quote</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
                
                <textarea rows={5} placeholder="Tell us about your farming operation and how we can help..." className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"/>
                
                <button type="submit" className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
                  <Send size={20} className="mr-2"/>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>);
};
export default Contact;
