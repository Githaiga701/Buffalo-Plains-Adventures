export const destinations = [
  {
    id: "masai-mara",
    name: "Masai Mara",
    tagline: "The World's Greatest Wildlife Spectacle",
    description: "Home to the Great Migration, Masai Mara offers unparalleled wildlife viewing with vast savannas teeming with lions, elephants, and over a million wildebeest.",
    bestTime: "July – October (Great Migration)",
    activities: ["Game Drives", "Hot Air Balloon Safari", "Maasai Village Visit", "Walking Safaris", "Photography"],
    highlights: ["Great Wildebeest Migration", "Big Five Sightings", "Maasai Culture", "Balloon Safaris"],
    hotels: [
      { name: "Mara Serena Safari Lodge", type: "Luxury", priceRange: "$$" },
      { name: "Keekorok Lodge", type: "Mid-Range", priceRange: "$" },
      { name: "Mara Adventure Camp", type: "Budget", priceRange: "$" },
      { name: "Bateleur Camp", type: "Ultra-Luxury", priceRange: "$$" }
    ]
  },
  {
    id: "amboseli",
    name: "Amboseli",
    tagline: "In the Shadow of Kilimanjaro",
    description: "Famous for its large elephant herds and stunning views of Mount Kilimanjaro, Amboseli is one of Africa's most iconic safari destinations.",
    bestTime: "June – October (Dry Season)",
    activities: ["Elephant Watching", "Bird Watching", "Photography", "Cultural Visits", "Nature Walks"],
    highlights: ["Mt. Kilimanjaro Views", "Elephant Herds", "Observation Hill", "Swamp Wildlife"],
    hotels: [
      { name: "Ol Tukai Lodge", type: "Luxury", priceRange: "$$" },
      { name: "Amboseli Serena Safari Lodge", type: "Mid-Range", priceRange: "$" },
      { name: "Kibo Safari Camp", type: "Budget", priceRange: "$" },
      { name: "Tortilis Camp", type: "Ultra-Luxury", priceRange: "$$" }
    ]
  },
  {
    id: "diani-beach",
    name: "Diani Beach",
    tagline: "Kenya's Tropical Paradise",
    description: "Award-winning white sand beaches along the Indian Ocean, perfect for combining beach relaxation with marine adventures.",
    bestTime: "December – March, July – October",
    activities: ["Snorkeling", "Scuba Diving", "Kite Surfing", "Dolphin Watching", "Deep Sea Fishing"],
    highlights: ["Crystal Clear Waters", "Marine Reserve", "Water Sports", "Coral Reefs"],
    hotels: [
      { name: "FourForty Beach Hotel", type: "Luxury", priceRange: "$$" },
      { name: "Southern Palms Beach Resort", type: "Mid-Range", priceRange: "$" },
      { name: "Diani Sea Resort", type: "Budget", priceRange: "$" },
      { name: "The Sands at Nomad", type: "Ultra-Luxury", priceRange: "$$" }
    ]
  },
  {
    id: "tsavo",
    name: "Tsavo",
    tagline: "The Theatre of the Wild",
    description: "Kenya's largest national park, split into East and West, known for its red elephants, volcanic landscapes, and raw wilderness.",
    bestTime: "June – October, January – February",
    activities: ["Game Drives", "Bird Watching", "Rock Climbing", "Lava Flow Exploration", "Camping"],
    highlights: ["Red Elephants", "Mzima Springs", "Shetani Lava Flow", "Mudanda Rock"],
    hotels: [
      { name: "Voyager Ziwani Camp", type: "Luxury", priceRange: "$$" },
      { name: "Tsavo West Lodge", type: "Mid-Range", priceRange: "$" },
      { name: "Largest Wildlife Camp", type: "Budget", priceRange: "$" },
      { name: "Kigio Wildlife Camp", type: "Eco-Lodge", priceRange: "$" }
    ]
  },
  {
    id: "lamu",
    name: "Lamu",
    tagline: "A Step Back in Time",
    description: "A UNESCO World Heritage site, Lamu is the oldest Swahili settlement in East Africa with ancient architecture, dhow boats, and rich cultural heritage.",
    bestTime: "July – October, December – March",
    activities: ["Dhow Sailing", "Historical Walking Tour", "Donkey Rides", "Snorkeling", "Swahili Cooking Classes"],
    highlights: ["UNESCO Old Town", "Dhow Festivals", "Swahili Culture", "Pristine Beaches"],
    hotels: [
      { name: "Peponi Hotel", type: "Luxury", priceRange: "$$" },
      { name: "Kizingo Beach Lodge", type: "Mid-Range", priceRange: "$" },
      { name: "Lamu House", type: "Boutique", priceRange: "$" },
      { name: "Manda Bay Island Resort", type: "Ultra-Luxury", priceRange: "$$" }
    ]
  },
  {
    id: "nairobi",
    name: "Nairobi",
    tagline: "The Green City in the Sun",
    description: "Kenya's vibrant capital offers a unique blend of urban attractions and wildlife experiences, from elephant sanctuaries to cultural museums.",
    bestTime: "Year Round",
    activities: ["Giraffe Centre", "Karen Blixen Museum", "Nairobi National Park", "Shopping", "Cultural Tours"],
    highlights: ["Nairobi National Park", "Giraffe Manor", "Kazuri Beads", "Carnivore Restaurant", "Sheldrick Elephant Orphanage"],
    hotels: [
      { name: "Giraffe Manor", type: "Ultra-Luxury", priceRange: "$$" },
      { name: "Nairobi Serena Hotel", type: "Luxury", priceRange: "$$" },
      { name: "Fairmont The Norfolk", type: "Luxury", priceRange: "$$" },
      { name: "Eka Hotel", type: "Mid-Range", priceRange: "$" }
    ]
  },
  {
    id: "nakuru",
    name: "Lake Nakuru",
    tagline: "The Pink Lake Phenomenon",
    description: "Famous for millions of flamingos creating a pink blanket on the lake, Nakuru also offers excellent rhino viewing and diverse birdlife.",
    bestTime: "June – October, January – February",
    activities: ["Game Drives", "Bird Watching", "Nature Walks", "Photography", "Cycling"],
    highlights: ["Flamingos", "Rhino Sanctuary", "Lake View", "Baboon Cliff", "Malkmari Falls"],
    hotels: [
      { name: "Lake Nakuru Lodge", type: "Mid-Range", priceRange: "$" },
      { name: "Flamingo Hill Camp", type: "Budget", priceRange: "$" },
      { name: "Sarova Lion Hill Lodge", type: "Luxury", priceRange: "$$" },
      { name: "Ziwa Bush Lodge", type: "Eco-Lodge", priceRange: "$" }
    ]
  },
  {
    id: "samburu",
    name: "Samburu",
    tagline: "Land of the Nomads",
    description: "Located in Kenya's remote northern region, Samburu offers unique wildlife species not found elsewhere and authentic cultural encounters with the Samburu people.",
    bestTime: "June – October, December – March",
    activities: ["Game Drives", "Cultural Visits", "River Walks", "Star Gazing", "Camel Trekking"],
    highlights: ["Grevy's Zebra", "Reticulated Giraffe", "Samburu Culture", "Ewaso Ng'iro River", "Unique Wildlife"],
    hotels: [
      { name: "Sasaab Camp", type: "Ultra-Luxury", priceRange: "$$" },
      { name: "Sarova Shaba Game Lodge", type: "Luxury", priceRange: "$$" },
      { name: " Samburu Lodge", type: "Mid-Range", priceRange: "$" },
      { name: "Camp Dudute", type: "Eco-Lodge", priceRange: "$" }
    ]
  },
  {
    id: "meru",
    name: "Meru",
    tagline: "Untouched Wilderness",
    description: "One of Kenya's most pristine and least-visited parks, Meru offers classic savanna landscapes, rivers, and the legendary Elsa's Kopje.",
    bestTime: "June – October, December – March",
    activities: ["Game Drives", "Walking Safaris", "Fishing", "Bird Watching", "Camping"],
    highlights: ["Elsa's Kopje", "Tana River", "Rhino Tracking", "Mogoggwato", "Wildlife Diversity"],
    hotels: [
      { name: "Elsa's Kopje", type: "Ultra-Luxury", priceRange: "$$" },
      { name: "Meru Mulika Lodge", type: "Mid-Range", priceRange: "$" },
      { name: "Rhino River Camp", type: "Eco-Lodge", priceRange: "$" },
      { name: "Ikanga Camp", type: "Budget", priceRange: "$" }
    ]
  }
];

