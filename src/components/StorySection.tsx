import { useTranslations, useMessages } from 'next-intl';

const LEGEND_SOURCE_URL =
  'https://www.gob.mx/conagua/es/articulos/la-muerte-que-dio-vida-a-las-lagunas-de-zempoala';

interface StoryCard {
  id: string;
  title: string;
  text: string;
}

export default function StorySection() {
  const t = useTranslations('storySection');
  const messages = useMessages() as any;
  const cards: StoryCard[] = messages?.storySection?.cards || [];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
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
              className="rounded-2xl p-6 sm:p-7"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <h3
                className="font-display text-xl font-semibold mb-4 leading-snug"
                style={{ color: 'var(--text-primary)' }}
              >
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {card.text}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm text-center" style={{ color: 'var(--text-muted)' }}>
          {t('sourceLabel')}:{' '}
          <a
            href={LEGEND_SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
            style={{ color: 'var(--accent)' }}
          >
            www.gob.mx/conagua
          </a>
        </p>
      </div>
    </section>
  );
}
