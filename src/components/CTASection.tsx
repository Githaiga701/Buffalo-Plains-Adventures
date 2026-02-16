import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Calendar,
  MessageCircle,
  CheckCircle2
} from "lucide-react";
import safariSunset from "@/assets/safari-sunset.jpg";

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    "Free safari planning & consultation",
    "Best price guarantee on all packages",
    "Flexible payment options available",
    "Instant booking confirmation",
  ];

  return (
    <section className="relative py-20 overflow-hidden" ref={ref}>
      {/* Background Image */}
      <img
        src={safariSunset}
        alt="Safari sunset in Kenya"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B3D2E]/90 via-[#0B3D2E]/80 to-[#0B3D2E]/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />

      <div className="relative z-10 safari-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[#F4A261]/20 text-[#F4A261] font-semibold text-sm tracking-[0.2em] uppercase mb-4 px-4 py-2 rounded-full">
              Start Your Adventure
            </span>
            
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready for Your
              <span className="text-[#F4A261] block">African Adventure?</span>
            </h2>
            
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Let our expert team craft your perfect Kenya safari. Whether you're seeking the Great Migration, 
              luxury beach time, or cultural experiences, we'll create memories that last a lifetime.
            </p>

            {/* Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#F4A261] flex-shrink-0" />
                  <span className="text-white/90 text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#F4A261] text-[#0B3D2E] px-8 py-4 rounded-lg font-bold hover:bg-[#e08f4d] transition-all transform hover:scale-105"
              >
                <Calendar size={20} />
                Plan My Trip
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/254720445869?text=Hello%2C%20I%27d%20like%20to%20plan%20a%20trip%20to%20Kenya"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right Content - Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4"
          >
            {/* Quick Contact Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-white font-heading text-xl font-bold mb-6">
                Get In Touch
              </h3>
              
              <div className="space-y-4">
                <a 
                  href="tel:+254720445869"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 bg-[#F4A261] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-[#0B3D2E]" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Call Us</p>
                    <p className="text-white font-semibold">+254 720 445869</p>
                  </div>
                </a>

                <a 
                  href="mailto:info@buffaloplains.com"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 bg-[#F4A261] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-[#0B3D2E]" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Email Us</p>
                    <p className="text-white font-semibold">info@buffaloplains.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3">
                  <div className="w-12 h-12 bg-[#F4A261] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-[#0B3D2E]" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Visit Us</p>
                    <p className="text-white font-semibold">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={20} className="text-[#F4A261]" />
                <h4 className="text-white font-semibold">Office Hours</h4>
              </div>
              <div className="space-y-2 text-white/70 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-white">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-white">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-white">Emergency Only</span>
                </div>
              </div>
            </div>

            {/* Emergency Note */}
            <div className="bg-[#F4A261]/20 border border-[#F4A261]/30 rounded-2xl p-4">
              <p className="text-white text-sm">
                <span className="text-[#F4A261] font-semibold">Emergency:</span> For urgent safari inquiries outside office hours, 
                call our 24/7 hotline at <span className="font-semibold">+254 700 000 000</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
