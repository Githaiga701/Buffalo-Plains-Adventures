import HeroSection from "@/components/HeroSection";
import DestinationsPreview from "@/components/DestinationsPreview";
import FeaturedPackages from "@/components/FeaturedPackages";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import CulturalExperiences from "@/components/CulturalExperiences";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <DestinationsPreview />
      <FeaturedPackages />
      <CulturalExperiences />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
};

export default Index;
