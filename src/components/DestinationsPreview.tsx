import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, Camera, Sunrise, Palmtree, Mountain, Waves, Landmark, Building2, Bird } from "lucide-react";
import masaiMara from "@/assets/masai-mara-dest.jpg";
import masaiMaraWebp from "@/assets/masai-mara-dest.webp";
import amboseli from "@/assets/amboseli.jpg";
import amboseliWebp from "@/assets/amboseli.webp";
import dianiBeach from "@/assets/diani-beach.jpg";
import dianiBeachWebp from "@/assets/diani-beach.webp";
import tsavo from "@/assets/tsavo.jpg";
import tsavoWebp from "@/assets/tsavo.webp";
import lamu from "@/assets/lamu.jpg";
import lamuWebp from "@/assets/lamu.webp";
import nairobi from "@/assets/nairobi.jpg";
import nairobiWebp from "@/assets/nairobi.webp";
import nakuru from "@/assets/lake-nakuru.jpeg";
import nakuruWebp from "@/assets/lake-nakuru.webp";
import samburu from "@/assets/samburu.jpg";
import samburuWebp from "@/assets/samburu.webp";
import meru from "@/assets/meru.jpg";
import meruWebp from "@/assets/meru.webp";

const destinationImages: Record<string, string> = {
  "masai-mara": masaiMara,
  amboseli: amboseli,
  "diani-beach": dianiBeach,
  tsavo: tsavo,
  lamu: lamu,
  nairobi,
  nakuru,
  samburu,
  meru,
};

const destinationImagesWebp: Record<string, string> = {
  "masai-mara": masaiMaraWebp,
  amboseli: amboseliWebp,
  "diani-beach": dianiBeachWebp,
  tsavo: tsavoWebp,
  lamu: lamuWebp,
  nairobi: nairobiWebp,
  nakuru: nakuruWebp,
  samburu: samburuWebp,
  meru: meruWebp,
};

const destinationIcons: Record<string, React.ElementType> = {
  "masai-mara": Camera,
  amboseli: Mountain,
  "diani-beach": Waves,
  tsavo: Sunrise,
  lamu: Landmark,
  nairobi: Building2,
  nakuru: Bird,
  samburu: Sunrise,
  meru: Mountain,
};

