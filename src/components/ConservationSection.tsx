import { useTranslations, useMessages } from 'next-intl';

interface Topic {
  id: string;
  title: string;
  text: string;
}

export default function ConservationSection() {
  const t = useTranslations('conservation');
  const messages = useMessages() as any;
  const topics: Topic[] = messages?.conservation?.topics || [];
  const rules: string[] = messages?.conservation?.rules || [];

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

        <p className="text-sm font-bold mb-4 uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
          {t('topicsTitle')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {topics.map((topic) => (
            <article
              key={topic.id}
              className="rounded-2xl p-6"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <h3
                className="font-display text-lg font-semibold mb-3 leading-snug"
                style={{ color: 'var(--text-primary)' }}
              >
                {topic.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {topic.text}
              </p>
            </article>
          ))}
        </div>

        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--accent)',
          }}
        >
          <p className="font-display text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
            {t('rulesTitle')}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {rules.map((rule, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
                  <path d="M4 18l6-6-6-6M12 18l6-6-6-6" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
