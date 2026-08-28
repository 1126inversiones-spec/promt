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
  Fish,
  Martini,
  CupSoda,
  Soup,
  Beef,
  IceCreamBowl,
  CookingPot,
  RefreshCw,
  RotateCw,
  Leaf,
  UtensilsCrossed,
  Droplet,
  Zap,
  CloudFog,
  Gem,
  Sparkle,
  Citrus,
  Shuffle,
  Coffee,
  ChevronsUp,
  Layers,
  Disc,
  IceCreamCone,
  FlameKindling,
  Sun,
  type LucideIcon,
} from "lucide-react";

export type CategoryId =
  | "wok"
  | "steam"
  | "dust-savory"
  | "cheese-pull"
  | "fluff-steam"
  | "sauce-fold"
  | "crispy-flip"
  | "herb-scatter"
  | "bbq"
  | "seafood-sear"
  | "juice-cut"
  | "butter-baste"
  | "torch-sear"
  | "ice-mist"
  | "salt-crust"
  | "cold-drink"
  | "hot-drink"
  | "cocktail"
  | "blend-mix"
  | "fizz-burst"
  | "flame-garnish"
  | "shake-pour"
  | "milk-froth"
  | "cloche-lift"
  | "choc"
  | "caramel"
  | "dust-sweet"
  | "berry"
  | "torch-caramelize"
  | "layer-slice"
  | "molten-shell"
  | "scoop-drop"
  | "flambe-dance";

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
  /** Path to a short looping preview clip in /public, e.g. "/previews/wok.mp4". Optional — falls back to the icon when absent. */
  previewSrc?: string;
  body: (dish: string, background: string, extra: string, ingredient: string, camera: string) => string;
}

