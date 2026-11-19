import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import TopicPage from '@/components/TopicPage';
import { topicMetadata } from '@/lib/topic-seo';

const TOPIC = 'cabanas-y-alojamiento';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default as any;
  const data = messages.topics[TOPIC];
  return topicMetadata(locale, TOPIC, data.title, data.subtitle);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TopicPage topic={TOPIC} />;
}
