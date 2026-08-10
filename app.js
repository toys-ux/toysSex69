/* ==========================================================================
   WANDERLUST LUXURY INTIMACY BOUTIQUE - INTERACTIVE LOGIC & APPLICATION ENGINE
   ========================================================================== */

// --- Application State ---
const state = {
  isDiscreetMode: false,
  isAgeVerified: false,
  wishlist: new Set(),
  cart: [],
  activeCategory: 'all',
  activeMaterial: 'all',
  activeNoise: 'all',
  sortBy: 'featured',
  activeVibroPattern: 'pulse',
  vibroSpeed: 6,
  quizAnswers: {},
  audioSynth: {
    ctx: null,
    osc1: null,
    osc2: null,
    gain: null,
    isPlaying: false
  }
};

// --- Product Database ---
const products = [
  {
    id: 'prod-1',
    title: 'Velvet Rose Dual Sensation Wand',
    category: 'vibrators',
    categoryName: 'Vibrators & Wands',
    price: 149.00,
    rating: 4.9,
    reviews: 128,
    image: 'images/vibrator1.jpg',
    decibels: 29,
    material: 'silicone',
    materialName: 'Velvet Medical Silicone',
    waterproof: 'IPX7 Waterproof',
    intensity: 'Deep Rumbling Dual Motor',
    shortDesc: 'Ergonomic dual motor vibrator with velvet-touch medical silicone for intense targeted stimulation.',
    longDesc: 'Engineered with whisper-quiet motor technology, the Velvet Rose dual wand combines deep rumbling clitoral flutter with internal pulsation. Fully submersible, magnetic USB rechargeable, and crafted with 100% hypoallergenic silicone.'
  },
  {
    id: 'prod-2',
    title: 'Rose Quartz Sculpted Glass Wand',
    category: 'glass',
    categoryName: 'Sculpted Glass',
    price: 119.00,
    rating: 4.8,
    reviews: 94,
    image: 'images/glass_wand.jpg',
    decibels: 0,
    material: 'glass',
    materialName: 'Hand-Blown Crystal Glass',
    waterproof: '100% Submersible',
    intensity: 'Smooth Weighted Sensation',
    shortDesc: 'Hand-crafted rose crystal glass wand warmable in water baths for sensational temperature play.',
    longDesc: 'An exquisite piece of intimate art. Heated under warm water or chilled in ice, this sculpted non-porous glass wand provides sensational density and soothing massage curves.'
  },
  {
    id: 'prod-3',
    title: 'Synergy Touch Couples Remote Device',
    category: 'couples',
    categoryName: 'Couples Synergy',
    price: 179.00,
    rating: 5.0,
    reviews: 215,
    image: 'images/couples1.jpg',
    decibels: 32,
    material: 'silicone',
    materialName: 'Medical Silicone & Rose Gold',
    waterproof: 'Waterproof IPX7',
    intensity: '12 Rhythm Vibration Wave',
    shortDesc: 'Flexible hands-free couples vibrator with long-range mobile app & remote sync control.',
    longDesc: 'Designed to be worn comfortably during lovemaking. Heighten climax for both partners simultaneously with 12 customizable rumble modes controlled via discreet smartphone app or wireless remote.'
  },
  {
    id: 'prod-4',
    title: 'Aphrodite Silk & Pheromone Elixir Set',
    category: 'wellness',
    categoryName: 'Oils & Wellness',
    price: 89.00,
    rating: 4.9,
    reviews: 76,
    image: 'images/oils1.jpg',
    decibels: 0,
    material: 'satin',
    materialName: 'Organic Botanicals & Silk',
    waterproof: 'Skin Moisture Barrier',
    intensity: 'Sensory Tactile Warmth',
    shortDesc: 'Gold-leaf infused botanical massage oil paired with a double-layer weighted satin silk blindfold.',
    longDesc: 'Heighten your tactile sensitivity. Includes 100ml nourishing jojoba & rosehip massage oil infused with subtle pheromones, paired with a plush weighted silk blindfold for intoxicating sensory deprivation play.'
  },
  {
    id: 'prod-5',
    title: 'Aurora Rabbit Dual Climax Vibrator',
    category: 'rabbit',
    categoryName: 'Rabbit Vibrators',
    price: 169.00,
    rating: 4.9,
    reviews: 203,
    image: 'images/rabbit.jpg',
    decibels: 30,
    material: 'silicone',
    materialName: 'Satin-Touch Medical Silicone',
    waterproof: 'IPX7 Waterproof',
    intensity: 'Dual Motor Internal + External',
    shortDesc: 'Simultaneous dual-arm rabbit vibrator delivering blended internal G-spot and external clitoral climax.',
    longDesc: 'The Aurora rabbit features a curved internal shaft with a fluttering external arm that stimulates simultaneously. 10 vibration modes, whisper motor, app-compatible, USB rechargeable, and 100% submersible.'
  },
  {
    id: 'prod-6',
    title: 'Noir Velvet Cuff Restraint Set',
    category: 'bondage',
    categoryName: 'Bondage & Restraints',
    price: 109.00,
    rating: 4.7,
    reviews: 88,
    image: 'images/restraints.jpg',
    decibels: 0,
    material: 'satin',
    materialName: 'Plush Velvet & Satin Silk',
    waterproof: 'N/A',
    intensity: 'Gentle Restraint',
    shortDesc: 'Padded velvet wrist & ankle cuffs with brushed gold hardware and quick-release safety buckles.',
    longDesc: 'Delicate yet secure. Padded with plush interior velvet to ensure total comfort while surrendering control. Includes 2 wrist cuffs, 2 ankle cuffs, and a connecting satin tie ribbon. Adjustable for all body types.'
  },
  {
    id: 'prod-7',
    title: 'Phantom Shadow Vibrating Cock Ring',
    category: 'male',
    categoryName: 'Male Pleasure',
    price: 59.00,
    rating: 4.6,
    reviews: 142,
    image: 'images/cock_ring.jpg',
    decibels: 28,
    material: 'silicone',
    materialName: 'Stretchy Medical Silicone',
    waterproof: 'Waterproof',
    intensity: '7-Speed Vibrating Motor',
    shortDesc: 'Flexible vibrating cock ring that enhances erection firmness and delivers vibration for both partners.',
    longDesc: 'The Phantom Shadow features a soft medical silicone ring with an embedded 7-speed micro motor. Slows blood outflow for sustained firmness while the vibrating top stimulates a partner during intimacy. Fully waterproof.'
  },
  {
    id: 'prod-8',
    title: 'Obsidian Prostate P-Spot Massager',
    category: 'anal',
    categoryName: 'Anal & P-Spot',
    price: 139.00,
    rating: 4.8,
    reviews: 97,
    image: 'images/prostate.jpg',
    decibels: 27,
    material: 'silicone',
    materialName: 'Body-Safe Medical Silicone',
    waterproof: 'IPX6 Splashproof',
    intensity: '10-Speed Prostate Rumble',
    shortDesc: 'Anatomically curved P-spot massager targeting the prostate gland with 10 deep rumble intensities.',
    longDesc: 'The Obsidian is anatomically sculpted to fit the natural curve of the body. A rounded tip delivers 10 vibration modes directly to the prostate gland for deep internal male arousal and prostate wellness.'
  },
  {
    id: 'prod-9',
    title: 'Silk Onyx Lace Luxury Lingerie Set',
    category: 'lingerie',
    categoryName: 'Lingerie & Intimates',
    price: 79.00,
    rating: 4.7,
    reviews: 156,
    image: 'images/lingerie1.jpg',
    decibels: 0,
    material: 'satin',
    materialName: 'French Lace & Satin',
    waterproof: 'N/A',
    intensity: 'Sensual Elegance',
    shortDesc: 'Sheer French lace bralette and high-cut brief set with satin trim and adjustable straps.',
    longDesc: 'Crafted from hand-sewn French lace with delicate satin trim edges. The Silk Onyx set includes a balcony bralette, high-waist brief, and matching satin garter belt. Available in sizes XS-4XL.'
  },
  {
    id: 'prod-10',
    title: 'Luxe Water-Based Glide Lubricant',
    category: 'wellness',
    categoryName: 'Oils & Wellness',
    price: 39.00,
    rating: 4.9,
    reviews: 312,
    image: 'images/lubricant.jpg',
    decibels: 0,
    material: 'satin',
    materialName: 'Organic Aloe & Botanicals',
    waterproof: 'N/A',
    intensity: 'Long-Lasting Glide',
    shortDesc: 'pH-balanced personal lubricant with aloe vera — safe with all toys, condoms and skin types.',
    longDesc: 'Wanderlust\'s premium water-based lubricant is formulated with organic aloe vera, glycerin-free, and pH-balanced to protect natural flora. Compatible with all silicone toys, latex, and polyisoprene condoms. 200ml bottle.'
  },
  {
    id: 'prod-11',
    title: 'Celestial Touch Compact Clitoral Vibe',
    category: 'vibrators',
    categoryName: 'Vibrators & Wands',
    price: 99.00,
    rating: 4.7,
    reviews: 89,
    image: 'images/vibrator2.jpg',
    decibels: 28,
    material: 'silicone',
    materialName: 'Medical Silicone',
    waterproof: '100% Submersible',
    intensity: '8 Precision Speeds',
    shortDesc: 'Discreet pocket-sized pebble massager with whisper-soft motors under 28 dB.',
    longDesc: 'Small in footprint, powerful in output. Fits comfortably in your palm or clutch bag for travel relaxation with silent rumble technology.'
  },
  {
    id: 'prod-12',
    title: 'Onyx Eclipse Glass Spiral Dildo',
    category: 'glass',
    categoryName: 'Sculpted Glass',
    price: 99.00,
    rating: 4.6,
    reviews: 71,
    image: 'images/dildo.jpg',
    decibels: 0,
    material: 'glass',
    materialName: 'Borosilicate Crystal Glass',
    waterproof: '100% Submersible',
    intensity: 'Weighted Smooth Sensation',
    shortDesc: 'Artisan-crafted black spiral borosilicate glass dildo with dual-ended curved tips.',
    longDesc: 'The Eclipse is a masterwork of intimate sculpture. Dual-ended spiral borosilicate glass, non-porous and eternally body-safe. Temperature responsive — warm or cool to dial sensation. Dishwasher and sterilizer safe.'
  },
  {
    id: 'prod-13',
    title: 'Crimson Tether Long-Distance App Vibe',
    category: 'couples',
    categoryName: 'Couples Synergy',
    price: 199.00,
    rating: 4.9,
    reviews: 178,
    image: 'images/couples2.jpg',
    decibels: 33,
    material: 'silicone',
    materialName: 'Flex-Silicone & Rose Gold ABS',
    waterproof: 'IPX7 Waterproof',
    intensity: 'App-Controlled Variable',
    shortDesc: 'Long-distance app-controlled wearable vibrator — control your partner from anywhere on Earth.',
    longDesc: 'The Crimson Tether connects via Bluetooth + Wi-Fi. Your partner controls speed, patterns, and syncs music-rhythm vibration via the Wanderlust app. Worn discreetly in public or during lovemaking for shared remote play.'
  },
  {
    id: 'prod-14',
    title: 'Midnight Bliss Graduated Anal Beads',
    category: 'anal',
    categoryName: 'Anal & P-Spot',
    price: 69.00,
    rating: 4.5,
    reviews: 63,
    image: 'images/butt_plug.jpg',
    decibels: 0,
    material: 'silicone',
    materialName: 'Graduated Medical Silicone',
    waterproof: 'Waterproof',
    intensity: 'Graduated Insertion',
    shortDesc: 'Graduated silicone anal beads with pull-ring for controlled pleasure and easy retrieval.',
    longDesc: '5 graduated silicone spheres on a flexible spine with retrieval ring for safe, comfortable anal play. Graduated from 1.2cm to 3.5cm for beginners and experienced users alike. Fully waterproof and sterilizable.'
  },
  {
    id: 'prod-15',
    title: 'Stallion Heated Auto Stroker',
    category: 'male',
    categoryName: 'Male Pleasure',
    price: 219.00,
    rating: 4.8,
    reviews: 134,
    image: 'images/stroker.jpg',
    decibels: 35,
    material: 'silicone',
    materialName: 'SuperSkin™ & Medical ABS',
    waterproof: 'Splash-Proof',
    intensity: 'Auto-Thrust + Rotate + Heat',
    shortDesc: 'Motorized auto-thrusting male stroker with body-heat simulation up to 37°C and 5 thrust modes.',
    longDesc: 'The Stallion combines automatic thrusting, rotation, and suction with a heating element that reaches 37°C — body temperature. SuperSkin™ inner sleeve mimics natural skin texture. USB rechargeable, 5 thrust + 5 vibration modes.'
  },
  {
    id: 'prod-16',
    title: 'Scarlet Web Satin Eye Blindfold',
    category: 'bondage',
    categoryName: 'Bondage & Restraints',
    price: 45.00,
    rating: 4.8,
    reviews: 201,
    image: 'images/blindfold.jpg',
    decibels: 0,
    material: 'satin',
    materialName: 'Triple-Layer Satin & Memory Foam',
    waterproof: 'N/A',
    intensity: 'Total Sensory Deprivation',
    shortDesc: 'Plush memory foam padded silk blindfold for total sensory deprivation — enhances all skin sensitivity.',
    longDesc: 'Lined with three layers: outer gloss satin, memory foam padding, and an inner microsuede lining. Completely blocks all light while remaining feather-soft against the face. Adjustable velcro strap fits all head sizes.'
  },
  {
    id: 'prod-17',
    title: 'Pearl Kegel Toning Ben Wa Balls',
    category: 'wellness',
    categoryName: 'Oils & Wellness',
    price: 55.00,
    rating: 4.6,
    reviews: 118,
    image: 'images/kegel.jpg',
    decibels: 0,
    material: 'silicone',
    materialName: 'Medical Silicone & ABS Core',
    waterproof: 'Waterproof',
    intensity: 'Pelvic Floor Biofeedback',
    shortDesc: 'Weighted kegel training balls for pelvic floor strengthening and heightened internal sensitivity.',
    longDesc: 'The Pearl set includes two weighted silicone-coated balls with internal rolling weights. Worn during movement, the shifting inner cores activate pelvic floor muscle contractions for toning and heightened arousal sensitivity.'
  },
  {
    id: 'prod-18',
    title: 'Velvet Lace Babydoll Slip Set',
    category: 'lingerie',
    categoryName: 'Lingerie & Intimates',
    price: 65.00,
    rating: 4.5,
    reviews: 93,
    image: 'images/lingerie2.jpg',
    decibels: 0,
    material: 'satin',
    materialName: 'Chiffon & Guipure Lace',
    waterproof: 'N/A',
    intensity: 'Sheer Romantic Elegance',
    shortDesc: 'Sheer chiffon babydoll slip with guipure lace bodice and matching satin thong.',
    longDesc: 'A delicate chiffon body in whisper-sheer fabric with a structured guipure lace bodice. The flowing hem falls above the knee. Matching satin thong included. Hand-wash only in cold water. Sizes XS-3XL.'
  },
  {
    id: 'prod-19',
    title: 'Noir Ultra-Thin Sensation Condoms',
    category: 'protection',
    categoryName: 'Protection & Safety',
    price: 19.00,
    rating: 4.8,
    reviews: 445,
    image: 'images/condoms.jpg',
    decibels: 0,
    material: 'satin',
    materialName: 'Premium Latex (0.045mm)',
    waterproof: 'N/A',
    intensity: 'Natural Feel Barrier',
    shortDesc: '12-pack ultra-thin 0.045mm latex condoms with warming lubricant — barely-there natural sensation.',
    longDesc: 'Wanderlust Noir condoms are 30% thinner than standard latex at 0.045mm. Pre-lubricated with a warming water-based gel. Electronically tested for reliable protection. ISO 4074 certified. 12 individually wrapped.'
  },
  {
    id: 'prod-20',
    title: 'Soleil Sensual Massage Candle',
    category: 'wellness',
    categoryName: 'Oils & Wellness',
    price: 49.00,
    rating: 4.9,
    reviews: 267,
    image: 'images/massage_candle.jpg',
    decibels: 0,
    material: 'satin',
    materialName: 'Soy Wax & Shea Butter',
    waterproof: 'N/A',
    intensity: 'Warming Melt Sensation',
    shortDesc: 'Luxury soy wax massage candle that melts into warm shea butter massage oil — pour and play.',
    longDesc: 'Burn for 20 minutes then pour the melted shea butter and jojoba oil blend onto the skin for a warm, sensual glide massage. Notes of sandalwood, black rose, and vanilla musk. 200g / 40-hour burn time. Vegan, phthalate-free.'
  },
  {
    id: 'prod-21',
    title: 'Mythic Dragon Spike Textured Condoms',
    category: 'protection',
    categoryName: 'Protection & Safety',
    price: 29.00,
    rating: 4.9,
    reviews: 184,
    image: 'images/dragon_condom.jpg',
    decibels: 0,
    material: 'satin',
    materialName: 'Fantasy Textured Latex & Silicone',
    waterproof: 'N/A',
    intensity: 'Dragon-Scale Ribbed & Spiked Tactile Sensation',
    shortDesc: 'Fantasy dragon-scale textured sleeve & ribbed condom for intense friction play and climax escalation.',
    longDesc: 'Engineered with raised dragon scales, soft flexible nodules, and a snug elastic base. Crafted from premium hypoallergenic latex & body-safe silicone to deliver intense friction and sensation for both partners. 5-pack included.'
  },
  {
    id: 'prod-22',
    title: 'Aura Custom Sculpted Silicone Pocket Stroker',
    category: 'male',
    categoryName: 'Male Pleasure',
    price: 149.00,
    rating: 4.8,
    reviews: 112,
    image: 'images/custom_stroker.jpg',
    decibels: 0,
    material: 'silicone',
    materialName: 'Ultra-Soft SkinSafe™ Silicone',
    waterproof: '100% Submersible',
    intensity: 'Custom Adjustable Tightness & Suction',
    shortDesc: 'Dual-ended custom silicone pocket stroker with adjustable suction valve and realistic inner sleeve.',
    longDesc: 'Customizable internal tightness and textured nodes mimic natural warmth and suction. Crafted from non-porous SkinSafe™ silicone with a squeezable ergonomic outer shell, vacuum control valve, and dual entry ports. Easy to clean and sterilize.'
  },
  {
    id: 'prod-23',
    title: 'Aero Wave Sonic Air-Pulse Clitoral Massager',
    category: 'vibrators',
    categoryName: 'Vibrators & Wands',
    price: 129.00,
    rating: 4.9,
    reviews: 298,
    image: 'images/air_pulse.jpg',
    decibels: 26,
    material: 'silicone',
    materialName: 'Silky Medical Silicone',
    waterproof: 'IPX7 Submersible',
    intensity: 'Contactless Air-Pulsation Waves',
    shortDesc: 'Contactless air-pulsation technology delivering gentle flutter waves without direct friction.',
    longDesc: 'Engineered with contactless sonic wave technology that creates rhythmic air pressure pulses around sensitive nerve endings. 11 air-intensity levels, whisper motor under 26dB, USB magnetic charger, and 100% waterproof.'
  },
  {
    id: 'prod-24',
    title: 'Siren Crystal Jeweled Glass Plug',
    category: 'anal',
    categoryName: 'Anal & P-Spot',
    price: 85.00,
    rating: 4.8,
    reviews: 147,
    image: 'images/jeweled_plug.jpg',
    decibels: 0,
    material: 'glass',
    materialName: 'Borosilicate Glass & Rose Gold Gem',
    waterproof: '100% Submersible',
    intensity: 'Smooth Weighted Sensation',
    shortDesc: 'Hand-cut crystal teardrop glass plug with sparkling rose gold jewel base for sensory & temperature play.',
    longDesc: 'An exquisite piece of jewelry for intimate play. Teardrop shaped for smooth insertion and comfortable wear, topped with a faceted rose gold crystal gem. Temperature responsive — warm in water or cool in ice. Non-porous and hypoallergenic.'
  },
  {
    id: 'prod-25',
    title: 'Veluxe Ergonomic Strap-On Harness & Shaft Set',
    category: 'couples',
    categoryName: 'Couples Synergy',
    price: 159.00,
    rating: 4.9,
    reviews: 164,
    image: 'images/strap_on.jpg',
    decibels: 0,
    material: 'silicone',
    materialName: 'Velvet Straps & Medical Silicone',
    waterproof: 'Waterproof Shaft',
    intensity: 'Inclusive Shared Pleasure',
    shortDesc: 'Adjustable velvet-padded dual O-ring harness with flexible hollow medical silicone shaft.',
    longDesc: 'Designed for total comfort and body inclusivity. Features plush velvet-lined adjustable waist (26"-54") and leg straps, interchangeable brass O-rings, and a realistic hollow silicone shaft with textured internal walls for dual stimulation.'
  },
  {
    id: 'prod-26',
    title: 'Kama Sutra Glow-in-the-Dark Fantasy Dice Game',
    category: 'games',
    categoryName: 'Adult Games & Fantasy',
    price: 24.99,
    rating: 4.8,
    reviews: 320,
    image: 'images/adult_games.jpg',
    decibels: 0,
    material: 'satin',
    materialName: 'Luminous Acrylic & Velvet Pouch',
    waterproof: 'N/A',
    intensity: 'Spontaneous Intimate Play',
    shortDesc: 'Set of 4 luminous Kama Sutra positions & actions dice for spontaneous couples adventure.',
    longDesc: 'Roll the dice to determine action, location, position, and duration. Crafted from premium glow-in-the-dark acrylic with rounded edges, packaged in a plush velvet satin drawstring travel pouch.'
  },
  {
    id: 'prod-27',
    title: 'Naughty Desires Couples Fantasy Card Game',
    category: 'games',
    categoryName: 'Adult Games & Fantasy',
    price: 29.99,
    rating: 4.9,
    reviews: 412,
    image: 'images/couples_cards.jpg',
    decibels: 0,
    material: 'satin',
    materialName: 'Linen-Finish Gold Foil Cards',
    waterproof: 'N/A',
    intensity: 'Sensual Discovery & Truth',
    shortDesc: '150 couples fantasy prompt cards across Talk, Flirt, and Dare intimacy levels.',
    longDesc: 'Designed to deepen emotional and physical intimacy. 150 luxury gold-foil cards categorized into 3 levels: Talk, Flirt, and Dare.'
  },
  {
    id: 'prod-28',
    title: 'Velvet Touch RealFeel Dual-Layer Dildo',
    category: 'dildos',
    categoryName: 'Realistic & Glass Dildos',
    price: 89.00,
    rating: 4.9,
    reviews: 210,
    image: 'images/dildos.jpg',
    decibels: 0,
    material: 'silicone',
    materialName: 'Dual-Layer Medical Silicone',
    waterproof: '100% Waterproof (IPX8)',
    intensity: 'Realistic Flex & Suction Base',
    shortDesc: '7-inch dual-density silicone dildo with soft outer skin, firm inner core & strong suction base.',
    longDesc: 'Features realistic vein detailing, a soft squishy outer silicone layer over a firm inner column, and a heavy-duty suction base for hands-free fun.'
  },
  {
    id: 'prod-29',
    title: 'Aphrodite Sculpted Spiral Glass Dildo',
    category: 'dildos',
    categoryName: 'Realistic & Glass Dildos',
    price: 99.00,
    rating: 4.8,
    reviews: 185,
    image: 'images/glass_wand.jpg',
    decibels: 0,
    material: 'glass',
    materialName: 'Hand-Sculpted Borosilicate Glass',
    waterproof: '100% Waterproof (IPX8)',
    intensity: 'Temperature Play & Spiral Ribbing',
    shortDesc: 'Hypoallergenic crystal glass dildo with spiral ridges. Warm in water or cool in fridge.',
    longDesc: 'Hand-crafted from durable non-porous borosilicate glass. Features delicate spiral ribbed texture for heightened sensation.'
  },
  {
    id: 'prod-30',
    title: 'Stallion Auto-Thrust Male Masturbator',
    category: 'masturbators',
    categoryName: 'Male Masturbators & Sleeves',
    price: 229.00,
    rating: 4.9,
    reviews: 350,
    image: 'images/masturbator.jpg',
    decibels: 38,
    material: 'silicone',
    materialName: 'Soft TPE Inner Sleeve & ABS Casing',
    waterproof: 'Splashproof Sleeve',
    intensity: '10 Motorized Thrusting Modes',
    shortDesc: 'Automated thrusting male masturbator with 10 speeds, warming core & textured sleeve.',
    longDesc: 'Engineered with a high-torque motorized inner piston providing up to 300 thrusts per minute and internal heating core.'
  },
  {
    id: 'prod-31',
    title: 'Vortex Textured Pocket Stroker Sleeve',
    category: 'masturbators',
    categoryName: 'Male Masturbators & Sleeves',
    price: 49.00,
    rating: 4.7,
    reviews: 290,
    image: 'images/custom_stroker.jpg',
    decibels: 0,
    material: 'silicone',
    materialName: 'Ultra-Flex Ribbed Silicone',
    waterproof: '100% Waterproof (IPX8)',
    intensity: 'Compact Manual Stroker',
    shortDesc: 'Discreet pocket-sized manual male stroker sleeve with spiral internal suction ribs.',
    longDesc: 'Super stretchy and compact. Internal chamber lined with hundreds of raised stimulation nodes and spiral ribs.'
  },
  {
    id: 'prod-32',
    title: 'Titan Pro Hands-Free Thrusting Machine',
    category: 'machines',
    categoryName: 'Machines & Automated Devices',
    price: 499.00,
    rating: 5.0,
    reviews: 142,
    image: 'images/machine.jpg',
    decibels: 42,
    material: 'silicone',
    materialName: 'Heavy-Duty Steel & Medical Silicone',
    waterproof: 'Machine Body Dry Only / Attachments Waterproof',
    intensity: 'Heavy-Duty Adjustable Motor Machine',
    shortDesc: 'Professional automated sex machine with multi-angle stand, remote control & 2 attachments.',
    longDesc: 'Heavy-duty steel frame sex machine offering 0-350 RPM variable thrusting power. Features a 180-degree adjustable locking tripod stand.'
  },
  {
    id: 'prod-33',
    title: 'AeroPulse Automated Rhythm Thruster',
    category: 'machines',
    categoryName: 'Machines & Automated Devices',
    price: 349.00,
    rating: 4.8,
    reviews: 98,
    image: 'images/air_pulse.jpg',
    decibels: 35,
    material: 'silicone',
    materialName: 'Whisper Motor & Soft Silicone Head',
    waterproof: 'Attachment 100% Waterproof',
    intensity: 'App-Controlled Pulsing Rhythm',
    shortDesc: 'Compact electronic hands-free automated rhythm thruster device with digital LED screen.',
    longDesc: 'Features smart app connectivity enabling sync with erotic audio or custom stroke patterns.'
  },
  {
    id: 'prod-34',
    title: 'Elysium Luxury TPE Intimacy Torso',
    category: 'dolls',
    categoryName: 'Sex Dolls & Torso Novelties',
    price: 799.00,
    rating: 4.9,
    reviews: 86,
    image: 'images/doll.jpg',
    decibels: 0,
    material: 'silicone',
    materialName: 'Medical Grade RealFeel TPE',
    waterproof: '100% Waterproof Channels',
    intensity: 'Full-Size Intimacy Torso',
    shortDesc: 'Life-like soft TPE silicone intimacy torso novelty with realistic weight & dual channels.',
    longDesc: 'Crafted with premium high-density TPE silicone for ultra-realistic soft skin feel and realistic internal anatomy.'
  },
  {
    id: 'prod-35',
    title: 'Aphrodite Full Silhouette Intimacy Doll',
    category: 'dolls',
    categoryName: 'Sex Dolls & Torso Novelties',
    price: 1299.00,
    rating: 5.0,
    reviews: 54,
    image: 'images/lingerie1.jpg',
    decibels: 0,
    material: 'silicone',
    materialName: 'Articulated Steel Skeleton & Medical TPE',
    waterproof: 'Easy Clean Water Resistant',
    intensity: 'Full-Body Articulated Skeleton Doll',
    shortDesc: 'Full 5ft 2in articulated steel frame intimacy doll with soft skin TPE silicone & French lace lingerie.',
    longDesc: 'State of the art articulated stainless steel internal skeleton allowing realistic flex and poseability.'
  },
  {
    id: 'prod-36',
    title: 'Obsidian Vibrating Anal Plug with Remote',
    category: 'anal',
    categoryName: 'Anal Sex Toys & Plugs',
    price: 79.00,
    rating: 4.8,
    reviews: 215,
    image: 'images/anal_toy.jpg',
    decibels: 28,
    material: 'silicone',
    materialName: 'Silky Touch Silicone & Wireless Remote',
    waterproof: '100% Waterproof (IPX7)',
    intensity: '12 Deep Rumbling Vibe Modes',
    shortDesc: 'Tapered silicone anal plug with powerful rumbling motor, safe flared base & 30ft wireless remote.',
    longDesc: 'Designed with a smooth narrow tip for easy insertion and a flat ergonomic flared base for safe wear.'
  },
  {
    id: 'prod-37',
    title: 'Siren Jeweled Stainless Steel Anal Plug',
    category: 'anal',
    categoryName: 'Anal Sex Toys & Plugs',
    price: 65.00,
    rating: 4.9,
    reviews: 178,
    image: 'images/jeweled_plug.jpg',
    decibels: 0,
    material: 'glass',
    materialName: 'Polished Stainless Steel & Crystal Gem',
    waterproof: '100% Waterproof (IPX8)',
    intensity: 'Weighted & Temperature Play',
    shortDesc: 'Sleek weighted metal anal plug adorned with a sparkling rose gold crystal gem base.',
    longDesc: 'Hand-polished mirror finish stainless steel plug providing luxurious weighted sensation.'
  },
  {
    id: 'prod-38',
    title: 'Scarlet Velvet Vibrating Nipple Clamps',
    category: 'nipples',
    categoryName: 'Nipple Toys & Clamps',
    price: 45.00,
    rating: 4.7,
    reviews: 142,
    image: 'images/nipple_toy.jpg',
    decibels: 25,
    material: 'satin',
    materialName: 'Rubber-Tipped Clamps & Gold Chain',
    waterproof: 'Splashproof',
    intensity: 'Adjustable Pinch & 7 Vibe Modes',
    shortDesc: 'Pair of rubber-padded vibrating nipple clamps connected by a gold chain with 7 vibe speeds.',
    longDesc: 'Features smooth rubber-coated clamp tips with knurled tension screws for custom pressure adjustment.'
  },
  {
    id: 'prod-39',
    title: 'Aero Vacuum Nipple Suction Cups (Pair)',
    category: 'nipples',
    categoryName: 'Nipple Toys & Clamps',
    price: 35.00,
    rating: 4.8,
    reviews: 198,
    image: 'images/oils1.jpg',
    decibels: 0,
    material: 'silicone',
    materialName: 'Medical Silicone & Clear Acrylic',
    waterproof: '100% Waterproof (IPX8)',
    intensity: 'Twist-Cap Vacuum Suction',
    shortDesc: 'Pair of twist-cap vacuum nipple suction cylinders for arousal and sensitivity enhancement.',
    longDesc: 'Easy-to-use manual vacuum cups. Simply place over nipple and twist the top valve knob.'
  }
];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initAgeGate();
  fetchProducts();
  initNavigation();
  initCatalog();
  initGuideSection();
  initVisualizer();
  initQuiz();
  initAtmosphereStudio();
  initDiscreetMode();
  initSearch();
  initCart();
});

