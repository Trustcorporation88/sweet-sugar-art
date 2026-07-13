import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import ProductGallerySection from '@/components/ProductGallerySection.jsx';
import CustomCTASection from '@/components/CustomCTASection.jsx';
import TestimonialsSection from '@/components/TestimonialsSection.jsx';
import OrderProcessSection from '@/components/OrderProcessSection.jsx';
import FAQSection from '@/components/FAQSection.jsx';
import ContactSection from '@/components/ContactSection.jsx';
import MyStorySection from '@/components/MyStorySection.jsx';
import Footer from '@/components/Footer.jsx';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Cyntia Rinaldi Doces - Doces Premium Artesanais em Bauru</title>
        <meta
          name="description"
          content="Doces premium feitos à mão em Bauru. Brigadeiros gourmet, bolos personalizados e tortas artesanais para eventos e presentes. Entrega em Bauru com controle de qualidade."
        />
      </Helmet>

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
    </>
  );
};

export default HomePage;