import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/lib/data";
import { Link } from "react-router-dom";

const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-border"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-heading text-lg font-semibold text-foreground pr-4">{question}</span>
        <ChevronDown
          size={20}
          className={`text-muted-foreground flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-5" : "max-h-0"}`}>
        <p className="text-muted-foreground leading-relaxed">{answer}</p>
      </div>
    </motion.div>
  );
};

const FAQ = () => {
  return (
    <main className="pt-20">
      <section className="safari-section bg-primary text-center">
        <div className="safari-container">
          <p className="text-accent text-sm tracking-[0.2em] uppercase mb-2">Help Center</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground">Frequently Asked Questions</h1>
        </div>
      </section>

      <section className="safari-section bg-background">
        <div className="safari-container max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
          ))}

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Link
              to="/contact"
              className="inline-block bg-secondary text-secondary-foreground px-8 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQ;
