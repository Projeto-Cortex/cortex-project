// =============================================================
// src/components/landing/Features.jsx
// =============================================================
export function Features() {
  const items = [
    { icon: '❤️', title: 'Equipe apaixonada', text: 'Criamos memórias afetivas com cada detalhe pensado com carinho para sua família.' },
    { icon: '🎨', title: 'Decoração personalizada', text: 'Cada festa é única. Adaptamos temas, cores e estilos ao gosto de cada cliente.' },
    { icon: '🏆', title: 'Estrutura completa', text: 'Salão equipado, cozinha e suporte completo para eventos de todos os tamanhos.' },
  ];
  return (
    <div className="bg-[#f4fbf8] py-12 px-20">
      <div className="grid grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.title} className="flex gap-4 items-start p-6 bg-white rounded-2xl border border-[#3dab84]/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-[#e8f7f2] flex items-center justify-center text-2xl shrink-0">{item.icon}</div>
            <div>
              <div className="font-bold text-stone-800 mb-1">{item.title}</div>
              <div className="text-sm text-stone-500 leading-relaxed font-light">{item.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// =============================================================
// src/components/landing/Sobre.jsx
// =============================================================
export function Sobre() {
  return (
    <section id="sobre" className="grid grid-cols-2 gap-20 items-center py-24 px-20 bg-[#f9f5f0]">
      <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-[#e8f7f2]">
        <img src="/images/sobre.jpg" alt="Equipe Limoeiro" className="w-full h-full object-cover" />
      </div>
      <div>
        <p className="text-xs font-bold tracking-widest uppercase text-[#3dab84] mb-3">Nossa história</p>
        <h2 className="font-playfair text-4xl font-bold leading-tight mb-5 text-stone-800">Um lugar criado por amor às festas</h2>
        <p className="text-stone-500 font-light leading-relaxed mb-4">
          O Limoeiro nasceu do sonho de criar um espaço onde cada criança pudesse se sentir especial,
          e cada família pudesse viver momentos inesquecíveis sem preocupação.
        </p>
        <p className="text-stone-500 font-light leading-relaxed">
          Com mais de 7 anos de experiência, construímos uma história de alegria, afeto e dedicação.
          Nossa equipe cuida de cada detalhe — da decoração à estrutura — para que você só precise curtir a festa.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          {[
            'Atendimento personalizado do início ao fim',
            'Espaço seguro e acolhedor para crianças',
            'Parceiros de confiança para buffet e entretenimento',
            'Flexibilidade para diferentes estilos e orçamentos',
          ].map((v) => (
            <div key={v} className="flex items-center gap-3 text-stone-700">
              <span className="w-2 h-2 rounded-full bg-[#3dab84] shrink-0" />
              {v}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// =============================================================
// src/components/landing/Services.jsx
// =============================================================
const SERVICES = [
  {
    emoji: '🎂',
    bg: 'from-[#e8f7f2] to-[#c8eee2]',
    title: 'Festas Infantis',
    desc: 'Decoração temática, espaço de brincadeiras, monitores e toda a estrutura para uma festa inesquecível.',
    tag: 'Mais popular',
  },
  {
    emoji: '💍',
    bg: 'from-[#fef5e7] to-[#fde8b8]',
    title: 'Casamentos & Formaturas',
    desc: 'Ambiente elegante e personalizável para os momentos mais marcantes, com suporte completo de decoração e buffet.',
    tag: 'Sob consulta',
  },
  {
    emoji: '🏢',
    bg: 'from-[#fdf0f4] to-[#f8d4e2]',
    title: 'Eventos Corporativos',
    desc: 'Confraternizações, workshops e comemorações empresariais com infraestrutura profissional.',
    tag: 'Sob consulta',
  },
];

export function Services() {
  return (
    <section id="servicos" className="py-24 px-20 bg-white">
      <div className="mb-12">
        <p className="text-xs font-bold tracking-widest uppercase text-[#3dab84] mb-3">O que oferecemos</p>
        <h2 className="font-playfair text-4xl font-bold text-stone-800 mb-4">Festas para cada momento da vida</h2>
        <p className="text-stone-500 font-light max-w-xl leading-relaxed">
          Do aniversário infantil ao evento corporativo, temos a estrutura e a equipe certa para tornar seu evento especial.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {SERVICES.map((s) => (
          <div key={s.title} className="rounded-2xl overflow-hidden border border-black/5 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-250">
            <div className={`h-44 bg-gradient-to-br ${s.bg} flex items-center justify-center text-5xl`}>{s.emoji}</div>
            <div className="p-6">
              <h3 className="font-playfair text-xl font-bold text-stone-800 mb-2">{s.title}</h3>
              <p className="text-sm text-stone-500 font-light leading-relaxed">{s.desc}</p>
              <span className="inline-block mt-4 px-3 py-1 rounded-full text-xs font-bold text-[#2d8f6c] bg-[#e8f7f2]">
                {s.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


// =============================================================
// src/components/landing/Gallery.jsx
// Fotos estáticas — colocar em /public/images/galeria/
// =============================================================
const PHOTOS = [
  { src: '/images/galeria/1.jpg', alt: 'Festa temática', className: 'col-span-2 row-span-2' },
  { src: '/images/galeria/2.jpg', alt: 'Mesa de bolo' },
  { src: '/images/galeria/3.jpg', alt: 'Decoração de balões' },
  { src: '/images/galeria/4.jpg', alt: 'Salão decorado' },
  { src: '/images/galeria/5.jpg', alt: 'Detalhes da festa' },
];

export function Gallery() {
  return (
    <section id="galeria" className="py-24 px-20 bg-[#f9f5f0]">
      <div className="mb-10">
        <p className="text-xs font-bold tracking-widest uppercase text-[#3dab84] mb-3">Galeria</p>
        <h2 className="font-playfair text-4xl font-bold text-stone-800 mb-4">Momentos que fotografamos com orgulho</h2>
        <p className="text-stone-500 font-light">Uma pequena amostra das festas que realizamos. Cada evento é único e tratado com o mesmo carinho.</p>
      </div>
      <div className="grid grid-cols-4 grid-rows-2 gap-4" style={{ gridTemplateRows: 'repeat(2, 220px)' }}>
        {PHOTOS.map((photo, i) => (
          <div
            key={photo.src}
            className={`rounded-2xl overflow-hidden relative group cursor-pointer ${photo.className ?? ''}`}
          >
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#3dab84]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-2xl">
              🔍
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


// =============================================================
// src/components/landing/Testimonials.jsx
// Hard-coded nesta versão conforme escopo
// =============================================================
const DEPOIMENTOS = [
  {
    stars: 5,
    text: '"O Limoeiro transformou o aniversário da minha filha em algo mágico. Cada detalhe foi pensado com tanto cuidado — ela ainda fala da festa!"',
    initials: 'CM',
    name: 'Camila Menezes',
    event: 'Festa infantil · Aniversário de 5 anos',
  },
  {
    stars: 5,
    text: '"Realizamos a confraternização da empresa aqui e foi um sucesso total. A equipe foi super atenciosa e a estrutura, impecável. Voltaremos com certeza!"',
    initials: 'RS',
    name: 'Ricardo Silva',
    event: 'Evento corporativo · 80 pessoas',
  },
  {
    stars: 5,
    text: '"Fiz meu casamento no Limoeiro e foi perfeito. Eles entenderam exatamente o que eu queria e entregaram muito mais do que esperávamos."',
    initials: 'AO',
    name: 'Ana Oliveira',
    event: 'Casamento · 120 convidados',
  },
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 px-20" style={{ background: '#3dab84' }}>
      <div className="mb-12">
        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#a8e8cf' }}>Depoimentos</p>
        <h2 className="font-playfair text-4xl font-bold text-white mb-4">O que as famílias dizem sobre nós</h2>
        <p className="font-light" style={{ color: 'rgba(255,255,255,0.7)' }}>A maior recompensa é ver a alegria nas fotos que nossos clientes compartilham.</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {DEPOIMENTOS.map((d) => (
          <div
            key={d.name}
            className="rounded-2xl p-8 border transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <div className="text-[#f7d070] tracking-wider mb-4">{'★'.repeat(d.stars)}</div>
            <p className="text-sm font-light italic leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.9)' }}>
              {d.text}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shrink-0"
                style={{ background: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>
                {d.initials}
              </div>
              <div>
                <div className="font-bold text-white text-sm">{d.name}</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{d.event}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


// =============================================================
// src/components/landing/Footer.jsx
// =============================================================
export function Footer() {
  return (
    <footer className="py-16 px-20 pb-8" style={{ background: '#1a3d2e', color: 'rgba(255,255,255,0.7)' }}>
      <div className="grid grid-cols-4 gap-12 mb-12">
        <div>
          <div className="font-dancing text-3xl text-white mb-3">🌳 Limoeiro</div>
          <p className="text-sm font-light leading-relaxed max-w-[280px]">
            Criando memórias afetivas e festas inesquecíveis há mais de 7 anos.
            No Limoeiro, o brincar é o coração de tudo.
          </p>
          <div className="flex gap-2 mt-6">
            {[
              { href: 'https://instagram.com', icon: '📷', label: 'Instagram' },
              { href: 'https://facebook.com', icon: '📘', label: 'Facebook' },
              { href: 'https://wa.me/5511999999999', icon: '💬', label: 'WhatsApp' },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                title={s.label}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors duration-200"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {[
          {
            title: 'Navegação',
            links: [
              ['Início', '#hero'],
              ['Nossa história', '#sobre'],
              ['Serviços', '#servicos'],
              ['Galeria', '#galeria'],
              ['Depoimentos', '#depoimentos'],
            ],
          },
          {
            title: 'Serviços',
            links: [
              ['Festas infantis', '#servicos'],
              ['Casamentos', '#servicos'],
              ['Formaturas', '#servicos'],
              ['Corporativo', '#servicos'],
            ],
          },
          {
            title: 'Contato',
            links: [
              ['(11) 99999-9999', 'tel:+5511999999999'],
              ['contato@limoeirobuffet.com', 'mailto:contato@limoeirobuffet.com'],
              ['Rua das Festas, 123', '#contato'],
              ['São Paulo, SP', '#contato'],
            ],
          },
        ].map((col) => (
          <div key={col.title}>
            <div className="font-bold text-white text-sm uppercase tracking-wider mb-5">{col.title}</div>
            <ul className="flex flex-col gap-2 list-none">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-sm transition-colors duration-200 no-underline"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                    onMouseEnter={e => e.target.style.color = '#a8e8cf'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-6 text-xs" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <span>© 2026 <span style={{ color: '#a8e8cf' }}>Limoeiro Casa de Festas</span>. Todos os direitos reservados.</span>
        <span>Desenvolvido pela Equipe Cinco · IFSP</span>
      </div>
    </footer>
  );
}
