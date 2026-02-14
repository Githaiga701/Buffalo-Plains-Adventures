import { Link } from "react-router-dom";
import safariSunset from "@/assets/hero-masai-mara.jpg";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[60vh] min-h-[420px] md:h-[72vh] rounded-lg overflow-hidden">
        <img
          src={safariSunset}
          alt="Great Wildebeest Migration"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Experience Buffalo Plains Adventures
              <br /> Like Never Before
            </h1>
            <p className="mt-4 text-sm md:text-base text-white/90 max-w-xl mx-auto">
              Curated safari packages, luxury lodges, and authentic cultural experiences across Masai Mara,
              Amboseli and the Kenyan coast.
            </p>
            <div className="mt-6 flex gap-3 justify-center">
              <Link
                to="/packages"
                className="inline-flex items-center justify-center px-4 h-11 rounded-md bg-secondary text-secondary-foreground font-semibold"
              >
                View Tours
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-4 h-11 rounded-md border border-white/20 text-white/90"
              >
                Plan My Trip
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
