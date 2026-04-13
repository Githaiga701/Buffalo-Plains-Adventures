import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, Users, Camera, Sunrise, ArrowRight, Star, Heart } from "lucide-react";
import { maasailand } from "@/lib/data";
import masaiMara from "@/assets/masai-mara-dest.jpg";
import masaiMaraWebp from "@/assets/masai-mara-dest.webp";

const maraMainImg = masaiMara;
const maraMainImgWebp = masaiMaraWebp;
const maraNorthImg = masaiMara;
const maraNorthImgWebp = masaiMaraWebp;
const maraEastImg = masaiMara;
const maraEastImgWebp = masaiMaraWebp;
const olPejetaImg = masaiMara;
const olPejetaImgWebp = masaiMaraWebp;

const maasaiImages: Record<string, string> = {
  "masai-mara-main": maraMainImg,
  "mara-north": maraNorthImg,
  "mara-east": maraEastImg,
  "ollenkuit": olPejetaImg,
};

const maasaiImagesWebp: Record<string, string> = {
  "masai-mara-main": maraMainImgWebp,
  "mara-north": maraNorthImgWebp,
  "mara-east": maraEastImgWebp,
  "ollenkuit": olPejetaImgWebp,
};

const Maasailand = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="safari-section bg-gradient-to-br from-[#0B3D2E] to-[#1a5c45] relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F4A261' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            Maasailand
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Explore the Maasai Mara Region
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Discover the world-renowned Masai Mara and surrounding conservancies. 
            Experience the Great Migration, Big Five safaris, and authentic Maasai culture.
          </p>
        </motion.div>

        {/* Maasai Mara Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {maasailand.map((place, i) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:bg-white/10 hover:border-[#F4A261]/30 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <picture>
                  <source type="image/webp" srcSet={maasaiImagesWebp[place.id]} />
                  <img
                    src={maasaiImages[place.id]}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Best Time Badge */}
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2">
                  <Calendar size={14} className="text-white" />
                  <span className="text-white text-xs font-medium">{place.bestTime}</span>
                </div>

                {/* Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[#F4A261] text-xs tracking-widest uppercase font-semibold mb-1">
                    {place.tagline}
                  </p>
                  <h3 className="font-heading text-2xl font-bold text-white">{place.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-white/70 text-sm mb-4">
                  {place.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {place.highlights.map((highlight) => (
                    <span 
                      key={highlight} 
                      className="text-xs bg-white/10 text-white/80 px-3 py-1 rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Hotels Row */}
                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs text-white/50 mb-2">Recommended Lodges</p>
                  <div className="flex flex-wrap gap-2">
                    {place.hotels.slice(0, 2).map((hotel, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg">
                        <span className="text-sm text-white">{hotel.name}</span>
                        <span className="text-xs text-[#F4A261]">{hotel.priceRange}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-[#F4A261] font-semibold text-sm group/cta"
                >
                  Plan Your Safari
                  <ArrowRight size={16} className="group-hover/cta:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-4">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 bg-[#F4A261] text-[#0B3D2E] px-8 py-4 rounded-lg font-bold hover:bg-[#e08f4d] transition-all"
            >
              <Heart size={18} />
              Book Your Safari
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              <Users size={18} />
              Customize Your Trip
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Maasailand;
