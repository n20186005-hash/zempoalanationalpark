'use client';

import { useLocale, useMessages, useTranslations } from 'next-intl';
import { TOPIC_KEYS } from '@/lib/topic-seo';

export default function TopicLinks() {
  const locale = useLocale();
  const t = useTranslations('topics');
  const messages = useMessages() as any;
  const topics = TOPIC_KEYS.map((k) => ({
    key: k,
    title: messages?.topics?.[k]?.title || k,
  }));
  const nearby = {
    es: { heading: 'Lugares cercanos para combinar la visita', description: 'Dos lugares con identidad, fotografías y ubicación propias. Las otras lagunas se incorporarán solo tras verificar acceso e imágenes.', lake: 'Laguna de Zempoala · lago principal', church: 'Parroquia de San Juan Bautista · Huitzilac' },
    en: { heading: 'Nearby places to explore', description: 'Two distinct places with matched photographs and individual map locations. Other lakes will be added only after photo and access verification.', lake: 'Laguna de Zempoala · main lake', church: 'San Juan Bautista Parish · Huitzilac' },
    zh: { heading: '周边独立景点与联游', description: '两处已核对独立地点与实景照片的景点；其他湖泊须确认照片和到达性后才会上线。', lake: 'Laguna de Zempoala · 国家公园主湖', church: 'San Juan Bautista · Huitzilac 历史教堂' },
  }[locale as 'es' | 'en' | 'zh'] || { heading: 'Nearby places', description: '', lake: 'Laguna de Zempoala', church: 'San Juan Bautista Parish' };

  return (
    <section className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-3 text-center" style={{ color: 'var(--text-primary)' }}>{nearby.heading}</h2>
          <p className="text-center mb-6 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>{nearby.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {([['laguna-zempoala', nearby.lake], ['parroquia-san-juan-bautista-huitzilac', nearby.church]] as const).map(([slug, label]) => <a key={slug} href={`/${locale}/${slug}`} className="block rounded-2xl p-6 transition-all hover:-translate-y-0.5" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)', color: 'var(--text-primary)' }}><span className="font-display font-semibold text-lg">{label}</span><p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>{messages?.topics?.[slug]?.subtitle}</p></a>)}
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
