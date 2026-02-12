import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="safari-section bg-primary" ref={ref}>
      <div className="safari-container">
        <div className="text-center mb-12">
          <p className="text-accent font-body text-sm tracking-[0.2em] uppercase mb-2">Testimonials</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground">
            What Our Travelers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-8"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-primary-foreground/85 text-sm leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div>
                <p className="text-primary-foreground font-semibold text-sm">{t.name}</p>
                <p className="text-primary-foreground/50 text-xs">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
