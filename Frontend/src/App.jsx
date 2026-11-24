import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Noise from './components/bits/Noise.jsx';
import Loader from './components/Loader.jsx';
import Header from './components/Header.jsx';
import CursorLabel from './components/CursorLabel.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Statement from './sections/Statement.jsx';
import Services from './sections/Services.jsx';
import Projects from './sections/Projects.jsx';
import Faq from './sections/Faq.jsx';
import Team from './sections/Team.jsx';
import Testimonials from './sections/Testimonials.jsx';
import Journal from './sections/Journal.jsx';
import Footer from './sections/Footer.jsx';
import AdminPanel from './admin/AdminPanel.jsx';
import { CmsProvider } from './context/CmsContext.jsx';

gsap.registerPlugin(ScrollTrigger);

function MainSite() {
  const [ready, setReady] = useState(false);

  // Smooth scrolling (Lenis) wired into GSAP ScrollTrigger. Disabled for reduced-motion users.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    window.__lenis = lenis;
    lenis.stop(); // locked until the loader finishes
    lenis.on('scroll', ScrollTrigger.update);
    const tick = time => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  useEffect(() => {
    if (ready) window.__lenis?.start();
  }, [ready]);

  return (
    <>
      <Loader onReveal={() => setReady(true)} />
      <Header ready={ready} />
      <main>
        <Hero ready={ready} />
        <About />
        <Statement />
        <Services />
        <Projects />
        <Faq />
        <Team />
        <Testimonials />
        <Journal />
      </main>
      <Footer />
      <Noise fixed opacity={0.05} className="grain" />
      <CursorLabel />
    </>
  );
}

export default function App() {
  const [route, setRoute] = useState(() => {
    if (typeof window === 'undefined') return '/';
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

  return (
    <CmsProvider>
      {isAdminRoute ? (
        <AdminPanel onBackToSite={() => navigateTo('/')} />
      ) : (
        <MainSite />
      )}
    </CmsProvider>
  );
}
