import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { WHATSAPP_DEFAULT_MSG, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_RAW } from "@/lib/constants";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="pt-20">
      <section className="safari-section bg-primary text-center">
        <div className="safari-container">
          <p className="text-accent text-sm tracking-[0.2em] uppercase mb-2">Get In Touch</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground">Contact Us</h1>
          <p className="text-primary-foreground/70 text-lg mt-4 max-w-2xl mx-auto">
            Ready to start planning your Kenya adventure with Buffalo Plains Adventures? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="safari-section bg-background">
        <div className="safari-container grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="bg-muted rounded-lg p-12 text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="text-secondary" size={28} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Thank You!</h3>
                <p className="text-muted-foreground">We've received your inquiry and will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      maxLength={255}
                      className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Country</label>
                    <input
                      type="text"
                      maxLength={100}
                      className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
                      placeholder="Your country"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Travel Dates</label>
                    <input
                      type="text"
                      maxLength={100}
                      className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
                      placeholder="e.g., July 2025"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                  <textarea
                    required
                    maxLength={2000}
                    rows={5}
                    className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none"
                    placeholder="Tell us about your dream Kenya trip..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-secondary text-secondary-foreground py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Reach Us Directly</h3>
              <div className="space-y-5">
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-4 text-muted-foreground hover:text-secondary transition-colors">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"><Mail size={20} /></div>
                  <div><p className="text-sm font-medium text-foreground">Email</p><p className="text-sm">{CONTACT_EMAIL}</p></div>
                </a>
                <a href={`tel:${CONTACT_PHONE_RAW}`} className="flex items-center gap-4 text-muted-foreground hover:text-secondary transition-colors">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"><Phone size={20} /></div>
                  <div><p className="text-sm font-medium text-foreground">Phone</p><p className="text-sm">{CONTACT_PHONE}</p></div>
                </a>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"><MapPin size={20} /></div>
                  <div><p className="text-sm font-medium text-foreground">Office</p><p className="text-sm">Nairobi, Kenya</p></div>
                </div>
              </div>
            </div>

            <a
                href={WHATSAPP_DEFAULT_MSG}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3.5 rounded-md font-semibold hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={20} /> Chat on WhatsApp
            </a>

            {/* Map placeholder */}
            <div className="rounded-lg overflow-hidden h-64 bg-muted flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.35853743783!2d36.68218635!3d-1.3028617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2s!4v1700000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Buffalo Plains Adventures Office Location"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
