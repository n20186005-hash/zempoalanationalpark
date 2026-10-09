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

  return (
    <section className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-5xl mx-auto px-4">
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
