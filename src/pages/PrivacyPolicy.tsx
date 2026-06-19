import { motion } from "framer-motion";
import { Shield, Lock, Globe, FileText, Eye, Heart, AlertTriangle } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/constants";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const PrivacyPolicy = () => {
  return (
    <main className="pt-20">
      <section className="safari-section bg-primary text-center">
        <div className="safari-container">
          <p className="text-accent text-sm tracking-[0.2em] uppercase mb-2">Legal</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground">
            Privacy Policy
          </h1>
          <p className="text-primary-foreground/70 mt-4 max-w-xl mx-auto text-sm">
            We respect your privacy and are committed to protecting the personal information you share with us.
          </p>
        </div>
      </section>

      <section className="safari-section bg-muted">
        <div className="safari-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { icon: Shield, title: "Safe Data", sub: "Protected by strong practices" },
              { icon: Eye, title: "Clear Use", sub: "Only what is needed" },
              { icon: Heart, title: "Trusted Service", sub: "Respectful and fair" },
            ].map((item, index) => (
              <motion.div key={item.title} {...fadeUp} transition={{ delay: index * 0.1 }}>
                <item.icon className="mx-auto text-secondary mb-3" size={28} />
                <p className="font-heading font-bold text-foreground text-lg">{item.title}</p>
                <p className="text-muted-foreground text-sm mt-1">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="safari-section bg-background">
        <div className="safari-container max-w-4xl">
          <motion.p {...fadeUp} className="text-muted-foreground text-sm mb-10 pb-6 border-b border-border">
            This Privacy Policy explains how Buffalo Plains Adventures collects, uses, and protects the personal data
            of visitors and customers. If you have any questions, contact us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-secondary underline underline-offset-2">
              {CONTACT_EMAIL}
            </a>.
          </motion.p>

          <PrivacySection icon={FileText} title="1. Information We Collect">
            <p>
              We collect information you provide directly when you make an enquiry, request a quote, or book a tour.
              This may include your name, email address, phone number, travel preferences, passport details, and
              payment information necessary to process your booking.
            </p>
          </PrivacySection>

          <PrivacySection icon={Globe} title="2. How We Use Your Data">
            <p>
              Your information helps us confirm bookings, communicate important updates, customise your itinerary,
              and offer the best travel experience. We may also use your data to respond to enquiries and improve our
              website and services.
            </p>
          </PrivacySection>

          <PrivacySection icon={Lock} title="3. Data Sharing and Disclosure">
            <p>
              We do not sell your personal data. We may share your details with trusted suppliers, accommodation
              providers, transport partners, or payment processors only when necessary to fulfil your booking.
            </p>
          </PrivacySection>

          <PrivacySection icon={AlertTriangle} title="4. Cookies and Analytics">
            <p>
              Our website uses cookies and analytics tools to understand how visitors use the site and to improve
              the user experience. Cookies help us remember preferences and measure site performance.
            </p>
          </PrivacySection>

          <PrivacySection icon={Shield} title="5. Security Measures">
            <p>
              We take reasonable steps to protect your personal information from unauthorised access, disclosure,
              alteration, or destruction. However, no internet transmission can be guaranteed as completely secure.
            </p>
          </PrivacySection>

          <PrivacySection icon={Heart} title="6. Your Rights">
            <p>
              You have the right to access, correct, or delete the personal information we hold about you.
              If you wish to update your details or withdraw consent, please contact us using the email above.
            </p>
          </PrivacySection>

          <PrivacySection icon={Globe} title="7. Policy Updates" last>
            <p>
              We may revise this Privacy Policy from time to time. The latest version is always available on this
              website, and continued use of our services indicates your acceptance of any updates.
            </p>
          </PrivacySection>
        </div>
      </section>
    </main>
  );
};

interface PrivacySectionProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}

const PrivacySection = ({ icon: Icon, title, children, last }: PrivacySectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`mb-10 pb-10 ${last ? "" : "border-b border-border"}`}
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-secondary" />
      </div>
      <h2 className="font-heading text-xl font-bold text-foreground">{title}</h2>
    </div>
    <div className="text-muted-foreground leading-relaxed space-y-3 pl-11">{children}</div>
  </motion.div>
);

export default PrivacyPolicy;
