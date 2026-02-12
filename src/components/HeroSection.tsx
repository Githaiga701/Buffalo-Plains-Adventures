import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-masai-mara.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="Great Wildebeest Migration crossing the Mara River in Kenya"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 safari-hero-overlay" />

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-accent font-body text-sm md:text-base tracking-[0.3em] uppercase mb-4"
        >
          Premium Tours & Safaris
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground text-shadow-safari leading-tight"
        >
          Experience Kenya
          <br />
          Like Never Before
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-primary-foreground/80 text-lg md:text-xl mt-6 max-w-2xl mx-auto font-body"
        >
          Discover the magic of Africa's finest wildlife reserves, pristine beaches, and rich cultural heritage
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          <Link
            to="/packages"
            className="bg-secondary text-secondary-foreground px-8 py-3.5 rounded-md font-semibold text-base hover:opacity-90 transition-opacity"
          >
            View Tours
          </Link>
          <Link
            to="/contact"
            className="border border-primary-foreground/40 text-primary-foreground px-8 py-3.5 rounded-md font-semibold text-base hover:bg-primary-foreground/10 transition-colors"
          >
            Plan My Trip
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary-foreground/60 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
