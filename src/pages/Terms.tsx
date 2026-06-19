import { motion } from "framer-motion";
import { Shield, AlertCircle, CreditCard, RefreshCw, Phone, Globe, FileText, Camera, Lock } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_RAW } from "@/lib/constants";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const Terms = () => {
  return (
    <main className="pt-20">

      {/* Hero banner — matches About.tsx exactly */}
      <section className="safari-section bg-primary text-center">
        <div className="safari-container">
          <p className="text-accent text-sm tracking-[0.2em] uppercase mb-2">Legal</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground">
            Terms &amp; Conditions
          </h1>
          <p className="text-primary-foreground/70 mt-4 max-w-xl mx-auto text-sm">
            Effective 1 May 2025 &mdash; please read carefully before booking.
          </p>
        </div>
      </section>

      {/* Quick summary cards */}
      <section className="safari-section bg-muted">
        <div className="safari-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: CreditCard,  title: "30% Deposit",      sub: "secures your booking" },
              { icon: RefreshCw,   title: "90+ days",         sub: "deposit-only loss" },
              { icon: Shield,      title: "Insurance",        sub: "strongly recommended" },
              { icon: Phone,       title: "30-day window",    sub: "to raise complaints" },
            ].map((item, i) => (
              <motion.div key={item.title} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <item.icon className="mx-auto text-secondary mb-3" size={28} />
                <p className="font-heading font-bold text-foreground text-lg">{item.title}</p>
                <p className="text-muted-foreground text-sm mt-1">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main T&C content */}
      <section className="safari-section bg-background">
        <div className="safari-container max-w-4xl">

          <motion.p {...fadeUp} className="text-muted-foreground text-sm mb-10 pb-6 border-b border-border">
            <strong className="text-foreground">Buffalo Plains Adventures</strong> is registered in Nairobi, Kenya.
            Contact: <a href={`mailto:${CONTACT_EMAIL}`} className="text-secondary underline underline-offset-2">{CONTACT_EMAIL}</a> &nbsp;|&nbsp;
            <a href={`tel:${CONTACT_PHONE_RAW}`} className="text-secondary underline underline-offset-2">{CONTACT_PHONE}</a>
          </motion.p>

          {/* Section 1 — Acceptance */}
          <TermsSection icon={FileText} title="1. Acceptance of Terms">
            <p>
              By making a booking, enquiry, or payment with Buffalo Plains Adventures you agree to be legally
              bound by these Terms and Conditions in full. Please read them carefully before confirming any
              reservation. If you do not agree with any part of these terms, do not proceed with your booking.
            </p>
          </TermsSection>

          {/* Section 2 — Bookings */}
          <TermsSection icon={CreditCard} title="2. Bookings and Reservations">
            <TermsSubheading>2.1 How to Book</TermsSubheading>
            <p>All bookings must be made through our official website, by email, or by phone. A booking is only
            confirmed once we have received a deposit and issued a written confirmation to you.</p>

            <TermsSubheading>2.2 Deposit</TermsSubheading>
            <p>A <strong>non-refundable deposit of 30% of the total tour price</strong> is required to secure
            your booking. The deposit must be received within 7 days of the booking date, or the reservation
            will be automatically released.</p>

            <TermsSubheading>2.3 Final Payment</TermsSubheading>
            <p>The remaining balance (70%) is due no later than <strong>60 days before the scheduled departure
            date</strong>. For bookings made within 60 days of departure, the full payment is required at the
            time of booking.</p>

            <TermsSubheading>2.4 Group Bookings</TermsSubheading>
            <p>For groups of 8 or more, separate group booking terms may apply. Please contact us directly for
            a customised quote and payment schedule.</p>
          </TermsSection>

          {/* Section 3 — Pricing */}
          <TermsSection icon={Globe} title="3. Pricing and Currency">
            <TermsSubheading>3.1 Currency</TermsSubheading>
            <p>All prices are quoted in <strong>United States Dollars (USD)</strong> unless otherwise stated.
            Payments in Kenyan Shillings (KES) are converted at the prevailing exchange rate on the payment date.</p>

            <TermsSubheading>3.2 Price Changes</TermsSubheading>
            <p>Prices may be adjusted before a booking is confirmed. Once a deposit is received and confirmation
            issued, the price will not change except for significant unforeseen increases in government taxes,
            park fees, fuel levies, or foreign exchange fluctuations exceeding 10%.</p>

            <TermsSubheading>3.3 What is Included</TermsSubheading>
            <p>Each package description specifies what is included and excluded. Unless explicitly stated,
            prices do not include international airfare, travel insurance, visa fees, personal expenses,
            tips/gratuities, or optional activities.</p>
          </TermsSection>

          {/* Section 4 — Cancellations */}
          <TermsSection icon={RefreshCw} title="4. Cancellation and Refund Policy">
            <TermsSubheading>4.1 Cancellations by the Client</TermsSubheading>
            <p className="mb-4">All cancellations must be submitted in writing by email. The date we receive
            your written notice determines the applicable charge:</p>

            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 font-semibold text-foreground border border-border">Notice Before Departure</th>
                    <th className="text-left p-3 font-semibold text-foreground border border-border">Cancellation Charge</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["More than 90 days",  "Loss of deposit (30%) only"],
                    ["60 – 90 days",        "50% of total tour price"],
                    ["30 – 59 days",        "75% of total tour price"],
                    ["Less than 30 days",   "100% — no refund"],
                  ].map(([period, charge], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                      <td className="p-3 text-muted-foreground border border-border">{period}</td>
                      <td className="p-3 text-foreground font-medium border border-border">{charge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <TermsSubheading>4.2 No-Show</TermsSubheading>
            <p>Failure to arrive on the departure date without prior written notice is treated as a
            cancellation within 30 days — no refund will be issued.</p>

            <TermsSubheading>4.3 Cancellations by Buffalo Plains Adventures</TermsSubheading>
            <p>If we cancel your tour due to circumstances within our control, you will be offered a full
            alternative tour of equal or greater value, or a full refund of all payments made to us. We are
            not liable for independently booked flights, accommodation, or visas.</p>

            <TermsSubheading>4.4 Force Majeure</TermsSubheading>
            <p>We are not liable for cancellations caused by natural disasters, civil unrest, government travel
            advisories, epidemics, pandemics, or acts of terrorism. In such cases we will endeavour to offer a
            rescheduled tour or a credit note valid for 24 months. Refunds in force majeure situations are at
            our discretion.</p>
          </TermsSection>

          {/* Section 5 — Changes */}
          <TermsSection icon={RefreshCw} title="5. Changes to Bookings">
            <TermsSubheading>5.1 Changes by the Client</TermsSubheading>
            <p>Amendment requests must be submitted in writing. Changes within 30 days of departure may incur
            an administration fee of USD 50 per change plus any applicable price differences.</p>

            <TermsSubheading>5.2 Changes by Buffalo Plains Adventures</TermsSubheading>
            <p>Weather, road conditions, park authority decisions, and wildlife movement may occasionally
            require itinerary adjustments. We will always provide a suitable alternative of equal or greater
            value and communicate significant changes promptly.</p>
          </TermsSection>

          {/* Section 6 — Insurance */}
          <TermsSection icon={Shield} title="6. Travel Insurance">
            <p>
              <strong>Travel insurance is strongly recommended and may be required for certain itineraries.</strong>
              {" "}Your policy should cover, at minimum: emergency medical treatment and evacuation, trip
              cancellation or curtailment, loss or theft of personal belongings, and personal liability.
              Buffalo Plains Adventures does not provide travel insurance and accepts no liability for losses
              that would be covered by appropriate insurance.
            </p>
          </TermsSection>

          {/* Section 7 — Health */}
          <TermsSection icon={AlertCircle} title="7. Health, Fitness, and Special Requirements">
            <TermsSubheading>7.1 Health Disclosure</TermsSubheading>
            <p>You must be medically fit to undertake the activities in your tour. Trekking, balloon rides,
            and remote bush safaris may require a reasonable level of physical fitness.</p>

            <TermsSubheading>7.2 Medical Conditions</TermsSubheading>
            <p>Disclose all pre-existing medical conditions, allergies, dietary requirements, or disabilities
            at the time of booking. We will make reasonable efforts to accommodate your needs.</p>

            <TermsSubheading>7.3 Vaccinations</TermsSubheading>
            <p>Kenya may require proof of certain vaccinations (e.g. Yellow Fever) for entry. You are solely
            responsible for meeting all health entry requirements. Consult your doctor before travel.</p>
          </TermsSection>

          {/* Section 8 — Wildlife */}
          <TermsSection icon={AlertCircle} title="8. Wildlife and Safety">
            <p className="mb-3">Safari activities involve close proximity to wild animals in their natural
            habitat. Wildlife behaviour is inherently unpredictable and you must follow your guide's
            instructions at all times.</p>
            <p className="mb-3">Failure to follow guide or park ranger instructions may result in exclusion
            from activities without a refund and may void any claim against us.</p>
            <p>All guests must comply with Kenya Wildlife Service (KWS) regulations. Off-road driving,
            harassment of animals, and littering are strictly prohibited.</p>
          </TermsSection>

          {/* Section 9 — Liability */}
          <TermsSection icon={Shield} title="9. Liability">
            <TermsSubheading>9.1 Limitation of Liability</TermsSubheading>
            <p>Buffalo Plains Adventures shall not be liable for death, injury, illness, or loss of personal
            property except where caused directly by our proven negligence, nor for delays or disruptions caused
            by third parties.</p>

            <TermsSubheading>9.2 Third-Party Services</TermsSubheading>
            <p>Where we arrange services provided by airlines, lodges, or activity operators, we act as agent
            only. The terms of those providers apply to their respective services.</p>

            <TermsSubheading>9.3 Maximum Liability</TermsSubheading>
            <p>To the fullest extent permitted by Kenyan law, our maximum liability shall not exceed the total
            amount paid by the client for the tour in question.</p>
          </TermsSection>

          {/* Section 10 — Passports */}
          <TermsSection icon={Globe} title="10. Passports, Visas, and Entry Requirements">
            <p>You are solely responsible for holding a valid passport (minimum 6 months validity beyond
            return date) and all required visas. Buffalo Plains Adventures accepts no liability for clients
            denied entry due to insufficient documentation.</p>
          </TermsSection>

          {/* Section 11 — Photography */}
          <TermsSection icon={Camera} title="11. Photography and Media">
            <p>By participating in our tours, you consent to being photographed or filmed for promotional
            purposes. Notify your guide at the start of the tour if you do not wish to be photographed. You
            may not use images of our staff, vehicles, or proprietary materials for commercial purposes without
            our prior written consent.</p>
          </TermsSection>

          {/* Section 12 — Privacy */}
          <TermsSection icon={Lock} title="12. Privacy and Data">
            <p>Your personal data is collected and processed in accordance with our Privacy Policy. We will
            not sell your information to third parties. Data may be shared with suppliers strictly as necessary
            to fulfil your booking.</p>
          </TermsSection>

          {/* Section 13 — Complaints */}
          <TermsSection icon={Phone} title="13. Complaints">
            <p>Raise any issue with your guide or our local representative immediately. If unresolved, submit
            a formal complaint in writing to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-secondary underline underline-offset-2">
              {CONTACT_EMAIL}
            </a>{" "}
            within <strong>30 days of your return date</strong>. We will acknowledge within 5 working days
            and provide a full response within 28 days.</p>
          </TermsSection>

          {/* Section 14 — Governing Law */}
          <TermsSection icon={Globe} title="14. Governing Law">
            <p>These Terms and Conditions are governed by the laws of the <strong>Republic of Kenya</strong>.
            Any dispute shall be subject to the exclusive jurisdiction of the courts of Nairobi, Kenya.</p>
          </TermsSection>

          {/* Section 15 — Updates */}
          <TermsSection icon={FileText} title="15. Changes to These Terms" last>
            <p>We reserve the right to update these Terms and Conditions at any time. The version in force at
            the time of your booking confirmation is the version that applies to your booking.</p>
          </TermsSection>

        </div>
      </section>
    </main>
  );
};

/* ── helpers ─────────────────────────────────────────────────────────── */

interface TermsSectionProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}

const TermsSection = ({ icon: Icon, title, children, last }: TermsSectionProps) => (
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
    <div className="text-muted-foreground leading-relaxed space-y-3 pl-11">
      {children}
    </div>
  </motion.div>
);

const TermsSubheading = ({ children }: { children: React.ReactNode }) => (
  <p className="font-semibold text-foreground mt-4 mb-1">{children}</p>
);

export default Terms;