export const CATEGORIES: Category[] = [
  // ---------- Rice & Pasta ----------
  {
    id: "wok",
    icon: Flame,
    title: "Wok toss & stir-fry",
    desc: "Noodles, fried rice, stir-fried pasta",
    background: "dark moody kitchen background",
    sampleDish: "stir-fried noodles and crisp vegetables",
    kicker: "high-impact food commercial video",
    body: (d, bg, extra, _ing, camera) =>
      `Animate the wok toss: glossy ${d} lift and rotate dynamically mid-air in ultra slow motion. Realistic wok-hei effect with dramatic fire flames curling around the base, warm glowing ember sparks floating through the air, and thick, aromatic steam swirling upwards from the hot dish.\n\nDramatic cinematic lighting, ${bg}, glossy food textures with glistening sauce reflections, phantom flex slow-motion, ${camera}, 8k commercial quality.${extra}`,
  },
  {
    id: "steam",
    icon: Waves,
    title: "Heavy steam",
    desc: "Ramen, soups, stews, risottos",
    background: "dark atmospheric background",
    sampleDish: "creamy risotto",
    kicker: "cinematic product shot",
    body: (d, bg, extra, _ing, camera) =>
      `Dense, velvety white steam and heat shimmer billow smoothly and continuously upwards from the freshly cooked ${d}. The sauce glistens with subtle sizzling micro-bubbles. Delicate rising heat trails curl realistically against the ${bg}.\n\n${camera}, soft warm side lighting highlighting the texture of the steam, shallow depth of field with warm bokeh, 8k resolution photorealistic render.${extra}`,
  },
  {
    id: "cheese-pull",
    icon: Droplets,
    title: "Cheese pull & sauce drip",
    desc: "Pasta, lasagna, saucy rice bowls",
    background: "commercial food studio backdrop",
    sampleDish: "baked pasta",
    ingredient: {
      label: "What's melting or dripping",
      placeholder: "melted cheese",
      defaultValue: "melted cheese",
    },
    kicker: "mouthwatering food commercial",
    body: (d, bg, extra, ing, camera) =>
      `Ultra slow-motion gooey stretch and drip animation: rich ${ing} on the ${d} pulls upward with elastic, bubbling micro-textures, or a thick glossy sauce drips slowly down the side of the food. Warm glistening highlights on the surface, subtle steam rising from the pull.\n\nCommercial food studio lighting, macro depth of field, vibrant colors, ${camera}, 8k photorealistic.${extra}`,
  },
  {
    id: "fluff-steam",
    icon: CookingPot,
    title: "Fluff & steam release",
    desc: "Fried rice, pilaf, rice bowls fresh off the pot",
    background: "dark rustic kitchen backdrop",
    sampleDish: "fluffy steamed rice",
    kicker: "cinematic food reveal commercial",
    body: (d, bg, extra, _ing, camera) =>
      `Animate the reveal: as the lid lifts away, a warm cloud of steam bursts upward and the ${d} fluffs and settles gently in ultra slow motion, individual grains catching the light. Wisps of steam curl and dissipate against the ${bg}.\n\n${camera}, soft warm backlight through the steam, shallow depth of field, 8k photorealistic render.${extra}`,
  },
  {
    id: "sauce-fold",
    icon: RefreshCw,
    title: "Sauce fold swirl",
    desc: "Creamy pasta, risotto, sauced noodles",
    background: "dark moody trattoria backdrop",
    sampleDish: "creamy fettuccine",
    kicker: "mouthwatering pasta commercial",
    body: (d, bg, extra, _ing, camera) =>
      `A fork or tongs lift and fold the ${d} in one continuous ultra slow-motion swirl, the glossy sauce ribboning and coating each strand as it twists through the air before settling back onto the plate.\n\n${bg}, macro lens focus, warm appetizing color grade, ${camera}, 8k commercial quality.${extra}`,
  },
  {
    id: "crispy-flip",
    icon: RotateCw,
    title: "Crispy bottom flip",
    desc: "Paella, tahdig, crispy rice cakes",
    background: "dark rustic wood-fired kitchen backdrop",
    sampleDish: "golden crispy-bottomed rice",
    kicker: "dramatic reveal food commercial",
    body: (d, bg, extra, _ing, camera) =>
      `The pan flips in one fluid slow-motion motion, releasing the ${d} to reveal a deep golden, crackling crust on the underside. Fine crumbs of crust flake and catch the light as steam escapes from the seams.\n\n${bg}, dramatic rim lighting on the crust, ${camera}, 8k ultra-detailed food photography.${extra}`,
  },
  {
    id: "herb-scatter",
    icon: Leaf,
    title: "Herb scatter",
    desc: "Finishing touch for rice, pasta, grain bowls",
    background: "clean bright kitchen backdrop",
    sampleDish: "garnished rice bowl",
    ingredient: {
      label: "Herbs falling",
      placeholder: "chopped parsley and chives",
      defaultValue: "chopped parsley and chives",
    },
    kicker: "fresh finishing-touch commercial",
    body: (d, bg, extra, ing, camera) =>
      `Macro shot: freshly chopped ${ing} fall and scatter in slow motion across the surface of the ${d}, tiny fragments bouncing softly and settling into the glossy sauce.\n\n${bg}, crisp macro focus, vibrant natural greens, ${camera}, 8k resolution.${extra}`,
  },

  // ---------- Meat & Seafood ----------
  {
    id: "bbq",
    icon: Wind,
    title: "Char & grill smoke",
    desc: "Grilled meats, ribs, skewers",
    background: "dark rustic steakhouse atmosphere",
    sampleDish: "char-grilled meat",
    kicker: "cinematic grill commercial",
    body: (d, bg, extra, _ing, camera) =>
      `Wisps of rich aromatic barbecue smoke drift slowly across the ${d}. Subtle glowing orange embers spark and pulse softly under the grill grate with micro heat-haze distortion. Juicy glaze sizzles gently on the sear marks.\n\n${bg}, dramatic warm rim lighting, ${camera}, 8k ultra-detailed food photography.${extra}`,
  },
  {
    id: "dust-savory",
    icon: Sparkles,
    title: "Spice & cheese dust",
    desc: "Pizza, tacos, burgers, cuts of meat",
    background: "dark moody background",
    sampleDish: "gourmet dish",
    ingredient: {
      label: "What's falling (cheese, spices, salt...)",
      placeholder: "grated parmesan cheese",
      defaultValue: "grated parmesan cheese",
    },
    kicker: "commercial slow-motion video",
    body: (d, bg, extra, ing, camera) =>
      `Macro shot: a fine cascade of ${ing} falls continuously in extreme slow motion, gently dusting the top of the ${d}. Fine dust particles catch the golden light, floating softly in the air around the plate.\n\nCinematic macro lens focus, ${bg}, high-speed food photography aesthetic, rich textures, ${camera}, 8k resolution.${extra}`,
  },
  {
    id: "seafood-sear",
    icon: Fish,
    title: "Sear & citrus mist",
    desc: "Grilled fish, seafood platters, ceviche",
    background: "dark moody seafood restaurant backdrop",
    sampleDish: "seared salmon fillet",
    ingredient: {
      label: "What's falling (citrus zest, herbs...)",
      placeholder: "fresh citrus zest and herbs",
      defaultValue: "fresh citrus zest and herbs",
    },
    kicker: "cinematic seafood commercial",
    body: (d, bg, extra, ing, camera) =>
      `Macro shot: a fine mist of ${ing} falls in extreme slow motion over the ${d}, catching cool ocean-toned light. A delicate glossy sear glistens on the surface as trace steam lifts gently off the plate.\n\nCrisp macro focus, ${bg}, high-end seafood photography, rich textures, ${camera}, 8k resolution.${extra}`,
  },
  {
    id: "juice-cut",
    icon: UtensilsCrossed,
    title: "Juice-cut reveal",
    desc: "Steaks, chops, roasted meats",
    background: "dark rustic steakhouse backdrop",
    sampleDish: "medium-rare sliced steak",
    kicker: "premium steakhouse commercial",
    body: (d, bg, extra, _ing, camera) =>
      `A knife slices through the ${d} in ultra slow motion, the cut opening to reveal a perfectly cooked, juicy interior as glistening juices well up and trace down the blade.\n\n${bg}, dramatic warm rim lighting on the cut surface, ${camera}, 8k ultra-detailed food photography.${extra}`,
  },
  {
    id: "butter-baste",
    icon: Droplet,
    title: "Butter baste melt",
    desc: "Seared steaks, scallops, basted proteins",
    background: "dark moody kitchen backdrop",
    sampleDish: "pan-seared scallops",
    kicker: "luxury sear commercial",
    body: (d, bg, extra, _ing, camera) =>
      `A spoon tips and pours melted butter over the ${d} in ultra slow motion, the glossy stream cascading and pooling around the sear marks, small bubbles forming as it sizzles gently.\n\n${bg}, macro lens focus, warm glistening highlights, ${camera}, 8k photorealistic.${extra}`,
  },
  {
    id: "torch-sear",
    icon: Zap,
    title: "Torch flare sear",
    desc: "Tableside sear, tuna, wagyu finishing",
    background: "dark dramatic kitchen backdrop",
    sampleDish: "seared tuna block",
    kicker: "high-drama searing commercial",
    body: (d, bg, extra, _ing, camera) =>
      `A torch flame licks across the surface of the ${d} in slow motion, a brief dramatic flare catching the light before the surface sears to a deep golden crust, wisps of smoke curling upward.\n\n${bg}, high-contrast dramatic lighting, ${camera}, 8k ultra-detailed food photography.${extra}`,
  },
  {
    id: "ice-mist",
    icon: CloudFog,
    title: "Ice bed mist",
    desc: "Raw bar, oysters, chilled seafood platters",
    background: "dark moody raw bar backdrop with cool blue light",
    sampleDish: "oysters on crushed ice",
    kicker: "elegant raw bar commercial",
    body: (d, bg, extra, _ing, camera) =>
      `Cool white mist drifts and rolls slowly across a bed of crushed ice beneath the ${d}, catching the light in soft slow motion against the ${bg}.\n\nMacro focus, crisp cool color palette, ${camera}, 8k photorealistic render.${extra}`,
  },
  {
    id: "salt-crust",
    icon: Gem,
    title: "Salt crust crack",
    desc: "Whole roasted fish, salt-baked dishes",
    background: "dark rustic dining backdrop",
    sampleDish: "salt-crusted whole fish",
    kicker: "dramatic tableside reveal commercial",
    body: (d, bg, extra, _ing, camera) =>
      `A mallet or spoon cracks the golden salt crust of the ${d} in slow motion, fine cracks spidering outward as steam escapes and fragments of salt catch the light before falling away.\n\n${bg}, dramatic warm lighting, ${camera}, 8k ultra-detailed food photography.${extra}`,
  },

  // ---------- Drinks ----------
  {
    id: "cold-drink",
    icon: GlassWater,
    title: "Ice & condensation",
    desc: "Iced tea, lemonade, sodas, iced coffee",
    background: "dark moody bar backdrop with cool blue light",
    sampleDish: "iced lemonade in a tall glass",
    kicker: "refreshing beverage commercial",
    body: (d, bg, extra, _ing, camera) =>
      `Ultra slow-motion: a fresh ice cube drops into the ${d}, sending a small splash and rippling waves across the surface. Condensation droplets glisten and slowly trickle down the outside of the glass in the cool light.\n\n${camera}, ${bg}, macro lens focus, crisp refreshing colors, 8k photorealistic.${extra}`,
  },
  {
    id: "hot-drink",
    icon: CupSoda,
    title: "Steam swirl",
    desc: "Coffee, tea, hot chocolate",
    background: "warm dark coffee-shop backdrop",
    sampleDish: "freshly poured espresso",
    kicker: "cozy beverage commercial",
    body: (d, bg, extra, _ing, camera) =>
      `Delicate wisps of steam rise and swirl gently from the surface of the ${d}, curling upward in soft slow motion against the ${bg}. Warm light catches the rising vapor and the glossy surface of the drink.\n\n${camera}, soft warm side lighting, shallow depth of field, 8k resolution photorealistic render.${extra}`,
  },
  {
    id: "cocktail",
    icon: Martini,
    title: "Pour & garnish splash",
    desc: "Cocktails, mocktails, garnished drinks",
    background: "dark moody cocktail bar backdrop with warm bokeh",
    sampleDish: "craft cocktail with a citrus twist",
    ingredient: {
      label: "Garnish dropping in",
      placeholder: "a citrus twist",
      defaultValue: "a citrus twist",
    },
    kicker: "luxury cocktail commercial",
    body: (d, bg, extra, ing, camera) =>
      `Animate the pour: a glossy stream of liquid pours smoothly into the ${d} in ultra slow motion, followed by ${ing} dropping in and settling with a gentle splash. Light catches the liquid's color and the glass's condensation.\n\n${bg}, macro lens focus, studio rim lighting, ${camera}, 8k resolution, photorealistic.${extra}`,
  },
  {
    id: "blend-mix",
    icon: IceCreamBowl,
    title: "Blend swirl",
    desc: "Smoothies, milkshakes, frappes",
    background: "bright colorful smoothie bar backdrop",
    sampleDish: "creamy fruit smoothie",
    ingredient: {
      label: "Topping dropping in",
      placeholder: "fresh berries and granola",
      defaultValue: "fresh berries and granola",
    },
    kicker: "vibrant beverage commercial",
    body: (d, bg, extra, ing, camera) =>
      `Macro shot: ${ing} drop in slow motion onto the swirling, creamy surface of the ${d}, sending gentle ripples through the thick blend. Vivid colors and glossy texture catch the light.\n\n${bg}, crisp macro focus, vibrant high-energy commercial photography, ${camera}, 8k resolution.${extra}`,
  },
  {
    id: "fizz-burst",
    icon: Sparkle,
    title: "Fizz & bubble burst",
    desc: "Sodas, sparkling water, spritz cocktails",
    background: "dark moody bar backdrop with bright highlights",
    sampleDish: "sparkling soda in a glass",
    kicker: "crisp carbonation commercial",
    body: (d, bg, extra, _ing, camera) =>
      `Extreme macro shot: streams of tiny carbonation bubbles race upward through the ${d} in ultra slow motion, bursting gently at the surface and catching sharp highlights of light.\n\n${bg}, crisp macro focus, high-contrast lighting, ${camera}, 8k photorealistic.${extra}`,
  },
  {
    id: "flame-garnish",
    icon: Citrus,
    title: "Flaming garnish",
    desc: "Show cocktails, citrus-flamed drinks",
    background: "dark moody cocktail bar backdrop with warm bokeh",
    sampleDish: "cocktail with a flamed orange twist",
    ingredient: {
      label: "Garnish being flamed",
      placeholder: "an orange peel twist",
      defaultValue: "an orange peel twist",
    },
    kicker: "dramatic cocktail show commercial",
    body: (d, bg, extra, ing, camera) =>
      `A brief flame flares as ${ing} is expressed over the ${d} in slow motion, a fine mist of citrus oil catching the fire in a small dramatic burst before settling onto the drink.\n\n${bg}, high-contrast dramatic lighting, ${camera}, 8k resolution, photorealistic.${extra}`,
  },
  {
    id: "shake-pour",
    icon: Shuffle,
    title: "Shake to pour",
    desc: "Shaken cocktails, mixed drinks",
    background: "dark moody cocktail bar backdrop",
    sampleDish: "shaken cocktail",
    kicker: "dynamic bartending commercial",
    body: (d, bg, extra, _ing, camera) =>
      `Motion-blurred shaking transitions in one fluid move into a glossy stream pouring the ${d} into the glass in ultra slow motion, ice and froth settling as the pour completes.\n\n${bg}, macro lens focus, studio rim lighting, ${camera}, 8k resolution, photorealistic.${extra}`,
  },
  {
    id: "milk-froth",
    icon: Coffee,
    title: "Milk froth swirl",
    desc: "Lattes, cappuccinos, specialty coffee",
    background: "warm dark coffee-shop backdrop",
    sampleDish: "latte with milk froth",
    kicker: "artisan coffee commercial",
    body: (d, bg, extra, _ing, camera) =>
      `A glossy stream of steamed milk pours and swirls into the ${d} in ultra slow motion, the froth folding into delicate patterns on the surface as it settles.\n\n${bg}, soft warm side lighting, macro lens focus, ${camera}, 8k photorealistic render.${extra}`,
  },
  {
    id: "cloche-lift",
    icon: ChevronsUp,
    title: "Smoked cloche lift",
    desc: "Smoked cocktails, show-piece drinks",
    background: "dark dramatic bar backdrop with warm bokeh",
    sampleDish: "smoked cocktail under a glass cloche",
    kicker: "theatrical cocktail reveal commercial",
    body: (d, bg, extra, _ing, camera) =>
      `A glass cloche lifts slowly away from the ${d} in slow motion, thick aromatic smoke rolling and escaping into the air, catching dramatic light against the ${bg}.\n\nMacro lens focus, high-contrast dramatic lighting, ${camera}, 8k resolution, photorealistic.${extra}`,
  },

  // ---------- Desserts ----------
  {
    id: "choc",
    icon: Milk,
    title: "Chocolate cascade",
    desc: "Lava cakes, moist cakes, ice cream, brownies",
    background: "dark moody dessert bar background with soft warm bokeh",
    sampleDish: "chocolate volcano cake",
    kicker: "luxury dessert commercial video",
    body: (d, bg, extra, _ing, camera) =>
      `Animate the liquid pour: a rich, glossy stream of dark molten chocolate flows smoothly in ultra slow-motion from above, coating the top of the ${d} and draping softly down the sides. Realistic fluid dynamics with viscous ribbons forming on the surface, mirror-like glossy reflections, and subtle rising warmth.\n\n${camera}, ${bg}, macro lens focus, studio rim lighting catching the chocolate glaze, 8k resolution, photorealistic.${extra}`,
  },
  {
    id: "caramel",
    icon: GlassWater,
    title: "Caramel drizzle",
    desc: "Cheesecake, flan, pancakes, waffles",
    background: "clean minimalist bakery background with soft depth of field",
    sampleDish: "cheesecake",
    kicker: "mouthwatering pastry commercial",
    body: (d, bg, extra, _ing, camera) =>
      `Golden translucent salted caramel stretches and pours in extreme slow motion over the ${d}. A thick, warm amber syrup cascades smoothly, forming delicate dripping beads and glistening threads under warm key lights. Micro air bubbles caught within the viscous liquid.\n\nCinematic macro product photography, soft golden hour lighting, ${bg}, hyper-realistic fluid physics, ${camera}, 8k resolution.${extra}`,
  },
  {
    id: "dust-sweet",
    icon: Snowflake,
    title: "Powdered sugar snow",
    desc: "Croissants, tarts, tiramisu, souffles",
    background: "dark atmospheric studio backdrop",
    sampleDish: "fresh pastry",
    ingredient: {
      label: "What's falling (sugar, cocoa...)",
      placeholder: "powdered confectioner's sugar",
      defaultValue: "powdered confectioner's sugar",
    },
    kicker: "high-speed food commercial video",
    body: (d, bg, extra, ing, camera) =>
      `Macro phantom-flex slow-motion: a delicate, continuous cloud of ${ing} drifts and snows down softly from above onto the ${d}. Microscopic particles float suspended in the air, catching the side rim light before settling onto the textured crust.\n\n${bg}, crisp macro focus with shallow depth of field, high-contrast dynamic lighting, ${camera}, 8k resolution, ultra-detailed textures.${extra}`,
  },
  {
    id: "berry",
    icon: Cherry,
    title: "Berries & cream",
    desc: "Pavlova, strawberry cheesecake, waffles",
    background: "bright high-end patisserie aesthetic",
    sampleDish: "velvety whipped cream swirl",
    ingredient: {
      label: "Floating fruit / toppings",
      placeholder: "fresh raspberries, sliced strawberries, and mint leaves",
      defaultValue: "fresh raspberries, sliced strawberries, and mint leaves",
    },
    kicker: "dynamic dessert commercial",
    body: (d, bg, extra, ing, camera) =>
      `Food levitation and micro-splash effect: ${ing} float in zero-gravity slow motion around a swirl of ${d}, with tiny droplets of berry coulis suspended mid-air before settling back.\n\n${bg}, vibrant natural colors, soft diffuse morning sunlight, ${camera}, shallow depth of field, 8k commercial quality.${extra}`,
  },
  {
    id: "torch-caramelize",
    icon: Sun,
    title: "Torch caramelize crack",
    desc: "Cr\u00e8me br\u00fbl\u00e9e, caramelized tops",
    background: "dark moody dessert bar backdrop",
    sampleDish: "cr\u00e8me br\u00fbl\u00e9e",
    kicker: "elegant dessert reveal commercial",
    body: (d, bg, extra, _ing, camera) =>
      `A torch flame sweeps across the surface of the ${d} in slow motion, the sugar bubbling and darkening into a glassy caramel shell, then a spoon cracks through it in one crisp motion.\n\n${bg}, warm dramatic lighting, ${camera}, 8k ultra-detailed food photography.${extra}`,
  },
  {
    id: "layer-slice",
    icon: Layers,
    title: "Layer slice reveal",
    desc: "Layer cakes, tiramisu, terrines",
    background: "clean minimalist bakery backdrop",
    sampleDish: "layered cake",
    kicker: "elegant patisserie commercial",
    body: (d, bg, extra, _ing, camera) =>
      `A knife slices smoothly through the ${d} in ultra slow motion, the blade revealing distinct, glossy layers as the slice separates cleanly from the whole.\n\n${bg}, soft studio lighting, macro lens focus, ${camera}, 8k resolution, photorealistic.${extra}`,
  },
  {
    id: "molten-shell",
    icon: Disc,
    title: "Molten shell crack",
    desc: "Lava cakes, chocolate domes, molten centers",
    background: "dark moody dessert bar backdrop with soft warm bokeh",
    sampleDish: "chocolate lava cake",
    kicker: "indulgent dessert reveal commercial",
    body: (d, bg, extra, _ing, camera) =>
      `A spoon presses into the ${d} in ultra slow motion, the outer shell cracking open as a rich, glossy molten center flows out and pools gently on the plate.\n\n${bg}, warm rim lighting catching the glaze, ${camera}, 8k resolution, photorealistic.${extra}`,
  },
  {
    id: "scoop-drop",
    icon: IceCreamCone,
    title: "Scoop drop",
    desc: "Ice cream, sundaes, \u00e0 la mode desserts",
    background: "bright colorful dessert bar backdrop",
    sampleDish: "vanilla ice cream scoop",
    kicker: "playful dessert commercial",
    body: (d, bg, extra, _ing, camera) =>
      `A perfectly round scoop of the ${d} drops and lands softly in ultra slow motion, the surface rippling gently on impact and catching bright, vivid light.\n\n${bg}, crisp macro focus, vibrant high-energy commercial photography, ${camera}, 8k resolution.${extra}`,
  },
  {
    id: "flambe-dance",
    icon: FlameKindling,
    title: "Flamb\u00e9 flame dance",
    desc: "Flamb\u00e9ed desserts, tableside finishes",
    background: "dark dramatic dessert bar backdrop",
    sampleDish: "flamb\u00e9ed bananas foster",
    kicker: "theatrical dessert commercial",
    body: (d, bg, extra, _ing, camera) =>
      `Blue flames dance and flicker gently across the surface of the ${d} in slow motion, casting warm dramatic light before settling as the flame dies down.\n\n${bg}, high-contrast dramatic lighting, ${camera}, 8k ultra-detailed food photography.${extra}`,
  },
];

