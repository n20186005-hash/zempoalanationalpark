import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import EntityOverview from '@/components/EntityOverview';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import WeatherSection from '@/components/WeatherSection';
import SeasonalGuide from '@/components/SeasonalGuide';
import RoutePlans from '@/components/RoutePlans';
import ItinerarySection from '@/components/ItinerarySection';
import HistoryTimeline from '@/components/HistoryTimeline';
import StorySection from '@/components/StorySection';
import RouteSection from '@/components/RouteSection';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FaqSection from '@/components/FaqSection';
import MapEmbed from '@/components/MapEmbed';
import TopicLinks from '@/components/TopicLinks';
import SourcesSection from '@/components/SourcesSection';
import ConservationSection from '@/components/ConservationSection';
import Footer from '@/components/Footer';

// Render on each request so the weather forecast is always fresh.
export const dynamic = 'force-dynamic';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <EntityOverview />
        <Intro />
        <BasicInfo />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <MapEmbed />
        <TopicLinks />
        <WeatherSection locale={locale} />
        <SeasonalGuide />
        <RoutePlans />
        <ItinerarySection />
        <HistoryTimeline />
        <StorySection />
        <RouteSection />
        <FacilitiesSection />
        <Gallery />
        <Reviews />
        <FaqSection />
        <SourcesSection />
        <ConservationSection />
      </main>
      <Footer />
    </>
  );
}
