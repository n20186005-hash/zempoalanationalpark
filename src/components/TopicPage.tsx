'use client';

import { useLocale, useMessages, useTranslations } from 'next-intl';
import { SITE_URL } from '@/lib/site';
import { TOPIC_KEYS } from '@/lib/topic-seo';

export default function TopicPage({ topic }: { topic: string }) {
  const locale = useLocale();
  const t = useTranslations('topics');
  const messages = useMessages() as any;
  const data = messages?.topics?.[topic];
  if (!data) return null;

  const sections: Array<{ heading: string; body: string }> = data.sections || [];
  const faq: Array<{ q: string; a: string }> = data.faq || [];
  const others = TOPIC_KEYS.filter((k) => k !== topic);

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
          <div
            className="text-base leading-relaxed mb-12"
            style={{ color: 'var(--text-secondary)' }}
          >
            {data.intro}
          </div>

          <div className="space-y-10 mb-14">
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

          {data.mapUrl && (
            <a href={data.mapUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex max-w-full break-words rounded-full px-5 py-3 mb-12 text-sm font-semibold text-white"
              style={{ background: 'var(--accent)' }}>
              {data.mapLabel}
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
