import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, MessageCircle, Mail, Lock } from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext.jsx';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isAdminLoggedIn } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ['home', 'produtos', 'depoimentos', 'processo', 'faq', 'historia', 'contato'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      navigate('/admin');
    } else {
      navigate('/admin/login');
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'produtos', label: 'Produtos' },
    { id: 'depoimentos', label: 'Depoimentos' },
    { id: 'processo', label: 'Como Pedir' },
    { id: 'historia', label: 'História' },
    { id: 'contato', label: 'Contato' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
          isScrolled 
            ? 'bg-[#FDF6F9]/95 backdrop-blur-md shadow-md py-2' 
            : 'bg-gradient-to-b from-[#F4D4E6]/90 to-transparent py-4 md:py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between w-full transition-all duration-700">
            
            {/* Left Side: Mobile Menu Button (Mobile) / Empty Space (Desktop) */}
            <div className="flex-1 flex justify-start items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 bg-gradient-to-br from-[#FFF8F0] to-white border border-[#D4AF37]/40 text-[#6B4423] hover:text-[#E85B8A] hover:border-[#E85B8A]/50 hover:shadow-[0_4px_12px_rgba(232,91,138,0.15)] rounded-full shadow-sm transition-all duration-300 flex items-center justify-center"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Center: Prominent Logo */}
            <div className="flex justify-center items-center">
              <button
                onClick={() => scrollToSection('home')}
                className="transition-all duration-700 relative group flex items-center justify-center"
                aria-label="Voltar ao início"
              >
                <img 
                  src="https://horizons-cdn.hostinger.com/b0ad3521-c093-45c6-810e-27730df283d8/501518ebfdde4f0237d304916b892e6f.jpg" 
                  alt="Cyntia Rinaldi Doces Personalizados Logo" 
                  className={`rounded-full object-cover shadow-md border-2 border-white/60 transition-all duration-700 group-hover:shadow-lg group-hover:scale-105 ${
                    isScrolled ? 'w-16 h-16 md:w-20 md:h-20' : 'w-24 h-24 md:w-32 md:h-32'
                  }`}
                />
              </button>
            </div>

            {/* Right Side: Desktop Navigation & Admin Lock */}
            <div className="flex-1 flex justify-end items-center gap-3 md:gap-6">
              
              {/* Desktop Navigation */}
              <nav className={`hidden md:flex items-center transition-all duration-700 ${
                isScrolled ? 'gap-4 lg:gap-6' : 'gap-5 lg:gap-8'
              }`}>
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`font-poppins text-xs lg:text-sm font-medium tracking-[0.15em] uppercase transition-all duration-300 relative group ${
                      activeSection === link.id ? 'text-[#6B4423]' : 'text-[#6B4423]/70'
                    } hover:text-[#E85B8A]`}
                  >
                    {link.label}
                    <span className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-px bg-[#E85B8A] transition-all duration-300 group-hover:w-full ${
                      activeSection === link.id ? 'w-full' : ''
                    }`}></span>
                  </button>
                ))}

                <div className="h-5 w-px bg-[#6B4423]/20 mx-1"></div>

                {/* WhatsApp Button - Header Version */}
                <a
                  href="https://wa.me/5514997091179?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido%20na%20Cyntia%20Rinaldi%20Doces"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                    isScrolled 
                      ? 'bg-[#E85B8A] text-white border-[#E85B8A] hover:bg-[#D84A79]' 
                      : 'bg-transparent text-[#6B4423] border-[#6B4423]/30 hover:border-[#E85B8A] hover:text-[#E85B8A]'
                  }`}
                >
                  <MessageCircle size={16} />
                  <span className="font-poppins text-xs font-semibold tracking-wider uppercase hidden lg:inline">WhatsApp</span>
                </a>
              </nav>

              {/* Admin Lock Icon */}
              <button
                onClick={handleAdminClick}
                className="p-2 md:p-2.5 bg-gradient-to-br from-[#FFF8F0] to-white border border-[#D4AF37]/40 text-[#6B4423] hover:text-[#E85B8A] hover:border-[#E85B8A]/50 hover:shadow-[0_4px_12px_rgba(232,91,138,0.15)] rounded-full shadow-sm transition-all duration-300 group flex items-center justify-center relative overflow-hidden"
                aria-label="Painel Administrativo"
                title="Painel Administrativo"
              >
                <div className="absolute inset-0 bg-[#E85B8A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Lock size={18} className="md:w-4 md:h-4 group-hover:scale-110 transition-transform relative z-10" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden overflow-hidden bg-[#FFF8F0] rounded-b-2xl shadow-xl absolute left-0 right-0 top-full border-t border-[#D4AF37]/20 transition-all duration-300 z-40 mt-2">
              <nav className="flex flex-col p-4 space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`font-poppins text-base font-medium text-center py-3 border-b border-[#E8C5D8]/30 hover:text-[#E85B8A] transition-colors ${
                      activeSection === link.id ? 'text-[#6B4423] font-semibold' : 'text-[#6B4423]/70'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                
                <a
                  href="mailto:cyntia@cyntiarinaldidoces.com"
                  className="flex items-center justify-center gap-2 text-[#6B4423] py-3 hover:text-[#E85B8A] text-sm"
                >
                  <Mail size={18} />
                  <span>cyntia@cyntiarinaldidoces.com</span>
                </a>
                <a
                  href="https://wa.me/5514997091179?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido%20na%20Cyntia%20Rinaldi%20Doces"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#E85B8A] to-[#D84A79] text-white px-6 py-3 rounded-full font-semibold shadow-md mt-2 text-sm"
                >
                  <MessageCircle size={20} />
                  <span>Fale Conosco</span>
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Floating WhatsApp Button - Fixed & Always Visible */}
      <a
        href="https://wa.me/5514997091179?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido%20na%20Cyntia%20Rinaldi%20Doces"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60] bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.6)] hover:scale-110 transition-all border-2 border-white/20 flex items-center justify-center"
        aria-label="Contato via WhatsApp"
      >
        <MessageCircle size={28} className="md:w-8 md:h-8 text-white" fill="white" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
      </a>
    </>
  );
};

export default Header;