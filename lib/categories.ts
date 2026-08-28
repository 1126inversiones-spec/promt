import {
  Flame,
  Waves,
  Sparkles,
  Droplets,
  Wind,
  Milk,
  GlassWater,
  Snowflake,
  Cherry,
  Zap,
  Leaf,
  Fish,
  Coffee,
  Wine,
  Soup,
  Utensils,
  Croissant,
  IceCream,
  type LucideIcon,
} from "lucide-react";

export type CategoryId =
  | "wok"
  | "steam"
  | "dust-savory"
  | "cheese-pull"
  | "bbq"
  | "choc"
  | "caramel"
  | "dust-sweet"
  | "berry"
  | "cold-beverage"
  | "hot-beverage"
  | "soup"
  | "salad"
  | "seafood"
  | "rice"
  | "bread"
  | "appetizer"
  | "smoothie"
  | "cocktail"
  | "coffee-art"
  | "ice-cream-drip"
  | "meat-sear"
  | "oil-gloss"
  | "herb-sprinkle";

export interface IngredientField {
  label: string;
  placeholder: string;
  defaultValue: string;
}

export interface Category {
  id: CategoryId;
  icon: LucideIcon;
  title: string;
  desc: string;
  background: string;
  sampleDish: string;
  kicker: string;
  ingredient?: IngredientField;
  body: (dish: string, background: string, extra: string, ingredient: string) => string;
}

