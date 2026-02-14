export const destinations = [
  {
    id: "masai-mara",
    name: "Masai Mara",
    tagline: "The World's Greatest Wildlife Spectacle",
    description: "Home to the Great Migration, Masai Mara offers unparalleled wildlife viewing with vast savannas teeming with lions, elephants, and over a million wildebeest.",
    bestTime: "July – October (Great Migration)",
    activities: ["Game Drives", "Hot Air Balloon Safari", "Maasai Village Visit", "Walking Safaris", "Photography"],
    highlights: ["Great Wildebeest Migration", "Big Five Sightings", "Maasai Culture", "Balloon Safaris"],
  },
  {
    id: "amboseli",
    name: "Amboseli",
    tagline: "In the Shadow of Kilimanjaro",
    description: "Famous for its large elephant herds and stunning views of Mount Kilimanjaro, Amboseli is one of Africa's most iconic safari destinations.",
    bestTime: "June – October (Dry Season)",
    activities: ["Elephant Watching", "Bird Watching", "Photography", "Cultural Visits", "Nature Walks"],
    highlights: ["Mt. Kilimanjaro Views", "Elephant Herds", "Observation Hill", "Swamp Wildlife"],
  },
  {
    id: "diani-beach",
    name: "Diani Beach",
    tagline: "Kenya's Tropical Paradise",
    description: "Award-winning white sand beaches along the Indian Ocean, perfect for combining beach relaxation with marine adventures.",
    bestTime: "December – March, July – October",
    activities: ["Snorkeling", "Scuba Diving", "Kite Surfing", "Dolphin Watching", "Deep Sea Fishing"],
    highlights: ["Crystal Clear Waters", "Marine Reserve", "Water Sports", "Coral Reefs"],
  },
  {
    id: "tsavo",
    name: "Tsavo",
    tagline: "The Theatre of the Wild",
    description: "Kenya's largest national park, split into East and West, known for its red elephants, volcanic landscapes, and raw wilderness.",
    bestTime: "June – October, January – February",
    activities: ["Game Drives", "Bird Watching", "Rock Climbing", "Lava Flow Exploration", "Camping"],
    highlights: ["Red Elephants", "Mzima Springs", "Shetani Lava Flow", "Mudanda Rock"],
  },
  {
    id: "lamu",
    name: "Lamu",
    tagline: "A Step Back in Time",
    description: "A UNESCO World Heritage site, Lamu is the oldest Swahili settlement in East Africa with ancient architecture, dhow boats, and rich cultural heritage.",
    bestTime: "July – October, December – March",
    activities: ["Dhow Sailing", "Historical Walking Tour", "Donkey Rides", "Snorkeling", "Swahili Cooking Classes"],
    highlights: ["UNESCO Old Town", "Dhow Festivals", "Swahili Culture", "Pristine Beaches"],
  },
];

export const packages = [
  {
    id: "3-day-masai-mara",
    title: "3-Day Masai Mara Safari",
    duration: "3 Days / 2 Nights",
    price: 850,
    image: "masai-mara",
    highlights: ["Game drives in Masai Mara", "Big Five sightings", "Maasai village visit", "Sunrise safari"],
    description: "An unforgettable short safari perfect for those with limited time. Experience the magic of Africa's most famous game reserve.",
    itinerary: [
      { day: 1, title: "Nairobi to Masai Mara", details: "Early morning departure from Nairobi. Scenic drive through the Great Rift Valley. Afternoon game drive." },
      { day: 2, title: "Full Day Game Drive", details: "Full day exploring the Mara. Visit the Mara River, search for the Big Five, and enjoy a bush lunch." },
      { day: 3, title: "Sunrise Safari & Return", details: "Early morning game drive, Maasai village visit, then return to Nairobi." },
    ],
    inclusions: ["Transport in 4x4 safari vehicle", "Park entry fees", "Full board accommodation", "Professional guide", "Bottled water"],
    exclusions: ["International flights", "Travel insurance", "Tips & gratuities", "Personal expenses", "Balloon safari (optional)"],
    accommodation: "Mid-range safari lodge or tented camp",
  },
  {
    id: "5-day-luxury-safari",
    title: "5-Day Luxury Safari",
    duration: "5 Days / 4 Nights",
    price: 2200,
    image: "luxury",
    highlights: ["Luxury lodge accommodation", "Private game drives", "Hot air balloon safari", "Bush dining experience"],
    description: "The ultimate luxury safari combining Amboseli and Masai Mara for an exclusive Big Five experience with premium accommodation.",
    itinerary: [
      { day: 1, title: "Arrival in Amboseli", details: "Fly to Amboseli. Settle into your luxury lodge with Kilimanjaro views. Evening sundowner." },
      { day: 2, title: "Amboseli Exploration", details: "Full day game drives. Elephant herds, flamingos, and panoramic mountain views." },
      { day: 3, title: "Transfer to Masai Mara", details: "Scenic flight to the Mara. Afternoon game drive with private guide." },
      { day: 4, title: "Masai Mara Safari", details: "Hot air balloon safari at dawn. Full day private game drive. Bush dinner under the stars." },
      { day: 5, title: "Departure", details: "Final morning game drive. Fly back to Nairobi." },
    ],
    inclusions: ["Domestic flights", "Luxury lodge accommodation", "All meals & premium drinks", "Private safari vehicle & guide", "Hot air balloon safari", "Park fees"],
    exclusions: ["International flights", "Travel insurance", "Visa fees", "Tips & gratuities"],
    accommodation: "5-star luxury safari lodges",
  },
  {
    id: "7-day-buffalo-plains",
    title: "7-Day Buffalo Plains Explorer",
    duration: "7 Days / 6 Nights",
    price: 3500,
    image: "explorer",
    highlights: ["Three national parks", "Big Five guaranteed", "Cultural immersion", "Beach relaxation", "Scenic flights"],
    description: "The complete Kenya experience combining bush and beach. From the savannas of Masai Mara to the turquoise waters of Diani Beach.",
    itinerary: [
      { day: 1, title: "Nairobi Arrival", details: "Airport pickup. Visit Giraffe Centre and Karen Blixen Museum. Welcome dinner." },
      { day: 2, title: "Amboseli National Park", details: "Drive to Amboseli. Afternoon game drive with Kilimanjaro backdrop." },
      { day: 3, title: "Masai Mara Transfer", details: "Fly to Masai Mara. Afternoon game drive. Evening Maasai cultural experience." },
      { day: 4, title: "Full Day in the Mara", details: "Dawn game drive. Visit Mara River. Search for leopards and cheetahs." },
      { day: 5, title: "Fly to Diani Beach", details: "Morning game drive, then fly to Diani Beach. Relax at beachfront resort." },
      { day: 6, title: "Diani Beach", details: "Snorkeling in marine reserve, dolphin watching, or simply relax on pristine beaches." },
      { day: 7, title: "Departure", details: "Leisurely morning. Transfer to Mombasa airport for departure." },
    ],
    inclusions: ["All domestic flights", "4x4 safari vehicle", "Beachfront resort", "All meals", "Park fees", "Snorkeling trip", "Airport transfers"],
    exclusions: ["International flights", "Travel insurance", "Alcoholic beverages", "Tips & gratuities"],
    accommodation: "Luxury lodges & beachfront resort",
  },
];

