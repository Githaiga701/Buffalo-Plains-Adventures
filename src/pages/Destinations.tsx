import { motion } from "framer-motion";
import { destinations } from "@/lib/data";
import { MapPin, Calendar, Activity } from "lucide-react";
import masaiMara from "@/assets/masai-mara-dest.jpg";
import amboseli from "@/assets/amboseli.jpg";
import dianiBeach from "@/assets/diani-beach.jpg";
import tsavo from "@/assets/tsavo.jpg";
import lamu from "@/assets/lamu.jpg";

const images: Record<string, string> = {
  "masai-mara": masaiMara,
  amboseli,
  "diani-beach": dianiBeach,
  tsavo,
  lamu,
};

const Destinations = () => {
  return (
    <main className="pt-20">
      {/* Header */}
      <section className="safari-section bg-primary text-center">
        <div className="safari-container">
          <p className="text-accent text-sm tracking-[0.2em] uppercase mb-2">Explore Kenya</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground">Our Destinations</h1>
          <p className="text-primary-foreground/70 text-lg mt-4 max-w-2xl mx-auto">
            From the iconic savannas of Masai Mara to the tropical shores of Diani Beach
          </p>
        </div>
      </section>

      {/* Destination cards */}
      <section className="safari-section bg-background">
        <div className="safari-container space-y-20">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
            >
              <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
                  <img
                    src={images[dest.id]}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <p className="text-secondary text-sm tracking-widest uppercase mb-2">{dest.tagline}</p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">{dest.name}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{dest.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar size={16} className="text-secondary" />
                    <span className="text-muted-foreground"><strong className="text-foreground">Best Time:</strong> {dest.bestTime}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Activity size={16} className="text-secondary mt-0.5" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Activities:</strong> {dest.activities.join(", ")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {dest.highlights.map((h) => (
                    <span key={h} className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-md">{h}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Destinations;
