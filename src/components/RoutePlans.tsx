import { useTranslations, useMessages } from 'next-intl';

interface RouteCard {
  id: string;
  title: string;
  tag: string;
  duration: string;
  route: string[];
  tips: string[];
}

export default function RoutePlans() {
  const t = useTranslations('routePlans');
  const messages = useMessages() as any;
  const cards: RouteCard[] = messages?.routePlans?.cards || [];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p className="mb-10 leading-relaxed max-w-4xl" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <article
              key={card.id}
              className="rounded-2xl p-6 sm:p-7 flex flex-col"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <div className="mb-5">
                <h3
                  className="font-display text-xl sm:text-2xl font-semibold mb-3 leading-snug"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {card.title}
                </h3>
                <span
                  className="inline-block text-xs font-semibold rounded-full px-3 py-1 mb-2"
                  style={{ background: 'var(--bg-tertiary)', color: 'var(--accent)', border: '1px solid var(--accent)' }}
                >
                  {card.tag}
                </span>
                <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {card.duration}
                </p>
              </div>

              <p className="text-sm font-bold mb-3 uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
                {t('routeLabel')}
              </p>
              <ol className="space-y-2 mb-6">
                {card.route.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold"
                      style={{ background: 'var(--accent)', color: 'white' }}
                    >
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-auto">
                <p className="text-sm font-bold mb-3 uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
                  {t('tipsLabel')}
                </p>
                <ul className="space-y-2">
                  {card.tips.map((tip, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
                        <circle cx="12" cy="12" r="10" stroke="var(--accent)" strokeWidth="2" />
                        <path d="M8 12.5l2.5 2.5L16 9" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
