import { Link } from "react-router-dom";
import safariSunset from "@/assets/safari-sunset.jpg";

const CTASection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <img
        src={safariSunset}
        alt="Safari sunset in Kenya"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 safari-hero-overlay" />
      <div className="relative z-10 safari-container text-center">
        <p className="text-accent font-body text-sm tracking-[0.2em] uppercase mb-3">Limited Safari Slots Available</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground text-shadow-safari mb-4">
          Ready for Your African Adventure?
        </h2>
        <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
          Let us craft your perfect Kenya safari. Contact us today for a personalized itinerary.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="bg-secondary text-secondary-foreground px-8 py-3.5 rounded-md font-semibold hover:opacity-90 transition-opacity"
          >
            Plan My Trip
          </Link>
          <a
            href="https://wa.me/254700000000?text=Hello%2C%20I%27d%20like%20to%20plan%20a%20trip%20to%20Kenya"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-primary-foreground/40 text-primary-foreground px-8 py-3.5 rounded-md font-semibold hover:bg-primary-foreground/10 transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
