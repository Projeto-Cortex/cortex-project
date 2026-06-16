// src/pages/LandingPage.jsx
// Limoeiro Casa de Festas — Landing Page completa
// Stack: React + Tailwind CSS
// Imagens: colocar em /public/images/

import { useEffect, useState } from 'react';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Sobre from '../components/landing/Sobre';
import Services from '../components/landing/Services';
import Gallery from '../components/landing/Gallery';
import Testimonials from '../components/landing/Testimonials';
import ContactForm from '../components/landing/ContactForm';
import Footer from '../components/landing/Footer';
import Navbar from '../components/landing/Navbar';

export default function LandingPage() {
  return (
    <div className="font-lato text-stone-800 bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Sobre />
      <Services />
      <Gallery />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
}
