import { useParams, Link } from "react-router-dom";
import { packages } from "@/lib/data";
import { motion } from "framer-motion";
import { Clock, Check, X, MessageCircle } from "lucide-react";
import masaiMara from "@/assets/masai-mara-dest.jpg";
import luxurySafari from "@/assets/luxury-safari.jpg";
import safariSunset from "@/assets/safari-sunset.jpg";

const packageImages: Record<string, string> = {
  "masai-mara": masaiMara,
  luxury: luxurySafari,
  explorer: safariSunset,
};

const PackageDetail = () => {
  const { id } = useParams();
  const pkg = packages.find((p) => p.id === id);

  if (!pkg) {
    return (
      <main className="pt-20 safari-section text-center">
        <h1 className="safari-heading">Package Not Found</h1>
        <Link to="/packages" className="text-secondary underline mt-4 inline-block">View all packages</Link>
      </main>
    );
  }

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <img src={packageImages[pkg.image]} alt={pkg.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 safari-hero-overlay" />
        <div className="relative z-10 h-full flex items-end">
          <div className="safari-container pb-12">
            <p className="text-accent text-sm tracking-widest uppercase mb-2">{pkg.duration}</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground text-shadow-safari">{pkg.title}</h1>
            <p className="text-primary-foreground/80 text-lg mt-2">From <span className="text-accent font-bold text-2xl">${pkg.price}</span> per person</p>
          </div>
        </div>
      </section>

      <section className="safari-section bg-background">
        <div className="safari-container grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{pkg.description}</p>
            </div>

            {/* Itinerary */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Itinerary</h2>
              <div className="space-y-6">
                {pkg.itinerary.map((day) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-sm">{day.day}</span>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground">{day.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{day.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Inclusions / Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">Inclusions</h3>
                <ul className="space-y-2">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="text-secondary flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">Exclusions</h3>
                <ul className="space-y-2">
                  {pkg.exclusions.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <X size={16} className="text-destructive flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-lg p-6 shadow-[var(--shadow-card)] space-y-6">
              <div>
                <p className="text-muted-foreground text-sm">Starting from</p>
                <p className="font-heading text-3xl font-bold text-foreground">${pkg.price} <span className="text-sm font-normal text-muted-foreground">/ person</span></p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock size={16} /> {pkg.duration}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Accommodation</p>
                <p className="text-sm text-muted-foreground">{pkg.accommodation}</p>
              </div>
              <a
                href={`https://wa.me/254700000000?text=Hi%2C%20I'm%20interested%20in%20the%20${encodeURIComponent(pkg.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-secondary text-secondary-foreground py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
              >
                <MessageCircle size={18} /> Inquire on WhatsApp
              </a>
              <Link
                to="/contact"
                className="block w-full text-center border border-foreground/20 text-foreground py-3 rounded-md font-semibold hover:bg-foreground/5 transition-colors"
              >
                Send Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PackageDetail;
