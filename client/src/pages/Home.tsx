import Hero from '@/components/home/Hero';
import ImpactStats from '@/components/home/ImpactStats';
import AboutSection from '@/components/home/AboutSection';
import OurWorkSection from '@/components/home/OurWorkSection';
import ImpactStory from '@/components/home/ImpactStory';
import SupportSection from '@/components/home/SupportSection';
import EventsNewsSection from '@/components/home/EventsNewsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import NewsletterSection from '@/components/home/NewsletterSection';

const Home = () => {
  return (
    <>
      <Hero />
      <ImpactStats />
      <AboutSection />
      <OurWorkSection />
      <ImpactStory />
      <SupportSection />
      <EventsNewsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
};

export default Home;
