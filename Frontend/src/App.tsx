import { useState, useEffect, useCallback } from 'react';
import { Navbar, type AppPage } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechStackMarquee } from './components/TechStackMarquee';
import { About } from './components/About';
import { Services } from './components/Services';
import { TrustedClients } from './components/TrustedClients';
import { ClientFeedbackSection } from './components/ClientFeedbackSection';
import { Team } from './components/Team';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { TeamPage } from './pages/TeamPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

function getInitialPage(): AppPage {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  if (path === '/admin' || hash === '#admin') return 'admin';
  if (path === '/about' || hash === '#about') return 'about';
  if (path === '/services' || hash === '#services' || path === '/work' || hash === '#work') return 'services';
  if (path === '/team' || hash === '#team') return 'team';
  if (path === '/contact' || hash === '#contact') return 'contact';
  return 'home';
}

export function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<AppPage>(getInitialPage);

  const handleNavigate = useCallback((page: AppPage, targetHash?: string) => {
    setCurrentPage(page);

    if (page === 'admin') {
      window.history.pushState(null, '', '/admin');
      window.location.hash = '#admin';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'about') {
      if (window.location.pathname === '/admin') window.history.pushState(null, '', '/');
      window.location.hash = '#about';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'services') {
      if (window.location.pathname === '/admin') window.history.pushState(null, '', '/');
      window.location.hash = '#services';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'team') {
      if (window.location.pathname === '/admin') window.history.pushState(null, '', '/');
      window.location.hash = '#team';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'contact') {
      if (window.location.pathname === '/admin') window.history.pushState(null, '', '/');
      window.location.hash = '#contact';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Home page navigation
    if (window.location.pathname === '/admin') {
      window.history.pushState(null, '', '/');
    }

    if (targetHash && targetHash !== '#home') {
      window.location.hash = targetHash;
      setTimeout(() => {
        const id = targetHash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.location.hash = '#home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Listen to browser Back / Forward buttons & popstate
  useEffect(() => {
    const onLocationChange = () => {
      const page = getInitialPage();
      setCurrentPage(page);
    };

    window.addEventListener('hashchange', onLocationChange);
    window.addEventListener('popstate', onLocationChange);
    return () => {
      window.removeEventListener('hashchange', onLocationChange);
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0612] text-white selection:bg-violet-600/40 selection:text-white">
      <Navbar
        onOpenModal={() => setModalOpen(true)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      <main>
        {currentPage === 'home' && (
          <>
            <Hero onOpenModal={() => setModalOpen(true)} />
            <TechStackMarquee />
            <About />
            <Services onOpenModal={() => setModalOpen(true)} />
            <TrustedClients />
            <ClientFeedbackSection />
            <Team onNavigateTeam={() => handleNavigate('team')} />
          </>
        )}

        {currentPage === 'about' && (
          <AboutPage
            onOpenModal={() => setModalOpen(true)}
            onNavigateContact={() => handleNavigate('contact')}
            onNavigateHome={() => handleNavigate('home', '#home')}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onOpenModal={() => setModalOpen(true)}
            onNavigateContact={() => handleNavigate('contact')}
            onNavigateHome={() => handleNavigate('home', '#home')}
          />
        )}

        {currentPage === 'team' && (
          <TeamPage
            onOpenModal={() => setModalOpen(true)}
            onNavigateContact={() => handleNavigate('contact')}
            onNavigateHome={() => handleNavigate('home', '#home')}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onOpenModal={() => setModalOpen(true)}
            onNavigateHome={() => handleNavigate('home', '#home')}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            onNavigateHome={() => handleNavigate('home', '#home')}
          />
        )}
      </main>

      {currentPage !== 'admin' && (
        <Footer
          onOpenModal={() => setModalOpen(true)}
          onNavigate={handleNavigate}
        />
      )}

      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default App;
