import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import PwaRegister from '@/components/PwaRegister';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const GA_MEASUREMENT_ID = 'G-HXM22WWPKP';

const MAPS_URL = 'https://maps.app.goo.gl/fZYMqK4G6o9FANmg8';

const jsonLdGraph = [
  {
    '@type': 'TouristAttraction',
    '@id': `${SITE_URL}/#attraction`,
    name: SITE_NAME,
    alternateName: [
      'Zempoala National Park',
      'Ocuilan Lagunas de Zempoala National Park',
      'Parque Nacional Lagunas de Zempoala',
    ],
    description:
      'National park in Mexico with 3 permanent and 4 seasonal lagoons, Montezuma pine forest and the rare axolotl. Visitor guide: hours, fees, directions and weather.',
    url: SITE_URL,
    image: [`${SITE_URL}/og-image.jpg`],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      bestRating: '5',
      ratingCount: '5444',
      url: MAPS_URL,
    },
    isAccessibleForFree: false,
    priceRange: 'MXN',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_NAME,
      addressLocality: 'Ocuilan',
      addressRegion: 'State of Mexico',
      postalCode: '52480',
      addressCountry: 'MX',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.0294179,
      longitude: -99.3199381,
    },
    hasMap: MAPS_URL,
    sameAs: [MAPS_URL, 'https://cultura.edomex.gob.mx/'],
  },
  {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: ['es', 'en', 'zh'],
    publisher: { '@id': `${SITE_URL}/#organization` },
  },
  {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icons/icon-512.png`,
    sameAs: [MAPS_URL, 'https://cultura.edomex.gob.mx/'],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const zhUrl = `${SITE_URL}/zh`;
  const enUrl = `${SITE_URL}/en`;
  const esUrl = `${SITE_URL}/es`;

  let selfUrl = esUrl;
  if (locale === 'en') selfUrl = enUrl;
  else if (locale === 'zh') selfUrl = zhUrl;

  const localeMap: Record<string, string> = {
    zh: 'zh_CN',
    en: 'en_US',
    es: 'es_MX',
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        zh: zhUrl,
        en: enUrl,
        es: esUrl,
        'x-default': esUrl,
      } as Record<string, string>,
    },
    openGraph: {
      title: messages.meta.ogTitle || messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: SITE_NAME,
      locale: localeMap[locale] || 'zh_CN',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          alt: messages.meta.ogImageAlt || SITE_NAME,
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const langMap: Record<string, string> = {
    zh: 'zh-CN',
    en: 'en',
    es: 'es',
  };

  const gaInlineScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      personalization_storage: 'denied',
      security_storage: 'granted'
    });
    try {
      var prefs = JSON.parse(localStorage.getItem('cookiePrefs') || '{}');
      if (prefs && prefs.analytics) {
        gtag('consent', 'update', { analytics_storage: 'granted' });
      }
      if (prefs && prefs.marketing) {
        gtag('consent', 'update', { ad_storage: 'granted', personalization_storage: 'granted' });
      }
    } catch(e) {}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
  `;

  return (
    <html lang={langMap[locale] || 'zh-CN'} suppressHydrationWarning>
      <head>
        {/* Google Analytics 4 */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: gaInlineScript }} />

        {/* Structured data: TouristAttraction, WebSite & Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': jsonLdGraph,
            }).replace(/</g, '\\u003c'),
          }}
        />

        {/* PWA */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#faf8f4" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0c1a14" media="(prefers-color-scheme: dark)" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Lagunas de Zempoala" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512.png" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
          <PwaRegister />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
