import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  MapPin, 
  Clock, 
  ArrowRight, 
  Users, 
  Sparkles,
  Heart,
  Camera,
  UtensilsCrossed,
  Landmark,
  Palmtree
} from "lucide-react";
import { culturalExperiences } from "@/lib/data";
import safariSunset from "@/assets/safari-sunset.jpg";

// Using placeholder image - replace with actual cultural images when available
const culturalBg = safariSunset;

const iconMap: Record<string, React.ElementType> = {
  "maasai-village": Users,
  "maasai-beading": Sparkles,
  "swahili-cooking": UtensilsCrossed,
  "samburu-culture": Users,
  "karen-blixen": Landmark,
  "giraffe-centre": Palmtree,
};

const CulturalExperiences = () => {
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
            Cultural Immersion
          </span>
          <h2 className="safari-heading mb-4">Experience Kenya's Rich Culture</h2>
          <p className="safari-subheading mx-auto">
            Immerse yourself in the vibrant traditions of Kenya's diverse communities. 
            From the iconic Maasai warriors to the ancient Swahili culture, discover authentic experiences that will enrich your journey.
          </p>
        </motion.div>

        {/* Cultural Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {culturalExperiences.map((exp, i) => {
            const IconComponent = iconMap[exp.id] || Camera;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-[#F4A261]/30"
              >
                {/* Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-[#0B3D2E] to-[#1a5c45] flex items-center justify-center">
                  <IconComponent size={48} className="text-[#F4A261] opacity-50" />
                  
                  {/* Duration Badge */}
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2">
                    <Clock size={14} className="text-white" />
                    <span className="text-white text-xs font-medium">{exp.duration}</span>
                  </div>

                  {/* Location Badge */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2">
                    <MapPin size={14} className="text-white" />
                    <span className="text-white text-xs font-medium">{exp.location}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-[#F4A261] transition-colors">
                    {exp.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.highlights.slice(0, 3).map((highlight) => (
                      <span 
                        key={highlight} 
                        className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-md"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-[#F4A261] font-semibold text-sm group/cta"
                  >
                    Book This Experience
                    <ArrowRight size={16} className="group-hover/cta:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
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
              <Heart size={18} />
              Customize Your Cultural Tour
            </Link>
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 border border-foreground/20 text-foreground px-8 py-4 rounded-lg font-semibold hover:bg-foreground/5 transition-all"
            >
              View All Packages
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CulturalExperiences;