export const CATEGORIES: Category[] = [
  // ========== ORIGINAL HOT DISHES (MEJORADOS) ==========
  {
    id: "wok",
    icon: Flame,
    title: "Wok toss & stir-fry",
    desc: "Noodles, fried rice, stir-fried pasta",
    background: "dark moody kitchen background with warm amber glow",
    sampleDish: "stir-fried noodles and crisp vegetables",
    kicker: "high-impact food commercial video",
    body: (d, bg, extra) =>
      `Cinematic wok toss sequence: glossy ${d} lift and rotate dynamically mid-air in ultra slow motion with dramatic spinning. Intense wok-hei effect with bright orange-red flames curling around the base, glowing ember sparks floating through thick aromatic steam swirling upwards.\n\nExtreme close-up macro shots, dramatic cinematic 3-point lighting, ${bg}, glossy glistening sauce reflections, phantom flex 120fps slow-motion, 8k commercial film quality.${extra}`,
  },
  {
    id: "steam",
    icon: Waves,
    title: "Heavy steam",
    desc: "Ramen, soups, stews, hot dishes",
    background: "dark atmospheric moody background with warm rim lighting",
    sampleDish: "steaming ramen noodles",
    kicker: "cinematic product shot",
    body: (d, bg, extra) =>
      `Dense, velvety white steam and intense heat shimmer billow smoothly and continuously upwards from the freshly cooked ${d} in hypnotic waves. The broth surface glistens with subtle sizzling micro-bubbles and oil reflections. Delicate rising heat trails curl realistically with physics-based particle effects.\n\nStatic locked-off camera, soft warm directional side lighting highlighting fine steam texture, ultra shallow depth of field with warm bokeh highlights, 8k resolution photorealistic render.${extra}`,
  },
  {
    id: "dust-savory",
    icon: Sparkles,
    title: "Spice & cheese dust",
    desc: "Pizza, pasta, burgers, cuts of meat",
    background: "dark moody studio background with soft spotlighting",
    sampleDish: "gourmet finished dish",
    ingredient: {
      label: "What's falling (cheese, spices, salt, herbs...)",
      placeholder: "grated parmesan cheese and fresh black pepper",
      defaultValue: "grated parmesan cheese and fresh black pepper",
    },
    kicker: "commercial slow-motion video",
    body: (d, bg, extra, ing) =>
      `Macro shot in extreme slow motion: a fine continuous cascade of ${ing} falls gently onto the ${d}, with individual particles catching golden-hour studio light as they drift and float softly around the plate in a dreamy cloud.\n\nCinematic macro lens with tilt-shift focus, ${bg}, high-speed phantom camera 1000fps aesthetic, rich food textures with perfect particle definition, award-winning food photography lighting, 8k resolution.${extra}`,
  },
  {
    id: "cheese-pull",
    icon: Droplets,
    title: "Cheese pull & sauce drip",
    desc: "Pizza, burgers, lasagna",
    background: "professional food studio backdrop with dramatic lighting",
    sampleDish: "gourmet burger",
    ingredient: {
      label: "What's melting or dripping (cheese, sauce, honey...)",
      placeholder: "stretchy melted mozzarella",
      defaultValue: "stretchy melted mozzarella",
    },
    kicker: "mouthwatering food commercial",
    body: (d, bg, extra, ing) =>
      `Ultra slow-motion macro gooey stretch and drip animation: rich ${ing} on the ${d} pulls upward with elastic, bubbling micro-textures forming mesmerizing gravity-defying ribbons, or a thick glossy sauce drips slowly down the side with perfect fluid dynamics. Warm glistening specular highlights on the glossy surface.\n\nCommercial-grade macro lighting with LED ring fill, ${bg}, perfect depth of field separation, vibrant saturated colors, 8k photorealistic cinema quality.${extra}`,
  },
  {
    id: "bbq",
    icon: Wind,
    title: "Char & grill smoke",
    desc: "Grilled meats, ribs, skewers",
    background: "dark rustic steakhouse atmosphere with warm glowing coals",
    sampleDish: "char-grilled prime rib",
    kicker: "cinematic grill commercial",
    body: (d, bg, extra) =>
      `Wisps of rich aromatic slow-moving barbecue smoke drift gracefully across the perfectly seared ${d}. Subtle glowing orange-red embers spark and pulse softly under the grill grate with realistic micro heat-haze distortion shimmering above the sear marks. Juicy glaze sizzles and steams gently.\n\n${bg}, dramatic warm rim lighting with golden hour color grading, ultra-detailed smoke particle simulation, 8k ultra-cinematic food photography with steakhouse atmosphere.${extra}`,
  },

  // ========== DESSERTS (MEJORADOS) ==========
  {
    id: "choc",
    icon: Milk,
    title: "Chocolate cascade",
    desc: "Lava cakes, moist cakes, ice cream, brownies",
    background: "dark moody luxury dessert bar background with soft warm bokeh and ambient lighting",
    sampleDish: "molten chocolate lava cake",
    kicker: "luxury dessert commercial video",
    body: (d, bg, extra) =>
      `Animate the liquid pour: a rich, glossy stream of dark molten Belgian chocolate flows smoothly in extreme ultra slow-motion from above, coating and cascading over the ${d} with perfect fluid dynamics. Realistic viscous ribbons forming on the surface with mirror-like glossy reflections catching studio lights, subtle rising warmth and steam wisps.\n\nStatic locked-off camera, ${bg}, professional macro lens focus with shallow bokeh depth of field, warm studio rim lighting catching every chocolate glaze reflection, 8k resolution photorealistic luxury commercial.${extra}`,
  },
  {
    id: "caramel",
    icon: GlassWater,
    title: "Caramel drizzle",
    desc: "Cheesecake, flan, pancakes, waffles",
    background: "clean minimalist high-end bakery background with soft warm depth of field",
    sampleDish: "classic New York cheesecake",
    kicker: "mouthwatering pastry commercial",
    body: (d, bg, extra) =>
      `Golden translucent salted caramel stretches and pours in extreme slow motion over the ${d} like liquid gold. A thick, warm amber syrup cascades smoothly, forming delicate dripping beads and glistening liquid threads under warm key lights. Micro air bubbles caught within the viscous liquid with perfect transparency.\n\nCinematic macro product photography, soft golden hour lighting with rim highlights, ${bg}, hyper-realistic fluid physics simulation, 8k resolution luxury commercial.${extra}`,
  },
  {
    id: "dust-sweet",
    icon: Snowflake,
    title: "Powdered sugar snow",
    desc: "Croissants, tarts, tiramisu, souffles",
    background: "dark atmospheric studio backdrop with soft directional lighting",
    sampleDish: "fresh French croissant",
    ingredient: {
      label: "What's falling (sugar, cocoa, cinnamon...)",
      placeholder: "fine powdered confectioner's sugar",
      defaultValue: "fine powdered confectioner's sugar",
    },
    kicker: "high-speed food commercial video",
    body: (d, bg, extra, ing) =>
      `Macro phantom-flex 4K high-speed slow-motion: a delicate, continuous cloud of ${ing} drifts and snows down softly from above onto the ${d} like fresh Alpine powder. Microscopic particles float suspended in the air catching directional side rim light before settling with perfect physics.\n\n${bg}, crisp macro focus with ultra-shallow depth of field bokeh, high-contrast dynamic studio lighting, 8k resolution with ultra-detailed particle definition.${extra}`,
  },
  {
    id: "berry",
    icon: Cherry,
    title: "Berries & cream",
    desc: "Pavlova, strawberry cheesecake, waffles",
    background: "bright high-end luxury patisserie aesthetic with natural soft light",
    sampleDish: "velvety whipped cream swirl with berries",
    ingredient: {
      label: "Floating fruit / toppings (berries, mint, edible flowers...)",
      placeholder: "fresh raspberries, sliced strawberries, and mint leaves",
      defaultValue: "fresh raspberries, sliced strawberries, and mint leaves",
    },
    kicker: "dynamic dessert commercial",
    body: (d, bg, extra, ing) =>
      `Food levitation and micro-splash effect in zero-gravity: ${ing} float in beautiful slow motion around a perfect swirl of ${d}, with tiny droplets of berry coulis suspended mid-air before settling back with perfect physics-based dynamics.\n\n${bg}, vibrant natural saturated colors, soft diffuse morning sunlight with rim highlights, ultra-shallow depth of field, 8k commercial cinema quality.${extra}`,
  },

  // ========== COLD BEVERAGES ==========
  {
    id: "cold-beverage",
    icon: IceCream,
    title: "Iced drink with condensation",
    desc: "Smoothies, juices, cold cocktails, iced tea",
    background: "bright modern bar or café setting with cool tones",
    sampleDish: "refreshing iced beverage",
    ingredient: {
      label: "Garnish or float (ice cubes, fruit, herbs...)",
      placeholder: "floating fresh mint leaves and ice cubes",
      defaultValue: "floating fresh mint leaves and ice cubes",
    },
    kicker: "refreshing beverage commercial",
    body: (d, bg, extra, ing) =>
      `Close-up of a chilled glass with ${d} showing perfect condensation droplets forming and dripping slowly down the frosty exterior. ${ing} float and settle naturally inside with realistic liquid dynamics. Ice cubes clink delicately as they shift.\n\nCinematic macro lens, ${bg}, cool color grading with blue-tinted highlights, soft diffuse natural window light creating glass refraction effects, 8k commercial quality.${extra}`,
  },

  // ========== HOT BEVERAGES ==========
  {
    id: "hot-beverage",
    icon: Coffee,
    title: "Steaming hot drink",
    desc: "Coffee, tea, hot chocolate, espresso",
    background: "cozy café or morning kitchen atmosphere",
    sampleDish: "aromatic hot coffee",
    ingredient: {
      label: "Topping or garnish (foam, cinnamon, chocolate...)",
      placeholder: "thick espresso crema foam",
      defaultValue: "thick espresso crema foam",
    },
    kicker: "cozy beverage moment",
    body: (d, bg, extra, ing) =>
      `Soft steam and heat shimmer rise continuously from the ${d} in elegant curling wisps. ${ing} sits perfectly on top with rich color contrast. Close-up reveals the rich surface texture and micro bubbles in the liquid.\n\n${bg}, warm golden hour lighting, intimate macro photography, shallow depth of field with bokeh background, 8k photorealistic cinematic commercial.${extra}`,
  },

  // ========== SOUPS & BROTHS ==========
  {
    id: "soup",
    icon: Soup,
    title: "Soup & broth",
    desc: "Broths, creamy soups, consommés, bisques",
    background: "warm rustic kitchen atmosphere with amber lighting",
    sampleDish: "smooth creamy soup",
    ingredient: {
      label: "Garnish or ingredient highlight (cream swirl, crouton, herb...)",
      placeholder: "silky cream swirl with fresh basil",
      defaultValue: "silky cream swirl with fresh basil",
    },
    kicker: "appetizing soup commercial",
    body: (d, bg, extra, ing) =>
      `Dense aromatic steam rises from the hot ${d} with rich texture visible on the surface. A drizzle of ${ing} creates beautiful contrast and visual interest. The broth glistens with natural lustre and perfect color saturation.\n\nWarm intimate lighting, ${bg}, shallow macro focus on the garnish and steam, soft bokeh background, 8k commercial food photography.${extra}`,
  },

  // ========== SALADS ==========
  {
    id: "salad",
    icon: Leaf,
    title: "Fresh salad & dressing",
    desc: "Garden salads, grain bowls, leafy greens",
    background: "bright fresh outdoor or garden aesthetic lighting",
    sampleDish: "vibrant mixed green salad",
    ingredient: {
      label: "Dressing or protein (vinaigrette, croutons, cheese...)",
      placeholder: "creamy balsamic vinaigrette drizzle",
      defaultValue: "creamy balsamic vinaigrette drizzle",
    },
    kicker: "fresh & healthy commercial",
    body: (d, bg, extra, ing) =>
      `A glossy drizzle of ${ing} cascades slowly over the crisp ${d}, coating fresh greens with perfect wet shine. Each leaf catches the light, showing vibrant natural colors and delicate textures.\n\nBright natural window lighting, ${bg}, shallow depth of field highlighting the fresh herbs, crisp color grading, 8k commercial quality.${extra}`,
  },

  // ========== SEAFOOD ==========
  {
    id: "seafood",
    icon: Fish,
    title: "Seared seafood",
    desc: "Fish, scallops, shrimp, ceviche",
    background: "elegant fine dining atmosphere with cool blue undertones",
    sampleDish: "perfectly seared salmon fillet",
    ingredient: {
      label: "Accent or sauce (lemon juice, soy glaze, foam...)",
      placeholder: "fresh citrus squeeze and microgreens",
      defaultValue: "fresh citrus squeeze and microgreens",
    },
    kicker: "fine dining seafood commercial",
    body: (d, bg, extra, ing) =>
      `Close-up of the ${d} with perfect sear marks glistening under dramatic lighting. ${ing} is applied with precision, creating visual pops of color and movement. Steam rises delicately from the hot protein.\n\nProfessional fine dining plating light, ${bg}, macro lens focus on the sear texture, subtle cool color grading, 8k luxury commercial.${extra}`,
  },

  // ========== RICE & GRAINS ==========
  {
    id: "rice",
    icon: Zap,
    title: "Rice & grains",
    desc: "Risotto, paella, rice bowls, grain dishes",
    background: "warm Mediterranean or Asian cooking atmosphere",
    sampleDish: "creamy saffron risotto",
    ingredient: {
      label: "Top ingredient or garnish (parmesan, herbs, seafood...)",
      placeholder: "shaved Parmigiano-Reggiano",
      defaultValue: "shaved Parmigiano-Reggiano",
    },
    kicker: "artisan grain commercial",
    body: (d, bg, extra, ing) =>
      `The ${d} steams gently with perfect individual grain definition visible. ${ing} is carefully placed on top, creating height and visual interest. The glossy sauce coats each grain with appetizing sheen.\n\nWarm intimate overhead lighting, ${bg}, shallow macro focus with depth separation, rich saturated colors, 8k commercial cinematography.${extra}`,
  },

  // ========== BREAD & PASTRIES ==========
  {
    id: "bread",
    icon: Croissant,
    title: "Bread & pastries",
    desc: "Croissants, baguettes, artisan bread, pastries",
    background: "warm artisan bakery aesthetic with golden hour light",
    sampleDish: "warm fresh-baked croissant",
    ingredient: {
      label: "Spread or accompaniment (butter, jam, honey...)",
      placeholder: "melting salted butter",
      defaultValue: "melting salted butter",
    },
    kicker: "artisan bakery commercial",
    body: (d, bg, extra, ing) =>
      `Close-up of warm ${d} with flaky layers visible and steaming gently. ${ing} melts and spreads naturally across the warm surface with golden gloss. The texture and crispness are perfectly captured with visible detail.\n\nWarm golden bakery lighting, ${bg}, macro lens with shallow depth of field, high-resolution texture detail, 8k artisan commercial quality.${extra}`,
  },

  // ========== APPETIZERS & STARTERS ==========
  {
    id: "appetizer",
    icon: Utensils,
    title: "Appetizers & starters",
    desc: "Spring rolls, empanadas, bruschetta, tapas",
    background: "sophisticated restaurant or upscale bar setting",
    sampleDish: "golden crispy appetizer",
    ingredient: {
      label: "Sauce or dip (aioli, pesto, reduction...)",
      placeholder: "vibrant pesto drizzle",
      defaultValue: "vibrant pesto drizzle",
    },
    kicker: "appetizing starter commercial",
    body: (d, bg, extra, ing) =>
      `The ${d} is beautifully plated with perfect golden-brown color and visible crispness. ${ing} is applied artfully, creating color contrast and visual appeal. Steam rises subtly from the warm appetizer.\n\nRefined plating light with accent spotlights, ${bg}, macro focus on the food detail, sophisticated color grading, 8k fine dining commercial.${extra}`,
  },

  // ========== SMOOTHIES & BLENDED DRINKS ==========
  {
    id: "smoothie",
    icon: Waves,
    title: "Smoothie & blended drink",
    desc: "Smoothie bowls, protein smoothies, blended frappes",
    background: "bright modern health café or tropical setting",
    sampleDish: "colorful açai smoothie bowl",
    ingredient: {
      label: "Toppings (granola, fruit, coconut...)",
      placeholder: "granola, fresh berries, and toasted coconut",
      defaultValue: "granola, fresh berries, and toasted coconut",
    },
    kicker: "healthy smoothie commercial",
    body: (d, bg, extra, ing) =>
      `The thick ${d} is topped with carefully arranged ${ing} showing vibrant colors and natural textures. Layers and depth are visible with rich color saturation. The overall composition is colorful and appetizing.\n\nBright natural light from overhead, ${bg}, shallow depth of field on the toppings, vibrant saturated color grading, 8k wellness commercial.${extra}`,
  },

  // ========== COCKTAILS & MIXED DRINKS ==========
  {
    id: "cocktail",
    icon: Wine,
    title: "Cocktail & mixed drinks",
    desc: "Margaritas, mojitos, martinis, craft cocktails",
    background: "upscale bar or lounge atmosphere with moody ambient lighting",
    sampleDish: "artfully crafted cocktail",
    ingredient: {
      label: "Garnish (lime wheel, cherry, herb, ice...)",
      placeholder: "fresh lime wheel and mint sprig",
      defaultValue: "fresh lime wheel and mint sprig",
    },
    kicker: "craft cocktail commercial",
    body: (d, bg, extra, ing) =>
      `The ${d} sits in a crystal glass with perfect clarity showing the liquid color and shimmer. ${ing} is positioned artfully on the rim or floating inside. Condensation beads glisten on the glass exterior.\n\nMoody bar lighting with blue and amber tones, ${bg}, macro macro lens focus on the garnish and liquid, cool sophisticated color grading, 8k luxury bar commercial.${extra}`,
  },

  // ========== COFFEE ART & LATTE ART ==========
  {
    id: "coffee-art",
    icon: Coffee,
    title: "Coffee art & latte designs",
    desc: "Latte art, cappuccino, coffee patterns, espresso",
    background: "cozy artisan café ambiance with soft warm lighting",
    sampleDish: "perfectly poured latte with latte art",
    ingredient: {
      label: "Topping or accent (cocoa, cinnamon, chocolate...)",
      placeholder: "light dusting of chocolate powder",
      defaultValue: "light dusting of chocolate powder",
    },
    kicker: "artisan coffee commercial",
    body: (d, bg, extra, ing) =>
      `Overhead shot of the ${d} showing perfect latte art with micro foam detail. The intricate design is clearly visible with rich brown and cream tones contrasting beautifully. ${ing} adds final artistic touch.\n\nSoft overhead café lighting, ${bg}, macro lens focus on the foam pattern, warm inviting color grading, 8k artisan coffee shop commercial.${extra}`,
  },

  // ========== ICE CREAM & GELATO ==========
  {
    id: "ice-cream-drip",
    icon: IceCream,
    title: "Ice cream & gelato drip",
    desc: "Ice cream scoops, gelato, frozen desserts",
    background: "bright gelato shop or dessert bar aesthetic",
    sampleDish: "artisan ice cream scoop",
    ingredient: {
      label: "Sauce or topping (chocolate, caramel, fruit...)",
      placeholder: "warm dark chocolate sauce",
      defaultValue: "warm dark chocolate sauce",
    },
    kicker: "indulgent gelato commercial",
    body: (d, bg, extra, ing) =>
      `Close-up of creamy ${d} with perfect smooth texture. ${ing} drizzles down the side in glossy ribbons, creating beautiful color contrast and visual movement. The cold and warm elements create dynamic visual interest.\n\nBright cheerful gelato shop lighting, ${bg}, macro lens with shallow depth of field, vibrant appetizing colors, 8k indulgent commercial.${extra}`,
  },

  // ========== MEAT & PROTEIN SEAR ==========
  {
    id: "meat-sear",
    icon: Flame,
    title: "Meat sear & crust",
    desc: "Steaks, cuts of meat, grilled proteins",
    background: "elegant steakhouse or premium meat counter lighting",
    sampleDish: "perfectly seared prime cut",
    ingredient: {
      label: "Herb or accent (rosemary, thyme, garlic...)",
      placeholder: "fresh rosemary sprigs and fleur de sel",
      defaultValue: "fresh rosemary sprigs and fleur de sel",
    },
    kicker: "premium meat commercial",
    body: (d, bg, extra, ing) =>
      `Extreme close-up of the ${d} showing a perfectly caramelized crust with visible sear marks and beautiful meat texture. Steam rises from the hot surface. ${ing} is placed strategically, adding color and aroma suggestion.\n\nProfessional steakhouse lighting with warm rim highlights, ${bg}, macro lens focusing on the crust detail, rich warm color grading, 8k luxury meat commercial.${extra}`,
  },

  // ========== OIL & GLOSS FINISH ==========
  {
    id: "oil-gloss",
    icon: Droplets,
    title: "Infused oil & gloss finish",
    desc: "Olive oil drizzle, herb oil, finishing oil",
    background: "minimalist plating background with professional lighting",
    sampleDish: "premium plated dish",
    ingredient: {
      label: "Oil or gloss type (olive, truffle, chili...)",
      placeholder: "premium extra virgin olive oil",
      defaultValue: "premium extra virgin olive oil",
    },
    kicker: "gourmet finishing touch",
    body: (d, bg, extra, ing) =>
      `Slow, deliberate drizzle of ${ing} cascades across the ${d} in perfect glossy ribbons and pools. The oil catches light beautifully, creating mirror-like reflections and highlighting the dish elements underneath.\n\nProfessional plating light with accent highlights, ${bg}, shallow macro focus on the oil texture, sophisticated warm color grading, 8k gourmet commercial.${extra}`,
  },

  // ========== HERB & SPICE GARNISH ==========
  {
    id: "herb-sprinkle",
    icon: Leaf,
    title: "Fresh herb & spice sprinkle",
    desc: "Microgreens, herbs, edible flowers, finishing spices",
    background: "clean bright plating background with professional lighting",
    sampleDish: "beautifully composed dish",
    ingredient: {
      label: "Garnish type (microgreens, flowers, spices...)",
      placeholder: "delicate microgreens and edible flowers",
      defaultValue: "delicate microgreens and edible flowers",
    },
    kicker: "artisan finishing touch",
    body: (d, bg, extra, ing) =>
      `Precise placement of fresh ${ing} on the ${d} creates visual height, color contrast, and sophisticated plating appeal. Each element is clearly visible with vibrant natural colors and delicate detail.\n\nRefined plating light with clean professional backdrop, ${bg}, macro lens focusing on the garnish detail, clean natural color grading, 8k fine dining commercial.${extra}`,
  },
];

export const FORMATS = [
  { value: "Vertical 9:16", label: "9:16 vertical (Reels / TikTok / Stories)" },
  { value: "Horizontal 16:9", label: "16:9 horizontal (YouTube / Web)" },
] as const;

export const DURATIONS = ["3", "5", "8"] as const;

export interface PromptConfig {
  dish: string;
  ingredient: string;
  format: string;
  duration: string;
  background: string;
  extra: string;
}

export function buildPrompt(category: Category, config: PromptConfig): string {
  const dish = (config.dish || category.sampleDish).trim();
  const bg = config.background.trim();
  const ing = config.ingredient.trim();
  const extraRaw = config.extra.trim();
  const extra = extraRaw ? `\n\nAdditional details: ${extraRaw}.` : "";
  const header = `${config.format} ${category.kicker}, ${config.duration}-second seamless loop.\n\n`;
  return header + category.body(dish, bg, extra, ing);
}

export function defaultConfig(category: Category): PromptConfig {
  return {
    dish: category.sampleDish,
    ingredient: category.ingredient?.defaultValue ?? "",
    format: FORMATS[0].value,
    duration: "5",
    background: category.background,
    extra: "",
  };
}
