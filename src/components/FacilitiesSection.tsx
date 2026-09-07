import { useTranslations, useMessages } from 'next-intl';

interface FacilityItem {
  id: string;
  name: string;
  park: string;
  town: string;
  tip: string;
}

export default function FacilitiesSection() {
  const t = useTranslations('facilities');
  const messages = useMessages() as any;
  const items: FacilityItem[] = messages?.facilities?.items || [];

  const placeholder = (v: string) => !v || v === '-' || v === '—';

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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl p-6"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <h3 className="font-display text-lg font-semibold mb-4 leading-snug" style={{ color: 'var(--text-primary)' }}>
                {item.name}
              </h3>

              <dl className="space-y-3 text-sm leading-relaxed">
                <div>
                  <dt className="font-semibold mb-1 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                    <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'var(--accent)' }} />
                    {t('parkTitle')}
                  </dt>
                  <dd style={{ color: placeholder(item.park) ? 'var(--text-muted)' : 'var(--text-secondary)' }}>
                    {placeholder(item.park) ? '—' : item.park}
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold mb-1 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                    <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'var(--accent)' }} />
                    {t('townTitle')}
                  </dt>
                  <dd style={{ color: placeholder(item.town) ? 'var(--text-muted)' : 'var(--text-secondary)' }}>
                    {placeholder(item.town) ? '—' : item.town}
                  </dd>
                </div>

                <div
                  className="rounded-lg px-3 py-2"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <dt className="font-semibold mb-0.5 text-xs uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                    {t('tipTitle')}
                  </dt>
                  <dd style={{ color: 'var(--text-secondary)' }}>{item.tip}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
