import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchModal from './components/SearchModal';
import OffcanvasDrawer from './components/OffcanvasDrawer';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Faqs from './components/Faqs';
import MarqueeText from './components/MarqueeText';
import Projects from './components/Projects';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import Blog from './components/Blog';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PaymentPolicy from './components/PaymentPolicy';
import PrivacyPolicy from './components/PrivacyPolicy';
import DiscoveryBookingModal from './components/DiscoveryBookingModal';
import AdminPanel from './admin/AdminPanel';

// Dedicated Standalone Pages
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('');

  // Track route for /admin, /about, /services, /team, /contact, /payment-policy, etc.
  const [route, setRoute] = useState(() => {
    return window.location.pathname + window.location.hash;
  });

  useEffect(() => {
    const onLocationChange = () => {
      setRoute(window.location.pathname + window.location.hash);
    };
    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);
    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onLocationChange);
    };
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdminRoute = route.includes('/admin') || route.includes('#admin');
  const isPaymentPolicyRoute = route.includes('/payment-policy') || route.includes('#payment-policy');
  const isPrivacyPolicyRoute = route.includes('/privacy-policy') || route.includes('#privacy-policy');
  const isAboutRoute = route === '/about' || route === '/about/' || route === '#about';
  const isServicesRoute = route === '/services' || route === '/services/' || route === '#services';
  const isTeamRoute = route === '/team' || route === '/team/' || route === '#team';
  const isContactRoute = route === '/contact' || route === '/contact/' || route === '#contact';

  if (isAdminRoute) {
    return <AdminPanel onBackToSite={() => navigateTo('/')} />;
  }

  // Standalone About Page
  if (isAboutRoute) {
    return (
      <div className="min-h-screen bg-[#07030e] text-[#c4b4ffcc] font-sans relative">
        <Navbar 
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onNavigate={navigateTo}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />
        <AboutPage 
          onNavigate={navigateTo} 
          onOpenBookingModal={() => setIsBookingOpen(true)} 
        />
        <Footer 
          onNavigate={navigateTo}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />
        <ScrollToTop />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <OffcanvasDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)} 
          onNavigate={navigateTo}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />
        <DiscoveryBookingModal 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
          initialService={selectedTier}
        />
      </div>
    );
  }

  // Standalone Services Page
  if (isServicesRoute) {
    return (
      <div className="min-h-screen bg-[#07030e] text-[#c4b4ffcc] font-sans relative">
        <Navbar 
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onNavigate={navigateTo}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />
        <ServicesPage 
          onNavigate={navigateTo} 
          onOpenBookingModal={() => setIsBookingOpen(true)} 
        />
        <Footer 
          onNavigate={navigateTo}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />
        <ScrollToTop />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <OffcanvasDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)} 
          onNavigate={navigateTo}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />
        <DiscoveryBookingModal 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
          initialService={selectedTier}
        />
      </div>
    );
  }

  // Standalone Team Page
  if (isTeamRoute) {
    return (
      <div className="min-h-screen bg-[#07030e] text-[#c4b4ffcc] font-sans relative">
        <Navbar 
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onNavigate={navigateTo}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />
        <TeamPage 
          onNavigate={navigateTo} 
          onOpenBookingModal={() => setIsBookingOpen(true)} 
        />
        <Footer 
          onNavigate={navigateTo}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />
        <ScrollToTop />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <OffcanvasDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)} 
          onNavigate={navigateTo}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />
        <DiscoveryBookingModal 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
          initialService={selectedTier}
        />
      </div>
    );
  }

  // Standalone Contact Page
  if (isContactRoute) {
    return (
      <div className="min-h-screen bg-[#07030e] text-[#c4b4ffcc] font-sans relative">
        <Navbar 
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onNavigate={navigateTo}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />
        <ContactPage 
          onNavigate={navigateTo} 
          onOpenBookingModal={() => setIsBookingOpen(true)} 
        />
        <Footer 
          onNavigate={navigateTo}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />
        <ScrollToTop />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <OffcanvasDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)} 
          onNavigate={navigateTo}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />
        <DiscoveryBookingModal 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
          initialService={selectedTier}
        />
      </div>
    );
  }

  if (isPaymentPolicyRoute) {
    return (
      <div className="min-h-screen bg-[#07030e] text-[#c4b4ffcc] font-sans relative">
        <Navbar 
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onNavigate={navigateTo}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />
        <PaymentPolicy 
          onBackToHome={() => navigateTo('/')} 
          onOpenBookingModal={() => setIsBookingOpen(true)} 
        />
        <Footer 
          onNavigate={navigateTo}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />
        <ScrollToTop />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <OffcanvasDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)} 
          onNavigate={navigateTo}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />
        <DiscoveryBookingModal 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
          initialService={selectedTier}
        />
      </div>
    );
  }

  if (isPrivacyPolicyRoute) {
    return (
      <div className="min-h-screen bg-[#07030e] text-[#c4b4ffcc] font-sans relative">
        <Navbar 
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onNavigate={navigateTo}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />
        <PrivacyPolicy 
          onBackToHome={() => navigateTo('/')} 
        />
        <Footer 
          onNavigate={navigateTo}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />
        <ScrollToTop />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <OffcanvasDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)} 
          onNavigate={navigateTo}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />
        <DiscoveryBookingModal 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
          initialService={selectedTier}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0612] text-[#c4b4ffcc] selection:bg-[#8b5cf6] selection:text-white font-sans relative">
      
      {/* Top Navbar */}
      <Navbar 
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onNavigate={navigateTo}
        onOpenBookingModal={() => setIsBookingOpen(true)}
      />

      {/* Main Page Flow with CodexPlus Violet/Purple Theme */}
      <main>
        {/* 1. Hero Section */}
        <Hero onOpenBookingModal={() => setIsBookingOpen(true)} onNavigate={navigateTo} />

        {/* 2. About Section */}
        <About onNavigate={navigateTo} />

        {/* 3. Services Section */}
        <Services onNavigate={navigateTo} />

        {/* 4. Pricing & Investment Tiers Section */}
        <Pricing 
          onSelectTier={(tier) => {
            setSelectedTier(tier);
            setIsBookingOpen(true);
          }}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />

        {/* 5. FAQs & Contact Project Form Section */}
        <Faqs onNavigate={navigateTo} />

        {/* 6. Infinite Text Marquee Banner */}
        <MarqueeText />

        {/* 7. Recent Projects Showcase */}
        <Projects onNavigate={navigateTo} />

        {/* 8. Creative Expert Team */}
        <Team onNavigate={navigateTo} />

        {/* 9. Client Testimonials */}
        <Testimonials />

        {/* 10. Latest Blog & Articles */}
        <Blog />

        {/* 11. Partner Logos Carousel */}
        <Partners />
      </main>

      {/* Footer */}
      <Footer 
        onNavigate={navigateTo}
        onOpenBookingModal={() => setIsBookingOpen(true)}
      />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />

      {/* Modals & Drawers */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
      <OffcanvasDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onNavigate={navigateTo}
        onOpenBookingModal={() => setIsBookingOpen(true)}
      />

      {/* Discovery Booking Modal */}
      <DiscoveryBookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        initialService={selectedTier}
      />

    </div>
  );
}