export const testimonials = [
  {
    name: "Sarah & James Mitchell",
    location: "London, UK",
    text: "Our 7-day Buffalo Plains trip was the most incredible experience of our lives. The wildlife was breathtaking, and our guide knew exactly where to find the Big Five. We'll be back!",
    rating: 5,
  },
  {
    name: "Hans Müller",
    location: "Berlin, Germany",
    text: "The luxury safari exceeded all expectations. Watching the sunrise from a hot air balloon over the Mara was something I'll never forget. Truly world-class service.",
    rating: 5,
  },
  {
    name: "Emily Chen",
    location: "Sydney, Australia",
    text: "Buffalo Plains Adventures made everything seamless — from the moment we landed to our last sunset on Diani Beach. The attention to detail and knowledge of the guides was remarkable.",
    rating: 5,
  },
  {
    name: "Michael & Lisa Roberts",
    location: "New York, USA",
    text: "We've been on safaris in South Africa and Tanzania, but Kenya was on another level. The Masai Mara migration was the most spectacular thing we've ever witnessed.",
    rating: 5,
  },
];

export const faqs = [
  {
    question: "What is the best time to visit Kenya for a safari?",
    answer: "The best time for safari in Kenya is during the dry seasons: July to October (Great Migration in Masai Mara) and January to February. However, Kenya offers year-round wildlife viewing.",
  },
  {
    question: "Do I need a visa to visit Kenya?",
    answer: "Most visitors need an eVisa which can be obtained online before travel. Citizens of some East African countries are exempt. We recommend applying at least 2 weeks before your trip.",
  },
  {
    question: "What vaccinations are required?",
    answer: "Yellow Fever vaccination is required if traveling from an endemic country. We recommend consulting your doctor about Hepatitis A & B, Typhoid, and anti-malaria medication.",
  },
  {
    question: "Is Kenya safe for tourists?",
    answer: "Kenya is generally safe for tourists, especially in wildlife reserves and coastal areas. We provide experienced guides and use well-established routes and accommodations.",
  },
  {
    question: "What should I pack for a safari?",
    answer: "Light, neutral-colored clothing, comfortable walking shoes, sunscreen, insect repellent, binoculars, camera with zoom lens, hat, and a warm layer for early morning game drives.",
  },
  {
    question: "Can I customize a tour package?",
    answer: "Absolutely! All our packages can be customized to suit your preferences, budget, and time frame. Contact us to design your perfect Kenya adventure.",
  },
  {
    question: "What is included in your tour prices?",
    answer: "Our prices typically include accommodation, meals, transport, park fees, and professional guides. Each package page lists specific inclusions and exclusions.",
  },
  {
    question: "How do I book a tour?",
    answer: "You can book through our contact form, WhatsApp, or email. We'll confirm availability, discuss any customizations, and send you a detailed itinerary and payment instructions.",
  },
];
