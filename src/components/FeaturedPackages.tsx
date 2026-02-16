import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Clock, 
  MapPin, 
  ArrowRight,
  Car,
  Utensils,
  Camera,
  Palmtree
} from "lucide-react";
import masaiMara from "@/assets/masai-mara-dest.jpg";
import luxurySafari from "@/assets/luxury-safari.jpg";
import safariSunset from "@/assets/safari-sunset.jpg";

const packageImages: Record<string, string> = {
  "masai-mara": masaiMara,
  luxury: luxurySafari,
  explorer: safariSunset,
};

const pkgs = [
  { id: "3-day-masai-mara", title: "3-Day Masai Mara Safari", duration: "3 Days / 2 Nights", image: "masai-mara", highlights: ["Big Five Sightings", "Game Drives", "Maasai Village"] },
  { id: "5-day-luxury-safari", title: "5-Day Luxury Safari", duration: "5 Days / 4 Nights", image: "luxury", highlights: ["Hot Air Balloon", "Private Guide", "Bush Dinner"] },
  { id: "7-day-buffalo-plains", title: "7-Day Buffalo Plains Explorer", duration: "7 Days / 6 Nights", image: "explorer", highlights: ["Bush & Beach", "Three Parks", "Cultural Immersion"] },
];

const FeaturedPackages = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="safari-section bg-muted relative overflow-hidden" ref={ref}>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F4A261]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0B3D2E]/10 rounded-full blur-3xl" />

      <div className="safari-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-[#F4A261]/10 text-[#F4A261] font-semibold text-sm tracking-[0.2em] uppercase mb-3 px-4 py-2 rounded-full">
            Our Packages
          </span>
          <h2 className="safari-heading mb-4">Handcrafted Safari Experiences</h2>
          <p className="safari-subheading mx-auto">
            Carefully curated itineraries designed to give you the ultimate Kenya adventure. 
            From intimate 3-day escapes to comprehensive 7-day explorations, we have the perfect safari for you
          </p>
        </motion.div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pkgs.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group"
            >
              <Link
                to={`/packages/${pkg.id}`}
                className="flex flex-col h-full bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-[#F4A261]/30"
              >
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={packageImages[pkg.image]}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Title */}
                  <h3 className="font-heading text-xl font-bold text-foreground leading-tight mb-3">
                    {pkg.title}
                  </h3>

                  {/* Duration & Location */}
                  <div className="flex items-center gap-4 text-muted-foreground text-xs mb-3">
                    <span className="flex items-center gap-1"><Clock size={14} /> {pkg.duration}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> Kenya</span>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pkg.highlights.slice(0, 3).map((h) => (
                      <span key={h} className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-md">
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <button className="group/btn w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-all inline-flex items-center justify-center">
                      <span>View Details</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Features Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#0B3D2E] rounded-2xl p-6 md:p-8"
        >
          <div className="text-center">
            <Car className="mx-auto mb-2 text-[#F4A261]" size={28} />
            <p className="text-white font-semibold">4x4 Safari Vehicles</p>
            <p className="text-white/60 text-xs">With pop-up roof</p>
          </div>
          <div className="text-center">
            <Utensils className="mx-auto mb-2 text-[#F4A261]" size={28} />
            <p className="text-white font-semibold">Full Board Meals</p>
            <p className="text-white/60 text-xs">Bush & lodge dining</p>
          </div>
          <div className="text-center">
            <Camera className="mx-auto mb-2 text-[#F4A261]" size={28} />
            <p className="text-white font-semibold">Expert Guides</p>
            <p className="text-white/60 text-xs">10+ years experience</p>
          </div>
          <div className="text-center">
            <Palmtree className="mx-auto mb-2 text-[#F4A261]" size={28} />
            <p className="text-white font-semibold">Luxury Stays</p>
            <p className="text-white/60 text-xs">Handpicked lodges</p>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 text-center"
        >
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 bg-[#F4A261] text-[#0B3D2E] px-8 py-4 rounded-lg font-bold hover:bg-[#e08f4d] transition-all"
          >
            View All Safari Packages
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