export type GroupId = "rice-pasta" | "meat-sea" | "drinks" | "desserts";

export interface Group {
  id: GroupId;
  icon: LucideIcon;
  title: string;
  desc: string;
  effectIds: CategoryId[];
}

export const GROUPS: Group[] = [
  {
    id: "rice-pasta",
    icon: Soup,
    title: "Rice & Pasta",
    desc: "Stir-fries, saucy pasta, risottos",
    effectIds: ["wok", "steam", "cheese-pull", "fluff-steam", "sauce-fold", "crispy-flip", "herb-scatter"],
  },
  {
    id: "meat-sea",
    icon: Beef,
    title: "Meat & Seafood",
    desc: "Grill, seafood, spice finishes",
    effectIds: ["bbq", "dust-savory", "seafood-sear", "juice-cut", "butter-baste", "torch-sear", "ice-mist", "salt-crust"],
  },
  {
    id: "drinks",
    icon: Martini,
    title: "Drinks",
    desc: "Cold, hot, cocktails, blended",
    effectIds: ["cold-drink", "hot-drink", "cocktail", "blend-mix", "fizz-burst", "flame-garnish", "shake-pour", "milk-froth", "cloche-lift"],
  },
  {
    id: "desserts",
    icon: IceCreamBowl,
    title: "Desserts",
    desc: "Chocolate, caramel, sugar, berries",
    effectIds: ["choc", "caramel", "dust-sweet", "berry", "torch-caramelize", "layer-slice", "molten-shell", "scoop-drop", "flambe-dance"],
  },
];

