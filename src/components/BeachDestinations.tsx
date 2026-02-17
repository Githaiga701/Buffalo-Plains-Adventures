import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, Waves, Anchor, Sunset, Palmtree, Fish, Umbrella, ArrowRight, Star } from "lucide-react";
import { beaches } from "@/lib/data";
import dianiBeach from "@/assets/diani-beach.jpg";

// Using placeholder images for new beaches - replace with actual images when available
const watamuImg = dianiBeach;
const malindiImg = dianiBeach;
const kilifiImg = dianiBeach;
const mombasaImg = dianiBeach;

const beachImages: Record<string, string> = {
  "diani-beach": dianiBeach,
  watamu: watamuImg,
  malindi: malindiImg,
  kilifi: kilifiImg,
  mombasa: mombasaImg,
};

const beachIcons: Record<string, React.ElementType> = {
  "diani-beach": Waves,
  watamu: Palmtree,
  malindi: Anchor,
  kilifi: Sunset,
  mombasa: Umbrella,
};

const BeachDestinations = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="safari-section bg-primary text-primary-foreground relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="safari-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-[#F4A261]/20 text-[#F4A261] font-semibold text-sm tracking-[0.2em] uppercase mb-3 px-4 py-2 rounded-full backdrop-blur-sm">
            Coastal Paradise
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">Kenya's Stunning Beaches</h2>
          <p className="text-primary-foreground/70 text-lg max-w-3xl mx-auto">
            Escape to Kenya's breathtaking Indian Ocean coastline where turquoise waters meet pristine white sand beaches stretching along 480 kilometers of pure coastal paradise. From the world-renowned Diani Beach offering cosmopolitan beach resort culture to hidden coastal gems untouched by mass tourism, discover an extraordinary array of seaside experiences. Whether you seek thrilling water sports including world-class kite surfing and scuba diving, peaceful relaxation under swaying palms, exploration of vibrant coral reefs teeming with tropical marine life, or immersion in authentic Swahili culture, Kenya's beaches deliver unforgettable experiences. Each destination along the coast presents unique character—some famous for water sports excellence, others renowned for intimate luxury, still others celebrated for pristine seclusion and authentic cultural encounters.
          </p>
        </motion.div>

        {/* Beach Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {beaches.map((beach, i) => {
            const IconComponent = beachIcons[beach.id] || Waves;
            return (
              <motion.div
                key={beach.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:bg-white/10 hover:border-[#F4A261]/30 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={beachImages[beach.id]}
                    alt={beach.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Best Time Badge */}
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2">
                    <Calendar size={14} className="text-white" />
                    <span className="text-white text-xs font-medium">{beach.bestTime}</span>
                  </div>

                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-[#F4A261] rounded-full flex items-center justify-center">
                    <IconComponent size={20} className="text-[#0B3D2E]" />
                  </div>

                  {/* Beach Name Overlay */}
                  <div className="absolute bottom-4 left-4">
                    <p className="text-[#F4A261] text-xs tracking-widest uppercase font-semibold">
                      {beach.tagline}
                    </p>
                    <h3 className="font-heading text-2xl font-bold text-white">{beach.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-primary-foreground/70 text-sm mb-4 line-clamp-2">
                    {beach.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {beach.highlights.slice(0, 3).map((highlight) => (
                      <span 
                        key={highlight} 
                        className="text-xs bg-white/10 text-primary-foreground/80 px-3 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Top Hotel */}
                  <div className="border-t border-white/10 pt-3">
                    <p className="text-xs text-primary-foreground/50 mb-1">Top Pick</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{beach.hotels[0]?.name}</span>
                      <span className="text-xs text-[#F4A261]">{beach.hotels[0]?.priceRange}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    to="/contact"
                    className="mt-4 inline-flex items-center gap-2 text-[#F4A261] font-semibold text-sm group/cta"
                  >
                    Explore Beach
                    <ArrowRight size={16} className="group-hover/cta:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-4">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 bg-[#F4A261] text-[#0B3D2E] px-8 py-4 rounded-lg font-bold hover:bg-[#e08f4d] transition-all"
            >
              <Waves size={18} />
              View Beach Packages
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              Customize Your Beach Trip
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeachDestinations;