const destinationData = [
  { 
    id: "masai-mara", 
    name: "Masai Mara", 
    tagline: "The Great Migration",
    description: "Witness the world's most spectacular wildlife event with over 1.5 million wildebeest crossing the Mara River. Beyond the river crossings, the Mara offers dense predator activity, expansive photographic vistas, and expert-led game drives that reveal the rhythms of the savanna. Optional hot-air balloon flights and Maasai cultural visits add unforgettable perspectives to the experience.",
    bestTime: "July - October",
    highlights: ["Big Five", "Great Migration", "Hot Air Balloon", "Maasai Culture"],
    icon: "masai-mara"
  },
  { 
    id: "amboseli", 
    name: "Amboseli", 
    tagline: "Land of the Giants",
    description: "Home to Africa's largest elephants with breathtaking views of Mount Kilimanjaro, Africa's highest peak. Amboseli's compact park layout means excellent visibility for elephant herds at close range, bird-rich wetlands, and short guided walks. Photographers prize the dramatic Kilimanjaro backdrop during golden hour, while community visits showcase Maasai pastoral life.",
    bestTime: "June - October",
    highlights: ["Elephant Herds", "Kilimanjaro Views", "Bird Watching", "Cultural Visits"],
    icon: "amboseli"
  },
  { 
    id: "diani-beach", 
    name: "Diani Beach", 
    tagline: "Paradise Found",
    description: "Award-winning pristine white sand beach with crystal clear waters, perfect for relaxation and water sports. Diani's protected reefs make it a superb snorkeling and diving destination, while beachfront resorts and laid-back beach bars provide easy luxury and local hospitality. Activities range from dolphin safaris to kite-surfing lessons and serene sunset strolls along the shoreline.",
    bestTime: "Dec - Mar, Jul - Oct",
    highlights: ["Snorkeling", "Dolphin Watching", "Golf", "Spa Retreats"],
    icon: "diani-beach"
  },
  { 
    id: "tsavo", 
    name: "Tsavo", 
    tagline: "Theatre of the Wild",
    description: "Kenya's largest park featuring the famous red elephants, volcanic landscapes, and raw untamed wilderness. Tsavo's vast horizons deliver solitude, dramatic geological features like the Shetani Lava Flow, and remote camps that emphasize authentic wilderness camping and nocturnal wildlife encounters under brilliant star skies.",
    bestTime: "Jun - Oct, Jan - Feb",
    highlights: ["Red Elephants", "Mzima Springs", "Volcanic Landscapes", "Camping"],
    icon: "tsavo"
  },
  { 
    id: "lamu", 
    name: "Lamu", 
    tagline: "Pearl of the Indian Ocean",
    description: "UNESCO World Heritage site offering timeless Swahili culture, ancient architecture, and tranquil island life. Lamu's narrow lanes, dhow sails, and serene guesthouses invite slow exploration, hands-on craft markets, and immersive Swahili cuisine experiences that connect you to centuries of coastal trade and tradition.",
    bestTime: "Jul - Oct, Dec - Mar",
    highlights: ["Old Town", "Dhow Sailing", "Swahili Cuisine", "Donkey Sanctuaries"],
    icon: "lamu"
  },
  { 
    id: "nairobi", 
    name: "Nairobi", 
    tagline: "The Green City in the Sun",
    description: "Kenya's vibrant capital with elephant sanctuaries, cultural museums, and wildlife experiences right on the city outskirts. Nairobi balances cosmopolitan dining and arts with conservation attractions like the Sheldrick Elephant Orphanage and Giraffe Centre, offering easy half-day excursions that fit well into wider safari itineraries.",
    bestTime: "Year Round",
    highlights: ["Giraffe Manor", "Karen Blixen", "Elephant Orphanage", "Shopping"],
    icon: "nairobi"
  },
  { 
    id: "nakuru", 
    name: "Lake Nakuru", 
    tagline: "The Pink Lake",
    description: "Famous for millions of flamingos creating a pink carpet on the lake, plus excellent rhino and bird watching. Lake Nakuru's scenic viewpoints, diverse habitats and dedicated rhino conservation areas make it a rewarding stop for photographers and birders, with walking trails and lookout points that reveal changing seasonal colours.",
    bestTime: "Jun - Oct, Jan - Feb",
    highlights: ["Flamingos", "Rhinos", "Bird Watching", "Lake Views"],
    icon: "nakuru"
  },
  { 
    id: "samburu", 
    name: "Samburu", 
    tagline: "Land of the Nomads",
    description: "Remote northern Kenya with unique wildlife species like Grevy's zebra and reticulated giraffe. Samburu's distinctive arid landscapes, Ewaso Ng'iro riverine corridors and culturally-rich Samburu community encounters provide a complementary experience to southern reserves, prized for endemic species and intimate camps.",
    bestTime: "Jun - Oct, Dec - Mar",
    highlights: ["Grevy's Zebra", "Samburu Culture", "Reticulated Giraffe", "River Walks"],
    icon: "samburu"
  },
  { 
    id: "meru", 
    name: "Meru", 
    tagline: "Untouched Wilderness",
    description: "One of Kenya's most pristine parks with classic savanna landscapes and the legendary Elsa's Kopje. Meru offers secluded game viewing, riverine habitats, and conservation stories linked to famous conservationists—ideal for travelers seeking quiet, off-the-beaten-path safaris and immersive birding or walking excursions.",
    bestTime: "Jun - Oct, Dec - Mar",
    highlights: ["Elsa's Kopje", "Rhino Tracking", "Tana River", "Eco-Safaris"],
    icon: "meru"
  }
];

