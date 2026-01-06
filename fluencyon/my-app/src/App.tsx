import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Bio from './components/Bio';
import Courses from './components/Courses';
import Methodology from './components/Methodology';
import PackageValue from './components/PackageValue';
import FreeResources from './components/FreeResources';
import Calendar from './components/Calendar';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Navigation />
      <Hero />
      <Bio />
      <Courses />
      <Methodology />
      <PackageValue />
      <FreeResources />
      <Calendar />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
      {showScrollTop && <ScrollToTop />}
    </div>
  );
}

export default App;

