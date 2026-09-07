import { useTranslations, useMessages } from 'next-intl';

interface SeoCard {
  id: string;
  heading: string;
  text: string;
}

function toHtml(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

export default function EntityOverview() {
  const t = useTranslations('seoOverview');
  const messages = useMessages() as any;
  const cards: SeoCard[] = messages?.seoOverview?.cards || [];
  const breadcrumb: string[] = messages?.seoOverview?.breadcrumb || [];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Entity equality statement (first paragraph) */}
        <p
          className="text-xl sm:text-2xl font-body leading-relaxed mb-8"
          style={{ color: 'var(--text-primary)' }}
          dangerouslySetInnerHTML={{ __html: toHtml(t.raw('welcome') as string) }}
        />

        {/* Geographic hierarchy breadcrumb */}
        <nav aria-label={t('breadcrumbTitle')} className="mb-12">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            {breadcrumb.map((label, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>
                    →
                  </span>
                )}
                <span
                  className={i === breadcrumb.length - 1 ? 'font-semibold' : 'font-medium'}
                  style={{
                    color:
                      i === breadcrumb.length - 1
                        ? 'var(--accent)'
                        : 'var(--text-secondary)',
                  }}
                >
                  {label}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        {/* Semantic heading grid: About / Location / Landmarks / History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <article
              key={card.id}
              className="rounded-xl p-6 sm:p-8"
              style={{ background: 'var(--bg-secondary)', boxShadow: 'var(--card-shadow)' }}
            >
              <h2
                className="font-display text-xl sm:text-2xl font-semibold mb-4 leading-snug"
                style={{ color: 'var(--text-primary)' }}
              >
                {card.heading}
              </h2>
              <div
                className="text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
                dangerouslySetInnerHTML={{ __html: toHtml(card.text) }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
