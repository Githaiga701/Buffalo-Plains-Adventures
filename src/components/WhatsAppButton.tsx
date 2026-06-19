import { MessageCircle } from "lucide-react";
import { WHATSAPP_DEFAULT_MSG } from "@/lib/constants";

const WhatsAppButton = () => (
  <a
    href={WHATSAPP_DEFAULT_MSG}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={28} />
  </a>
);

export default WhatsAppButton;
