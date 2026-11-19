'use client';

import { useLocale, useMessages, useTranslations } from 'next-intl';
import { TOPIC_KEYS } from '@/lib/topic-seo';
import { NEARBY_PLACES } from '@/lib/nearby-places';

export default function TopicLinks() {
  const locale = useLocale();
  const t = useTranslations('topics');
  const messages = useMessages() as any;
  const topics = TOPIC_KEYS.map((k) => ({
    key: k,
    title: messages?.topics?.[k]?.title || k,
  }));
  const nearby = {
    es: { heading: 'Lugares cercanos para combinar la visita', description: '11 lugares independientes del parque y destinos regionales en Cuernavaca y Tepoztlán. Organiza el transporte por separado.', lake: 'Laguna de Zempoala · lago principal', church: 'Parroquia de San Juan Bautista · Huitzilac' },
    en: { heading: 'Nearby places to explore', description: '11 separate attractions and regional day trips in Cuernavaca and Tepoztlán. Plan transport to each destination.', lake: 'Laguna de Zempoala · main lake', church: 'San Juan Bautista Parish · Huitzilac' },
    zh: { heading: '周边独立景点与区域联游', description: '11 处独立景点与 Cuernavaca、Tepoztlán 区域联游目的地；前往各地需要单独安排交通。', lake: 'Laguna de Zempoala · 国家公园主湖', church: 'San Juan Bautista · Huitzilac 历史教堂' },
  }[locale as 'es' | 'en' | 'zh'] || { heading: 'Nearby places', description: '', lake: 'Laguna de Zempoala', church: 'San Juan Bautista Parish' };

  return (
    <section className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-12" id="nearby-attractions">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-3 text-center" style={{ color: 'var(--text-primary)' }}>{nearby.heading}</h2>
          <p className="text-center mb-6 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>{nearby.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {([['laguna-zempoala', nearby.lake, '/gallery/lagunas-zempoala-park-scene-1.jpg'], ['parroquia-san-juan-bautista-huitzilac', nearby.church, 'https://exploramorelos.com/wp-content/uploads/2020/09/huitzilac-001-ret-1920x1024.jpg']] as const).map(([slug, label, image]) => <a key={slug} href={`/${locale}/${slug}`} className="block rounded-2xl p-5 transition-all hover:-translate-y-0.5" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)', color: 'var(--text-primary)' }}><img src={image} alt={label} loading="lazy" referrerPolicy="no-referrer" onError={(event) => { if (slug === 'parroquia-san-juan-bautista-huitzilac' && event.currentTarget.dataset.fallback !== 'used') { event.currentTarget.dataset.fallback = 'used'; event.currentTarget.src = 'https://static.wixstatic.com/media/66e22b_3d54755070e3464f91b6058917f8088c~mv2.jpg'; } }} className="w-full h-36 object-cover rounded-lg mb-3"/><span className="font-display font-semibold text-lg">{label}</span><p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>{messages?.topics?.[slug]?.subtitle}</p></a>)}
            {NEARBY_PLACES.map((place) => <a key={place.slug} href={`/${locale}/nearby/${place.slug}`} className="block rounded-2xl p-5 transition-all hover:-translate-y-0.5" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)', color: 'var(--text-primary)' }}><img src={place.image} alt={place.name} loading="lazy" className="w-full h-36 object-cover rounded-lg mb-3"/><span className="font-display text-base font-semibold">{place.text[locale as 'es' | 'en' | 'zh']?.title || place.name}</span><p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>{place.city}, Morelos</p></a>)}
          </div>
        </div>
        <h2
          className="font-display text-2xl sm:text-3xl font-semibold mb-6 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('guidesTitle')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((tp) => (
            <a
              key={tp.key}
              href={`/${locale}/${tp.key}`}
              className="rounded-2xl p-5 transition-all hover:-translate-y-0.5"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--card-shadow)',
                color: 'var(--text-primary)',
              }}
            >
              <span className="text-base font-semibold">{tp.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
