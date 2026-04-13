import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Star, UtensilsCrossed, Building2, ArrowRight, Coffee, Wine, Dumbbell, Waves } from "lucide-react";
import { resorts, restaurants } from "@/lib/data";
import safariSunset from "@/assets/safari-sunset.jpg";

// Using placeholder images - replace with actual images when available
const resortImg = safariSunset;
const restaurantImg = safariSunset;

const ResortsAndRestaurants = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="safari-section bg-background relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230B3D2E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
          <span className="inline-block bg-[#F4A261]/10 text-[#F4A261] font-semibold text-sm tracking-[0.2em] uppercase mb-3 px-4 py-2 rounded-full">
            Stay & Dine
          </span>
          <h2 className="safari-heading mb-4">Top Resorts & Restaurants</h2>
          <p className="safari-subheading mx-auto">
            Indulge in Kenya's exceptional hospitality where world-class accommodations harmonize seamlessly with culinary excellence. From luxurious safari lodges perched overlooking pristine wilderness to opulent beachfront resorts caressing Indian Ocean shores, our handpicked establishments combine authentic African aesthetics with contemporary comfort and personalized service standards. Complement your accommodation experience with fine dining spanning traditional Kenyan cuisine to international fusion preparations, authentic Swahili seafood specialties to innovative culinary artistry, casual beachfront breezes to sophisticated gastronomic performances. Whether seeking romantic bush dinners beneath star-filled African skies, elegant seaside dining overlooking turquoise waters, or casual exploration of local flavor traditions, Kenya's hospitality sector delivers memorable experiences transcending mere accommodation and meals.
          </p>
        </motion.div>

        {/* Resorts Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#F4A261]/10 rounded-xl flex items-center justify-center">
              <Building2 className="text-[#F4A261]" size={24} />
            </div>
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground">Luxury Resorts & Lodges</h3>
              <p className="text-muted-foreground text-sm">Expertly curated luxury lodges and resorts selected for excellence, comfort, and authentic African hospitality</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:3xl:grid-cols-3 gap-6">
            {resorts.map((resort, i) => (
              <motion.div
                key={resort.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-[#F4A261]/30"
              >
                {/* Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-[#0B3D2E] to-[#1a5c45] flex items-center justify-center">
                  <Building2 size={48} className="text-[#F4A261] opacity-50" />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-bold text-[#0B3D2E]">{resort.priceRange}</span>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-4 left-4 bg-[#F4A261] px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-[#0B3D2E]">{resort.type}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-heading text-lg font-bold text-foreground group-hover:text-[#F4A261] transition-colors">
                      {resort.name}
                    </h4>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-[#F4A261] fill-[#F4A261]" />
                      <span className="text-sm font-semibold">{resort.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                    <MapPin size={14} />
                    <span>{resort.location}</span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {resort.description}
                  </p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resort.amenities.slice(0, 3).map((amenity) => (
                      <span key={amenity} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-[#F4A261] font-semibold text-sm group/cta"
                  >
                    Book Now
                    <ArrowRight size={16} className="group-hover/cta:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Restaurants Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#F4A261]/10 rounded-xl flex items-center justify-center">
              <UtensilsCrossed className="text-[#F4A261]" size={24} />
            </div>
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground">Top Restaurants</h3>
              <p className="text-muted-foreground text-sm">Exceptional culinary destinations featuring authentic cuisine, sophisticated ambiance, and memorable dining experiences</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:3xl:grid-cols-3 gap-6">
            {restaurants.map((restaurant, i) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-[#F4A261]/30"
              >
                {/* Image Placeholder */}
                <div className="relative h-40 bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <UtensilsCrossed size={40} className="text-white/50" />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-bold text-orange-600">{restaurant.priceRange}</span>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-orange-600">{restaurant.type}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-heading text-lg font-bold text-foreground group-hover:text-[#F4A261] transition-colors">
                      {restaurant.name}
                    </h4>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-[#F4A261] fill-[#F4A261]" />
                      <span className="text-sm font-semibold">{restaurant.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                    <MapPin size={14} />
                    <span>{restaurant.location}</span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {restaurant.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {restaurant.highlights.slice(0, 3).map((highlight) => (
                      <span key={highlight} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#F4A261] text-[#0B3D2E] px-8 py-4 rounded-lg font-bold hover:bg-[#e08f4d] transition-all"
            >
              <Building2 size={18} />
              Book Accommodation
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-foreground/20 text-foreground px-8 py-4 rounded-lg font-semibold hover:bg-foreground/5 transition-all"
            >
              <UtensilsCrossed size={18} />
              Make a Reservation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResortsAndRestaurants;
