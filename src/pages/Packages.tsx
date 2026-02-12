import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { packages } from "@/lib/data";
import masaiMara from "@/assets/masai-mara-dest.jpg";
import luxurySafari from "@/assets/luxury-safari.jpg";
import safariSunset from "@/assets/safari-sunset.jpg";

const packageImages: Record<string, string> = {
  "masai-mara": masaiMara,
  luxury: luxurySafari,
  explorer: safariSunset,
};

const Packages = () => {
  return (
    <main className="pt-20">
      <section className="safari-section bg-primary text-center">
        <div className="safari-container">
          <p className="text-accent text-sm tracking-[0.2em] uppercase mb-2">Safari Packages</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground">Tour Packages</h1>
          <p className="text-primary-foreground/70 text-lg mt-4 max-w-2xl mx-auto">
            Handcrafted safari experiences for every type of traveler
          </p>
        </div>
      </section>

      <section className="safari-section bg-background">
        <div className="safari-container grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/packages/${pkg.id}`}
                className="group block bg-card rounded-lg overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-safari)] transition-shadow duration-300 h-full"
              >
                <div className="relative h-60 overflow-hidden">
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
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">{pkg.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{pkg.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {pkg.highlights.slice(0, 3).map((h) => (
                      <span key={h} className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-md">{h}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Packages;
