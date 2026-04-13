import { lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";

const DestinationsPreview   = lazy(() => import("@/components/DestinationsPreview"));
const BeachDestinations     = lazy(() => import("@/components/BeachDestinations"));
const Maasailand            = lazy(() => import("@/components/Maasailand"));
const RecommendedPlaces     = lazy(() => import("@/components/RecommendedPlaces"));
const ResortsAndRestaurants = lazy(() => import("@/components/ResortsAndRestaurants"));
const FeaturedPackages      = lazy(() => import("@/components/FeaturedPackages"));
const CulturalExperiences   = lazy(() => import("@/components/CulturalExperiences"));
const WhyChooseUs           = lazy(() => import("@/components/WhyChooseUs"));
const TestimonialsSection   = lazy(() => import("@/components/TestimonialsSection"));
const CTASection            = lazy(() => import("@/components/CTASection"));

const Fallback = () => <div className="min-h-[300px] bg-background animate-pulse" />;

const Index = () => (
  <main>
    <HeroSection />
    <Suspense fallback={<Fallback />}><DestinationsPreview /></Suspense>
    <Suspense fallback={<Fallback />}><BeachDestinations /></Suspense>
    <Suspense fallback={<Fallback />}><Maasailand /></Suspense>
    <Suspense fallback={<Fallback />}><RecommendedPlaces /></Suspense>
    <Suspense fallback={<Fallback />}><ResortsAndRestaurants /></Suspense>
    <Suspense fallback={<Fallback />}><FeaturedPackages /></Suspense>
    <Suspense fallback={<Fallback />}><CulturalExperiences /></Suspense>
    <Suspense fallback={<Fallback />}><WhyChooseUs /></Suspense>
    <Suspense fallback={<Fallback />}><TestimonialsSection /></Suspense>
    <Suspense fallback={<Fallback />}><CTASection /></Suspense>
  </main>
);

export default Index;