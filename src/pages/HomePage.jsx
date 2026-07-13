import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductGallerySection from '@/components/ProductGallerySection';
import CustomCTASection from '@/components/CustomCTASection';
import TestimonialsSection from '@/components/TestimonialsSection';
import OrderProcessSection from '@/components/OrderProcessSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import MyStorySection from '@/components/MyStorySection';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#FDF6F9]">
      <Header />
      <main>
        <HeroSection />
        <ProductGallerySection />
        <CustomCTASection />
        <TestimonialsSection />
        <OrderProcessSection />
        <FAQSection />
        <ContactSection />
        <MyStorySection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
