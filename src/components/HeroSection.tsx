import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Shield, 
  Clock, 
  ArrowRight,
  Phone,
  ChevronLeft,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import heroImage1 from "@/assets/hero-masai-mara.jpg";
import heroImage2 from "@/assets/luxury-safari.jpg";
import heroImage3 from "@/assets/safari-sunset.jpg";
import heroImage1Webp from "@/assets/hero-masai-mara.webp";
import heroImage2Webp from "@/assets/luxury-safari.webp";
import heroImage3Webp from "@/assets/safari-sunset.webp";
import heroImage1Avif from "@/assets/hero-masai-mara.avif";
import heroImage2Avif from "@/assets/luxury-safari.avif";
import heroImage3Avif from "@/assets/safari-sunset.avif";
import heroImage1Webp640 from "@/assets/hero-masai-mara-640.webp";
import heroImage1Webp1280 from "@/assets/hero-masai-mara-1280.webp";
import heroImage2Webp640 from "@/assets/luxury-safari-640.webp";
import heroImage2Webp1280 from "@/assets/luxury-safari-1280.webp";
import heroImage3Webp640 from "@/assets/safari-sunset-640.webp";
import heroImage3Webp1280 from "@/assets/safari-sunset-1280.webp";
import heroImage1Avif640 from "@/assets/hero-masai-mara-640.avif";
import heroImage1Avif1280 from "@/assets/hero-masai-mara-1280.avif";
import heroImage2Avif640 from "@/assets/luxury-safari-640.avif";
import heroImage2Avif1280 from "@/assets/luxury-safari-1280.avif";
import heroImage3Avif640 from "@/assets/safari-sunset-640.avif";
import heroImage3Avif1280 from "@/assets/safari-sunset-1280.avif";
import { CONTACT_PHONE, CONTACT_PHONE_RAW } from "@/lib/constants";

const heroImages = [
  {
    src: heroImage1,
    webp: heroImage1Webp,
    avif: heroImage1Avif,
    webp640: heroImage1Webp640,
    webp1280: heroImage1Webp1280,
    avif640: heroImage1Avif640,
    avif1280: heroImage1Avif1280,
    alt: "Masai Mara Wildebeest Migration",
  },
  {
    src: heroImage2,
    webp: heroImage2Webp,
    avif: heroImage2Avif,
    webp640: heroImage2Webp640,
    webp1280: heroImage2Webp1280,
    avif640: heroImage2Avif640,
    avif1280: heroImage2Avif1280,
    alt: "Luxury Safari Lodge",
  },
  {
    src: heroImage3,
    webp: heroImage3Webp,
    avif: heroImage3Avif,
    webp640: heroImage3Webp640,
    webp1280: heroImage3Webp1280,
    avif640: heroImage3Avif640,
    avif1280: heroImage3Avif1280,
    alt: "African Safari Sunset",
  },
];

const offerings = [
  { icon: MapPin, title: "9 Diverse Destinations", desc: "From Masai Mara's legendary migration to pristine beaches, mountains, and cultural sites" },
  { icon: Users, title: "Expert Guides", desc: "Experienced naturalists with deep knowledge of African ecosystems and wildlife behavior" },
  { icon: Shield, title: "Safe & Secure", desc: "Fully licensed, insured, and certified tours with established safety protocols and communication systems" },
  { icon: Star, title: "Exceptional Reviews", desc: "Consistently praised by delighted guests for memorable safari experiences and seamless service" },
];