// --- Age Verification Gate (18+) ---
function initAgeGate() {
  const ageGateModal = document.getElementById('ageGateModal');
  const verifyAgeBtn = document.getElementById('verifyAgeBtn');
  const exitAgeBtn = document.getElementById('exitAgeBtn');

  if (!ageGateModal) return;

  if (localStorage.getItem('sexToys_ageVerified') === 'true') {
    ageGateModal.classList.add('verified');
    ageGateModal.style.display = 'none';
    state.isAgeVerified = true;
  } else {
    ageGateModal.classList.remove('verified');
    ageGateModal.style.display = 'flex';
  }

  if (verifyAgeBtn) {
    verifyAgeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      confirmAge(true);
    });
  }

  if (exitAgeBtn) {
    exitAgeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      confirmAge(false);
    });
  }
}

function confirmAge(isVerified) {
  const ageGateModal = document.getElementById('ageGateModal');
  if (isVerified) {
    localStorage.setItem('sexToys_ageVerified', 'true');
    state.isAgeVerified = true;
    if (ageGateModal) {
      ageGateModal.classList.add('verified');
      ageGateModal.style.display = 'none';
    }
    showToast('<i class="fa-solid fa-shield-check"></i> Age Verified (18+). Welcome to sexToys Storefront!');
  } else {
    alert('Access Denied. You must be 18 years of age or older to enter this store.');
    window.location.href = 'https://www.google.com';
  }
}

