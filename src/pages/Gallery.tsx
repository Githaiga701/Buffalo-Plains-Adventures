import { motion } from "framer-motion";
import masaiMara from "@/assets/hero-masai-mara.jpg";
import masaiMaraWebp from "@/assets/hero-masai-mara.webp";
import amboseli from "@/assets/amboseli.jpg";
import amboseliWebp from "@/assets/amboseli.webp";
import dianiBeach from "@/assets/diani-beach.jpg";
import dianiBeachWebp from "@/assets/diani-beach.webp";
import tsavo from "@/assets/tsavo.jpg";
import tsavoWebp from "@/assets/tsavo.webp";
import lamu from "@/assets/lamu.jpg";
import lamuWebp from "@/assets/lamu.webp";
import luxurySafari from "@/assets/luxury-safari.jpg";
import luxurySafariWebp from "@/assets/luxury-safari.webp";
import safariSunset from "@/assets/safari-sunset.jpg";
import safariSunsetWebp from "@/assets/safari-sunset.webp";
import masaiMaraDest from "@/assets/masai-mara-dest.jpg";
import masaiMaraDestWebp from "@/assets/masai-mara-dest.webp";

const galleryImages = [
  { src: masaiMara, webp: masaiMaraWebp, alt: "Wildebeest Migration in Masai Mara", caption: "The Great Migration" },
  { src: amboseli, webp: amboseliWebp, alt: "Elephants at Amboseli", caption: "Amboseli Elephants" },
  { src: dianiBeach, webp: dianiBeachWebp, alt: "Diani Beach Kenya", caption: "Diani Beach" },
  { src: tsavo, webp: tsavoWebp, alt: "Lions in Tsavo", caption: "Tsavo Lions" },
  { src: lamu, webp: lamuWebp, alt: "Lamu Old Town", caption: "Lamu Heritage" },
  { src: luxurySafari, webp: luxurySafariWebp, alt: "Luxury Safari Lodge", caption: "Luxury Lodges" },
  { src: safariSunset, webp: safariSunsetWebp, alt: "Safari Sunset", caption: "African Sunset" },
  { src: masaiMaraDest, webp: masaiMaraDestWebp, alt: "Masai Mara Sunset", caption: "Masai Mara" },
];

const Gallery = () => {
  return (
    <main className="pt-20">
      <section className="safari-section bg-primary text-center">
        <div className="safari-container">
          <p className="text-accent text-sm tracking-[0.2em] uppercase mb-2">Visual Stories</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground">Gallery</h1>
          <p className="text-primary-foreground/70 text-lg mt-4 max-w-2xl mx-auto">
            Capturing the magic of Kenya through our lens
          </p>
        </div>
      </section>

      <section className="safari-section bg-background">
        <div className="safari-container columns-1 sm:columns-2 lg:columns-3 gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative group mb-4 break-inside-avoid rounded-lg overflow-hidden"
            >
              <picture>
                <source type="image/webp" srcSet={img.webp} />
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300 flex items-end">
                <p className="text-primary-foreground font-heading text-lg font-semibold p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Gallery;
