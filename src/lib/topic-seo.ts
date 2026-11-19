import type { Metadata } from 'next';
import { SITE_URL } from './site';

export const TOPIC_KEYS = [
  'como-llegar',
  'precios-y-horarios',
  'fotos',
  'que-hacer',
  'desde-cdmx',
  'cabanas-y-alojamiento',
  'pesca-y-natacion',
] as const;

export type TopicKey = (typeof TOPIC_KEYS)[number];

const HREFLANG: Record<string, string> = {
  es: 'es-MX',
  en: 'en',
  zh: 'zh-CN',
};

export function buildTopicLanguages(topic: string): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const l of ['zh', 'en', 'es']) {
    langs[HREFLANG[l]] = `${SITE_URL}/${l}/${topic}`;
  }
  langs['x-default'] = `${SITE_URL}/es/${topic}`;
  return langs;
}

export function topicMetadata(
  locale: string,
  topic: string,
  title: string,
  description: string
): Metadata {
  const self = `${SITE_URL}/${locale}/${topic}`;
  return {
    title,
    description,
    alternates: {
      canonical: self,
      languages: buildTopicLanguages(topic),
    },
    openGraph: {
      title,
      description,
      url: self,
      type: 'website',
      siteName: 'Lagunas de Zempoala National Park',
    },
  };
}
