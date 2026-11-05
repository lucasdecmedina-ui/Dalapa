import { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { categories, venue } from './menu'
import './styles-v2.css'

function PinIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"/><circle cx="12" cy="9" r="2.25"/></svg> }
function ArrowIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg> }
function StarIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 2.8 6.5L22 9.1l-5.3 4.7 1.5 7.2-6.2-3.7L5.8 21l1.5-7.2L2 9.1l7.2-.6L12 2Z"/></svg> }

function App() {
  const [active, setActive] = useState(categories[0]?.id)
  const current = useMemo(() => categories.find((category) => category.id === active) ?? categories[0], [active])
  const chooseCategory = (id) => { setActive(id); document.getElementById('menu-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
  const featured = [
    { name: 'Fritas Dalapa', category: 'porcoes', price: 'R$ 134,90', image: '/images/featured-fritas-dalapa.png', tone: 'red' },
    { name: 'Bolinhos Dalapa', category: 'bolinhos', price: 'R$ 69,90', image: '/images/featured-bolinhos-dalapa.png', tone: 'blue' },
    { name: 'Seu Barriga', category: 'sandubas', price: 'R$ 62,90', image: '/images/featured-seu-barriga.png', tone: 'yellow' },
    { name: 'Caipiras', category: 'drinks', price: 'R$ 29,90', image: '/images/featured-caipiras.png', tone: 'blue' },
    { name: 'Negroni', category: 'drinks', price: 'R$ 32,90', image: '/images/featured-negroni.png', tone: 'red' },
  ]
  return <main>
    <section className="hero" aria-labelledby="venue-name">
      <div className="hero-rio" aria-hidden="true">SANTOS × LAPA × SANTOS × LAPA</div>
      <div className="hero-top"><a className="location" href={venue.mapsUrl} target="_blank" rel="noreferrer"><PinIcon /> {venue.location}</a><a className="maps-cta" href={venue.mapsUrl} target="_blank" rel="noreferrer">rota <ArrowIcon /></a></div>
      <div className="hero-brand"><img src="/images/logo-dalapa.png" alt="Dalapa no barraco" /></div>
    </section>
    <section className="featured" aria-labelledby="featured-title"><div className="featured-heading"><p>pra começar bonito</p><h2 id="featured-title">Destaques<br/><em>do barraco</em></h2><span aria-hidden="true">✦</span></div><div className="featured-grid">{featured.map((item) => <button className={`featured-card ${item.tone}`} key={item.name} onClick={() => chooseCategory(item.category)}><img src={item.image} alt="" /><span className="featured-shade" /><span className="featured-copy"><small>{categories.find((category) => category.id === item.category)?.label}</small><b>{item.name}</b><strong>{item.price}</strong></span><span className="featured-arrow"><ArrowIcon /></span></button>)}</div></section>
    <div className="tape" aria-hidden="true">✦ COMIDA DE BOTECO SEM FRESCURA ✦</div>
    <nav className="category-nav" aria-label="Categorias do cardápio"><div className="category-scroll">{categories.map((category, index) => <button key={category.id} className={category.id === active ? 'active' : ''} onClick={() => chooseCategory(category.id)}><b>{String(index + 1).padStart(2, '0')}</b>{category.label}</button>)}</div></nav>
    <section className="menu" id="menu-content" aria-live="polite"><div className="menu-heading"><p>{current.eyebrow}</p><span>✦</span><h2>{current.title}</h2></div>{current.note && <p className="category-note">{current.note}</p>}<div className="items">{current.items.map((item, index) => <article className="item" key={`${item.name}-${index}`}><div className="item-number">{String(index + 1).padStart(2, '0')}</div><div className="item-copy"><h3>{item.name}</h3>{item.description && <p>{item.description}</p>}</div>{item.price && <strong>{item.price}</strong>}</article>)}</div></section>
    <footer><a className="review-cta" href={venue.mapsUrl} target="_blank" rel="noreferrer"><StarIcon /><span><b>curtiu o barraco?</b><small>Avalie o Dalapa no Google</small></span><ArrowIcon /></a><div className="footer-brand"><span>muita fome · pouca pose</span><p>DALAPA<br/>BOTEQUIM</p></div><a className="footer-map" href={venue.mapsUrl} target="_blank" rel="noreferrer">ver no mapa <ArrowIcon /></a></footer>
  </main>
}
createRoot(document.getElementById('root')).render(<App />)
