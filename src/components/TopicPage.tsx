'use client';

import { useLocale, useMessages, useTranslations } from 'next-intl';
import { SITE_URL } from '@/lib/site';
import { TOPIC_KEYS } from '@/lib/topic-seo';
import { getAttractionExtra } from '@/lib/attraction-extra';
import { getAttractionVisit } from '@/lib/attraction-visit';

export default function TopicPage({ topic }: { topic: string }) {
  const locale = useLocale();
  const t = useTranslations('topics');
  const messages = useMessages() as any;
  const data = messages?.topics?.[topic];
  if (!data) return null;
  const extra = getAttractionExtra(locale, topic);
  const visit = getAttractionVisit(locale, topic);

  const sections: Array<{ heading: string; body: string }> = data.sections || [];
  const faq: Array<{ q: string; a: string }> = data.faq || [];
  const others = TOPIC_KEYS.filter((k) => k !== topic);
  const labels = {
    es: { info: 'Información básica', place: 'Lugar', access: 'Acceso y transporte', manager: 'Administración', rating: 'Opiniones del parque', reference: 'Referencia de Google Maps · octubre de 2026', source: 'Información de CONANP', map: 'Ver ubicación en Google Maps' },
    en: { info: 'Visitor information', place: 'Location', access: 'Getting there', manager: 'Management', rating: 'Park reviews', reference: 'Google Maps snapshot · October 2026', source: 'CONANP information', map: 'Open Google Maps location' },
    zh: { info: '基本资料', place: '地点', access: '交通与抵达', manager: '管理主体', rating: '公园游客评价', reference: 'Google Maps 数据快照 · 2026 年 10 月', source: 'CONANP 公开资料', map: '打开 Google Maps 地点' },
  }[locale as 'es' | 'en' | 'zh'] || {
    info: 'Visitor information', place: 'Location', access: 'Getting there', manager: 'Management', rating: 'Park reviews', reference: 'Google Maps snapshot · October 2026', source: 'CONANP information', map: 'Open Google Maps location',
  };
  const parkMap = 'https://maps.app.goo.gl/fZYMqK4G6o9FANmg8';

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('home'),
        item: `${SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: data.title,
        item: `${SITE_URL}/${locale}/${topic}`,
      },
    ],
  };

  const faqLd = faq.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd).replace(/</g, '\\u003c'),
        }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqLd).replace(/</g, '\\u003c'),
          }}
        />
      )}

      <main className="section-padding" style={{ paddingTop: '7rem' }}>
        <div className="max-w-3xl mx-auto px-4">
          <nav className="text-sm mb-8 break-words" style={{ color: 'var(--text-muted)' }}>
            <a href={`/${locale}`} style={{ color: 'var(--accent)' }}>
              {t('home')}
            </a>
            <span className="mx-2">→</span>
            <span style={{ color: 'var(--text-secondary)' }}>{data.title}</span>
          </nav>

          <h1
            className="font-display text-4xl sm:text-5xl font-bold mb-3 leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            {data.title}
          </h1>
          <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
            {data.subtitle}
          </p>
          {visit && <div className="flex flex-wrap gap-3 mb-8 items-center text-sm">
            <span className="rounded-full px-4 py-2 font-semibold" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>{data.ratingValue || messages?.reviews?.ratingValue} ★ · {data.reviewCount || messages?.reviews?.reviewCount}</span>
            <span className="rounded-full px-4 py-2" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>{visit.hoursTitle}: {visit.hours}</span>
            <a href={data.mapUrl || parkMap} target="_blank" rel="noopener noreferrer" className="rounded-full px-4 py-2 text-white font-semibold" style={{ background: 'var(--accent)' }}>{data.mapLabel || labels.map}</a>
          </div>}
          {visit && <h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{visit.explorationTitle}</h2>}
          <div
            className="text-base leading-relaxed mb-12"
            style={{ color: 'var(--text-secondary)' }}
          >
            {data.intro}
          </div>

          {visit && <div className="space-y-8 mb-12">
            <section><h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{visit.visitTitle}</h2><ul className="space-y-2 list-disc pl-5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{visit.visitTips.map((tip, i) => <li key={i}>{tip}</li>)}</ul></section>
            <section><h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{visit.highlightsTitle}</h2><ul className="grid gap-3 sm:grid-cols-2">{visit.highlights.map((feature, i) => <li key={i} className="rounded-xl p-4 leading-relaxed" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>{feature}</li>)}</ul></section>
          </div>}

          {data.photos?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {data.photos.map((photo: { src: string; alt: string; source: string; credit?: string }, i: number) => (
                <figure key={i} className="min-w-0 rounded-xl overflow-hidden" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                  <img src={topic === 'laguna-zempoala' && i === 0 ? '/gallery/lagunas-zempoala-park-scene-1.jpg' : photo.src} alt={photo.alt} loading="lazy" referrerPolicy="no-referrer" onError={(event) => { if (topic === 'parroquia-san-juan-bautista-huitzilac' && event.currentTarget.dataset.fallback !== 'used') { event.currentTarget.dataset.fallback = 'used'; event.currentTarget.src = 'https://static.wixstatic.com/media/66e22b_3d54755070e3464f91b6058917f8088c~mv2.jpg'; } }} className="w-full h-56 object-cover" />
                  <figcaption className="p-3 text-xs break-words" style={{ color: 'var(--text-muted)' }}>
                    {photo.alt} · <a href={photo.source} target="_blank" rel="noopener noreferrer" className="underline">{photo.credit || 'Wikimedia Commons'}</a>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}

          {extra && (
            <section className="mb-12 rounded-2xl p-6 sm:p-8" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
              <h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{extra.aboutTitle}</h2>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{extra.about}</p>
              <a href={data.managerUrl || 'https://descubreanp.conanp.gob.mx/es/conanp/ANP?suri=97'} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-sm underline" style={{ color: 'var(--accent)' }}>{data.managerLinkLabel || labels.source}</a>
            </section>
          )}

          <section className="mb-12 rounded-2xl p-5 sm:p-7" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <h2 className="font-display text-2xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>{labels.info}</h2>
            <dl className="grid sm:grid-cols-2 gap-5 text-sm">
              {visit && <><div><dt className="font-semibold mb-1">{visit.typeTitle}</dt><dd style={{ color: 'var(--text-secondary)' }}>{visit.type}</dd></div><div><dt className="font-semibold mb-1">{visit.addressTitle}</dt><dd style={{ color: 'var(--text-secondary)' }}>{visit.address}</dd></div></>}
              <div><dt className="font-semibold mb-1">{labels.place}</dt><dd style={{ color: 'var(--text-secondary)' }}>{data.location || 'Parque Nacional Lagunas de Zempoala · Huitzilac / Ocuilan, México'}</dd></div>
              <div><dt className="font-semibold mb-1">{labels.access}</dt><dd style={{ color: 'var(--text-secondary)' }}>{data.access || messages?.topics?.['como-llegar']?.subtitle}</dd></div>
              <div><dt className="font-semibold mb-1">{labels.manager}</dt><dd style={{ color: 'var(--text-secondary)' }}>{data.manager || 'Comisión Nacional de Áreas Naturales Protegidas (CONANP)'} · <a className="underline" href={data.managerUrl || 'https://descubreanp.conanp.gob.mx/es/conanp/ANP?suri=97'} target="_blank" rel="noopener noreferrer">{data.manager ? data.managerLinkLabel || labels.source : labels.source}</a></dd></div>
              <div><dt className="font-semibold mb-1">{data.ratingLabel || labels.rating}</dt><dd style={{ color: 'var(--text-secondary)' }}>{data.ratingValue || messages?.reviews?.ratingValue} ★ · {data.reviewCount || messages?.reviews?.reviewCount} · {data.ratingDate || labels.reference}<div><a className="underline" href={data.mapUrl || parkMap} target="_blank" rel="noopener noreferrer">Google Maps</a></div></dd></div>
            </dl>
          </section>

          {visit && <div className="space-y-10 mb-14">
            <section><h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{visit.hoursTitle}</h2><p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{visit.hours}</p></section>
            <section><h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{visit.feeTitle}</h2><p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{visit.fee}</p></section>
            <section><h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{visit.transportTitle}</h2><ul className="list-disc pl-5 space-y-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{visit.transport.map((item, i) => <li key={i}>{item}</li>)}</ul></section>
            <section><h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{visit.featureTitle}</h2><p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{visit.featureText}</p></section>
          </div>}

          <div className="space-y-10 mb-14">
            {extra && <section><h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{extra.historyTitle}</h2><p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{extra.history}</p></section>}
            {sections.map((s, i) => (
              <section key={i}>
                <h2
                  className="font-display text-2xl font-semibold mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {s.heading}
                </h2>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {s.body}
                </p>
              </section>
            ))}
          </div>

          {extra && <div className="space-y-10 mb-12">
            <section><h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{extra.routeTitle}</h2><ol className="space-y-3">{extra.route.map((step, i) => <li key={i} className="flex gap-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}><span className="font-semibold shrink-0" style={{ color: 'var(--accent)' }}>{i + 1}.</span><span>{step}</span></li>)}</ol></section>
            <section><h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>{extra.photoTitle}</h2><ul className="list-disc pl-5 space-y-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{extra.photoTips.map((tip, i) => <li key={i}>{tip}</li>)}</ul></section>
            <section className="rounded-xl p-5" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}><h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{extra.adviceTitle}</h2><p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{extra.advice}</p></section>
          </div>}

          {visit && <div className="space-y-10 mb-12">
            <section><h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{visit.stayTitle}</h2><p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{visit.stay}</p></section>
            <section><h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{visit.reviewsTitle}</h2><p className="leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{visit.reviewsText}</p><p className="text-sm" style={{ color: 'var(--text-muted)' }}>{data.ratingValue || messages?.reviews?.ratingValue} ★ · {data.reviewCount || messages?.reviews?.reviewCount} · {data.ratingDate || labels.reference}</p><a className="underline text-sm" href={data.mapUrl || parkMap} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>Google Maps</a></section>
            <section className="rounded-2xl p-6" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}><h2 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{visit.directionsTitle}</h2><p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{visit.address}</p><a className="underline font-semibold" href={data.mapUrl || parkMap} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>{data.mapLabel || labels.map}</a></section>
          </div>}

          {(data.mapUrl || data.location) && (
            <a href={data.mapUrl || parkMap} target="_blank" rel="noopener noreferrer"
              className="inline-flex max-w-full break-words rounded-full px-5 py-3 mb-12 text-sm font-semibold text-white"
              style={{ background: 'var(--accent)' }}>
              {data.mapLabel || labels.map}
            </a>
          )}

          {faq.length > 0 && (
            <section className="mb-14">
              <h2
                className="font-display text-2xl font-semibold mb-5"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('faqTitle')}
              </h2>
              <div className="space-y-4">
                {faq.map((f, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-5"
                    style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
                  >
                    <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                      {f.q}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {f.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {data.relatedTitle}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {others.map((k) => (
                <li key={k}>
                  <a
                    href={`/${locale}/${k}`}
                    className="block rounded-xl p-4 transition-colors"
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {messages?.topics?.[k]?.title || k}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
