import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default as any;
  return { title: messages.notFound?.title || '404' };
}

export default async function LocaleNotFound({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default as any;
  const nf = messages.notFound || {};
  const homeHref = `/${locale}`;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
        <p className="font-display text-7xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
          404
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
          {nf.title || '404'}
        </h1>
        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>{nf.text || ''}</p>
        <a
          href={homeHref}
          className="inline-block px-6 py-2.5 rounded-full text-sm font-medium text-white transition-colors"
          style={{ background: 'var(--accent)' }}
        >
          {nf.home || ''}
        </a>
      </div>
    </div>
  );
}
