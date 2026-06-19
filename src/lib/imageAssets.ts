// Centralised image asset imports — import from here instead of directly in components

import heroMasaiMara from "@/assets/hero-masai-mara.jpg";
import heroMasaiMaraWebp from "@/assets/hero-masai-mara.webp";
import masaiMaraDest from "@/assets/masai-mara-dest.jpg";
import masaiMaraDestWebp from "@/assets/masai-mara-dest.webp";
import amboseli from "@/assets/amboseli.jpg";
import amboseliWebp from "@/assets/amboseli.webp";
import dianiBeach from "@/assets/diani-beach.jpg";
import dianiBeachWebp from "@/assets/diani-beach.webp";
import tsavo from "@/assets/tsavo.jpg";
import tsavoWebp from "@/assets/tsavo.webp";
import lamu from "@/assets/lamu.jpg";
import lamuWebp from "@/assets/lamu.webp";
import lamuMarket from "@/assets/lamu-market.jpg";
import lamuMarketWebp from "@/assets/lamu-market.webp";
import nairobi from "@/assets/nairobi.jpg";
import nairobiWebp from "@/assets/nairobi.webp";
import lakeNakuru from "@/assets/lake-nakuru.jpeg";
import lakeNakuruWebp from "@/assets/lake-nakuru.webp";
import samburu from "@/assets/samburu.jpg";
import samburuWebp from "@/assets/samburu.webp";
import meru from "@/assets/meru.jpg";
import meruWebp from "@/assets/meru.webp";
import luxurySafari from "@/assets/luxury-safari.jpg";
import luxurySafariWebp from "@/assets/luxury-safari.webp";
import safariSunset from "@/assets/safari-sunset.jpg";
import safariSunsetWebp from "@/assets/safari-sunset.webp";
import karenBlixen from "@/assets/karen-blixen.jpg";
import karenBlixenWebp from "@/assets/karen-blixen.webp";
import maasaiVillage from "@/assets/maasai-village.jpg";
import maasaiVillageWebp from "@/assets/maasai-village.webp";
import maasaiBeading from "@/assets/maasai-beading.jpg";
import maasaiBeadingWebp from "@/assets/maasai-beading.webp";
import maasaiWarriors from "@/assets/maasai-warriors.jpg";
import maasaiWarriorsWebp from "@/assets/maasai-warriors.webp";
import swahiliCooking from "@/assets/swahili-cooking.jpg";
import swahiliCookingWebp from "@/assets/swahili-cooking.webp";
import giraffeManor from "@/assets/giraffe-manor.jpg";
import giraffeManorWebp from "@/assets/giraffe-manor.webp";

export type ImagePair = { jpg: string; webp: string };

const img = (jpg: string, webp: string): ImagePair => ({ jpg, webp });

export const images = {
  heroMasaiMara:   img(heroMasaiMara,   heroMasaiMaraWebp),
  masaiMaraDest:   img(masaiMaraDest,   masaiMaraDestWebp),
  amboseli:        img(amboseli,        amboseliWebp),
  dianiBeach:      img(dianiBeach,      dianiBeachWebp),
  tsavo:           img(tsavo,           tsavoWebp),
  lamu:            img(lamu,            lamuWebp),
  lamuMarket:      img(lamuMarket,      lamuMarketWebp),
  nairobi:         img(nairobi,         nairobiWebp),
  lakeNakuru:      img(lakeNakuru,      lakeNakuruWebp),
  samburu:         img(samburu,         samburuWebp),
  meru:            img(meru,            meruWebp),
  luxurySafari:    img(luxurySafari,    luxurySafariWebp),
  safariSunset:    img(safariSunset,    safariSunsetWebp),
  karenBlixen:     img(karenBlixen,     karenBlixenWebp),
  maasaiVillage:   img(maasaiVillage,   maasaiVillageWebp),
  maasaiBeading:   img(maasaiBeading,   maasaiBeadingWebp),
  maasaiWarriors:  img(maasaiWarriors,  maasaiWarriorsWebp),
  swahiliCooking:  img(swahiliCooking,  swahiliCookingWebp),
  giraffeManor:    img(giraffeManor,    giraffeManorWebp),
} as const;

// Keyed maps for destination/package lookups
export const destinationImages: Record<string, ImagePair> = {
  "masai-mara": images.masaiMaraDest,
  amboseli:     images.amboseli,
  "diani-beach":images.dianiBeach,
  tsavo:        images.tsavo,
  lamu:         images.lamu,
  nairobi:      images.nairobi,
  nakuru:       images.lakeNakuru,
  samburu:      images.samburu,
  meru:         images.meru,
};

export const packageImages: Record<string, ImagePair> = {
  "masai-mara": images.masaiMaraDest,
  luxury:       images.luxurySafari,
  explorer:     images.safariSunset,
};
