import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { NEARBY_PLACES } from '@/lib/nearby-places';
import { SITE_URL } from '@/lib/site';

const wording = {
  es: { home: 'Inicio', nearby: 'Lugares cercanos', info: 'Información básica', type: 'Tipo de atractivo', address: 'Dirección', access: 'Acceso', manager: 'Administración', open: 'Horarios', fee: 'Tarifas', transport: 'Cómo llegar', feature: 'Historia y qué observar', walk: 'Recorrido recomendado', photo: 'Puntos para fotografiar', advice: 'Consejos de visita', stay: 'Alojamiento cercano', reviews: 'Opiniones', reviewText: 'Consulta las valoraciones de esta ubicación en Google Maps. No se muestra una cifra sin una ficha de opiniones verificada.', source: 'Fuente de información', map: 'Ver ubicación propia en Google Maps', regional: 'Esta visita es una excursión regional separada; no es una parada peatonal dentro del parque nacional.' },
  en: { home: 'Home', nearby: 'Nearby places', info: 'Visitor information', type: 'Place type', address: 'Address', access: 'Access', manager: 'Management', open: 'Opening', fee: 'Admission', transport: 'Getting there', feature: 'History and highlights', walk: 'Suggested visit', photo: 'Photography viewpoints', advice: 'Visitor tips', stay: 'Where to stay', reviews: 'Visitor reviews', reviewText: 'See reviews for this individual place on Google Maps. No unverified rating or review count is displayed.', source: 'Information source', map: 'Open this place in Google Maps', regional: 'This is a separate regional day trip, not a walking stop inside the national park.' },
  zh: { home: '首页', nearby: '周边景点', info: '基本资料', type: '景点类型', address: '具体地址', access: '交通与入口', manager: '管理主体', open: '开放时间', fee: '门票与费用', transport: '交通方式', feature: '历史与观察重点', walk: '推荐游览路线', photo: '拍摄机位', advice: '游览须知', stay: '周边住宿', reviews: '游客评价', reviewText: '可通过 Google Maps 查看该景点自己的游客评价；尚无核实的评分或评价数量，不显示推测数据。', source: '资料来源', map: '在 Google Maps 打开独立地点', regional: '这是需要单独安排交通的区域联游景点，并非国家公园内步行可达的停靠点。' }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const place = NEARBY_PLACES.find(p => p.slug === slug);
  if (!place) return {};
  const l = (locale === 'zh' || locale === 'en' ? locale : 'es') as 'es' | 'en' | 'zh';
  const current = `${SITE_URL}/${locale}/nearby/${slug}`;
  return { title: `${place.text[l].title} | Lagunas de Zempoala`, description: place.text[l].subtitle + '. ' + place.text[l].overview,
    alternates: { canonical: current, languages: { 'es-MX': `${SITE_URL}/es/nearby/${slug}`, en: `${SITE_URL}/en/nearby/${slug}`, 'zh-CN': `${SITE_URL}/zh/nearby/${slug}`, 'x-default': `${SITE_URL}/es/nearby/${slug}` } },
    openGraph: { title: place.text[l].title, description: place.text[l].subtitle, url: current, images: [place.image] } };
}

export default async function NearbyPlacePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const place = NEARBY_PLACES.find(p => p.slug === slug);
  if (!place || !['es', 'en', 'zh'].includes(locale)) notFound();
  setRequestLocale(locale);
  const l = locale as 'es' | 'en' | 'zh';
  const t = wording[l], d = place.text[l];
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.map)}`;
  const cards = [[t.type, d.title], [t.address, place.address], [t.access, place.access], [t.manager, place.manager]];
  const opening = { es: 'Consulta los horarios vigentes en la fuente oficial antes de viajar.', en: 'Check current opening hours with the linked site authority before travelling.', zh: '开放时段可能调整，出发前请核对页面所列管理方的现行公告。' }[l];
  const transportText = { es: `Destino independiente en ${place.city}: ${place.address}. Utiliza el enlace exclusivo de Google Maps para llegar desde Huitzilac o Cuernavaca.`, en: `Separate destination in ${place.city}: ${place.address}. Use its own Google Maps link to plan the journey from Huitzilac or Cuernavaca.`, zh: `景点位于 ${place.city}：${place.address}。从 Huitzilac 或 Cuernavaca 出发时请使用本页专属 Google Maps 链接规划交通。` }[l];
  const blocks = [[t.open, opening], [t.fee, place.admission], [t.transport, transportText], [t.feature, d.highlights], [t.walk, d.walk], [t.advice, d.advice], [t.photo, d.photo], [t.stay, place.stay]];
  const jsonLd = { '@context': 'https://schema.org', '@type': 'TouristAttraction', name: place.name, description: d.overview, image: place.image, address: { '@type': 'PostalAddress', streetAddress: place.address, addressCountry: 'MX' }, url: `${SITE_URL}/${locale}/nearby/${slug}`, hasMap: mapUrl };
  return <main className="section-padding" style={{ paddingTop: '7rem' }}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <article className="max-w-3xl mx-auto px-4">
      <nav className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}><a href={`/${locale}`} className="underline">{t.home}</a> / <a href={`/${locale}#nearby-attractions`} className="underline">{t.nearby}</a> / {place.name}</nav>
      <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{d.title}</h1>
      <p className="text-lg mb-5" style={{ color: 'var(--text-secondary)' }}>{d.subtitle}</p>
      <div className="flex flex-wrap gap-3 mb-9 text-sm"><span className="rounded-full px-4 py-3" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>{place.city}, Morelos</span><a className="rounded-full px-4 py-3 text-white font-semibold" style={{ background: 'var(--accent)' }} target="_blank" rel="noopener noreferrer" href={mapUrl}>{t.map}</a></div>
      <figure className="rounded-2xl overflow-hidden mb-10" style={{ border: '1px solid var(--border-color)' }}><img src={place.image} alt={place.name} className="w-full max-h-[460px] object-cover" /><figcaption className="text-xs p-3" style={{ color: 'var(--text-muted)' }}>{place.name} · <a className="underline" href={place.imageSource} rel="noopener noreferrer" target="_blank">{t.source}</a></figcaption></figure>
      <h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{d.title}</h2><p className="leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>{d.overview}</p>
      <section className="rounded-2xl p-6 mb-10" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}><h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{t.manager}</h2><p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{place.manager}. {d.overview}</p></section>
      <section className="mb-11"><h2 className="font-display text-2xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>{t.info}</h2><dl className="grid sm:grid-cols-2 gap-4">{cards.map(([key,value]) => <div key={key} className="rounded-xl p-4" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}><dt className="font-semibold mb-2">{key}</dt><dd className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{value}</dd></div>)}</dl></section>
      <p className="mb-10 rounded-xl p-4 text-sm" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>{t.regional}</p>
      {blocks.map(([heading,content]) => <section key={heading} className="mb-10"><h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{heading}</h2><p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{content}</p></section>)}
      <section className="mb-10"><h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{t.reviews}</h2><p className="mb-3" style={{ color: 'var(--text-secondary)' }}>{t.reviewText}</p><a className="underline" href={mapUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>Google Maps</a></section>
      <section className="rounded-2xl p-6" style={{ background: 'var(--bg-tertiary)' }}><h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{t.address}</h2><p className="mb-3">{place.address}</p><a className="underline" href={mapUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>{t.map}</a><p className="mt-4 text-sm"><a className="underline" href={place.source} target="_blank" rel="noopener noreferrer">{t.source}</a></p></section>
    </article>
  </main>;
}
