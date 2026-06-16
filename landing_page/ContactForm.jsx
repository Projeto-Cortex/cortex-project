// src/components/landing/ContactForm.jsx
// Envia o formulário para POST /api/contact
// Adaptar a URL em src/services/api.js

import { useState } from 'react';
import api from '../../services/api';

const TIPOS_EVENTO = [
  'Festa infantil',
  'Casamento',
  'Formatura',
  'Evento corporativo',
  'Outro',
];

const inputBase =
  'w-full px-4 py-3 border border-stone-200 rounded-xl font-lato text-sm text-stone-800 bg-white outline-none transition-all focus:border-[#3dab84] focus:ring-2 focus:ring-[#3dab84]/10';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/contact', form);
      setStatus('success');
      setForm({ name: '', phone: '', email: '', eventType: '', eventDate: '', guestCount: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contato" className="bg-white py-24 px-20 grid grid-cols-2 gap-20 items-start">
      {/* Info lateral */}
      <div>
        <p className="text-xs font-bold tracking-widest uppercase text-[#3dab84] mb-3">Fale conosco</p>
        <h2 className="font-playfair text-4xl font-bold leading-tight mb-4 text-stone-800">
          Vamos planejar sua festa juntos?
        </h2>
        <p className="text-stone-500 font-light leading-relaxed mb-8">
          Preencha o formulário e nossa equipe entrará em contato em até 24 horas
          com uma proposta personalizada.
        </p>

        {[
          { icon: '📍', label: 'Endereço', value: 'Rua das Festas, 123 — São Paulo, SP' },
          { icon: '📞', label: 'Telefone / WhatsApp', value: '(11) 99999-9999' },
          { icon: '📧', label: 'E-mail', value: 'contato@limoeirobuffet.com' },
        ].map((item) => (
          <div key={item.label} className="flex gap-4 items-start mt-6">
            <div className="w-11 h-11 rounded-xl bg-[#e8f7f2] flex items-center justify-center text-lg shrink-0">
              {item.icon}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400">{item.label}</p>
              <p className="text-stone-700 mt-0.5">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2 tracking-wide">Nome completo</label>
            <input
              className={inputBase}
              name="name" value={form.name} onChange={handleChange}
              placeholder="Seu nome" required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2 tracking-wide">Telefone / WhatsApp</label>
            <input
              className={inputBase}
              name="phone" value={form.phone} onChange={handleChange}
              type="tel" placeholder="(11) 99999-9999" required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-bold text-stone-700 mb-2 tracking-wide">E-mail</label>
          <input
            className={inputBase}
            name="email" value={form.email} onChange={handleChange}
            type="email" placeholder="seu@email.com" required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2 tracking-wide">Tipo de evento</label>
            <select
              className={inputBase}
              name="eventType" value={form.eventType} onChange={handleChange} required
            >
              <option value="">Selecione...</option>
              {TIPOS_EVENTO.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2 tracking-wide">Data do evento</label>
            <input
              className={inputBase}
              name="eventDate" value={form.eventDate} onChange={handleChange}
              type="date"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-bold text-stone-700 mb-2 tracking-wide">Número de convidados</label>
          <input
            className={inputBase}
            name="guestCount" value={form.guestCount} onChange={handleChange}
            type="number" placeholder="Ex: 50"
          />
        </div>

        <div className="mb-5">
          <label className="block text-xs font-bold text-stone-700 mb-2 tracking-wide">Mensagem / detalhes</label>
          <textarea
            className={`${inputBase} min-h-[120px] resize-y`}
            name="message" value={form.message} onChange={handleChange}
            placeholder="Conte um pouco mais sobre o evento que você imagina..."
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 rounded-full font-bold text-white text-base transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60"
          style={{ background: '#3dab84' }}
        >
          {status === 'loading' ? 'Enviando...' : 'Solicitar orçamento gratuito →'}
        </button>

        {status === 'success' && (
          <p className="mt-4 text-center text-sm text-[#2d8f6c] font-semibold">
            ✅ Solicitação enviada! Em breve entraremos em contato.
          </p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-center text-sm text-red-500">
            ❌ Ocorreu um erro. Por favor, tente novamente ou ligue para nós.
          </p>
        )}
      </form>
    </section>
  );
}
