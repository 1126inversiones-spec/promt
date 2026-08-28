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
  | "berry";

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
  {
    id: "wok",
    icon: Flame,
    title: "Wok toss & stir-fry",
    desc: "Noodles, fried rice, stir-fried pasta",
    background: "dark moody kitchen background",
    sampleDish: "stir-fried noodles and crisp vegetables",
    kicker: "high-impact food commercial video",
    body: (d, bg, extra) =>
      `Animate the wok toss: glossy ${d} lift and rotate dynamically mid-air in ultra slow motion. Realistic wok-hei effect with dramatic fire flames curling around the base, warm glowing ember sparks floating through the air, and thick, aromatic steam swirling upwards from the hot dish.\n\nDramatic cinematic lighting, ${bg}, glossy food textures with glistening sauce reflections, phantom flex slow-motion, 8k commercial quality.${extra}`,
  },
  {
    id: "steam",
    icon: Waves,
    title: "Heavy steam",
    desc: "Ramen, soups, stews, hot dishes",
    background: "dark atmospheric background",
    sampleDish: "noodles",
    kicker: "cinematic product shot",
    body: (d, bg, extra) =>
      `Dense, velvety white steam and heat shimmer billow smoothly and continuously upwards from the freshly cooked ${d}. The sauce glistens with subtle sizzling micro-bubbles. Delicate rising heat trails curl realistically against the ${bg}.\n\nStatic locked-off camera, soft warm side lighting highlighting the texture of the steam, shallow depth of field with warm bokeh, 8k resolution photorealistic render.${extra}`,
  },
  {
    id: "dust-savory",
    icon: Sparkles,
    title: "Spice & cheese dust",
    desc: "Pizza, pasta, burgers, cuts of meat",
    background: "dark moody background",
    sampleDish: "gourmet dish",
    ingredient: {
      label: "What's falling (cheese, spices, salt...)",
      placeholder: "grated parmesan cheese",
      defaultValue: "grated parmesan cheese",
    },
    kicker: "commercial slow-motion video",
    body: (d, bg, extra, ing) =>
      `Macro shot: a fine cascade of ${ing} falls continuously in extreme slow motion, gently dusting the top of the ${d}. Fine dust particles catch the golden light, floating softly in the air around the plate.\n\nCinematic macro lens focus, ${bg}, high-speed food photography aesthetic, rich textures, 8k resolution.${extra}`,
  },
  {
    id: "cheese-pull",
    icon: Droplets,
    title: "Cheese pull & sauce drip",
    desc: "Pizza, burgers, lasagna",
    background: "commercial food studio backdrop",
    sampleDish: "burger",
    ingredient: {
      label: "What's melting or dripping",
      placeholder: "melted cheese",
      defaultValue: "melted cheese",
    },
    kicker: "mouthwatering food commercial",
    body: (d, bg, extra, ing) =>
      `Ultra slow-motion gooey stretch and drip animation: rich ${ing} on the ${d} pulls upward with elastic, bubbling micro-textures, or a thick glossy sauce drips slowly down the side of the food. Warm glistening highlights on the surface, subtle steam rising from the pull.\n\nCommercial food studio lighting, macro depth of field, vibrant colors, 8k photorealistic.${extra}`,
  },
  {
    id: "bbq",
    icon: Wind,
    title: "Char & grill smoke",
    desc: "Grilled meats, ribs, skewers",
    background: "dark rustic steakhouse atmosphere",
    sampleDish: "char-grilled meat",
    kicker: "cinematic grill commercial",
    body: (d, bg, extra) =>
      `Wisps of rich aromatic barbecue smoke drift slowly across the ${d}. Subtle glowing orange embers spark and pulse softly under the grill grate with micro heat-haze distortion. Juicy glaze sizzles gently on the sear marks.\n\n${bg}, dramatic warm rim lighting, 8k ultra-detailed food photography.${extra}`,
  },
  {
    id: "choc",
    icon: Milk,
    title: "Chocolate cascade",
    desc: "Lava cakes, moist cakes, ice cream, brownies",
    background: "dark moody dessert bar background with soft warm bokeh",
    sampleDish: "chocolate volcano cake",
    kicker: "luxury dessert commercial video",
    body: (d, bg, extra) =>
      `Animate the liquid pour: a rich, glossy stream of dark molten chocolate flows smoothly in ultra slow-motion from above, coating the top of the ${d} and draping softly down the sides. Realistic fluid dynamics with viscous ribbons forming on the surface, mirror-like glossy reflections, and subtle rising warmth.\n\nStatic camera, ${bg}, macro lens focus, studio rim lighting catching the chocolate glaze, 8k resolution, photorealistic.${extra}`,
  },
  {
    id: "caramel",
    icon: GlassWater,
    title: "Caramel drizzle",
    desc: "Cheesecake, flan, pancakes, waffles",
    background: "clean minimalist bakery background with soft depth of field",
    sampleDish: "cheesecake",
    kicker: "mouthwatering pastry commercial",
    body: (d, bg, extra) =>
      `Golden translucent salted caramel stretches and pours in extreme slow motion over the ${d}. A thick, warm amber syrup cascades smoothly, forming delicate dripping beads and glistening threads under warm key lights. Micro air bubbles caught within the viscous liquid.\n\nCinematic macro product photography, soft golden hour lighting, ${bg}, hyper-realistic fluid physics, 8k resolution.${extra}`,
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
    body: (d, bg, extra, ing) =>
      `Macro phantom-flex slow-motion: a delicate, continuous cloud of ${ing} drifts and snows down softly from above onto the ${d}. Microscopic particles float suspended in the air, catching the side rim light before settling onto the textured crust.\n\n${bg}, crisp macro focus with shallow depth of field, high-contrast dynamic lighting, 8k resolution, ultra-detailed textures.${extra}`,
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
    body: (d, bg, extra, ing) =>
      `Food levitation and micro-splash effect: ${ing} float in zero-gravity slow motion around a swirl of ${d}, with tiny droplets of berry coulis suspended mid-air before settling back.\n\n${bg}, vibrant natural colors, soft diffuse morning sunlight, shallow depth of field, 8k commercial quality.${extra}`,
  },
];

export const FORMATS = [
  { value: "Vertical 9:16", label: "9:16 vertical (Reels / TikTok / Stories)" },
  { value: "Square 1:1", label: "1:1 square (Feed)" },
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