export function categoriesForGroup(groupId: GroupId): Category[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return group.effectIds
    .map((id) => CATEGORIES.find((c) => c.id === id))
    .filter((c): c is Category => Boolean(c));
}

export function groupOf(effectId: CategoryId): Group | undefined {
  return GROUPS.find((g) => g.effectIds.includes(effectId));
}

export const FORMATS = [
  { value: "Vertical 9:16", label: "9:16 vertical (Reels / TikTok / Stories)" },
  { value: "Square 1:1", label: "1:1 square (Feed)" },
  { value: "Horizontal 16:9", label: "16:9 horizontal (YouTube / Web)" },
] as const;

export const DURATIONS = ["3", "5", "8"] as const;

export type CameraStyleId =
  | "static"
  | "dolly-in"
  | "orbit"
  | "whip-pan"
  | "top-down-tilt"
  | "rack-focus";

export interface CameraStyle {
  id: CameraStyleId;
  label: string;
  description: string;
}

export const CAMERA_STYLES: CameraStyle[] = [
  { id: "static", label: "Static locked-off", description: "Static locked-off camera" },
  { id: "dolly-in", label: "Slow dolly-in", description: "Slow, smooth dolly-in camera push toward the dish" },
  { id: "orbit", label: "Orbit reveal", description: "Camera slowly orbits around the dish in a smooth 360-degree reveal" },
  { id: "whip-pan", label: "Whip-pan reveal", description: "Fast whip-pan camera move that reveals the dish" },
  { id: "top-down-tilt", label: "Top-down to 45\u00b0", description: "Camera starts top-down and tilts smoothly to a 45-degree angle" },
  { id: "rack-focus", label: "Rack focus pull", description: "Rack focus pull, shifting focus smoothly from the background to the dish" },
];

