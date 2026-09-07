import { useTranslations, useMessages } from 'next-intl';

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqSection() {
  const t = useTranslations('faqSection');
  const messages = useMessages() as any;
  const items: FaqItem[] = messages?.faqSection?.items || [];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <section className="section-padding" id="faq">
      <div className="max-w-4xl mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p className="mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>

        <div className="space-y-4">
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border overflow-hidden"
              style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}
            >
              <summary className="cursor-pointer select-none list-none flex items-center justify-between gap-4 p-5 font-semibold text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 text-2xl font-normal leading-none transition-transform duration-300 group-open:rotate-45"
                  style={{ color: 'var(--accent)' }}
                >
                  +
                </span>
              </summary>
              <div
                className="px-5 pb-5 text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
