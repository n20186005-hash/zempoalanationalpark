import { useTranslations, useMessages } from 'next-intl';

interface SourceItem {
  name: string;
  url: string;
}

export default function SourcesSection() {
  const t = useTranslations('sourcesSection');
  const messages = useMessages() as any;
  const items: SourceItem[] = messages?.sourcesSection?.items || [];

  return (
    <section
      className="section-padding"
      style={{ background: 'var(--bg-tertiary)' }}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p className="mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {t('intro')}
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {items.map((item, i) => (
            <li key={i}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full rounded-xl border p-5 text-sm leading-relaxed hover:underline"
                style={{
                  borderColor: 'var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--accent)',
                }}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {t('portalPrefix')}{' '}
          <a
            href={t('portalUrl')}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
            style={{ color: 'var(--accent)' }}
          >
            {t('portalLabel')}
          </a>
        </p>
      </div>
    </section>
  );
}
