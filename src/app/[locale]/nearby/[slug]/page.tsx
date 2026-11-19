import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { NEARBY_PLACES } from '@/lib/nearby-places';
import { SITE_URL } from '@/lib/site';
import { NEARBY_EDITORIAL } from '@/lib/nearby-editorial';
import { NEARBY_VISITOR_FACTS } from '@/lib/nearby-visitor-facts';

const wording = {
  es: { home: 'Inicio', nearby: 'Lugares cercanos', info: 'Información básica', type: 'Tipo de atractivo', address: 'Dirección', access: 'Acceso', manager: 'Acerca del lugar y su administración', open: 'Horarios', fee: 'Tarifas', transport: 'Cómo llegar', feature: 'Descubre sus atractivos', walk: 'Recorrido recomendado', photo: 'Puntos para fotografiar', advice: 'Consejos de visita', stay: 'Alojamiento cercano', reviews: 'Opiniones', reviewText: 'Lee las experiencias y valoraciones de los visitantes en la ficha de este lugar en Google Maps.', source: 'Fuente de información', map: 'Ver este lugar en Google Maps', regional: 'Esta visita se realiza por separado de las lagunas del parque nacional.', history: 'Contexto histórico', detail: 'Arquitectura, paisaje y detalles', faq: 'Preguntas frecuentes', route: 'Paseo paso a paso', explore: 'Explora el lugar', tips: 'Planifica la visita', duration: 'Tiempo sugerido', location: 'Ubicación', rating: 'Opiniones en Google Maps', reviewLink: 'Leer opiniones', guide: 'Guía de acceso y dirección', official: 'Consultar fuente de horarios y tarifas' },
  en: { home: 'Home', nearby: 'Nearby places', info: 'Visitor information', type: 'Place type', address: 'Address', access: 'Access', manager: 'About this place and its management', open: 'Opening hours', fee: 'Admission', transport: 'Getting there', feature: 'Discover the highlights', walk: 'Suggested visit', photo: 'Photography viewpoints', advice: 'Visitor tips', stay: 'Where to stay', reviews: 'Visitor reviews', reviewText: 'Read visitors’ experiences and ratings on this specific place’s Google Maps listing.', source: 'Information source', map: 'View this place in Google Maps', regional: 'This is a separate excursion from the national park lakes.', history: 'Historical background', detail: 'Architecture and what to observe', faq: 'Frequently asked questions', route: 'Step-by-step walk', explore: 'Explore the place', tips: 'Plan your visit', duration: 'Suggested time', location: 'Location', rating: 'Google Maps reviews', reviewLink: 'Read reviews', guide: 'Directions and location', official: 'Check official opening and price details' },
  zh: { home: '首页', nearby: '周边景点', info: '基本资料', type: '景点类型', address: '具体地址', access: '交通与入口', manager: '关于景点与管理主体', open: '开放时间', fee: '门票与费用', transport: '交通方式', feature: '发现景点魅力', walk: '推荐游览路线', photo: '拍摄机位', advice: '游览须知', stay: '周边住宿', reviews: '游客评价', reviewText: '可通过该景点独立的 Google Maps 地点页面阅读游客体验和评分。', source: '资料来源', map: '在 Google Maps 查看此景点', regional: '这是需要单独安排行程的周边景点，与国家公园湖泊不在同一步行线路。', history: '历史背景', detail: '建筑特色与观察重点', faq: '常见问答', route: '分步游览路线', explore: '探索景点', tips: '游览建议', duration: '建议游览时长', location: '所在地', rating: 'Google Maps 游客评价', reviewLink: '查看评价', guide: '交通指南与位置', official: '核对官方开放与票价信息' }
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
  const editorial = NEARBY_EDITORIAL[slug]?.[l];
  const facts = NEARBY_VISITOR_FACTS[slug];
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.map)}`;
  const cards = [[t.type, facts?.category[l] || d.title], [t.address, place.address], [t.location, `${place.city}, Morelos, México`], [t.duration, facts?.duration[l] || d.walk], [t.access, place.access], [t.manager, place.manager]];
  const opening = facts?.hours[l] || place.access;
  const transportText = facts?.arrival[l] || place.access;
  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => <section className="mb-10"><h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{title}</h2><div className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{children}</div></section>;
  const jsonLd = { '@context': 'https://schema.org', '@type': 'TouristAttraction', name: place.name, description: d.overview, image: place.image, address: { '@type': 'PostalAddress', streetAddress: place.address, addressCountry: 'MX' }, url: `${SITE_URL}/${locale}/nearby/${slug}`, hasMap: mapUrl };
  return <main className="section-padding" style={{ paddingTop: '7rem' }}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <article className="max-w-3xl mx-auto px-4">
      <nav className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}><a href={`/${locale}`} className="underline">{t.home}</a> / <a href={`/${locale}#nearby-attractions`} className="underline">{t.nearby}</a> / {place.name}</nav>
      <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{d.title}</h1>
      <p className="text-lg mb-5" style={{ color: 'var(--text-secondary)' }}>{d.subtitle}</p>
      <div className="flex flex-wrap gap-3 mb-9 text-sm"><span className="rounded-full px-4 py-3" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>{place.city}, Morelos</span><span className="rounded-full px-4 py-3" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>{opening}</span><a className="rounded-full px-4 py-3 underline" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }} href={mapUrl} target="_blank" rel="noopener noreferrer">{t.rating}</a><a className="rounded-full px-4 py-3 text-white font-semibold" style={{ background: 'var(--accent)' }} target="_blank" rel="noopener noreferrer" href={mapUrl}>{t.map}</a></div>
      <figure className="rounded-2xl overflow-hidden mb-10" style={{ border: '1px solid var(--border-color)' }}><img src={place.image} alt={place.name} className="w-full max-h-[460px] object-cover" /><figcaption className="text-xs p-3" style={{ color: 'var(--text-muted)' }}>{place.name} · <a className="underline" href={place.imageSource} rel="noopener noreferrer" target="_blank">{t.source}</a></figcaption></figure>
      <Section title={t.explore}><p>{d.overview}</p></Section>
      <Section title={t.tips}><p>{d.walk}</p><p className="mt-3">{facts?.duration[l]}</p></Section>
      <Section title={t.feature}><p>{d.highlights}</p></Section>
      <section className="rounded-2xl p-6 mb-10" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}><h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{t.manager}</h2><p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{editorial?.about || d.overview}</p><p className="mt-3 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{place.manager}</p></section>
      <section className="mb-11"><h2 className="font-display text-2xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>{t.info}</h2><dl className="grid sm:grid-cols-2 gap-4">{cards.map(([key,value]) => <div key={key} className="rounded-xl p-4" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}><dt className="font-semibold mb-2">{key}</dt><dd className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{value}</dd></div>)}</dl></section>
      <Section title={t.open}><p>{opening}</p><a className="underline text-sm mt-3 inline-block" href={facts?.reference || place.source} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>{t.official}</a></Section>
      <Section title={t.fee}><p>{facts?.fee[l] || place.admission}</p><p className="text-sm mt-3">{place.admission}</p></Section>
      <Section title={t.transport}><p>{transportText}</p><p className="mt-3 text-sm">{place.access}</p></Section>
      {editorial && <div className="space-y-10 mb-10">
        <section><h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{t.history}</h2><p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{editorial.history}</p></section>
        <section><h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{t.detail}</h2><p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{editorial.details}</p></section>
      </div>}
      <Section title={t.walk}><p>{d.walk}</p></Section>
      {editorial && <><section className="mb-11"><h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{t.route}</h2><ol className="space-y-4">{editorial.route.map((step,i)=><li key={i} className="flex gap-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}><span className="shrink-0 font-semibold" style={{ color: 'var(--accent)' }}>{i+1}.</span><span>{step}</span></li>)}</ol></section><section className="mb-12"><h2 className="font-display text-2xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>{t.faq}</h2><div className="space-y-3">{editorial.faq.map((item,i)=><div key={i} className="rounded-xl p-5" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}><h3 className="font-semibold mb-2">{item.q}</h3><p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.a}</p></div>)}</div></section></>}
      <Section title={t.advice}><p>{d.advice}</p><p className="mt-3 text-sm">{t.regional}</p></Section>
      <Section title={t.photo}><p>{d.photo}</p></Section>
      <Section title={t.stay}><p>{place.stay}</p></Section>
      <section className="mb-10"><h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{t.reviews}</h2><p className="mb-3" style={{ color: 'var(--text-secondary)' }}>{t.reviewText}</p><a className="underline" href={mapUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>{t.reviewLink} · {place.name}</a></section>
      <section className="rounded-2xl p-6" style={{ background: 'var(--bg-tertiary)' }}><h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{t.guide}</h2><p className="mb-3">{place.address}</p><p className="mb-3 text-sm" style={{ color: 'var(--text-secondary)' }}>{transportText}</p><a className="underline" href={mapUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>{t.map}</a><p className="mt-4 text-sm"><a className="underline" href={place.source} target="_blank" rel="noopener noreferrer">{t.source}</a></p></section>
    </article>
  </main>;
}
