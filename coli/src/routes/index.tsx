import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowUpRight } from 'lucide-react'

const chapters = [
  { label: 'El destino', eyebrow: '01 — Lo que parecía escrito', headline: 'El destino era quedarme en la esquina de siempre.', description: 'Un barrio donde las oportunidades no sobran. Un futuro pequeño, decidido por el miedo y por las voces que decían que soñar era para otros.', image: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1500&q=85', imageAlt: 'Barbero trabajando en una barbería, imagen editorial de ambiente', note: 'Una imagen de ambiente; aquí irá tu foto o una imagen de tu barrio.', tone: 'grayscale contrast-125 brightness-75' },
  { label: 'La decisión', eyebrow: '02 — Tu vida empieza donde terminan tus excusas', headline: 'Cambié el “no puedo” por “voy a ver cómo se hace”.', description: 'Malta fue el primer salto: más miedo que maletas, menos certezas que ganas. Allí entendí que mi oficio podía ser mi pasaporte.', image: '/images/barberia-coli.jpeg', imageAlt: 'Colii trabajando como barbero y atendiendo a un cliente en la barbería', note: 'La barbería se convirtió en mi pasaporte.', tone: 'saturate-100' },
  { label: 'Australia', eyebrow: '03 — Desde la otra punta del mundo', headline: 'Hoy sigo cortando pelo. Y decidiendo quién quiero ser.', description: 'Crucé el planeta para demostrarme que el esfuerzo no entiende de fronteras. Australia no es el final: es el capítulo que estoy escribiendo ahora.', image: '/images/atardecer-australia.jpeg', imageAlt: 'Colii contempla el atardecer junto al mar en Australia', note: 'Australia: una vida más grande que la ventana.', tone: 'saturate-110' },
]

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Destino — De Fuerteventura al mundo' },
      { name: 'description', content: 'La historia de un barbero que cambió el destino escrito por otros por una vida propia: de Fuerteventura a Malta y Australia.' },
    ],
  }),
  component: Home,
})

