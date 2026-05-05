import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle } from "lucide-react";
import { WHATSAPP_DEFAULT_MSG, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_RAW } from "@/lib/constants";
import emailjs from '@emailjs/browser';

export interface ContactFormData {
  name: string;
  email: string;
  country: string;
  travelDates: string;
  message: string;
}

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      country: '',
      travelDates: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSending(true);
    setSendError(null);

    try {
      const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
        throw new Error('Email credentials not configured');
      }

      emailjs.init(EMAILJS_PUBLIC_KEY);

      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        country: data.country || 'Not specified',
        travel_dates: data.travelDates || 'Not specified',
        message: data.message,
        to_email: CONTACT_EMAIL,
        to_name: 'Buffalo Plains Team',
        reply_to: data.email,
        subject: 'New Inquiry from ' + data.name,
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      console.log('Email sent successfully');
      setSubmitted(true);
      reset();
    } catch (error: any) {
      console.error('Email send error:', error);
      setSendError('Failed to send: ' + (error.text || error.message || 'Unknown error'));
    } finally {
      setIsSending(false);
    }
  };

  if (submitted) {
    return (
      <main className="pt-20">
        <section className="safari-section bg-primary text-center">
          <div className="safari-container">
            <p className="text-accent text-sm tracking-[0.2em] uppercase mb-2">Thank You</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground">Inquiry Received</h1>
            <p className="text-primary-foreground/70 text-lg mt-4 max-w-2xl mx-auto">
              We have received your inquiry and will respond within 24 hours.
            </p>
          </div>
        </section>

        <section className="safari-section bg-background">
          <div className="safari-container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center py-12">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-secondary" size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Thank You!</h3>
              <p className="text-muted-foreground mb-6">
                Your message has been sent. We will contact you soon to discuss your Kenya plans.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-secondary text-secondary-foreground px-8 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
              >
                Send Another Message
              </button>
            </motion.div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-20">
      <section className="safari-section bg-primary text-center">
        <div className="safari-container">
          <p className="text-accent text-sm tracking-[0.2em] uppercase mb-2">Get In Touch</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground">Contact Us</h1>
          <p className="text-primary-foreground/70 text-lg mt-4 max-w-2xl mx-auto">
            Ready to plan your Kenya adventure? We would love to hear from you.
          </p>
        </div>
      </section>

      <section className="safari-section bg-background">
        <div className="safari-container grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {sendError && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                <p className="font-semibold mb-2">Message Not Sent</p>
                <p>{sendError}</p>
                <p className="mt-2 text-xs">Check console for details or contact us directly.</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required", maxLength: { value: 100, message: "Max 100 chars" } })}
                    className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
                    placeholder="Your full name"
                  />
                  {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })}
                    className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
                    placeholder="you@example.com"
                  />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Country</label>
                  <input
                    type="text"
                    {...register("country", { maxLength: { value: 100, message: "Max 100 chars" } })}
                    className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
                    placeholder="Your country"
                  />
                  {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Travel Dates</label>
                  <input
                    type="text"
                    {...register("travelDates", { maxLength: { value: 100, message: "Max 100 chars" } })}
                    className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
                    placeholder="e.g., July 2025"
                  />
                  {errors.travelDates && <span className="text-red-500 text-sm">{errors.travelDates.message}</span>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                <textarea
                  {...register("message", { required: "Message is required", minLength: { value: 10, message: "Min 10 chars" }, maxLength: { value: 2000, message: "Max 2000 chars" } })}
                  rows={5}
                  className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none"
                  placeholder="Tell us about your dream Kenya trip..."
                />
                {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
              </div>
              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-secondary text-secondary-foreground py-3 rounded-md font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Inquiry
                  </>
                )}
              </button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="space-y-8">
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Reach Us Directly</h3>
              <div className="space-y-5">
                <a href={'mailto:' + CONTACT_EMAIL} className="flex items-center gap-4 text-muted-foreground hover:text-secondary transition-colors">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"><Mail size={20} /></div>
                  <div><p className="text-sm font-medium text-foreground">Email</p><p className="text-sm">{CONTACT_EMAIL}</p></div>
                </a>
                <a href={'tel:' + CONTACT_PHONE_RAW} className="flex items-center gap-4 text-muted-foreground hover:text-secondary transition-colors">
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