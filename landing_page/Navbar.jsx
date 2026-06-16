// src/components/landing/Navbar.jsx

import { useEffect, useState } from 'react';
import logo from '../../assets/logo.webp'; // ajustar path se necessário

const NAV_LINKS = [
  { label: 'Nossa história', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Depoimentos', href: '#depoimentos' },
];

function scrollTo(id) {
  document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-3.5 transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(61,171,132,0.12)',
        boxShadow: scrolled ? '0 2px 20px rgba(61,171,132,0.15)' : 'none',
      }}
    >
      <a
        href="#hero"
        className="flex items-center gap-2"
        onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
      >
        <img src={logo} alt="Limoeiro Casa de Festas" className="h-11" />
      </a>

      <ul className="flex items-center gap-8 list-none">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm font-normal uppercase tracking-wider text-stone-500 no-underline transition-colors hover:text-[#3dab84]"
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contato"
            className="px-5 py-2 rounded-full text-sm font-bold text-white transition-all hover:-translate-y-0.5"
            style={{ background: '#3dab84' }}
            onClick={(e) => { e.preventDefault(); scrollTo('#contato'); }}
          >
            Solicitar orçamento
          </a>
        </li>
      </ul>
    </nav>
  );
}