export interface PromptConfig {
  dish: string;
  ingredient: string;
  format: string;
  duration: string;
  background: string;
  camera: CameraStyleId;
  extra: string;
}

/** Extra-detail text longer than this gets trimmed to save tokens in the final prompt. */
const MAX_EXTRA_CHARS = 220;

export function buildPrompt(category: Category, config: PromptConfig): string {
  const dish = (config.dish || category.sampleDish).trim();
  const bg = config.background.trim();
  const ing = config.ingredient.trim();
  const cameraDesc =
    CAMERA_STYLES.find((c) => c.id === config.camera)?.description ?? CAMERA_STYLES[0].description;

  let extraRaw = config.extra.trim();
  if (extraRaw.length > MAX_EXTRA_CHARS) {
    const cut = extraRaw.slice(0, MAX_EXTRA_CHARS);
    const lastSpace = cut.lastIndexOf(" ");
    extraRaw = (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + "\u2026";
  }
  const extra = extraRaw ? `\n\nAdditional details: ${extraRaw}.` : "";

  const header =
    `${config.format} ${category.kicker}, ${config.duration}-second seamless loop.\n\n` +
    `Use the uploaded photo as the exact reference for this dish \u2014 keep the food, plating, colors, portion size, and framing identical to the source image. Do not restyle, replace, or regenerate the dish itself.\n\n`;

  const lock =
    `\n\nOnly animate the effect described above around the dish. The plate, food, and composition must stay exactly as in the reference photo \u2014 no new ingredients, no garnish changes, no altered plating, no different angle on the dish itself.`;

  return header + category.body(dish, bg, extra, ing, cameraDesc) + lock;
}

export function defaultConfig(category: Category): PromptConfig {
  return {
    dish: category.sampleDish,
    ingredient: category.ingredient?.defaultValue ?? "",
    format: FORMATS[0].value,
    duration: "5",
    background: category.background,
    camera: "static",
    extra: "",
  };
}
