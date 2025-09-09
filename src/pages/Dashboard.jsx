import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tractor, ShoppingCart, Heart } from 'lucide-react';
const Dashboard = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!loading && !user) {
            navigate('/auth');
        }
    }, [user, loading, navigate]);
    if (loading) {
        return (<div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>);
    }
    if (!user) {
        return null;
    }
    return (<div className="min-h-screen">
      <Header />
      
      {/* Hero-like section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100"/>
        <div className="absolute inset-0 bg-pattern opacity-30"/>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-20 animate-pulse"/>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-emerald-200 to-green-400 rounded-full opacity-10 animate-pulse delay-1000"/>
        <div className="absolute top-1/2 right-20 text-green-200 opacity-30">
          <Tractor size={60}/>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          <div className="animate-fade-in">
            {/* Welcome message */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight text-shadow">
              Welcome Back!
              <span className="text-green-600 block">Ready to Revolutionize?</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Choose your path to advanced agricultural automation.
            </p>
            
            {/* Action Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-green-200">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit group-hover:bg-green-200 transition-colors">
                    <ShoppingCart className="w-8 h-8 text-green-600"/>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">Buy Now</CardTitle>
                  <CardDescription className="text-gray-600">
                    Purchase our advanced robotics arm for immediate deployment
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-6" onClick={() => navigate('/purchase')}>
                    Purchase Robotics Arm
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-green-200">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit group-hover:bg-green-200 transition-colors">
                    <Heart className="w-8 h-8 text-green-600"/>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">Adopt</CardTitle>
                  <CardDescription className="text-gray-600">
                    Explore our interactive 3D farm and adopt sustainable solutions
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-lg py-6" onClick={() => navigate('/farm')}>
                    Visit Interactive Farm
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>);
};
export default Dashboard;
