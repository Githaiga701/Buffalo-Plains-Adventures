import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Clock, 
  MapPin, 
  Star, 
  ArrowRight, 
  Check,
  Coffee,
  Bird,
  Palmtree,
  Camera,
  Utensils,
  Car
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
  { 
    id: "3-day-masai-mara", 
    title: "3-Day Masai Mara Safari", 
    duration: "3 Days / 2 Nights", 
    price: 850, 
    image: "masai-mara", 
    rating: 4.9,
    reviews: 128,
    highlights: ["Big Five Sightings", "Game Drives", "Maasai Village", "Sunrise Safari"],
    included: ["Game Drives", "Park Fees", "Accommodation", "Meals", "Guide"],
    tag: "Best Seller",
    tagColor: "bg-[#F4A261]",
  },
  { 
    id: "5-day-luxury-safari", 
    title: "5-Day Luxury Safari", 
    duration: "5 Days / 4 Nights", 
    price: 2200, 
    image: "luxury", 
    rating: 5.0,
    reviews: 86,
    highlights: ["Hot Air Balloon", "Private Guide", "Bush Dinner", "Luxury Lodge"],
    included: ["All Meals", "Premium Drinks", "Balloon Safari", "Private Vehicle", "Spa"],
    tag: "Most Popular",
    tagColor: "bg-green-600",
  },
  { 
    id: "7-day-buffalo-plains", 
    title: "7-Day Buffalo Plains Explorer", 
    duration: "7 Days / 6 Nights", 
    price: 3500, 
    image: "explorer", 
    rating: 4.9,
    reviews: 64,
    highlights: ["Bush & Beach", "Three Parks", "Cultural Immersion", "Domestic Flights"],
    included: ["Beach Resort", "All Transfers", "Snorkeling", "Cultural Tours", "Park Fees"],
    tag: "Complete Experience",
    tagColor: "bg-[#0B3D2E]",
  },
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
              className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-[#F4A261]/30"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={packageImages[pkg.image]}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Tag */}
                <div className={`absolute top-4 left-4 ${pkg.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                  {pkg.tag}
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                  <p className="text-xs text-muted-foreground">From</p>
                  <p className="text-xl font-bold text-[#0B3D2E]">${pkg.price}</p>
                  <p className="text-xs text-muted-foreground">per person</p>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Duration & Location */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} />
                    <span>Kenya</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title & Rating */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading text-xl font-bold text-foreground leading-tight pr-4">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center gap-1 bg-[#F4A261]/10 px-2 py-1 rounded">
                    <Star size={14} className="text-[#F4A261] fill-[#F4A261]" />
                    <span className="text-sm font-bold">{pkg.rating}</span>
                    <span className="text-xs text-muted-foreground">({pkg.reviews})</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {pkg.highlights.slice(0, 3).map((h) => (
                    <span key={h} className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-md">
                      {h}
                    </span>
                  ))}
                </div>

                {/* What's Included */}
                <div className="border-t border-border pt-4 mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">What's Included</p>
                  <div className="grid grid-cols-2 gap-2">
                    {pkg.included.slice(0, 4).map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Check size={14} className="text-green-600" />
                        <span className="text-xs text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  to={`/packages/${pkg.id}`}
                  className="group/btn inline-flex items-center justify-center w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
                >
                  <span>View Details</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
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