export const packages = [
  {
    id: "3-day-masai-mara",
    title: "3-Day Masai Mara Safari",
    duration: "3 Days / 2 Nights",
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

export const culturalExperiences = [
  {
    id: "maasai-village",
    name: "Maasai Village Visit",
    description: "Immerse yourself in the traditional Maasai culture. Visit a traditional Maasai village (manyatta), learn about their customs, dances, and way of life.",
    location: "Masai Mara / Amboseli",
    duration: "Half Day",
    highlights: ["Traditional Dance Performance", "Beadwork Workshop", "Cattle Herding Experience", "Meet Local Warriors"]
  },
  {
    id: "maasai-beading",
    name: "Maasai Beadwork Experience",
    description: "Learn the ancient art of Maasai beadwork from local women. Create your own traditional jewelry while supporting local artisan communities.",
    location: "Masai Mara",
    duration: "2-3 Hours",
    highlights: ["Beadwork Tutorial", "Traditional Designs", "Take Home Your Creation", "Support Local Women"]
  },
  {
    id: "swahili-cooking",
    name: "Swahili Cooking Class",
    description: "Discover the rich flavors of Swahili cuisine in Lamu. Visit the local market and learn to cook traditional dishes with fresh ingredients.",
    location: "Lamu",
    duration: "Half Day",
    highlights: ["Market Tour", "Traditional Recipes", "Coconut Curry", "Swahili Tea Ceremony"]
  },
  {
    id: "samburu-culture",
    name: "Samburu Cultural Experience",
    description: "Visit a traditional Samburu village and learn about their unique semi-nomadic lifestyle, warrior traditions, and colorful beadwork.",
    location: "Samburu",
    duration: "Half Day",
    highlights: ["Warrior Dances", "Cattle Herding", "Traditional Songs", "Beadwork Demonstration"]
  },
  {
    id: "karen-blixen",
    name: "Karen Blixen Museum",
    description: "Step back in time at the historic Karen Blixen Museum, the former home of the famous Danish author of 'Out of Africa'.",
    location: "Nairobi",
    duration: "2-3 Hours",
    highlights: ["Colonial History", "Coffee Plantation", "Historic Architecture", "Scenic Gardens"]
  },
  {
    id: "giraffe-centre",
    name: "Giraffe Centre Experience",
    description: "Get up close and personal with endangered Rothschild giraffes at the Nairobi Giraffe Centre. Feed and learn about conservation efforts.",
    location: "Nairobi",
    duration: "2 Hours",
    highlights: ["Feed Giraffes", "Conservation Education", "Nature Walk", "Bird Watching"]
  }
];

export const beaches = [
  {
    id: "diani-beach",
    name: "Diani Beach",
    tagline: "Kenya's Premier Beach Resort",
    description: "Award-winning 25km stretch of white sandy beach with crystal clear waters, world-class resorts, and vibrant nightlife.",
    bestTime: "December – March, July – October",
    activities: ["Snorkeling", "Scuba Diving", "Kite Surfing", "Dolphin Watching", "Deep Sea Fishing"],
    highlights: ["White Sand Beach", "Marine Reserve", "Water Sports", "Coral Reefs", "Nightlife"],
    hotels: [
      { name: "FourForty Beach Hotel", type: "Luxury", priceRange: "$$" },
      { name: "Southern Palms Beach Resort", type: "Mid-Range", priceRange: "$" },
      { name: "Diani Sea Resort", type: "Budget", priceRange: "$" },
      { name: "The Sands at Nomad", type: "Ultra-Luxury", priceRange: "$$" }
    ]
  },
  {
    id: "watamu",
    name: "Watamu",
    tagline: "Marine Paradise",
    description: "A hidden gem on the Kenyan coast known for its coral reefs, marine turtles, and the famous Watamu Marine National Park.",
    bestTime: "October – April",
    activities: ["Snorkeling", "Scuba Diving", "Turtle Watching", "Kite Surfing", "Dhow Safaris"],
    highlights: ["Marine Park", "Sea Turtles", "Coral Gardens", "Kite Surfing", "Boat Trips"],
    hotels: [
      { name: "Hemingways Watamu", type: "Luxury", priceRange: "$$" },
      { name: "Watamu Beach Resort", type: "Mid-Range", priceRange: "$" },
      { name: "Turtle Bay Beach Club", type: "All-Inclusive", priceRange: "$" },
      { name: "Kite Paradise Beach", type: "Budget", priceRange: "$" }
    ]
  },
  {
    id: "malindi",
    name: "Malindi",
    tagline: "Historic Coastal Town",
    description: "A historic trading port with beautiful beaches, Italian influence, and access to the famous Marafa Depression (Hell's Kitchen).",
    bestTime: "November – April",
    activities: ["Deep Sea Fishing", "Snorkeling", "Historical Tours", "Marafa Depression", "Island Trips"],
    highlights: ["Deep Sea Fishing", "Italian Architecture", "Marafa Depression", "Gateway Islands", "Cultural Heritage"],
    hotels: [
      { name: "Leonardo Royal Hotel", type: "Luxury", priceRange: "$$" },
      { name: "St. Thomasuites Beach Resort", type: "Mid-Range", priceRange: "$" },
      { name: "Malindi Bay Resort", type: "Budget", priceRange: "$" },
      { name: "Ocean Beach Resort", type: "Mid-Range", priceRange: "$" }
    ]
  },
  {
    id: "kilifi",
    name: "Kilifi",
    tagline: "The Tranquil Escape",
    description: "A peaceful retreat where the Kilifi Creek meets the Indian Ocean, perfect for those seeking relaxation and natural beauty.",
    bestTime: "October – May",
    activities: ["Boat Tours", "Swimming", "Sunset Cruises", "Cultural Tours", "Kayaking"],
    highlights: ["Kilifi Creek", "Mnarani Ruins", "Quiet Beaches", "Boat Tours", "Sunset Views"],
    hotels: [
      { name: "The Capital Club & Resort", type: "Luxury", priceRange: "$$" },
      { name: "Kilifi Bay Resort", type: "Mid-Range", priceRange: "$" },
      { name: "Coconut Beach Resort", type: "Budget", priceRange: "$" },
      { name: "Rima Rimu Eco Camp", type: "Eco-Lodge", priceRange: "$" }
    ]
  },
  {
    id: "mombasa",
    name: "Mombasa",
    tagline: "Kenya's Coastal Crown Jewel",
    description: "Kenya's second-largest city with a rich history, beautiful beaches, and a blend of cultures from around the world.",
    bestTime: "November – April",
    activities: ["Historical Tours", "Beach Activities", "Fort Jesus", "Elephant Orphanage", "Shopping"],
    highlights: ["Fort Jesus", "Old Town", "Beaches", "Mombasa Marine", "Cultural Heritage"],
    hotels: [
      { name: "Serena Beach Resort & Spa", type: "Luxury", priceRange: "$$" },
      { name: "PrideInn Azure Hotel", type: "Mid-Range", priceRange: "$" },
      { name: "Mombasa Beach Hotel", type: "Budget", priceRange: "$" },
      { name: "Travellers Beach Hotel", type: "All-Inclusive", priceRange: "$" }
    ]
  }
];

export const recommendedPlaces = [
  {
    id: "mount-kenya",
    name: "Mount Kenya",
    tagline: "The Great Summit",
    description: "Africa's second-highest peak offers trekking, climbing, and breathtaking alpine scenery. A paradise for adventure seekers and nature lovers.",
    category: "Adventure",
    bestTime: "December – March, June – September",
    highlights: ["Summit Climbing", "Alpine Flora", "Wildlife", "Trekking", "Scenic Views"],
    hotels: [
      { name: "Mount Kenya Safari Club", type: "Luxury", priceRange: "$$" },
      { name: "Naro Moru River Lodge", type: "Mid-Range", priceRange: "$" },
      { name: "Kirurumu Tented Lodge", type: "Eco-Lodge", priceRange: "$" },
      { name: "Bvumba Mount Kenya", type: "Budget", priceRange: "$" }
    ]
  },
  {
    id: "aberdare",
    name: "Aberdare National Park",
    tagline: "The Cloud Forest",
    description: "A unique high-altitude park with misty forests, waterfalls, and rare wildlife including black rhinos and African elephants.",
    category: "Wildlife",
    bestTime: "Year Round",
    highlights: ["Black Rhino", "Waterfall Walks", "Tree Hotels", "Bird Watching", "Night Drives"],
    hotels: [
      { name: "The Ark Lodge", type: "Luxury", priceRange: "$$" },
      { name: "Aberdare Country Club", type: "Mid-Range", priceRange: "$" },
      { name: "Treetops Hotel", type: "Historic", priceRange: "$" },
      { name: "Kiburu Lodge", type: "Budget", priceRange: "$" }
    ]
  },
  {
    id: "naivasha",
    name: "Lake Naivasha",
    tagline: "The Freshwater Lake",
    description: "A beautiful freshwater lake near Nairobi, perfect for day trips with hippos, boat rides, and Crescent Island for walking safaris.",
    category: "Nature",
    bestTime: "Year Round",
    highlights: ["Hippo Watching", "Boat Rides", "Crescent Island", "Bird Watching", "Horse Riding"],
    hotels: [
      { name: "Enashipai Resort & Spa", type: "Luxury", priceRange: "$$" },
      { name: "Lake Naivasha Sopa Resort", type: "Mid-Range", priceRange: "$" },
      { name: "Camp Carnelley", type: "Budget", priceRange: "$" },
      { name: "Lake Naivasha Crescent Island Camp", type: "Eco-Lodge", priceRange: "$" }
    ]
  },
  {
    id: "kakamega",
    name: "Kakamega Rainforest",
    tagline: "Tropical Paradise",
    description: "Kenya's last remaining tropical rainforest is a biodiversity hotspot with unique birds, butterflies, and primate species.",
    category: "Nature",
    bestTime: "November – April",
    highlights: ["Bird Watching", "Butterfly Gardens", "Primate Tracking", "Nature Walks", "Canoeing"],
    hotels: [
      { name: "Rondo Retreat", type: "Luxury", priceRange: "$$" },
      { name: "Kakamega Golf Hotel", type: "Mid-Range", priceRange: "$" },
      { name: "Litsakala Guest House", type: "Budget", priceRange: "$" },
      { name: "Coconut Beach Resort", type: "Budget", priceRange: "$" }
    ]
  }
];

export const maasailand = [
  {
    id: "masai-mara-main",
    name: "Masai Mara Main Reserve",
    tagline: "The Ultimate Safari",
    description: "World-famous for the Great Migration and exceptional Big Five sightings. The most iconic safari destination in Africa.",
    bestTime: "July – October (Migration)",
    activities: ["Game Drives", "Hot Air Balloon", "Bush Walks", "Maasai Visits"],
    highlights: ["Great Migration", "Big Five", "Balloon Safari", "Mara River"],
    hotels: [
      { name: "Mara Serena Safari Lodge", type: "Luxury", priceRange: "$$" },
      { name: "Keekorok Lodge", type: "Mid-Range", priceRange: "$" },
      { name: "Mara Adventure Camp", type: "Budget", priceRange: "$" },
      { name: "Bateleur Camp", type: "Ultra-Luxury", priceRange: "$$" }
    ]
  },
  {
    id: "mara-north",
    name: "Mara North Conservancy",
    tagline: "Exclusive Safari",
    description: "A private conservancy offering exclusive game drives, walking safaris, and fewer crowds with premium lodges.",
    bestTime: "Year Round",
    activities: ["Private Game Drives", "Walking Safaris", "Night Drives"],
    highlights: ["Exclusive Access", "Lion Sightings", "Luxury Camps"],
    hotels: [
      { name: "Mara Plains Camp", type: "Ultra-Luxury", priceRange: "$$" },
      { name: "Kichwa Mara Camp", type: "Luxury", priceRange: "$$" },
      { name: "Karen Lucas Camp", type: "Mid-Range", priceRange: "$" },
      { name: "Mara Rest Camp", type: "Budget", priceRange: "$" }
    ]
  },
  {
    id: "mara-east",
    name: "Mara East Conservancy",
    tagline: "Wilderness Sanctuary",
    description: "A pristine wilderness area with excellent wildlife viewing and authentic Maasai cultural experiences.",
    bestTime: "June – October",
    activities: ["Game Drives", "Cultural Visits", "Bush Breakfast"],
    highlights: ["Wilderness", "Big Cats", "Maasai Culture"],
    hotels: [
      { name: "Governors' Il Moran", type: "Luxury", priceRange: "$$" },
      { name: "Mara Expedition Camp", type: "Luxury", priceRange: "$$" },
      { name: "Kuria Hills Lodge", type: "Mid-Range", priceRange: "$" }
    ]
  },
  {
    id: "ollenkuit",
    name: "Ol Pejeta Conservancy",
    tagline: "Rhino Sanctuary",
    description: "Home to the largest black rhino sanctuary in East Africa and the last two northern white rhinos on Earth.",
    bestTime: "Year Round",
    activities: ["Game Drives", "Rhino Tracking", "Chimp Sanctuary"],
    highlights: ["Black Rhinos", "Northern White Rhinos", "Chimpanzees"],
    hotels: [
      { name: "Sweetwaters Serena Camp", type: "Luxury", priceRange: "$$" },
      { name: "Ol Pejeta Bush Camp", type: "Eco-Lodge", priceRange: "$" },
      { name: "Eco-Bushtops Camp", type: "Ultra-Luxury", priceRange: "$" }
    ]
  }
];

export const resorts = [
  {
    id: "giraffe-manor",
    name: "Giraffe Manor",
    location: "Nairobi",
    type: "Luxury Boutique",
    description: "The famous boutique hotel where endangered Rothschild giraffes stick their heads through the windows during breakfast.",
    priceRange: "$$",
    rating: 4.9,
    highlights: ["Giraffe Feeding", "Scenic Gardens", "Luxury Suites", "Close to City"],
    amenities: ["Free WiFi", "Restaurant", "Spa", "Airport Transfer"]
  },
  {
    id: "mara-serena",
    name: "Mara Serena Safari Lodge",
    location: "Masai Mara",
    type: "Luxury Lodge",
    description: "Stunning lodge perched on a hill overlooking the Mara River, offering breathtaking views of the savanna.",
    priceRange: "$$",
    rating: 4.8,
    highlights: ["River Views", "Game Drives", "Pool", "Bush Dinners"],
    amenities: ["Restaurant", "Bar", "Pool", "Gift Shop"]
  },
  {
    id: "ol-tukai",
    name: "Ol Tukai Lodge Amboseli",
    location: "Amboseli",
    type: "Luxury Lodge",
    description: "Award-winning lodge with direct views of Mount Kilimanjaro and access to elephant herds.",
    priceRange: "$$",
    rating: 4.7,
    highlights: ["Kilimanjaro Views", "Elephant Herds", "Bird Watching", "Cultural Visits"],
    amenities: ["Restaurant", "Bar", "Pool", "Conference Facility"]
  },
  {
    id: "hemingways-watamu",
    name: "Hemingways Watamu",
    location: "Watamu",
    type: "Luxury Resort",
    description: "Exclusive beach resort offering world-class diving, fishing, and relaxation on the Kenyan coast.",
    priceRange: "$$",
    rating: 4.9,
    highlights: ["Private Beach", "Diving", "Deep Sea Fishing", "Spa"],
    amenities: ["Beach Access", "Restaurant", "Bar", "Water Sports"]
  },
  {
    id: "southern-palms",
    name: "Southern Palms Beach Resort",
    location: "Diani Beach",
    type: "Resort",
    description: "Popular all-inclusive resort on the famous Diani Beach with excellent facilities for families.",
    priceRange: "$",
    rating: 4.5,
    highlights: ["Beachfront", "Pool", "Water Sports", "Kids Club"],
    amenities: ["Restaurant", "Bar", "Pool", "Gym"]
  },
  {
    id: "fairmont-nairobi",
    name: "Fairmont The Norfolk",
    location: "Nairobi",
    type: "Luxury Hotel",
    description: "Historic luxury hotel in Nairobi's CBD offering fine dining and elegant accommodations since 1904.",
    priceRange: "$$",
    rating: 4.7,
    highlights: ["Historic Charm", "Fine Dining", "City Location", "Luxury Suites"],
    amenities: ["Restaurant", "Bar", "Gym", "Spa"]
  }
];

export const restaurants = [
  {
    id: "carnivore",
    name: "Carnivore Restaurant",
    location: "Nairobi",
    type: "Kenyan BBQ",
    description: "Famous open-air restaurant serving a variety of meat including crocodile, camel, and traditional Kenyan BBQ.",
    priceRange: "$",
    rating: 4.5,
    highlights: ["Cultural Show", "Variety Meats", "Open Air", "Safari Theme"]
  },
  {
    id: "talisman",
    name: "Talisman Restaurant",
    location: "Nairobi",
    type: "Fusion",
    description: "Award-winning restaurant offering creative fusion cuisine in a beautiful garden setting.",
    priceRange: "$$",
    rating: 4.8,
    highlights: ["Garden Setting", "Fusion Cuisine", "Fine Dining", "Wine List"]
  },
  {
    id: "mombasa-gres",
    name: "Mombasa Grill",
    location: "Mombasa",
    type: "Seafood",
    description: "Premium seafood restaurant on the coast serving fresh catches and Swahili-inspired dishes.",
    priceRange: "$$",
    rating: 4.7,
    highlights: ["Fresh Seafood", "Ocean Views", "Swahili Cuisine", "Romantic Setting"]
  },
  {
    id: "diani-chand",
    name: "The Chandila",
    location: "Diani Beach",
    type: "Indian",
    description: "Popular Indian restaurant in Diani offering authentic North and South Indian cuisine.",
    priceRange: "$",
    rating: 4.6,
    highlights: ["Authentic Indian", "Beach Location", "Curry Specialties", "Vegetarian Options"]
  },
  {
    id: "nairobi-italian",
    name: "Mama Rock",
    location: "Nairobi",
    type: "Italian",
    description: "Trendy Italian restaurant known for its wood-fired pizzas and homemade pasta.",
    priceRange: "$",
    rating: 4.5,
    highlights: ["Wood-Fired Pizza", "Homemade Pasta", "Trendy Vibe", "Outdoor Seating"]
  },
  {
    id: "mara-bush",
    name: "Mara River Bush Dinner",
    location: "Masai Mara",
    type: "Bush Dining",
    description: "Romantic bush dinner experience in the heart of the Mara with traditional Maasai entertainment.",
    priceRange: "$$",
    rating: 4.9,
    highlights: ["Bush Setting", " Maasai Dance", "Romantic", "Safari Experience"]
  }
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
