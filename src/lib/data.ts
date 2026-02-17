export const destinations = [
  {
    id: "masai-mara",
    name: "Masai Mara",
    tagline: "The World's Greatest Wildlife Spectacle",
    description: "Witness one of nature's most spectacular phenomena at the Masai Mara National Reserve, home to the legendary Great Migration. This 1,510 square kilometer reserve encompasses vast golden savannas, rolling hills, and the serpentine Mara River that witnesses the dramatic crossing of over 1.5 million wildebeest, zebras, and gazelles. Beyond the migration, experience unparalleled wildlife viewing opportunities with abundant populations of lions, leopards, African elephants, and the magnificent Big Five. Expert guides navigate you through pristine wilderness where every game drive unveils extraordinary encounters with Africa's most iconic predators and herbivores, while the sunsets paint the savanna in breathtaking hues of amber and gold. Between game drives, enjoy intimate cultural exchanges with Maasai communities and options for early-morning balloon flights that deliver panoramic photographic vistas — perfect for travelers seeking powerful wildlife moments combined with meaningful local connections.",
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
    description: "Located at the foot of the majestic Mount Kilimanjaro, Amboseli National Park is a realm of raw, untamed African beauty. This 392 square kilometer park is renowned for its exceptional concentrations of African elephants—often referred to as the largest in the world—gracefully wandering across dusty plains with Kilimanjaro's snow-capped peak providing an awe-inspiring backdrop. The park's ecosystems range from dry lakebeds and swamps to acacia woodlands, creating ideal habitats for wildlife thriving in this semi-arid landscape. Visit observation points like Observation Hill for panoramic views, explore the Amboseli ecosystem where diverse birdlife thrives, and experience authentic cultural interactions with the Maasai people who have coexisted with this wilderness for generations. Ambiance here is defined by dramatic light at dawn and dusk that attracts photographers and nature-lovers alike; guided experiences blend wildlife viewing with short walks, birding, and community-led cultural visits that deepen appreciation for local conservation efforts.",
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
    description: "Experience the epitome of tropical coastal paradise at Diani Beach, a 25-kilometer stretch of pristine white sand blessed with turquoise waters and a year-round tropical climate. This award-winning destination is renowned as East Africa's premier beach resort, where coral reefs teeming with colorful marine life lie just offshore. Beyond the powder-soft sand and crystal-clear waters, Diani offers an exhilarating array of water sports including world-class snorkeling and scuba diving, thrilling kite surfing, unforgettable dolphin watching expeditions, and deep-sea fishing adventures. The beachfront promenade vibrates with cosmopolitan energy, featuring upscale resorts, boutique hotels, fine dining establishments, and vibrant nightlife. Palm-fringed beaches meet lush tropical vegetation, creating a sensory paradise where relaxation seamlessly blends with adventure and exploration. Conservation-minded activities such as reef-friendly snorkeling and community-run marine tours are increasingly available, allowing visitors to enjoy the coast while contributing to local stewardship of fragile marine habitats.",
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
    description: "Spanning 22,812 square kilometers, Tsavo National Park is Kenya's largest protected wilderness area, a vast theatre of primordial drama where nature reveals itself in its most authentic and powerful form. This colossal park is famously home to the legendary red elephants, whose distinctive coloring comes from wallowing in the park's rust-colored volcanic soil, creating a truly unforgettable sight. Tsavo's dramatic landscape encompasses the otherworldly Shetani Lava Flow with its black volcanic rock formations, the life-giving Mzima Springs where clear freshwater supports hippos and crocodiles, and Mudanda Rock with its commanding views of the surrounding plains. The park's sheer vastness offers unparalleled solitude and authentic wilderness experience, perfect for adventurous travelers seeking genuine encounters with Africa's iconic wildlife in their natural habitat, far from the crowds of more accessible reserves. Remote camp options, excellent night skies for stargazing, and rugged photographic opportunities make Tsavo a destination for travelers who prize wide-open spaces and genuine wildness over luxury crowds.",
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
    description: "Lamu is a living museum of Swahili culture and a UNESCO World Heritage site that transports visitors back centuries through its enchanting Old Town. As the oldest inhabited Swahili settlement in East Africa, this timeless island archipelago preserves authentic 15th-century architecture with narrow alleyways, intricately carved wooden doors, and atmospheric stonework buildings that speak of centuries-old trade routes and cultural exchanges. The iconic wooden dhow sailing vessels still glide across turquoise waters, their traditional methods unchanged for generations. Beyond its remarkable historical significance, Lamu captivates with pristine beach sanctuaries, vibrant cultural festivals including the legendary Lamu Cultural Festival, world-renowned Swahili cuisine featuring exotic spice combinations, and warm interactions with hospitable locals who proudly maintain traditional ways. Donkey-powered transport and the absence of modern vehicles create an otherworldly tranquility that makes Lamu an unparalleled destination for cultural immersion and authentic East African experiences. Sundowner dhow cruises, intimate guesthouses tucked into the Old Town, and hands-on craft workshops round out an immersive visit where history, sea, and culture intertwine.",
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
    description: "Kenya's vibrant capital city pulses with cosmopolitan energy while remaining genuinely connected to wildlife and natural heritage. Nairobi uniquely blends modern African urban sophistication with remarkable conservation initiatives and cultural attractions that few cities in the world can match. Visit the iconic Giraffe Manor where endangered Rothschild giraffes roam gardens and extend their impossibly long necks through windows during breakfast—an unforgettable intimate encounter with these gentle giants. The Karen Blixen Museum provides literary and historical immersion into the life of the renowned author of 'Out of Africa.' Experience the Sheldrick Elephant Orphanage, a world-leading rescue and rehabilitation center where orphaned baby elephants find solace and prepare for eventual release into the wild. Explore the Nairobi National Park where wildlife thrives against a dramatic backdrop of the city skyline—a poignant symbol of conservation amid urbanization. The city's world-class museums, vibrant arts scene, exceptional dining establishments, and energetic markets offer cultural richness that perfectly complements Kenya's safari experiences. From busy artisan markets and rooftop bars to conservation-focused day trips, Nairobi is a sophisticated hub where wilderness and urban life meet, appealing to travelers who want culture, cuisine, and conservation in one stay.",
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
    description: "Lake Nakuru is an extraordinary natural wonder where millions of flamingos create one of nature's most breathtaking and surreal visual spectacles—the entire lake surface appears to shimmer in shades of pink and coral, a heavenly vision born from the concentration of these elegant birds. This shallow, alkaline lake is framed by verdant forests and surrounded by a national park that protects one of East Africa's most important rhino sanctuaries, providing refuge for both black and white rhino species that have been desperately depleted in the wild. Beyond the iconic flamingos and majestic rhinos, Lake Nakuru hosts an astonishing diversity of over 450 bird species, making it a paradise for serious birders and nature photographers seeking to capture Africa's avian splendor. The park's landscape includes permanent water sources, rocky outcrops, papyrus swamps, and acacia woodlands creating a mosaic of ecosystems. Visitors experience dramatic changes throughout the seasons as water levels fluctuate, providing varying wildlife viewing opportunities and transforming the lake's appearance in captivating ways throughout the year. Conservation-focused walking trails, rhino monitoring programs, and scenic viewpoints like Baboon Cliff add depth to visits, while nearby conservation centers highlight efforts to protect the park's fragile wildlife populations.",
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
    description: "Samburu National Reserve is an authentic frontier of African wilderness where ancient semi-nomadic traditions persist unchanged and wildlife species found nowhere else on Earth roam across dramatic semi-arid landscapes. Nestled in Kenya's remote northern territory, this rugged reserve along the Ewaso Ng'iro River showcases a remarkable array of endemic wildlife including the zebra-striped Grevy's zebra with its narrower stripes, the impossibly-patterned reticulated giraffe, and the gerenuk—an extraordinary long-necked antelope that stands upright on hind legs to browse acacia trees. The Samburu people, proud semi-nomadic pastoralists with distinctive red-checkered warrior attire and intricate beadwork, inhabit this region and offer compelling cultural experiences where visitors learn traditional pastoralist lifestyles, understand cattle's central importance to their heritage, witness warrior ceremonies, and purchase authentic beadwork directly from talented artisans. The landscape's rugged beauty—dramatic escarpments, boulder-strewn terrain, and life-giving river ribbons through arid country—creates stunning photography opportunities while the remote location ensures fewer tourists and a genuine wilderness experience. Guided visits focus on respectful cultural exchange and wildlife observation, and remote camps provide immersive nights beneath startlingly clear, star-filled skies.",
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
    description: "Meru National Park stands as one of East Africa's most pristine and least-explored wilderness areas, a hidden gem that retains an authentic safari experience where travelers encounter genuine solitude and uninterrupted natural beauty. This spectacular 870-square-kilometer reserve emanates raw, untamed wilderness characterized by rolling grasslands, riverine forests threading through the landscape, and dramatic numbered rock outcrops rising majestically from the plains. The park is eternally linked to the legendary Elsa's Kopje, the hilltop stronghold where Elsa the lioness, famous from the classic film 'Born Free,' was released into the African wilderness—a poignant symbol of conservation and human-animal reconciliation. Meru's landscape is blessed with permanent water sources including the vital Tana River, creating verdant sanctuaries for exceptional concentrations of wildlife including rhinos, elephants, giraffes, buffalo, and predators. The park's remarkable isolation means fewer vehicles disturb the landscape, higher sighting probabilities of rare species, and transformative opportunities for authentic immersion in primordial African wilderness. This is the safari experience for adventurous travelers seeking genuine connection with untamed Africa beyond the familiar circuits. Opportunities for guided river walks, intimate birding excursions, and quiet evenings at secluded camps amplify the sense of remoteness and discovery for visitors who prize solitude and conservation-minded tourism.",
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
    description: "Embark on an unforgettable three-day safari adventure perfectly designed for travelers with limited time who refuse to compromise on the quintessential African wildlife experience. This carefully curated short safari immerses you in the raw magic and untamed beauty of Africa's most famous game reserve, the legendary Masai Mara. From your first sunrise game drive across endless golden grasslands to your final encounter with the Big Five, every moment is meticulously orchestrated to maximize wildlife viewing and cultural immersion. Experience the discipline and skill of expert guides, the thrill of predator-prey interactions, the majesty of massive elephant herds, and the honor of experiencing authentic Maasai cultural traditions. This package represents an ideal introduction to African safaris or a meaningful return for experienced travelers seeking concentrated wildlife excellence.",
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
    description: "Indulge in the pinnacle of luxury safari experiences with this exclusive five-day journey combining two of Kenya's most iconic wilderness destinations in unprecedented style and comfort. This ultimate luxury package seamlessly blends the alpine grandeur of Amboseli, where Mount Kilimanjaro rises majestically across the border, with the unparalleled wildlife spectacle of the Masai Mara's endless savannas. Expect privately-guided game drives in exclusive 4x4 vehicles, transparent-roofed for optimal wildlife observation and photography, hot air balloon safaris at dawn where you drift silently above the awakening landscape, and gourmet bush dinners under stars twinkling over African wilderness. Luxury accommodation in five-star safari lodges features every contemporary amenity paired with authentic African aesthetics, personalized service, and front-row seats to nature's greatest dramas. This is the definitive African safari for discerning travelers seeking the ultimate synthesis of comfort, adventure, and natural beauty.",
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
    description: "Experience the complete Kenyan adventure in one transformative week, seamlessly blending safari thrills with beach tranquility in this comprehensive journey through Africa's most diverse and captivating landscape. This expedition takes you from Nairobi's cultural richness through the elephant-dominated savannas of Amboseli, across the untamed grasslands of the legendary Masai Mara where the Great Migration unfolds, before culminating in paradisiacal relaxation along Diani Beach with its turquoise waters and pristine white sands. Witness the iconic giraffe-feeding experience, explore the colonial heritage of Karen Blixen's historic home, participate in authentic Maasai cultural ceremonies, chase Africa's Big Five across pristine landscapes, and conclude with rejuvenating beach time featuring world-class snorkeling among coral reefs. This is not merely a vacation but a complete immersion into African splendor—where wildlife spectacle, cultural authenticity, natural beauty, and luxury relaxation converge into one unforgettable expedition.",
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
    description: "Step beyond tourism into genuine cultural immersion within a traditional Maasai community, where time-honored ways persist and ancient traditions remain central to daily life. Visit an authentic manyatta (traditional Maasai warrior village) where circular, thorn-fence-enclosed compounds house extended families maintaining pastoral lifestyles unchanged for generations. Participate in traditional welcome ceremonies, witness mesmerizing warrior dance performances featuring rhythmic jumping and warrior chants that echo across the savanna, learn the intricate art of traditional beadwork from skilled village women creating stunning geometric patterns with tiny colored beads, experience hands-on cattle herding with young Maasai warriors, and feast on traditional meals of ugali and nyama. This immersive experience transcends typical tourist interactions, offering genuine encounters that foster mutual respect and provide crucial economic benefits directly benefiting the community.",
    location: "Masai Mara / Amboseli",
    duration: "Half Day",
    highlights: ["Traditional Dance Performance", "Beadwork Workshop", "Cattle Herding Experience", "Meet Local Warriors"]
  },
  {
    id: "maasai-beading",
    name: "Maasai Beadwork Experience",
    description: "Master an ancient artistic tradition by learning the time-honored craft of Maasai beadwork from talented local women artisans who have perfected this skill through generations. Under patient guidance, participants select from hundreds of precisely-cut glass beads in vibrant colors and learn the sophisticated techniques required to string traditional patterns onto metal wire or leather cord. Each beadwork design carries profound cultural significance—specific colors and arrangements indicating a wearer's social status, marital status, age group, and warrior achievements. As you craft your own authentic piece combining traditional designs with personal touches, you'll develop profound appreciation for the artistry, patience, and cultural knowledge embedded in every creation. The beads you create become more than souvenirs—they become tangible connections to Maasai heritage while your purchase directly supports village women entrepreneurs and their families.",
    location: "Masai Mara",
    duration: "2-3 Hours",
    highlights: ["Beadwork Tutorial", "Traditional Designs", "Take Home Your Creation", "Support Local Women"]
  },
  {
    id: "swahili-cooking",
    name: "Swahili Cooking Class",
    description: "Discover the exotic flavors and ancient traditions of Swahili cuisine through a comprehensive culinary experience that begins in Lamu's vibrant local markets and culminates in preparing traditional dishes using time-honored techniques. Start your journey exploring bustling market stalls overflowing with tropical fruits, aromatic spices including clove, cardamom, cinnamon and nutmeg, fresh seafood, and coconuts. Knowledgeable local cooks guide you through market selection, explaining historical spice routes that connected Africa to the Middle East and Asia. Return to the kitchen where you'll learn to prepare quintessential Swahili dishes infused with coconut, tamarind, and complex spice combinations reflecting centuries of cultural fusion. Participate in the ceremonial Swahili tea preparation, grinding fresh spices and preparing traditional hospitality beverages. The culmination is a communal feast celebrating your creations, fostering connection across cultures through the universal language of food.",
    location: "Lamu",
    duration: "Half Day",
    highlights: ["Market Tour", "Traditional Recipes", "Coconut Curry", "Swahili Tea Ceremony"]
  },
  {
    id: "samburu-culture",
    name: "Samburu Cultural Experience",
    description: "Venture into the remote northern wilderness to experience the unique lifestyle of the Samburu people, a semi-nomadic pastoralist community whose traditions and customs persist unchanged across generations. Visit a traditional Samburu manyatta where you'll witness daily life centered around pastoralism—cattle herding being not merely economic necessity but the foundation of identity and cultural pride. Observe warrior dances featuring vibrant red shuka cloths, face paint designs, and intricate jump-dancing techniques that announce warrior status and celebrate community milestones. Learn about the sophisticated knowledge systems governing pastoralism, including intricate livestock breeding practices, pastoral ecology understanding, and water source management within this semi-arid landscape. Examine and purchase exquisite beadwork directly from skilled artisans, each piece representing hours of meticulous craftsmanship and cultural expression. This authentic encounter with Samburu culture reveals Africa's pastoral heritage in its most genuine form.",
    location: "Samburu",
    duration: "Half Day",
    highlights: ["Warrior Dances", "Cattle Herding", "Traditional Songs", "Beadwork Demonstration"]
  },
  {
    id: "karen-blixen",
    name: "Karen Blixen Museum",
    description: "Travel back in time at the meticulously preserved Karen Blixen Museum, the historic residence of the renowned Danish author who penned the literary classic 'Out of Africa.' This magnificent colonial-era estate offers intimate glimpses into the author's life, displaying her personal belongings, published works, photographs, and correspondence that illuminate her remarkable African odyssey spanning the 1910s-1930s. The gracious home reflects early twentieth-century colonial aesthetics while personal artifacts reveal her transformation from privilege to pioneering coffee plantation ownership to celebrated author. Stroll through surrounding coffee plantations where guides explain agricultural practices, wander through meticulously maintained gardens bursting with tropical vegetation and flowering plants, and visit the historic furniture-adorned rooms where literary genius flourished. This museum transcends typical historical sites, evoking the romantic mystique of colonial East Africa while fostering critical understanding of complex historical legacies and the remarkable women who shaped Africa's narrative.",
    location: "Nairobi",
    duration: "2-3 Hours",
    highlights: ["Colonial History", "Coffee Plantation", "Historic Architecture", "Scenic Gardens"]
  },
  {
    id: "giraffe-centre",
    name: "Giraffe Centre Experience",
    description: "Experience an extraordinary face-to-face encounter with endangered Rothschild giraffes at Nairobi's pioneering conservation center dedicated to the species' survival and rehabilitation. This remarkable facility offers unprecedented intimate interactions where you'll hand-feed these gentle giants their favorite acacia leaves and papaya, bringing their long necks to your level in magical moments of cross-species connection. Beyond the memorable feeding experience, knowledgeable naturalists educate visitors about giraffe biology, behavior, conservation challenges threatening their survival, and the center's successful breeding and reintroduction programs. Explore ornately designed grounds featuring landscaped gardens, bird-watching opportunities among numerous avian species, peaceful nature walks through native vegetation, and open-air teaching areas. The center epitomizes conservation that balances education, species protection, and meaningful human-wildlife interaction while inspiring visitors to become advocates for African wildlife preservation.",
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
    description: "Diani Beach stretches majestically for 25 kilometers along Kenya's Indian Ocean coast, representing the country's most acclaimed and celebrated beach destination. This award-winning paradise features pristine expanses of powder-soft white sand leading to crystalline turquoise waters that shimmer like liquid gemstones in the equatorial sunlight. Beneath the surface lies a thriving underwater kingdom with vibrant coral reefs harboring hundreds of fish species, creating paradise for snorkelers and scuba diving enthusiasts. The beach culture pulses with cosmopolitan sophistication, featuring world-class resorts, elegant boutique hotels, Michelin-worthy restaurants, and vibrant beach clubs that come alive at night with live music, dancing, and mixology excellence. Beyond lounging on pristine sands, adventurers pursue world-renowned kite surfing harnessing Indian Ocean winds, embark on dolphin-watching expeditions encountering these magnificent marine mammals, participate in deep-sea fishing seeking marlin and tuna, or simply surrender to the rhythmic ocean soundtrack and tropical atmosphere.",
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
    description: "Watamu represents a hidden coastal gem that captures the essence of tropical paradise while maintaining authentic character despite growing popularity. This enchanting destination along Kenya's north coast features multiple sweeping beach curves separated by rocky outcrops creating scenic natural boundaries. The town's primary allure centers on the spectacular Watamu Marine National Park, a protected sanctuary encompassing coral gardens of breathtaking beauty where sea turtles glide gracefully through crystalline waters and tropical fish schools shimmer in dazzling colors. The marine environment showcases dramatic biodiversity from vibrant hard and soft corals to moray eels, octopuses, and larger pelagic species. Beyond underwater treasures, Watamu captivates with authentic coastal culture, minimal commercialization compared to southern beaches, excellent value accommodations, and world-class windsurfing and kite surfing conditions when oceanic winds cooperate. The coastline offers peaceful refuge away from crowds where genuine Kenyan hospitality and pristine natural beauty combine into authentic East African beach experience.",
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
    description: "Malindi commands a unique position along Kenya's coast as a historic trading port whose colorful past remains tangibly present throughout the town's architecture, streets, and culture. This atmospheric destination showcases strong Italian colonial influence evident in elegant waterfront buildings, establishing an intriguing European-African fusion distinct from other Kenyan coastal towns. The harbor remains active with traditional dhow sailboats and commercial fishing vessels, maintaining maritime heritage alive for centuries. Beyond town attractions, Malindi serves as the gateway to extraordinary adventures including world-famous deep-sea fishing grounds attracting serious anglers from across the globe, vibrant snorkeling opportunities around nearby coral gardens, and expeditions to the otherworldly Marafa Depression (Hell's Kitchen)—a dramatically eroded landscape where towering red-and-white striped cliffs plunge into colorful valleys creating surreal geological formations. The combination of historical richness, adventure opportunities, and authentic coastal character establishes Malindi as essential East African experience for travelers seeking substance alongside seaside relaxation.",
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
    description: "Kilifi embodies serenity and tranquility where the meandering Kilifi Creek meets the Indian Ocean in picturesque confluence creating one of Kenya's most aesthetically pleasing coastal settings. This peaceful refuge appeals to travelers seeking respite from busier beach destinations while craving natural beauty and cultural authenticity. The creek's mangrove-lined shores create ecological importance as breeding grounds for fish and crustaceans while supporting prolific birdlife. Visitors engage in leisurely boat tours navigating the creek's winding passages, discovering hidden coves and authentic fishing villages. The Mnarani Ruins scattered throughout the region document centuries of Swahili settlement and trade, offering archaeological insight into the coast's storied past. Kilifi's beaches maintain pristine emptiness compared to southern counterparts, offering undisturbed stretches for peaceful swimming and sunset appreciation. The tranquil atmosphere, sunset cruises painting skies in vivid colors, and genuine interactive opportunities with local fishing communities create ideal conditions for contemplative beach experiences and meaningful cultural connections.",
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
    description: "Mombasa reigns as Kenya's crown jewel of the Indian Ocean coast and East Africa's most cosmopolitan seaside metropolis, blending rich Swahili heritage with contemporary urban energy. This historic trading port's significance spans centuries, evident in the imposing architecture of Fort Jesus—a UNESCO World Heritage site fortress commanding the harbor entrance, standing as testament to centuries of cultural exchange and colonial history. The labyrinthine Old Town with its narrow alleyways, atmospheric spice markets, and intricately carved wooden doors transports visitors into the past while vibrant present-day commerce and cultural practices pulse beneath. Beyond historical attractions, Mombasa offers world-class beaches where visitors lazy on white sands, engage in premier water sports, visit the remarkable Sheldrick Elephant Orphanage (satellite facility) nurturing rescued elephant calves, and explore marine sanctuaries teeming with coral reefs and tropical fish. The city's cultural diversity, culinary excellence spanning Swahili, Indian, and international cuisines, lively nightlife, and commercial sophistication establish Mombasa as sophisticated coastal destination with substance extending far beyond beach pleasures.",
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
    description: "Mount Kenya stands as Africa's second-highest peak at 5,199 meters, offering adventurous travelers exhilarating trekking and mountaineering experiences combining physical challenge with breathtaking alpine scenery. This dormant volcano features three dramatic peaks—Batian, Nelion, and Point Lenana—each requiring varying fitness levels and climbing expertise. The ascension journeys through distinct ecological zones: lush forested slopes harboring unique wildlife including elusive carnivores and endangered species, high-altitude moorlands stretching across windswept plateaus of astounding beauty, and crystalline alpine environments where glaciers glisten beneath the equatorial sun. Multiple trekking routes accommodate various abilities, from non-technical hikes to challenging technical rock climbing demanding mountaineering proficiency. Successful summiteers witness magnificence from the highest point, gazing across East African landscapes extending toward the Kenyan border while breathing the rarest atmosphere accessible without professional mountaineering equipment. The mountain experience combines physical achievement, natural immersion, and transformative perspective applicable far beyond the slopes.",
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
    description: "Aberdare National Park represents a unique environmental treasure—a high-altitude cloud forest ecosystem shrouded in perpetual mist where pristine wilderness supports remarkable biodiversity. Perched between 2,000 and 4,000 meters elevation, the park's dramatic escarpment terrain features deep valleys, forest-draped slopes, and ribbons of water creating spectacular waterfall formations plunging into misty ravines. The cool, damp climate nurtures lush vegetation enabling survival of rare animal species including its most iconic resident—the elusive black rhino protected within fortress-like terrain. Aberdare offers incredible bird diversity attracting serious birders seeking endemic and montane species rarely encountered elsewhere. The park's distinctive tree hotels position visitor accommodations directly above salt licks where forest dramas unfold at night as animals arrive for mineral consumption. Experienced ranger night drives reveal nocturnal wildlife while daylight forest walks navigate enchanting woodland environments. This elevation refuge provides cool respite from lowland heat while delivering unparalleled wilderness immersion within Kenya's montane biodiversity stronghold.",
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
    description: "Lake Naivasha captivates as a sparkling freshwater oasis located conveniently close to Nairobi, making it ideal for weekend escapes and day-trip adventures. This beautiful lake covers approximately 104 square kilometers and transforms based on seasonal rainfall fluctuations, creating dynamic environmental changes and varied wildlife viewing opportunities throughout the year. The lake's primary attraction centers on its substantial hippo populations visible from boat vantage points—enormous mammals wallowing in the shallows creating both comical and awe-inspiring encounters. Crescent Island, accessible by boat or walking depending on water levels, offers authentic walking safaris where visitors encounter giraffes, zebras, buffalo, and various antelope species on foot requiring heightened awareness and creating visceral wildlife connections distinct from vehicle-based safaris. The lakeshore environment supports exceptional birdlife including fish eagles, cormorants, African fish eagles, and numerous waterbird species. Modern resort facilities along the shore combine outdoor adventure with comfortable accommodations, making Naivasha accessible to diverse visitor preferences seeking nature experiences without extensive travel commitment.",
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
    description: "Kakamega Rainforest represents Kenya's last remaining tropical rainforest—a ecological sanctuary of continental significance harboring extraordinary biodiversity found nowhere else in East Africa. This precious 238-square-kilometer forest reserve rises majestically from the surrounding landscape, its dense canopy creating perpetually cool, humid microclimate supporting specialized plant and animal communities. The forest environment hosts Kenya's most impressive bird diversity with over 300 species including rare West African species reaching their eastern continental limits at Kakamega's boundaries. Primate populations thrive within the forest canopy, including colobus monkeys with distinctive black-and-white coloring launching spectacular aerial displays between trees, and numerous smaller primate species contributing to rainforest acoustics. Exotic butterfly species possess colors and patterns defying imagination—some appearing like stained glass windows, others mimicking eyes of larger predators. Forest trails navigate complex vegetation, crossing streams and uncovering hidden natural pools. Kakamega offers profound environmental significance as a relict rainforest island, making visitation both recreational adventure and conservation contribution supporting this irreplaceable ecosystem's preservation.",
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
    description: "The Masai Mara Main Reserve stands as the ultimate safari destination on the global stage, commanding international reputation for exceptional and consistent wildlife viewing opportunities coupled with the legendary Great Migration phenomenon. This 1,510 square kilometer protected reserve showcases archetypal African savanna landscape where an astounding concentration of fauna—estimated at one animal per hectare at peak seasons—provides unparalleled encounter probabilities. The Great Migration's annual apparition (typically July-October) features over 2 million animals engaging in their primordial journey following ancient corridors etched by millions of generations. The reserve's Mara River becomes stage for epic dramas as crocodiles ambush vulnerable crossing animals, predators surround weakened prey, and desperate survival determination plays out with nature's raw authenticity. Beyond migration spectacle, consistent Big Five sightings, prolific predator populations, diverse herbivore assemblages, and bird diversity spanning over 450 species ensure perpetual wildlife drama regardless of season. The Maasai people maintain ancestral pastoralist practices alongside wildlife conservation, offering cultural experiences enriching safari experiences. Expert guides interpreting animal behavior, reading landscape sign language, and sharing ecological knowledge transform safari from observation into profound environmental education.",
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
    description: "The Mara North Conservancy represents exclusive safari experiences where privacy, personalization, and wildlife intimacy take precedence over volume and convenience. This private 120-square-kilometer conservancy adjacent to the main Masai Mara reserve enjoys exclusive wildlife access across conservancy lands, dramatically reducing vehicle concentrations around wildlife sightings. Visitors experience the sanctuary of true wilderness with exclusive game drives in private vehicles reserved for single lodges, ensuring uninterrupted viewing of predator kills, mating behaviors, and other intimate wildlife moments without dozens of vehicles jostling for positioning. The conservancy's private access provides distinct advantage—wildlife remains unaware of human observation, behaving naturally rather than tolerating documentary numbers of vehicles. Walking safaris penetrate landscapes on foot with expert guides providing botanical knowledge, animal sign interpretation, and ecosystem explanation inaccessible within vehicles. Night drives employ specialized lighting enabling observation of nocturnal species typically invisible during daylight. Exclusive accommodation establishments feature personalized service standards, gourmet cuisine incorporating local ingredients, and natural material design harmonizing with landscapes.",
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
    description: "Mara East Conservancy epitomizes pristine wilderness sanctuary where untouched landscape and traditional Maasai pastoralism merge seamlessly creating authentic African safari foundation. This 165-square-kilometer conservancy maintains ecological integrity and cultural authenticity that commercialization frequently compromises, delivering genuine encounters with Both wildlife and indigenous people. The landscape, characterized by undulating grasslands, rocky kopjes, and riverine woodlands, provides diverse habitats supporting substantial wildlife populations. Game drives navigate terrain seeking lions lounging beneath acacia trees, leopards draped across branches, cheetahs stalking across plains, and elephant family units traversing ancient routes. The Maasai communities inhabiting conservancy regions maintain traditional pastoralist culture, historically coexisting with wildlife rather than viewing conservation as externally-imposed restriction. Cultural visits to traditional villages reveal livestock-centered economies, traditional governance systems, warrior traditions, and artistic expressions persisting across generations. Bush breakfast experiences within pristine wilderness, where meals are prepared over open fires as wildlife grazed proximally, create memorable synthesis of adventure and civilization. The conservancy model demonstrates conservation benefiting wildlife protection while respecting and supporting indigenous communities as conservation stakeholders.",
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
    description: "Ol Pejeta Conservancy commands international prominence as East Africa's most significant black rhinoceros sanctuary, providing last refuge for one of Africa's most critically endangered megafauna. The 90,000-acre conservancy represents extraordinary committed conservation effort housing the world's largest remaining black rhino population—over 100 individuals—preserved through intensive protection programs acknowledging species' trembling precipice toward extinction. The conservancy gained global attention as refuge for northern white rhinos, the planet's most endangered large mammal, with only two female individuals surviving representing species' functional extinction despite technical biologic survival. Beyond rhino focus, Ol Pejeta harbors diverse wildlife assemblages including lions, elephants, buffalo, and various herbivore species coexisting within expansive protected landscape. The conservancy offers educational chimpanzee sanctuary experiences where rescued orphaned chimps confiscated from illegal trade receive rehabilitation and lifelong sanctuary. Specialized guided game drives provide interpretation of conservation challenges and successes, transforming safari into conscious environmental stewardship participation. The conservancy model demonstrates effective wildlife protection through private conservation initiative, generating economic incentives for preservation while showcasing rhino recovery efforts' critical importance for African biodiversity.",
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
    description: "The famous boutique hotel where endangered Rothschild giraffes stick their heads through the windows during breakfast. This intimate, heritage property combines storybook charm with discreet luxury, offering personalized service, beautifully restored period rooms, and manicured gardens where wildlife and history meet. Guests enjoy unforgettable close encounters with giraffes at eye level, thoughtfully curated dining, and easy access to Nairobi's conservation and cultural attractions, making it an exceptional urban wildlife retreat.",
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
    description: "Stunning lodge perched on a hill overlooking the Mara River, offering breathtaking views of the savanna. The property blends classic safari architecture with modern comforts, featuring spacious rooms with private verandas, an inviting infinity pool, and an elegant dining pavilion serving locally inspired cuisine. Its prime location places guests minutes from high-probability wildlife corridors, while expert guides and tailored activities ensure meaningful encounters with the Mara's wildlife throughout the day and into the golden evenings.",
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
    description: "Award-winning lodge with direct views of Mount Kilimanjaro and access to elephant herds. Guests wake to panoramic panoramas of the mountain's snow-capped summit, enjoy guided wildlife drives across open plains, and return to comfortable, well-appointed rooms that balance rustic charm with contemporary amenities. The lodge's conservation-focused activities and experienced naturalist guides deepen guest connection to Amboseli's ecology, making each stay both restorative and educational.",
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
    description: "Exclusive beach resort offering world-class diving, fishing, and relaxation on the Kenyan coast. With expansive beachfront villas, a professional dive center, and curated excursions to nearby marine parks, the resort is tailored for guests seeking refined coastal leisure and marine exploration. Personalized service, spa treatments, and exceptional dining crafted from fresh local seafood elevate the stay, while conservation partnerships help protect the fragile marine ecosystems that make Watamu special.",
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
    description: "Popular all-inclusive resort on the famous Diani Beach with excellent facilities for families. The property features spacious family rooms, multiple pools, a dedicated kids' club, and a range of water-sport options, making it easy for guests of all ages to find their perfect balance of relaxation and activity. Evening entertainment, themed dining nights, and attentive staff ensure memorable stays, whether you're planning a family holiday or a laid-back beach escape.",
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
    description: "Historic luxury hotel in Nairobi's CBD offering fine dining and elegant accommodations since 1904. The Fairmont blends colonial grandeur with contemporary amenities, featuring beautifully appointed rooms, refined restaurants, and historic public spaces that host cultural events and business functions. Its central location provides convenient access to Nairobi's museums, markets, and corporate districts, while personalized concierge services and refined hospitality ensure guests enjoy both comfort and a sense of historic place.",
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
    description: "Famous open-air restaurant serving a variety of meat including crocodile, camel, and traditional Kenyan BBQ. Carnival-like atmosphere, dramatic fire-lit grills, and theatrical carving presentations make dining here an experiential highlight for adventurous food lovers. The menu pairs hearty grilled flavors with sides inspired by local cuisine, and live performances often accompany evening service for a lively, authentic Nairobi night out.",
    priceRange: "$",
    rating: 4.5,
    highlights: ["Cultural Show", "Variety Meats", "Open Air", "Safari Theme"]
  },
  {
    id: "talisman",
    name: "Talisman Restaurant",
    location: "Nairobi",
    type: "Fusion",
    description: "Award-winning restaurant offering creative fusion cuisine in a beautiful garden setting. The Talisman blends international techniques with East African ingredients, presenting thoughtfully plated dishes that celebrate regional produce and global inspiration. Its intimate ambience, attentive service, and an extensive wine list make it a favorite for special occasions and refined dining in Nairobi.",
    priceRange: "$$",
    rating: 4.8,
    highlights: ["Garden Setting", "Fusion Cuisine", "Fine Dining", "Wine List"]
  },
  {
    id: "mombasa-gres",
    name: "Mombasa Grill",
    location: "Mombasa",
    type: "Seafood",
    description: "Premium seafood restaurant on the coast serving fresh catches and Swahili-inspired dishes. Overlooking ocean vistas, the restaurant highlights daily catches prepared with fragrant Swahili spices, coconut milk sauces, and traditional coastal techniques. Guests enjoy relaxed seaside dining with elegant presentation and a focus on sustainably sourced seafood reflecting the region's maritime heritage.",
    priceRange: "$$",
    rating: 4.7,
    highlights: ["Fresh Seafood", "Ocean Views", "Swahili Cuisine", "Romantic Setting"]
  },
  {
    id: "diani-chand",
    name: "The Chandila",
    location: "Diani Beach",
    type: "Indian",
    description: "Popular Indian restaurant in Diani offering authentic North and South Indian cuisine. Aromatic curries, handcrafted breads, and family-style platters showcase the diversity of Indian culinary traditions adapted to coastal Kenyan ingredients. The relaxed beachfront location pairs spicy, flavorful dishes with cooling ocean breezes, making it a beloved spot for both local patrons and international visitors.",
    priceRange: "$",
    rating: 4.6,
    highlights: ["Authentic Indian", "Beach Location", "Curry Specialties", "Vegetarian Options"]
  },
  {
    id: "nairobi-italian",
    name: "Mama Rock",
    location: "Nairobi",
    type: "Italian",
    description: "Trendy Italian restaurant known for its wood-fired pizzas and homemade pasta. With a lively, contemporary vibe and an emphasis on fresh, seasonal ingredients, Mama Rock delivers rustic Italian flavors elevated by local produce. Outdoor seating and a vibrant crowd make it a popular spot for casual dinners, date nights, and group gatherings.",
    priceRange: "$",
    rating: 4.5,
    highlights: ["Wood-Fired Pizza", "Homemade Pasta", "Trendy Vibe", "Outdoor Seating"]
  },
  {
    id: "mara-bush",
    name: "Mara River Bush Dinner",
    location: "Masai Mara",
    type: "Bush Dining",
    description: "Romantic bush dinner experience in the heart of the Mara with traditional Maasai entertainment. Dining beneath open skies, guests savor locally sourced dishes prepared over open flame amid natural soundscapes of wildlife, while Maasai performers share songs and dances that enhance the intimate, unforgettable atmosphere. It is ideal for special celebrations or a memorable evening during your safari itinerary.",
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
    question: "What is included in our tour packages?",
    answer: "Our packages typically include accommodation, meals, transport, park fees, and professional guides. Each package page lists specific inclusions and exclusions.",
  },
  {
    question: "How do I book a tour?",
    answer: "You can book through our contact form, WhatsApp, or email. We'll confirm availability, discuss any customizations, and send you a detailed itinerary and payment instructions.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept PayPal for international payments and M-Pesa for payments within Kenya. Both methods are secure and convenient for booking your safari adventure.",
  },
];
