import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, MapPin } from "lucide-react";
import masaiMara from "@/assets/masai-mara-dest.jpg";
import luxurySafari from "@/assets/luxury-safari.jpg";
import safariSunset from "@/assets/safari-sunset.jpg";

const packageImages: Record<string, string> = {
  "masai-mara": masaiMara,
  luxury: luxurySafari,
  explorer: safariSunset,
};

const pkgs = [
  { id: "3-day-masai-mara", title: "3-Day Masai Mara Safari", duration: "3 Days / 2 Nights", price: 850, image: "masai-mara", highlights: ["Big Five Sightings", "Game Drives", "Maasai Village"] },
  { id: "5-day-luxury-safari", title: "5-Day Luxury Safari", duration: "5 Days / 4 Nights", price: 2200, image: "luxury", highlights: ["Hot Air Balloon", "Private Guide", "Bush Dinner"] },
  { id: "7-day-kenya-explorer", title: "7-Day Kenya Explorer", duration: "7 Days / 6 Nights", price: 3500, image: "explorer", highlights: ["Bush & Beach", "Three Parks", "Cultural Immersion"] },
];

const FeaturedPackages = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="safari-section bg-muted" ref={ref}>
      <div className="safari-container">
        <div className="text-center mb-12">
          <p className="text-secondary font-body text-sm tracking-[0.2em] uppercase mb-2">Our Tours</p>
          <h2 className="safari-heading">Featured Safari Packages</h2>
          <p className="safari-subheading mx-auto">
            Handcrafted itineraries designed to give you the ultimate Kenya experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pkgs.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <Link
                to={`/packages/${pkg.id}`}
                className="group block bg-card rounded-lg overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-safari)] transition-shadow duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={packageImages[pkg.image]}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm font-semibold">
                    From ${pkg.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-muted-foreground text-xs mb-3">
                    <span className="flex items-center gap-1"><Clock size={14} /> {pkg.duration}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> Kenya</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">{pkg.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {pkg.highlights.map((h) => (
                      <span key={h} className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-md">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/packages"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            View All Packages
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