// --- Dynamic JSON Database Fetcher & Fallback Handler ---
async function fetchProducts() {
  try {
    const res = await fetch('products.json');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        products = data;
      }
    }
  } catch (err) {
    console.log('Using built-in product array', err);
  }
  renderProducts();
  initBundleBuilder();
}

function handleImageError(img) {
  img.onerror = null;
  img.src = 'images/placeholder.jpg';
}

// --- Navigation & Mobile Menu ---
function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
  }
}

// --- Systematic Intimacy Guide Section ---
function initGuideSection() {
  const tabBtns = document.querySelectorAll('.guide-tab-btn');
  const contentMap = {
    female:  document.getElementById('guideFemale'),
    male:    document.getElementById('guideMale'),
    couples: document.getElementById('guideCouples'),
    sensory: document.getElementById('guideSensory'),
    safety:  document.getElementById('guideSafety'),
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active tab button
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Hide all content panels
      Object.values(contentMap).forEach(panel => {
        if (panel) panel.classList.add('hidden');
      });

      // Show selected panel with fade-in
      const target = btn.dataset.guideTarget;
      const panel = contentMap[target];
      if (panel) {
        panel.classList.remove('hidden');
        panel.style.animation = 'none';
        panel.offsetHeight; // reflow
        panel.style.animation = 'fadeInGuide 0.4s ease';
      }

      const labelMap = {
        female:  'Female Devices Guide',
        male:    'Male Devices Guide',
        couples: 'Couples Synergy Guide',
        sensory: 'Temperature & Sensory Guide',
        safety:  'Condoms & Lubricants Guide',
      };
      showToast(`<i class="fa-solid fa-book-open"></i> ${labelMap[target]}`);
    });
  });
}

