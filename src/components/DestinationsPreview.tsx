import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import masaiMara from "@/assets/masai-mara-dest.jpg";
import amboseli from "@/assets/amboseli.jpg";
import dianiBeach from "@/assets/diani-beach.jpg";
import tsavo from "@/assets/tsavo.jpg";
import lamu from "@/assets/lamu.jpg";

const destinationImages: Record<string, string> = {
  "masai-mara": masaiMara,
  amboseli: amboseli,
  "diani-beach": dianiBeach,
  tsavo: tsavo,
  lamu: lamu,
};

const destinationData = [
  { id: "masai-mara", name: "Masai Mara", tagline: "The Great Migration" },
  { id: "amboseli", name: "Amboseli", tagline: "Kilimanjaro Views" },
  { id: "diani-beach", name: "Diani Beach", tagline: "Tropical Paradise" },
  { id: "tsavo", name: "Tsavo", tagline: "Theatre of the Wild" },
  { id: "lamu", name: "Lamu", tagline: "UNESCO Heritage" },
];

const DestinationsPreview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="safari-section bg-background" ref={ref}>
      <div className="safari-container">
        <div className="text-center mb-12">
          <p className="text-secondary font-body text-sm tracking-[0.2em] uppercase mb-2">Explore</p>
          <h2 className="safari-heading">Popular Destinations</h2>
          <p className="safari-subheading mx-auto">
            From vast savannas to pristine coastlines, discover Kenya's most breathtaking destinations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinationData.slice(0, 3).map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <Link
                to="/destinations"
                className="group relative block h-80 rounded-lg overflow-hidden"
              >
                <img
                  src={destinationImages[dest.id]}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 safari-card-overlay" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-accent text-xs tracking-widest uppercase mb-1">{dest.tagline}</p>
                  <h3 className="font-heading text-2xl font-bold text-primary-foreground">{dest.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {destinationData.slice(3).map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: (i + 3) * 0.15, duration: 0.6 }}
            >
              <Link
                to="/destinations"
                className="group relative block h-72 rounded-lg overflow-hidden"
              >
                <img
                  src={destinationImages[dest.id]}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 safari-card-overlay" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-accent text-xs tracking-widest uppercase mb-1">{dest.tagline}</p>
                  <h3 className="font-heading text-2xl font-bold text-primary-foreground">{dest.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/destinations"
            className="inline-block border border-foreground/20 text-foreground px-8 py-3 rounded-md font-semibold text-sm hover:bg-foreground/5 transition-colors"
          >
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DestinationsPreview;
