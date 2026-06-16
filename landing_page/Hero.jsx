// src/components/landing/Hero.jsx

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a3d2e 0%, #2d6b50 50%, #3dab84 100%)' }}
    >
      {/* Padrão de fundo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.04) 1px, transparent 1px), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Conteúdo principal */}
      <div className="relative z-10 w-1/2 pl-20 pr-12 text-white">
        <span
          className="inline-block mb-6 px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full border"
          style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)' }}
        >
          ✨ Casa de Festas desde 2018
        </span>

        <h1 className="font-playfair text-5xl font-bold leading-tight mb-5">
          Momentos que ficam{' '}
          <span style={{ color: '#a8e8cf' }}>para sempre</span> na memória
        </h1>

        <p className="text-lg font-light mb-10 max-w-md" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
          No Limoeiro, o brincar é o coração de tudo. Criamos festas únicas,
          cheias de afeto e personalidade — para crianças, famílias e empresas.
        </p>

        <div className="flex gap-4 flex-wrap">
          <a
            href="#contato"
            className="px-8 py-3.5 rounded-full font-bold text-base transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: '#fff',
              color: '#2d8f6c',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Solicitar orçamento
          </a>
          <a
            href="#galeria"
            className="px-8 py-3.5 rounded-full font-bold text-base border-2 transition-all duration-200"
            style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Ver galeria
          </a>
        </div>

        {/* Stats */}
        <div
          className="flex gap-10 mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}
        >
          {[
            { num: '500+', label: 'Festas realizadas' },
            { num: '7 anos', label: 'De experiência' },
            { num: '98%', label: 'Clientes satisfeitos' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-playfair text-3xl font-bold" style={{ color: '#a8e8cf' }}>
                {stat.num}
              </div>
              <div className="text-xs uppercase tracking-wider mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Foto hero — lado direito */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end overflow-hidden">
        <div
          className="w-[90%] overflow-hidden"
          style={{
            height: '80vh',
            maxHeight: '700px',
            borderRadius: '180px 0 0 180px',
          }}
        >
          <img
            src="/images/hero.jpg"
            alt="Festa no Limoeiro"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
