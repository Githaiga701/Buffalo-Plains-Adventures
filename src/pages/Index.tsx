import HeroSection from "@/components/HeroSection";
import DestinationsPreview from "@/components/DestinationsPreview";
import FeaturedPackages from "@/components/FeaturedPackages";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import CulturalExperiences from "@/components/CulturalExperiences";
import BeachDestinations from "@/components/BeachDestinations";
import RecommendedPlaces from "@/components/RecommendedPlaces";
import Maasailand from "@/components/Maasailand";
import ResortsAndRestaurants from "@/components/ResortsAndRestaurants";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <DestinationsPreview />
      <BeachDestinations />
      <Maasailand />
      <RecommendedPlaces />
      <ResortsAndRestaurants />
      <FeaturedPackages />
      <CulturalExperiences />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
};

export default Index;