const DestinationsPreview = () => {
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
            Explore Kenya
          </span>
          <h2 className="safari-heading mb-4">Discover Our Safari Destinations</h2>
          <p className="safari-subheading mx-auto">
            Journey through Africa's most diverse and captivating landscapes where vast golden savannas teeming with iconic wildlife blend seamlessly with pristine Indian Ocean beaches, misty highlands harboring endemic species, and vibrant destinations preserving centuries of Swahili and Maasai heritage. Kenya encompasses every African experience imaginable—from thrilling safari encounters with the legendary Big Five to intimate cultural immersion with indigenous communities, from world-class beach resorts to remote wilderness sanctuaries. Each destination reveals distinct character: some famous for wildlife abundance, others celebrated for cultural richness, still others renowned for scenery grandeur and adventure opportunities. Kenya offers unforgettable experiences for every traveler, whether seeking raw wilderness adventure, luxury comfort, cultural understanding, or serene beach relaxation
          </p>
        </motion.div>

        {/* Featured Destinations Grid - Shows 6 destinations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinationData.slice(0, 6).map((dest, i) => {
            const IconComponent = destinationIcons[dest.icon];
            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group"
              >
                <Link
                  to="/destinations"
                  className="block relative h-[420px] rounded-2xl overflow-hidden"
                >
                  {/* Image */}
                  <picture>
                    <source type="image/webp" srcSet={destinationImagesWebp[dest.id]} />
                    <img
                      src={destinationImages[dest.id]}
                      alt={dest.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Best Time Badge */}
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2">
                    <Calendar size={14} className="text-white" />
                    <span className="text-white text-xs font-medium">{dest.bestTime}</span>
                  </div>

                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-[#F4A261] rounded-full flex items-center justify-center">
                    <IconComponent size={20} className="text-[#0B3D2E]" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[#F4A261] text-xs tracking-widest uppercase mb-2 font-semibold">
                      {dest.tagline}
                    </p>
                    <h3 className="font-heading text-2xl font-bold text-white mb-3">{dest.name}</h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">{dest.description}</p>
                    
                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {dest.highlights.slice(0, 3).map((highlight) => (
                        <span 
                          key={highlight} 
                          className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Explore Button */}
                    <div className="mt-5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="inline-flex items-center gap-2 text-[#F4A261] font-semibold text-sm">
                        Explore Destination
                        <MapPin size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Secondary Destinations Row - Shows remaining destinations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {destinationData.slice(6).map((dest, i) => {
            const IconComponent = destinationIcons[dest.icon];
            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: (i + 3) * 0.15, duration: 0.6 }}
                className="group"
              >
                <Link
                  to="/destinations"
                  className="block relative h-[320px] rounded-2xl overflow-hidden"
                >
                  <picture>
                    <source type="image/webp" srcSet={destinationImagesWebp[dest.id]} />
                    <img
                      src={destinationImages[dest.id]}
                      alt={dest.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Best Time Badge */}
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2">
                    <Calendar size={14} className="text-white" />
                    <span className="text-white text-xs font-medium">{dest.bestTime}</span>
                  </div>

                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-[#F4A261] rounded-full flex items-center justify-center">
                    <IconComponent size={20} className="text-[#0B3D2E]" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[#F4A261] text-xs tracking-widest uppercase mb-2 font-semibold">
                      {dest.tagline}
                    </p>
                    <h3 className="font-heading text-2xl font-bold text-white mb-3">{dest.name}</h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">{dest.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {dest.highlights.slice(0, 3).map((highlight) => (
                        <span 
                          key={highlight} 
                          className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="inline-flex items-center gap-2 text-[#F4A261] font-semibold text-sm">
                        Explore Destination
                        <MapPin size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-4">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all"
            >
              View All Destinations
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-foreground/20 text-foreground px-8 py-4 rounded-lg font-semibold hover:bg-foreground/5 transition-all"
            >
              Plan Your Safari
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationsPreview;
