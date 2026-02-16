import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, Mountain, TreePine, Anchor, ArrowRight, Star, Eye } from "lucide-react";
import { recommendedPlaces } from "@/lib/data";
import safariSunset from "@/assets/safari-sunset.jpg";

// Using placeholder images - replace with actual images when available
const mountKenyaImg = safariSunset;
const aberdareImg = safariSunset;
const naivashaImg = safariSunset;
const kakamegaImg = safariSunset;

const placeImages: Record<string, string> = {
  "mount-kenya": mountKenyaImg,
  aberdare: aberdareImg,
  naivasha: naivashaImg,
  kakamega: kakamegaImg,
};

const categoryIcons: Record<string, React.ElementType> = {
  "Adventure": Mountain,
  "Wildlife": Eye,
  "Nature": TreePine,
};

const RecommendedPlaces = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="safari-section bg-background relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230B3D2E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
          <span className="inline-block bg-[#F4A261]/10 text-[#F4A261] font-semibold text-sm tracking-[0.2em] uppercase mb-3 px-4 py-2 rounded-full">
            More to Explore
          </span>
          <h2 className="safari-heading mb-4">Other Recommended Places</h2>
          <p className="safari-subheading mx-auto">
            Beyond the famous parks, Kenya offers incredible experiences from mountain climbing 
            to cloud forests and unique wildlife sanctuaries.
          </p>
        </motion.div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedPlaces.map((place, i) => {
            const IconComponent = categoryIcons[place.category] || MapPin;
            return (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-[#F4A261]/30"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={placeImages[place.id]}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-[#F4A261] px-3 py-1 rounded-full flex items-center gap-1">
                    <IconComponent size={12} className="text-[#0B3D2E]" />
                    <span className="text-[#0B3D2E] text-xs font-semibold">{place.category}</span>
                  </div>

                  {/* Best Time */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                    <Calendar size={12} className="text-white" />
                    <span className="text-white/80 text-xs">{place.bestTime}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-[#F4A261] transition-colors">
                    {place.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {place.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {place.highlights.slice(0, 2).map((highlight) => (
                      <span 
                        key={highlight} 
                        className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Top Hotel */}
                  <div className="border-t border-border pt-3 mb-3">
                    <p className="text-xs text-muted-foreground mb-1">Top Pick</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">{place.hotels[0]?.name}</span>
                      <span className="text-xs text-[#F4A261]">{place.hotels[0]?.priceRange}</span>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-[#F4A261] font-semibold text-sm group/cta"
                  >
                    Explore More
                    <ArrowRight size={16} className="group-hover/cta:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 text-center"
        >
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all"
          >
            View All Destinations
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RecommendedPlaces;
