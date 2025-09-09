import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, Target, Award, Globe, CheckCircle, TrendingUp, Lightbulb, Heart } from 'lucide-react';
const About = () => {
    return (<div className="min-h-screen overflow-hidden">
      <Header />
      
      {/* Hero Section with Animated Background */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="absolute inset-0 bg-pattern opacity-30"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl sm:text-7xl font-bold text-gray-800 mb-6">
              About <span className="text-green-600 relative">
                eRefresh Robotics
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full transform scale-x-0 animate-[scale-x-100_1s_ease-out_0.5s_forwards]"></div>
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Pioneering the future of agriculture through intelligent automation solutions 
              that revolutionize farming practices and increase operational efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
            { number: "500+", label: "Farms Automated", icon: TrendingUp },
            { number: "99.9%", label: "Uptime Reliability", icon: CheckCircle },
            { number: "2020", label: "Year Founded", icon: Lightbulb },
            { number: "50+", label: "Team Members", icon: Users }
        ].map((stat, index) => (<div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 group-hover:bg-green-600 transition-all duration-500 group-hover:scale-110">
                  <stat.icon className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-500"/>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>))}
          </div>
        </div>
      </section>

      {/* Our Story with Enhanced Design */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-green-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-20 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-bounce"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6 relative">
                  Our Story
                  <div className="absolute -bottom-2 left-0 w-20 h-1 bg-green-600 rounded-full"></div>
                </h2>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p className="transform hover:translate-x-2 transition-transform duration-300">
                    Founded in 2020, eRefresh Robotics emerged from a simple yet powerful vision: 
                    to transform agriculture through cutting-edge robotics technology. Our team of 
                    engineers and agricultural experts recognized the growing challenges facing 
                    modern farming operations.
                  </p>
                  <p className="transform hover:translate-x-2 transition-transform duration-300 delay-75">
                    Labor shortages, increasing demand for food production, and the need for 
                    sustainable farming practices drove us to develop our revolutionary robotic arm 
                    solution. Today, we're proud to be at the forefront of agricultural automation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-12 text-center relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <Award className="w-20 h-20 text-green-600 mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"/>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Innovation Award</h3>
                <p className="text-gray-600 text-lg">AgTech Innovation of the Year 2023</p>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 group-hover:scale-150 transition-transform duration-700"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and drive our innovation forward
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
            { icon: Target, title: "Precision", description: "Delivering accuracy in every operation" },
            { icon: Globe, title: "Sustainability", description: "Protecting our planet for future generations" },
            { icon: Users, title: "Partnership", description: "Working together with farmers worldwide" },
            { icon: Award, title: "Excellence", description: "Striving for the highest quality standards" }
        ].map((value, index) => (<div key={index} className="group text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl group-hover:bg-green-600">
                    <value.icon className="w-10 h-10 text-green-600 group-hover:text-white transition-colors duration-500"/>
                  </div>
                  <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-green-200 to-green-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors duration-300">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{value.description}</p>
              </div>))}
          </div>
        </div>
      </section>

      {/* Mission Statement with Visual Enhancement */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-white rounded-full mix-blend-soft-light opacity-5 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-white rounded-full mix-blend-soft-light opacity-5 animate-pulse delay-75"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Heart className="w-16 h-16 mx-auto mb-8 text-green-200 animate-pulse"/>
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">Our Mission</h2>
            <p className="text-xl leading-relaxed mb-8 text-green-100">
              To empower farmers worldwide with intelligent robotic solutions that increase productivity, 
              reduce costs, and promote sustainable agricultural practices for a better tomorrow.
            </p>
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20">
              <p className="text-lg font-semibold">Building the Future of Farming, Today</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>);
};
export default About;
