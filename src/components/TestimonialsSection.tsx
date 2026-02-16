import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote, MapPin, Calendar } from "lucide-react";
import { testimonials } from "@/lib/data";

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="safari-section bg-primary relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Decorative Quote */}
      <div className="absolute top-8 left-8 md:top-16 md:left-16 opacity-20">
        <Quote size={120} className="text-white" />
      </div>

      <div className="safari-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-white/10 text-[#F4A261] font-semibold text-sm tracking-[0.2em] uppercase mb-3 px-4 py-2 rounded-full backdrop-blur-sm">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied travelers who experienced the magic of Kenya with Buffalo Plains Adventures
          </p>
        </motion.div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6"
          >
            <div className="text-center">
              <div className="text-5xl font-bold text-[#F4A261] font-heading">4.9</div>
              <div className="flex gap-1 justify-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={20} className="text-[#F4A261] fill-[#F4A261]" />
                ))}
              </div>
            </div>
            <div className="w-px h-16 bg-white/20" />
            <div className="text-left">
              <p className="text-white font-semibold text-lg">Exceptional Safari Experience</p>
              <p className="text-white/60 text-sm">Based on 500+ verified reviews</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[#F4A261] text-sm">TripAdvisor Excellence Award</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="text-[#F4A261] fill-[#F4A261]" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-primary-foreground/85 text-base leading-relaxed mb-6 italic">
                "{t.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <p className="text-primary-foreground font-semibold text-base">{t.name}</p>
                  <div className="flex items-center gap-2 text-primary-foreground/50 text-sm mt-1">
                    <MapPin size={14} />
                    <span>{t.location}</span>
                  </div>
                </div>
                
                {/* Experience Badge */}
                <div className="bg-[#F4A261]/20 px-4 py-2 rounded-full">
                  <p className="text-[#F4A261] text-xs font-semibold">Verified Traveler</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Reviews CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-primary-foreground/70 mb-4">
            Want to share your safari experience?
          </p>
          <a
            href="https://www.tripadvisor.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/20 text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            <Calendar size={18} />
            Write a Review
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