const quickStats = [
  { number: "Trusted", label: "Safari Expertise" },
  { number: "Loved", label: "By Adventurers" },
  { number: "Curated", label: "Safari Packages" },
  { number: "Repeat", label: "Guests" },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % heroImages.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + heroImages.length) % heroImages.length);

  return (
    <section className="relative min-h-[90vh] flex flex-col overflow-hidden">
      {/* Hero Image Slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <picture>
              <source
                type="image/avif"
                srcSet={`${heroImages[currentSlide].avif640} 640w, ${heroImages[currentSlide].avif1280} 1280w, ${heroImages[currentSlide].avif} 1920w`}
                sizes="100vw"
              />
              <source
                type="image/webp"
                srcSet={`${heroImages[currentSlide].webp640} 640w, ${heroImages[currentSlide].webp1280} 1280w, ${heroImages[currentSlide].webp} 1920w`}
                sizes="100vw"
              />
              <img
                src={heroImages[currentSlide].src}
                srcSet={`${heroImages[currentSlide].src} 1920w`}
                alt={heroImages[currentSlide].alt}
                className="w-full h-full object-cover"
                width={1920}
                height={1080}
                fetchPriority={currentSlide === 0 ? "high" : "low"}
                loading={currentSlide === 0 ? "eager" : "lazy"}
                decoding={currentSlide === 0 ? "sync" : "async"}
              />
            </picture>
          </motion.div>
        </AnimatePresence>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
      </div>

      {/* Slide Navigation */}
      <div className="absolute top-1/2 left-4 z-20 hidden md:block">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all flex items-center justify-center"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 z-20 hidden md:block">
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all flex items-center justify-center"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-40 md:bottom-48 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentSlide ? "bg-[#F4A261] w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 md:px-8 pt-20 pb-12">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Top Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
              <Star className="text-[#F4A261] fill-[#F4A261]" size={16} />
              <span className="text-white/90 text-sm font-medium">Kenya's #1 Safari Expert</span>
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
              <Shield className="text-green-400" size={16} />
              <span className="text-white/90 text-sm font-medium">Trusted by safari travelers worldwide</span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center mb-6"
          >
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-shadow-safari">
              Experience the Magic of
              <span className="block text-[#F4A261]">Kenya's Wildest Adventures</span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-white/85 text-lg md:text-xl max-w-3xl mx-auto text-center mb-8 leading-relaxed"
          >
            From the breathtaking wildebeest migration in <strong>Masai Mara</strong> to the pristine beaches of 
            <strong> Diani</strong>. Discover Africa's most iconic destinations with expert guides, 
            luxury accommodations, and unforgettable experiences tailored just for you.
          </motion.p>

          {/* Offerings Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10 max-w-4xl mx-auto"
          >
            {offerings.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center hover:bg-white/15 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F4A261]/20 mb-3">
                  <item.icon className="text-[#F4A261]" size={20} />
                </div>
                <h3 className="text-white font-semibold text-sm md:text-base">{item.title}</h3>
                <p className="text-white/60 text-xs md:text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Quick Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mb-10"
          >
            {quickStats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-[#F4A261] font-heading">{stat.number}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center md:items-stretch"
          >
            <Link
              to="/packages"
              className="group w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#F4A261] text-[#0B3D2E] px-6 md:px-8 py-4 rounded-lg font-bold text-sm md:text-base hover:bg-[#e08f4d] transition-all transform hover:scale-105"
            >
              <Search size={18} className="md:w-5 md:h-5" />
              <span className="hidden sm:inline">Explore Safari Packages</span>
              <span className="sm:hidden">Explore Packages</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform hidden sm:inline" size={18} />
            </Link>
            <Link
              to="/contact"
              className="group w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 md:px-8 py-4 rounded-lg font-semibold text-sm md:text-base hover:bg-white/20 transition-all"
            >
              <Calendar size={18} className="md:w-5 md:h-5" />
              Plan My Trip
            </Link>
            <a
              href={`tel:${CONTACT_PHONE_RAW}`}
              className="w-full md:w-auto inline-flex items-center justify-center md:justify-start gap-2 text-white/80 hover:text-white transition-colors text-sm md:text-base"
            >
              <Phone size={16} className="flex-shrink-0" />
              <span className="hidden md:inline">Call: {CONTACT_PHONE}</span>
              <span className="md:hidden">{CONTACT_PHONE}</span>
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-6 text-white/60 text-xs md:text-sm px-2"
          >
            <div className="flex items-center gap-2 whitespace-nowrap">
              <CheckCircle2 size={14} className="text-green-400 flex-shrink-0 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Free Safari Planning</span>
              <span className="sm:hidden">Free Planning</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-white/40">•</div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <CheckCircle2 size={14} className="text-green-400 flex-shrink-0 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Best Price Guarantee</span>
              <span className="sm:hidden">Best Prices</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-white/40">•</div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <CheckCircle2 size={14} className="text-green-400 flex-shrink-0 md:w-4 md:h-4" />
              <span className="hidden sm:inline">24/7 Support</span>
              <span className="sm:hidden">24/7 Help</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-white/40">•</div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <CheckCircle2 size={14} className="text-green-400 flex-shrink-0 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Instant Booking</span>
              <span className="sm:hidden">Quick Booking</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-white/60 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
