import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { NEARBY_PLACES } from '@/lib/nearby-places';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const locales = ['zh', 'en', 'es'];
  const routes = [
    '',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-settings',
    '/como-llegar',
    '/precios-y-horarios',
    '/fotos',
    '/que-hacer',
    '/desde-cdmx',
    '/cabanas-y-alojamiento',
    '/pesca-y-natacion',
    '/opiniones',
    '/desde-cuernavaca',
    '/desde-huitzilac',
    '/laguna-zempoala',
    '/parroquia-san-juan-bautista-huitzilac',
    ...NEARBY_PLACES.map((place) => `/nearby/${place.slug}`),
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.5,
      });
    }
  }

  return sitemap;
}
