import Header from '@/components/Header.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import ProductsSection from '@/components/ProductsSection.jsx';
import FeaturesSection from '@/components/FeaturesSection.jsx';
import ContactSection from '@/components/ContactSection.jsx';
import Footer from '@/components/Footer.jsx';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ProductsSection />
      <FeaturesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;