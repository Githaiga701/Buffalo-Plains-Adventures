import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Users, Star, Compass } from "lucide-react";

const features = [
  { icon: Shield, title: "Expert Local Guides", description: "Our guides have 10+ years of experience and intimate knowledge of Kenya's wildlife and culture." },
  { icon: Star, title: "Luxury Accommodation", description: "Stay in handpicked lodges and tented camps that blend comfort with authentic African charm." },
  { icon: Users, title: "Small Group Tours", description: "Maximum 6 guests per vehicle ensures personalized attention and the best wildlife viewing." },
  { icon: Compass, title: "Tailored Itineraries", description: "Every trip is customizable. Tell us your dream and we'll make it a reality." },
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="safari-section bg-background" ref={ref}>
      <div className="safari-container">
        <div className="text-center mb-12">
          <p className="text-secondary font-body text-sm tracking-[0.2em] uppercase mb-2">Why Us</p>
          <h2 className="safari-heading">Why Choose Kenya Explorer</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-5">
                <f.icon className="text-secondary" size={28} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