// --- Stealth / Discreet Mode Toggle ---
function initDiscreetMode() {
  const toggleBtn = document.getElementById('toggleDiscreetBtn');
  const disableBtn = document.getElementById('disableDiscreetBtn');
  const discreetBanner = document.getElementById('discreetBanner');
  const brandTitle = document.getElementById('brandTitleText');
  const brandSubtext = document.getElementById('brandSubtext');
  const heroTitle = document.getElementById('heroTitle');
  const heroDesc = document.getElementById('heroDesc');

  function enableDiscreetMode() {
    state.isDiscreetMode = true;
    document.body.classList.add('theme-discreet');
    if (discreetBanner) discreetBanner.classList.remove('hidden');
    if (brandTitle) brandTitle.textContent = 'LUMINA';
    if (brandSubtext) brandSubtext.textContent = 'BOTANICAL SPA & HOME FRAGRANCE';
    if (heroTitle) heroTitle.innerHTML = 'Elevate Your Home & <span class="gradient-text">Relaxation Sanctuary</span>';
    if (heroDesc) heroDesc.textContent = 'Discover essential botanical oils, aromatic lavender room candles, and spa relaxation accessories.';
    showToast('<i class="fa-solid fa-user-shield"></i> Stealth Privacy Mode Activated');
  }

  function disableDiscreetMode() {
    state.isDiscreetMode = false;
    document.body.classList.remove('theme-discreet');
    if (discreetBanner) discreetBanner.classList.add('hidden');
    if (brandTitle) brandTitle.textContent = 'sexToys';
    if (brandSubtext) brandSubtext.textContent = 'Sex Toys & Adult Games';
    if (heroTitle) heroTitle.innerHTML = 'Sex Toys & Adult Games Storefront';
    if (heroDesc) heroDesc.textContent = 'Browse high-definition product images of Dildos, Male Masturbators, Sex Machines, Sex Dolls, Anal Toys & Nipple Clamps.';
    showToast('Exited Stealth Mode');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (state.isDiscreetMode) disableDiscreetMode();
      else enableDiscreetMode();
    });
  }

  if (disableBtn) {
    disableBtn.addEventListener('click', disableDiscreetMode);
  }
}

