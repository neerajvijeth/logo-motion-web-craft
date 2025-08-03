import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check URL params to determine mode
    const mode = searchParams.get('mode');
    if (mode === 'signup') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [searchParams]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        navigate('/dashboard');
      } else {
        const { error } = await signUp(email, password);
        if (error) throw error;
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-pattern opacity-30" />
      
      {/* Floating decorative elements with enhanced animations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-emerald-200 to-green-400 rounded-full opacity-10 animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-5 w-20 h-20 bg-gradient-to-br from-green-300 to-emerald-400 rounded-full opacity-15 animate-bounce delay-500" />
      <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-gradient-to-br from-emerald-300 to-green-500 rounded-full opacity-20 animate-pulse delay-700" />
      
      {/* Animated particles */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-green-400 rounded-full opacity-40 animate-ping delay-300" />
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-emerald-400 rounded-full opacity-30 animate-ping delay-1000" />
      <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-green-500 rounded-full opacity-50 animate-ping delay-500" />
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-green-200 backdrop-blur-sm bg-white/95 animate-fade-in">
        <CardHeader className="text-center relative">
          <div className="animate-fade-in">
            <img 
              src="/lovable-uploads/6a15e91c-f372-4075-b626-ce095ce25ae6.png" 
              alt="Refresh Logo" 
              className="h-16 w-auto mx-auto mb-4 hover:scale-110 transition-transform duration-300"
            />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in delay-200">
            {isLogin ? 'Welcome Back!' : 'Join the Future'}
          </CardTitle>
          <CardDescription className="text-gray-600 animate-fade-in delay-300">
            {isLogin 
              ? 'Sign in to your Refresh Robotics account' 
              : 'Create your account and start your journey'
            }
          </CardDescription>
          
          {/* Animated underline */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-scale-in delay-500"></div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in delay-400">
            <div className="space-y-4">
              <div className="relative group">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 pl-4 pr-4 py-3 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                />
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              
              <div className="relative group">
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 pl-4 pr-4 py-3 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                />
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              disabled={loading}
            >
              <span className="relative z-10">
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Loading...</span>
                  </div>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </form>
          
          <div className="text-center animate-fade-in delay-600">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-green-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>
            
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="mt-4 text-green-600 hover:text-green-700 font-medium transition-colors duration-300 hover:underline group"
            >
              <span className="relative">
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;