
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, Target, Award, Globe, CheckCircle, TrendingUp, Lightbulb, Heart, Sparkles, ArrowRight, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <Header />
      
      {/* Hero Section with Enhanced Design */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/10 to-purple-500/10" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        {/* Animated Orbs */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary mr-2 animate-pulse" />
              <span className="text-sm font-medium text-primary">About Our Company</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6">
              <span className="text-foreground">About</span>
              <br />
              <span className="gradient-text">eRefresh Robotics</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
              Pioneering the future of agriculture through intelligent automation solutions 
              that revolutionize farming practices and increase operational efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section with Glass Morphism */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Farms Automated", icon: TrendingUp, color: "from-primary to-blue-500" },
              { number: "99.9%", label: "Uptime Reliability", icon: CheckCircle, color: "from-blue-500 to-purple-500" },
              { number: "2020", label: "Year Founded", icon: Lightbulb, color: "from-purple-500 to-pink-500" },
              { number: "50+", label: "Team Members", icon: Users, color: "from-pink-500 to-primary" }
            ].map((stat, index) => (
              <div key={index} className="group text-center animate-scale-in" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="glass rounded-3xl p-8 hover:border-primary/30 border border-white/10 transition-all duration-500 hover-lift">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-foreground mb-2 gradient-text">{stat.number}</h3>
                  <p className="text-foreground/70">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story with Modern Design */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-background to-purple-500/5" />
        <div className="absolute top-10 right-20 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-primary/10 rounded-full blur-3xl animate-float" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div>
                <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
                  <Heart className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm font-medium text-primary">Our Journey</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Our <span className="gradient-text">Story</span>
                </h2>
                
                <div className="space-y-6 text-lg text-foreground/70 leading-relaxed">
                  <p className="transform hover:translate-x-2 transition-transform duration-300">
                    Founded in 2020, eRefresh Robotics emerged from a simple yet powerful vision: 
                    to transform agriculture through cutting-edge robotics technology. Our team of 
                    engineers and agricultural experts recognized the growing challenges facing 
                    modern farming operations.
                  </p>
                  <p className="transform hover:translate-x-2 transition-transform duration-300">
                    Labor shortages, increasing demand for food production, and the need for 
                    sustainable farming practices drove us to develop our revolutionary robotic arm 
                    solution. Today, we're proud to be at the forefront of agricultural automation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-in-right">
              <div className="glass rounded-3xl p-12 text-center relative overflow-hidden group hover-lift border border-white/10 hover:border-primary/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Award className="w-20 h-20 text-primary mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                <h3 className="text-3xl font-bold text-foreground mb-4 gradient-text">Innovation Award</h3>
                <p className="text-foreground/70 text-lg">AgTech Innovation of the Year 2023</p>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section with Enhanced Design */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-purple-500/5 to-background" />
        <div className="absolute inset-0 bg-dots opacity-10" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-6">
              <Target className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Core Values</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Our</span> <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              The principles that guide everything we do and drive our innovation forward
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Target, title: "Precision", description: "Delivering accuracy in every operation", color: "from-primary to-blue-500" },
              { icon: Globe, title: "Sustainability", description: "Protecting our planet for future generations", color: "from-blue-500 to-purple-500" },
              { icon: Users, title: "Partnership", description: "Working together with farmers worldwide", color: "from-purple-500 to-pink-500" },
              { icon: Award, title: "Excellence", description: "Striving for the highest quality standards", color: "from-pink-500 to-primary" }
            ].map((value, index) => (
              <div key={index} className="group text-center animate-scale-in" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="glass rounded-3xl p-8 h-full hover:border-primary/30 border border-white/10 transition-all duration-500 hover-lift">
                  <div className="relative mb-8">
                    <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl`}>
                      <value.icon className="w-10 h-10 text-white transition-colors duration-500" />
                    </div>
                    <div className={`absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br ${value.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl`} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">{value.title}</h3>
                  <p className="text-foreground/70 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement with Modern Design */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-500/10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 glass rounded-full mb-8">
              <Heart className="w-4 h-4 text-primary mr-2 animate-pulse" />
              <span className="text-sm font-medium text-primary">Our Mission</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">
              <span className="gradient-text">Our Mission</span>
            </h2>
            
            <p className="text-xl sm:text-2xl leading-relaxed mb-12 text-foreground/70">
              To empower farmers worldwide with intelligent robotic solutions that increase productivity, 
              reduce costs, and promote sustainable agricultural practices for a better tomorrow.
            </p>
            
            <div className="glass rounded-3xl px-10 py-6 border border-primary/20 inline-block hover:border-primary/40 transition-all duration-300">
              <p className="text-lg font-semibold gradient-text flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Building the Future of Farming, Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
