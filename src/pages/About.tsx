import { motion } from "framer-motion";
import { Shield, Users, Star, Award } from "lucide-react";
import safariSunset from "@/assets/safari-sunset.jpg";

const About = () => {
  return (
    <main className="pt-20">
      <section className="safari-section bg-primary text-center">
        <div className="safari-container">
          <p className="text-accent text-sm tracking-[0.2em] uppercase mb-2">Our Story</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground">About Kenya Explorer</h1>
        </div>
      </section>

      <section className="safari-section bg-background">
        <div className="safari-container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-secondary text-sm tracking-widest uppercase mb-2">Who We Are</p>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Crafting Unforgettable African Experiences</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded by passionate Kenyan locals with deep roots in the safari industry, Kenya Explorer was born from a desire to share the authentic beauty of East Africa with the world.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              With over 15 years of experience, we've guided thousands of travelers through Kenya's most spectacular landscapes — from the thundering herds of the Great Migration to the serene beaches of the Indian Ocean coast.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every journey we design is a testament to our commitment to sustainable tourism, community empowerment, and creating memories that last a lifetime.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-96 rounded-lg overflow-hidden"
          >
            <img src={safariSunset} alt="Safari sunset" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="safari-section bg-muted">
        <div className="safari-container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: Users, stat: "5,000+", label: "Happy Travelers" },
            { icon: Star, stat: "4.9/5", label: "Average Rating" },
            { icon: Award, stat: "15+", label: "Years Experience" },
            { icon: Shield, stat: "100%", label: "Safety Record" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <item.icon className="mx-auto text-secondary mb-3" size={32} />
              <p className="font-heading text-3xl font-bold text-foreground">{item.stat}</p>
              <p className="text-muted-foreground text-sm mt-1">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default About;
