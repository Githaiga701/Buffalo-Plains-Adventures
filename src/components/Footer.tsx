import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="safari-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-2xl font-bold mb-4">Kenya Explorer</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Premium tours & safaris showcasing the best of Kenya's wildlife, beaches, and cultural heritage.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Explore</h4>
            <div className="flex flex-col gap-2">
              {[
                { name: "Destinations", path: "/destinations" },
                { name: "Tour Packages", path: "/packages" },
                { name: "Gallery", path: "/gallery" },
                { name: "About Us", path: "/about" },
                { name: "FAQ", path: "/faq" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Top Destinations</h4>
            <div className="flex flex-col gap-2">
              {["Masai Mara", "Amboseli", "Diani Beach", "Tsavo", "Lamu"].map((dest) => (
                <Link
                  key={dest}
                  to="/destinations"
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  {dest}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <a href="mailto:info@kenyaexplorer.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail size={16} />
                info@kenyaexplorer.com
              </a>
              <a href="tel:+254700000000" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone size={16} />
                +254 700 000 000
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={16} />
                Nairobi, Kenya
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} Kenya Explorer. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