function Home() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]'))
    const syncChapter = () => {
      const activeSection = sections.filter((section) => section.getBoundingClientRect().top <= window.innerHeight * 0.52).at(-1)
      setActive(activeSection ? Number(activeSection.dataset.chapter) : 0)
    }
    window.addEventListener('scroll', syncChapter, { passive: true })
    syncChapter()
    return () => window.removeEventListener('scroll', syncChapter)
  }, [])
  const chapter = chapters[active]

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <header className="relative z-10 mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-10 lg:px-16">
        <a href="#inicio" aria-label="Colii, inicio" className="font-serif text-2xl font-semibold tracking-tight">colii<span className="text-primary">.</span></a>
        <nav aria-label="Navegación principal" className="flex items-center gap-4 text-[10px] uppercase tracking-[0.14em] sm:gap-8 sm:text-xs">
          <a className="hidden transition-colors hover:text-primary sm:inline" href="#historia">La historia</a><a className="hidden transition-colors hover:text-primary sm:inline" href="#camino">El camino</a><a className="hidden border-b border-primary pb-1 transition-colors hover:text-primary sm:inline" href="#contacto">Conectar</a>
          <a href="https://estilounico14.booksy.com/k/" target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center bg-primary px-4 text-primary-foreground transition duration-200 hover:-translate-y-0.5 hover:shadow-md">Reserva tu cita <ArrowUpRight className="ml-2 h-3.5 w-3.5" /></a>
        </nav>
      </header>
      <section id="inicio" className="mx-auto grid min-h-[calc(100svh-76px)] max-w-[1440px] items-center gap-9 px-5 pb-12 pt-3 sm:px-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:px-16 lg:pb-16">
        <div className="order-2 flex flex-col items-start lg:order-1">
          <p className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs"><span className="h-px w-8 bg-primary" />Fuerteventura · Malta · Australia</p>
          <p className="mb-4 max-w-lg text-xs uppercase tracking-[0.18em] text-primary sm:text-sm">Una historia sobre elegir tu propio camino</p>
          <h1 key={chapter.headline} className="max-w-[760px] animate-fade-in font-serif text-[clamp(3.2rem,7vw,6.8rem)] leading-[0.94] tracking-[-0.055em]">{chapter.headline}</h1>
          <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{chapter.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#historia" className="group inline-flex min-h-12 items-center gap-3 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0">Descubre mi historia <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" /></a>
            <a href="https://estilounico14.booksy.com/k/" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 border border-foreground/25 px-5 py-3 text-sm transition-colors hover:border-primary hover:text-primary">Reserva en Booksy <ArrowUpRight className="h-4 w-4" /></a>
          </div>
          <div className="mt-10 flex flex-wrap gap-2" aria-label="Elige una etapa de la historia">{chapters.map((item, index) => <button key={item.label} type="button" onClick={() => setActive(index)} aria-pressed={active === index} className={`min-h-11 border px-4 text-xs uppercase tracking-[0.12em] transition-colors ${active === index ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'}`}>{item.label}</button>)}</div>
        </div>
        <figure className="group relative order-1 min-h-[48vh] overflow-hidden bg-muted sm:min-h-[58vh] lg:order-2 lg:min-h-[76vh]">
          <img key={chapter.image} src={chapter.image} alt={chapter.imageAlt} className={`absolute inset-0 h-full w-full animate-fade-in object-cover transition-transform duration-700 group-hover:scale-[1.025] ${chapter.tone}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-foreground/10" />
          <div className="absolute left-5 top-5 border border-background/50 bg-background/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground backdrop-blur-sm sm:left-8 sm:top-8">{chapter.eyebrow}</div>
          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-background sm:p-8"><span className="max-w-[250px] text-sm leading-6 text-background/85">{chapter.note}</span><span className="shrink-0 font-mono text-xs tracking-widest">0{active + 1} / 03</span></figcaption>
        </figure>
      </section>
      <section id="historia" data-chapter="0" className="relative bg-foreground py-24 text-background sm:py-32 lg:py-40">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-10 lg:grid-cols-[0.55fr_1fr] lg:gap-24 lg:px-16"><div><p className="font-mono text-xs uppercase tracking-[0.2em] text-background/55">01 — El destino</p><p className="mt-6 font-serif text-2xl italic leading-snug text-background/75 sm:text-3xl">Lo que estaba escrito para mí si no hacía nada.</p></div><div className="space-y-7 text-lg leading-8 text-background/75 sm:text-xl sm:leading-9"><p>Si cierro los ojos, todavía puedo ver ese guion: un barrio donde las oportunidades no sobran, un trabajo que solo sirviera para pagar facturas y el mundo reducido a lo que alcanzaba a ver desde mi ventana.</p><p>Mi destino predeterminado era la conformidad. Esperar que algo cambiara mientras el miedo al qué dirán y las malas influencias decidían por mí.</p><blockquote className="border-l border-primary py-2 pl-6 font-serif text-3xl italic leading-tight text-background sm:text-5xl">“El talento también se oxida cuando uno deja de moverse.”</blockquote><p className="text-sm text-background/50">La fotografía es una imagen de ambiente. Sustitúyela por una foto tuya o de tu barrio para hacer este recuerdo verdaderamente tuyo.</p></div></div>
      </section>
      <section id="decision" data-chapter="1" className="mx-auto grid min-h-[75vh] max-w-[1440px] items-center gap-10 px-5 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1fr_0.82fr] lg:gap-24 lg:px-16">
        <div className="max-w-2xl"><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">02 — La decisión</p><h2 className="mt-7 font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl">Tu vida empieza donde terminan tus excusas.</h2><p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">Un día entendí que, si no movía la ficha yo, nadie lo iba a hacer. No tenía ahorros infinitos ni el inglés perfecto. Tenía una decisión: cambiar el “no puedo” por el “voy a ver cómo se hace”.</p><div className="mt-10 grid gap-6 border-t border-border pt-6 sm:grid-cols-2"><div><span className="font-mono text-xs uppercase tracking-widest text-primary">Primero · Malta</span><p className="mt-3 text-sm leading-6 text-muted-foreground">Un salto al vacío con más miedo que maletas. La barbería se convirtió en mi pasaporte.</p></div><div><span className="font-mono text-xs uppercase tracking-widest text-primary">Después · Australia</span><p className="mt-3 text-sm leading-6 text-muted-foreground">Cruzar el planeta para demostrarme que el esfuerzo no entiende de fronteras.</p></div></div></div>
        <figure className="relative min-h-[58vh] overflow-hidden bg-muted lg:min-h-[72vh]"><img src="/images/barberia-coli.jpeg" alt="Colii trabajando como barbero y atendiendo a un cliente" className="absolute inset-0 h-full w-full object-cover object-[center_36%]" /><div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" /><figcaption className="absolute bottom-0 p-6 text-sm text-background sm:p-8">La barbería fue mi forma de llegar más lejos.</figcaption></figure>
      </section>
      <section id="camino" data-chapter="2" className="bg-secondary py-24 sm:py-32 lg:py-36"><div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-10 lg:grid-cols-[0.8fr_1fr] lg:items-end lg:gap-24 lg:px-16"><div><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">03 — El camino sigue</p><h2 className="mt-7 font-serif text-5xl leading-[1.03] tracking-tight sm:text-7xl">No vivo de la suerte. Vivo de una decisión.</h2></div><div><p className="text-lg leading-8 text-muted-foreground">Desde Australia sigo cortando pelo, aprendiendo y conociendo otras formas de vivir. Esto no es una historia de llegar: es la prueba de que siempre puedes volver a elegir.</p><p className="mt-8 border-l border-primary pl-5 font-serif text-2xl italic leading-snug sm:text-3xl">“Quiero vivir de lo que me gusta mientras conozco el mundo.”</p></div></div><div className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-px border-y border-foreground/15 px-5 sm:px-10 md:grid-cols-4 lg:px-16">{['Vivir en otros países', 'Trabajar con la barbería', 'Aprender idiomas', 'Crear libertad'].map((goal, index) => <div key={goal} className="min-h-32 border-foreground/15 px-3 py-6 md:border-r md:py-8 md:last:border-r-0"><span className="font-mono text-xs text-primary">0{index + 1}</span><p className="mt-4 max-w-[150px] font-serif text-lg leading-snug sm:text-xl">{goal}</p></div>)}</div></section>
      <section id="contacto" className="relative overflow-hidden bg-background px-5 py-24 text-center sm:px-10 sm:py-32"><div className="relative mx-auto max-w-3xl"><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Sin filtros. En movimiento.</p><h2 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl">Si yo he podido, tú también puedes empezar.</h2><p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">Estoy documentando el proceso y abierto a colaborar con gente que cree en los caminos propios.</p><div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"><a href="https://www.instagram.com/colii.js" target="_blank" rel="noreferrer" className="group inline-flex min-h-12 items-center gap-3 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">Instagram <ArrowUpRight className="h-4 w-4" /></a><a href="https://www.tiktok.com/@colii.js?_r=1&_t=ZN-9ADMxMnKoEw" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-3 border border-foreground/25 px-6 py-3 text-sm transition-colors hover:border-primary hover:text-primary">TikTok <ArrowUpRight className="h-4 w-4" /></a></div></div><a href="#inicio" aria-label="Volver al inicio" className="mx-auto mt-20 flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"><ArrowDown className="h-4 w-4 rotate-180" /></a><footer className="mt-12 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Destino · Hecho en movimiento</footer></section>
    </main>
  )
}