// --- Product Catalog Engine ---
function filterCategory(category) {
  state.activeCategory = category;
  const filterTabs = document.querySelectorAll('#categoryFilterTabs .filter-tab');
  filterTabs.forEach(t => {
    if (t.dataset.category === category) t.classList.add('active');
    else t.classList.remove('active');
  });
  renderProducts();

  const catalogSection = document.getElementById('catalog');
  if (catalogSection) {
    catalogSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function initCatalog() {
  renderProducts();

  // Category filter tabs
  const filterTabs = document.querySelectorAll('#categoryFilterTabs .filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      filterTabs.forEach(t => t.classList.remove('active'));
      const targetBtn = e.currentTarget || e.target;
      targetBtn.classList.add('active');
      state.activeCategory = targetBtn.dataset.category;
      renderProducts();
    });
  });

  // Dropdown filters
  const matFilter = document.getElementById('materialFilter');
  if (matFilter) {
    matFilter.addEventListener('change', (e) => {
      state.activeMaterial = e.target.value;
      renderProducts();
    });
  }

  const noiseFilter = document.getElementById('noiseFilter');
  if (noiseFilter) {
    noiseFilter.addEventListener('change', (e) => {
      state.activeNoise = e.target.value;
      renderProducts();
    });
  }

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  let filtered = [...products];

  // Category Filter
  if (state.activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === state.activeCategory);
  }

  // Material Filter
  if (state.activeMaterial !== 'all') {
    filtered = filtered.filter(p => p.material === state.activeMaterial);
  }

  // Noise Filter
  if (state.activeNoise !== 'all') {
    const maxDb = parseInt(state.activeNoise);
    filtered = filtered.filter(p => p.decibels > 0 && p.decibels <= maxDb);
  }

  // Sorting
  if (state.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (state.sortBy === 'quietest') {
    filtered.sort((a, b) => (a.decibels || 99) - (b.decibels || 99));
  }

  grid.innerHTML = filtered.map(product => {
    const mainImg = Array.isArray(product.image_url) && product.image_url.length > 0 ? product.image_url[0] : (product.image || 'images/placeholder.jpg');
    const title = product.name || product.title;
    const price = Number(product.price).toFixed(2);
    const desc = product.description || product.shortDesc;

    return `
      <div class="product-card">
        <div class="card-image-wrap">
          <img src="${mainImg}" alt="${title}" loading="lazy" onerror="handleImageError(this)">
          ${product.rating >= 4.8 ? `<div class="amz-choice-tag" style="position: absolute; top: 12px; left: 12px; z-index: 2;"><i class="fa-solid fa-check"></i> sexToys Choice</div>` : ''}
          ${product.decibels > 0 ? `<div class="noise-badge" style="top: ${product.rating >= 4.8 ? '40px' : '12px'};"><i class="fa-solid fa-volume-xmark"></i> ${product.decibels} dB Quiet</div>` : ''}
          <button class="wishlist-btn-card ${state.wishlist.has(product.id) ? 'active' : ''}" onclick="toggleWishlist('${product.id}')">
            <i class="${state.wishlist.has(product.id) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
        </div>

        <div class="card-body">
          <span class="product-category">${product.categoryName}</span>
          <h3 class="product-title">${title}</h3>
          
          <div style="color: #febd69; font-size: 0.85rem; margin: 4px 0 8px 0; display: flex; align-items: center; gap: 4px;">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            <span style="color: #00a8e8; margin-left: 4px;">${product.rating} (${product.reviews})</span>
          </div>

          <p class="product-desc">${desc}</p>

          <div class="amz-prime-tag">
            <i class="fa-solid fa-truck-fast"></i> <strong style="color: #febd69;">prime</strong> <span style="font-weight: 400; color: #ccc; font-size: 0.78rem;">FREE One-Day Discreet Shipping</span>
          </div>

          <div class="card-footer-row" style="margin-top: 14px;">
            <span class="product-price" style="color: #febd69;">$${price}</span>
            <div class="card-action-btns">
              <button class="btn btn-secondary btn-sm" onclick="openQuickView('${product.id}')" title="View High-Res Multi-Image Gallery & Details">
                <i class="fa-solid fa-images"></i> View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// --- Quick View Modal with Multi-Image Gallery ---
function openQuickView(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const modalBackdrop = document.getElementById('productModalBackdrop');
  const modalGrid = document.getElementById('modalGridContent');

  const title = product.name || product.title;
  const price = Number(product.price).toFixed(2);
  const desc = product.description || product.longDesc;

  const images = Array.isArray(product.image_url) && product.image_url.length > 0
    ? product.image_url
    : [product.image || 'images/placeholder.jpg'];

  modalGrid.innerHTML = `
    <div class="product-gallery-container">
      <div class="gallery-main-view">
        <img id="mainGalleryImg" src="${images[0]}" alt="${title}" onerror="handleImageError(this)">
      </div>
      <div class="gallery-thumbs-strip">
        ${images.map((imgSrc, idx) => `
          <img src="${imgSrc}" class="thumb-img ${idx === 0 ? 'active' : ''}" 
               onclick="switchGalleryImage('${imgSrc}', this)" onerror="handleImageError(this)" alt="Thumbnail ${idx + 1}">
        `).join('')}
      </div>
    </div>

    <div class="modal-product-info">
      <span class="product-category">${product.categoryName}</span>
      <h2>${title}</h2>
      <div style="color: #febd69; margin: 8px 0; font-size: 0.9rem;">
        <i class="fa-solid fa-star"></i> ${product.rating} (${product.reviews} Customer Reviews)
      </div>
      <p style="color: var(--color-text-muted); margin-bottom: 16px;">${desc}</p>

      <div style="background: #232f3e; color: #febd69; padding: 10px 14px; border-radius: 8px; font-size: 0.84rem; font-weight: 600; margin-bottom: 18px; display: flex; align-items: center; gap: 8px;">
        <i class="fa-solid fa-box-open"></i> 100% Plain Unbranded Brown Box Packaging Guaranteed
      </div>

      <ul style="list-style: none; font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 20px;">
        <li><i class="fa-solid fa-check green-text"></i> Material: ${product.material || product.materialName || 'Medical Silicone'}</li>
        <li><i class="fa-solid fa-check green-text"></i> Stock Status: ${product.stock || 12} Units Available in Warehouse</li>
        <li><i class="fa-solid fa-check green-text"></i> Waterproofing: ${product.waterproof || '100% Waterproof'}</li>
        <li><i class="fa-solid fa-check green-text"></i> Billing Descriptor: Confidential ("WL BOUTIQUE LLC")</li>
      </ul>

      <div style="font-size: 1.8rem; font-family: 'Inter', sans-serif; font-weight: 700; color: #febd69; margin-bottom: 20px;">$${price}</div>
      
      <button class="btn btn-secondary btn-block" onclick="closeQuickView();">
        <i class="fa-solid fa-xmark"></i> Close Product Preview
      </button>
    </div>
  `;

  modalBackdrop.classList.remove('hidden');
}

function switchGalleryImage(src, thumbEl) {
  const mainImg = document.getElementById('mainGalleryImg');
  if (mainImg) mainImg.src = src;
  document.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
  if (thumbEl) thumbEl.classList.add('active');
}ssList.remove('hidden');
}

function closeQuickView() {
  document.getElementById('productModalBackdrop').classList.add('hidden');
}

document.getElementById('closeProductModalBtn').addEventListener('click', closeQuickView);

// --- Vibration Soundwave Visualizer (HTML5 Canvas Engine) ---
function initVisualizer() {
  const canvas = document.getElementById('vibroCanvas');
  const ctx = canvas.getContext('2d');
  const patternBtns = document.querySelectorAll('.vibro-btn');
  const speedRange = document.getElementById('speedRange');
  const speedValue = document.getElementById('speedValue');
  const activePatternName = document.getElementById('activePatternName');

  patternBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      patternBtns.forEach(b => b.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      state.activeVibroPattern = target.dataset.pattern;
      activePatternName.textContent = 'Pattern: ' + target.textContent.trim();
    });
  });

  speedRange.addEventListener('input', (e) => {
    state.vibroSpeed = parseInt(e.target.value);
    speedValue.textContent = `Level ${state.vibroSpeed} (${state.vibroSpeed > 7 ? 'Intense Thrum' : 'Deep Pulse'})`;
  });

  let time = 0;

  function drawWave() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;
    const speedMultiplier = state.vibroSpeed * 0.05;

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--color-velvet-glow').trim() || '#e62e7b';

    for (let x = 0; x < width; x++) {
      let y = centerY;
      const freq = 0.03 * (state.vibroSpeed * 0.5);

      if (state.activeVibroPattern === 'pulse') {
        y = centerY + Math.sin(x * freq + time) * 35 * Math.sin(time * 2);
      } else if (state.activeVibroPattern === 'escalate') {
        const amplitude = (x / width) * 55;
        y = centerY + Math.sin(x * freq + time * 3) * amplitude;
      } else if (state.activeVibroPattern === 'rhythm') {
        y = centerY + Math.sin(x * 0.02 + time) * 30 + Math.cos(x * 0.05 - time * 2) * 15;
      } else if (state.activeVibroPattern === 'ocean') {
        y = centerY + Math.sin(x * 0.01 + time * 0.5) * 45;
      } else if (state.activeVibroPattern === 'thrum') {
        y = centerY + (Math.random() - 0.5) * (15 * state.vibroSpeed);
      }

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.shadowBlur = 15;
    ctx.shadowColor = ctx.strokeStyle;
    ctx.stroke();

    time += speedMultiplier;
    requestAnimationFrame(drawWave);
  }

  drawWave();
}

// --- Interactive Intimacy & Fantasy Quiz Engine ---
function initQuiz() {
  const steps = [
    document.getElementById('quizStep1'),
    document.getElementById('quizStep2'),
    document.getElementById('quizStep3')
  ];
  const quizResult = document.getElementById('quizResult');
  const progressFill = document.getElementById('quizProgressFill');

  document.querySelectorAll('.quiz-opt-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const currentStep = e.currentTarget.closest('.quiz-step');
      const stepIdx = steps.indexOf(currentStep);

      state.quizAnswers[stepIdx] = e.currentTarget.dataset.answer;

      currentStep.classList.add('hidden');

      if (stepIdx < steps.length - 1) {
        steps[stepIdx + 1].classList.remove('hidden');
        progressFill.style.width = ((stepIdx + 2) / 3 * 100) + '%';
      } else {
        progressFill.style.width = '100%';
        showQuizResult();
      }
    });
  });

  document.getElementById('restartQuizBtn').addEventListener('click', () => {
    quizResult.classList.add('hidden');
    steps[0].classList.remove('hidden');
    steps[1].classList.add('hidden');
    steps[2].classList.add('hidden');
    progressFill.style.width = '25%';
    state.quizAnswers = {};
  });
}

function showQuizResult() {
  const resultScreen = document.getElementById('quizResult');
  const resultTitle = document.getElementById('resultTitle');
  const resultDesc = document.getElementById('resultDesc');
  const productCard = document.getElementById('resultProductCard');

  let matchProduct = products[0]; // Default

  const ans1 = state.quizAnswers[0];
  if (ans1 === 'couples-synergy') matchProduct = products[2];
  else if (ans1 === 'glass-art') matchProduct = products[1];
  else if (ans1 === 'tactile-fantasy') matchProduct = products[3];

  resultTitle.textContent = matchProduct.title;
  resultDesc.textContent = matchProduct.shortDesc;

  productCard.innerHTML = `
    <img src="${matchProduct.image}" alt="${matchProduct.title}">
    <div style="text-align: left;">
      <h4 style="font-size: 1.1rem; color: #fff;">${matchProduct.title}</h4>
      <span style="color: var(--color-gold-light); font-weight: 700; font-size: 1.1rem;">$${matchProduct.price.toFixed(2)}</span>
      <button class="btn btn-primary btn-glow" style="margin-top: 10px; font-size: 0.82rem; padding: 8px 16px;" onclick="addToCart('${matchProduct.id}')">
        <i class="fa-solid fa-cart-plus"></i> Add Match to Selection
      </button>
    </div>
  `;

  resultScreen.classList.remove('hidden');
}

// --- Atmosphere Studio (Mood Glow & Web Audio Synth) ---
function initAtmosphereStudio() {
  const moodBtns = document.querySelectorAll('.mood-theme-btn');
  const ambientContainer = document.getElementById('ambientContainer');

  moodBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      moodBtns.forEach(b => b.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      
      const color = target.dataset.color;
      document.documentElement.style.setProperty('--color-velvet-dark', color);
      showToast(`Atmosphere Mood Switched to ${target.querySelector('.mood-name').textContent}`);
    });
  });

  // Web Audio Synth
  const audioBtn = document.getElementById('toggleAmbientAudioBtn');
  audioBtn.addEventListener('click', toggleAudioSynth);
}

function toggleAudioSynth() {
  const btn = document.getElementById('toggleAmbientAudioBtn');

  if (!state.audioSynth.isPlaying) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(110, ctx.currentTime); // A2 warm drone
    
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(164.81, ctx.currentTime); // E3 harmonic

    gain.gain.setValueAtTime(0.08, ctx.currentTime); // Gentle soothing background volume

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();

    state.audioSynth = { ctx, osc1, osc2, gain, isPlaying: true };
    btn.innerHTML = '<i class="fa-solid fa-pause"></i> Mute Ambient Waves';
    showToast('<i class="fa-solid fa-music"></i> Playing Soothing Ambient Drone Waves');
  } else {
    state.audioSynth.gain.gain.exponentialRampToValueAtTime(0.0001, state.audioSynth.ctx.currentTime + 0.5);
    setTimeout(() => {
      state.audioSynth.osc1.stop();
      state.audioSynth.osc2.stop();
      state.audioSynth.ctx.close();
      state.audioSynth.isPlaying = false;
      btn.innerHTML = '<i class="fa-solid fa-play"></i> Start Ambient Waves';
    }, 500);
  }
}

// --- Live Search ---
function initSearch() {
  const searchBtn = document.getElementById('searchToggleBtn');
  const closeBtn = document.getElementById('closeSearchBtn');
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('searchInput');
  const resultsList = document.getElementById('searchResultsList');

  if (searchBtn && overlay && input) {
    searchBtn.addEventListener('click', () => {
      overlay.classList.remove('hidden');
      input.focus();
    });
  }

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.add('hidden');
    });
  }

  if (input && resultsList) {
    input.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) {
        resultsList.innerHTML = '';
        return;
      }

      const matches = products.filter(p => {
        const title = (p.name || p.title || '').toLowerCase();
        const desc = (p.description || p.shortDesc || '').toLowerCase();
        const mat = (p.material || p.materialName || '').toLowerCase();
        return title.includes(query) || desc.includes(query) || mat.includes(query);
      });

      resultsList.innerHTML = matches.map(p => {
        const img = Array.isArray(p.image_url) && p.image_url.length > 0 ? p.image_url[0] : (p.image || 'images/placeholder.jpg');
        const title = p.name || p.title;
        const price = Number(p.price).toFixed(2);
        return `
          <div style="display: flex; gap: 14px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); align-items: center; cursor: pointer;" onclick="openQuickView('${p.id}'); document.getElementById('searchOverlay').classList.add('hidden');">
            <img src="${img}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;" onerror="handleImageError(this)">
            <div>
              <h5 style="color: #fff;">${title}</h5>
              <span style="font-size: 0.8rem; color: #febd69;">$${price}</span>
            </div>
          </div>
        `;
      }).join('');
    });
  }

  document.querySelectorAll('.tag-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (input) {
        input.value = e.target.dataset.search || '';
        input.dispatchEvent(new Event('input'));
      }
    });
  });
}

// --- Wishlist System ---
function initCart() {
  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartOverlay = document.getElementById('cartOverlay');

  if (cartToggleBtn && cartOverlay) {
    cartToggleBtn.addEventListener('click', () => {
      cartOverlay.classList.remove('hidden');
    });
  }

  if (closeCartBtn && cartOverlay) {
    closeCartBtn.addEventListener('click', () => {
      cartOverlay.classList.add('hidden');
    });
  }

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (state.cart.length === 0) {
        showToast('Your selection is empty');
        return;
      }
      if (cartOverlay) cartOverlay.classList.add('hidden');
      const checkoutModal = document.getElementById('checkoutModalBackdrop');
      if (checkoutModal) checkoutModal.classList.remove('hidden');
      updateCheckoutTotal();
    });
  }
}

function toggleWishlist(productId) {
  if (state.wishlist.has(productId)) {
    state.wishlist.delete(productId);
    showToast('Removed from Wishlist');
  } else {
    state.wishlist.add(productId);
    showToast('<i class="fa-solid fa-heart"></i> Added to Private Wishlist');
  }
  const badge = document.getElementById('wishlistBadge');
  if (badge) badge.textContent = state.wishlist.size;
  renderProducts();
}

function addToCart(productId) {
  showToast('<i class="fa-solid fa-check"></i> Product Selected');
}

function updateCartQty(productId, delta) {}

function updateCartUI() {}

function updateCheckoutTotal() {}

function handleCheckoutSubmit() {}

// --- Toast Feedback Utility ---
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}

// --- Custom VIP Intimacy Bundle Builder Logic ---
function initBundleBuilder() {
  const deviceSelect = document.getElementById('bundleDeviceSelect');
  if (deviceSelect) {
    updateBundleSummary();
  }
}

function updateBundleSummary() {
  const devSelect = document.getElementById('bundleDeviceSelect');
  const lubeSelect = document.getElementById('bundleLubeSelect');
  const accSelect = document.getElementById('bundleAccessorySelect');

  if (!devSelect || !lubeSelect || !accSelect) return;

  const devProd = products.find(p => p.id === devSelect.value);
  const lubeProd = products.find(p => p.id === lubeSelect.value);
  const accProd = products.find(p => p.id === accSelect.value);

  if (devProd) {
    document.getElementById('bundleDevicePreview').innerHTML = `
      <img src="${devProd.image}" alt="${devProd.title}">
      <div>
        <h5>${devProd.title}</h5>
        <span>$${devProd.price.toFixed(2)}</span>
      </div>
    `;
  }

  if (lubeProd) {
    document.getElementById('bundleLubePreview').innerHTML = `
      <img src="${lubeProd.image}" alt="${lubeProd.title}">
      <div>
        <h5>${lubeProd.title}</h5>
        <span>$${lubeProd.price.toFixed(2)}</span>
      </div>
    `;
  }

  if (accProd) {
    document.getElementById('bundleAccessoryPreview').innerHTML = `
      <img src="${accProd.image}" alt="${accProd.title}">
      <div>
        <h5>${accProd.title}</h5>
        <span>$${accProd.price.toFixed(2)}</span>
      </div>
    `;
  }

  const subtotal = (devProd ? devProd.price : 0) + (lubeProd ? lubeProd.price : 0) + (accProd ? accProd.price : 0);
  const finalPrice = subtotal * 0.85; // 15% discount

  document.getElementById('bundleOriginalPrice').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('bundleFinalPrice').textContent = `$${finalPrice.toFixed(2)}`;
}

function addBundleToCart() {
  showToast('<i class="fa-solid fa-gift"></i> VIP Trio Bundle (15% OFF) Selected!');
}
