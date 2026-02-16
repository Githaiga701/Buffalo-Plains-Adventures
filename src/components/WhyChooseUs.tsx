import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Shield, 
  Users, 
  Star, 
  Compass,
  Award,
  Clock,
  Heart,
  Globe,
  HeadphonesIcon,
  CreditCard,
  MapPinned,
  Plane
} from "lucide-react";

const features = [
  { 
    icon: Shield, 
    title: "Expert Local Guides", 
    description: "Our professional guides have 10+ years of experience and intimate knowledge of Kenya's wildlife, ensuring you see the Big Five and more.",
    stats: "10+ Years Avg. Experience"
  },
  { 
    icon: Star, 
    title: "Luxury Accommodation", 
    description: "Stay in handpicked lodges and tented camps that blend comfort with authentic African charm, from eco-luxury to 5-star resorts.",
    stats: "50+ Partner Properties"
  },
  { 
    icon: Users, 
    title: "Small Group Tours", 
    description: "Maximum 6 guests per vehicle ensures personalized attention, better wildlife viewing, and a more intimate safari experience.",
    stats: "Max 6 Guests/vehicle"
  },
  { 
    icon: Compass, 
    title: "Tailored Itineraries", 
    description: "Every trip is customizable to your preferences. Tell us your dream safari and we'll create a perfect personalized itinerary.",
    stats: "100% Customizable"
  },
  { 
    icon: Award, 
    title: "Award-Winning Service", 
    recognition: "TripAdvisor Excellence", 
    description: "Recognized by leading travel platforms for our exceptional service and unforgettable safari experiences.",
    stats: "5000+ Happy Travelers"
  },
  { 
    icon: Clock, 
    title: "24/7 Support", 
    description: "Round-the-clock assistance from our dedicated team. From planning to your final day, we're always here to help.",
    stats: "24/7 Assistance"
  },
];

const achievements = [
  { number: "15+", label: "Years in Business", icon: Clock },
  { number: "98%", label: "Return Guests", icon: Heart },
  { number: "4.9", label: "Average Rating", icon: Star },
  { number: "50+", label: "Safari Packages", icon: MapPinned },
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="safari-section bg-background relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230B3D2E' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="safari-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#F4A261]/10 text-[#F4A261] font-semibold text-sm tracking-[0.2em] uppercase mb-3 px-4 py-2 rounded-full">
            Why Choose Us
          </span>
          <h2 className="safari-heading mb-4">Your Trusted Safari Partner</h2>
          <p className="safari-subheading mx-auto">
            With over 15 years of experience crafting unforgettable African adventures, we combine local expertise 
            with world-class service to create memories that last a lifetime
          </p>
        </motion.div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16"
        >
          {achievements.map((item, i) => (
            <div 
              key={i}
              className="text-center p-6 bg-[#0B3D2E] rounded-2xl"
            >
              <item.icon className="mx-auto mb-3 text-[#F4A261]" size={32} />
              <div className="text-3xl md:text-4xl font-bold text-white font-heading mb-1">
                {item.number}
              </div>
              <div className="text-white/70 text-sm">{item.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className="group bg-card p-8 rounded-2xl border border-border/50 hover:border-[#F4A261]/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F4A261]/10 mb-6 group-hover:bg-[#F4A261] transition-colors">
                <f.icon className="text-[#F4A261] group-hover:text-white transition-colors" size={28} />
              </div>

              {/* Content */}
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{f.description}</p>

              {/* Stats Badge */}
              <div className="inline-flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full">
                <Star size={12} className="text-[#F4A261] fill-[#F4A261]" />
                <span className="text-xs font-semibold text-foreground">{f.stats}</span>
              </div>

              {/* Recognition Badge if exists */}
              {f.recognition && (
                <div className="mt-3 flex items-center gap-2">
                  <Award size={14} className="text-[#F4A261]" />
                  <span className="text-xs text-muted-foreground">{f.recognition}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          <div className="flex items-center gap-3 text-muted-foreground">
            <CreditCard size={20} />
            <div>
              <p className="font-semibold text-foreground text-sm">Secure Booking</p>
              <p className="text-xs">Multiple payment options</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <HeadphonesIcon size={20} />
            <div>
              <p className="font-semibold text-foreground text-sm">24/7 Support</p>
              <p className="text-xs">Always here to help</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Plane size={20} />
            <div>
              <p className="font-semibold text-foreground text-sm">Free Transfers</p>
              <p className="text-xs">Airport pickup & drop-off</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Globe size={20} />
            <div>
              <p className="font-semibold text-foreground text-sm">Best Price Guarantee</p>
              <p className="text-xs">Match any competitor price</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
