export type CheckStatus = "pass" | "warn" | "fail";

export interface PromptCheck {
  id: string;
  label: string;
  status: CheckStatus;
  message: string;
}

const FORMAT_RE = /\b(9:16|1:1|16:9|vertical|square|horizontal)\b/i;
const DURATION_RE = /\b\d+[\s-]?second\b/i;
const MOTION_WORDS =
  /\b(slow motion|slow-motion|drips?|drip|pours?|pouring|falls?|falling|swirls?|rises?|rising|orbits?|dolly|pan|tilt|zoom|steam|smoke|splash|drop|cascade)\b/i;
const LIGHT_BG_RE = /\b(lighting|light|backdrop|background|bokeh|studio)\b/i;
const REFERENCE_LOCK_RE = /reference photo|exact reference|do not (restyle|alter|regenerate|replace)/i;
const QUALITY_RE = /\b(4k|8k|photorealistic|cinematic|commercial|hd)\b/i;
const VAGUE_SUBJECT_RE = /\b(food|dish|meal|plate)\b(?!\s+\w)/i;

const MIN_WORDS = 25;
const MAX_WORDS = 180;
const TARGET_MIN_CHARS = 350;
const TARGET_MAX_CHARS = 750;

export function validatePrompt(raw: string): { checks: PromptCheck[]; charCount: number; wordCount: number } {
  const text = raw.trim();
  const wordCount = text ? text.split(/\s+/).length : 0;
  const charCount = text.length;

  const checks: PromptCheck[] = [];

  checks.push(
    FORMAT_RE.test(text)
      ? { id: "format", label: "Format specified", status: "pass", message: "Aspect ratio or orientation is stated." }
      : {
          id: "format",
          label: "Format specified",
          status: "fail",
          message: "No aspect ratio found (e.g. \u201c9:16 vertical\u201d). Video tools default unpredictably without it.",
        }
  );

  checks.push(
    DURATION_RE.test(text)
      ? { id: "duration", label: "Duration specified", status: "pass", message: "Clip length is stated." }
      : {
          id: "duration",
          label: "Duration specified",
          status: "warn",
          message: "No explicit duration (e.g. \u201c5-second\u201d) found.",
        }
  );

  checks.push(
    MOTION_WORDS.test(text)
      ? { id: "motion", label: "Describes real motion", status: "pass", message: "The prompt describes an actual animated effect, not a static shot." }
      : {
          id: "motion",
          label: "Describes real motion",
          status: "fail",
          message: "No motion/effect words found (steam, drip, pour, orbit...). This may generate a static image instead of a video.",
        }
  );

  checks.push(
    LIGHT_BG_RE.test(text)
      ? { id: "light", label: "Lighting or background set", status: "pass", message: "Lighting or backdrop is described." }
      : {
          id: "light",
          label: "Lighting or background set",
          status: "warn",
          message: "No lighting/backdrop mentioned — the model will pick one for you, which can be inconsistent.",
        }
  );

  checks.push(
    REFERENCE_LOCK_RE.test(text)
      ? {
          id: "lock",
          label: "Locks the dish to the reference photo",
          status: "pass",
          message: "The prompt tells the model not to alter the uploaded dish.",
        }
      : {
          id: "lock",
          label: "Locks the dish to the reference photo",
          status: "fail",
          message: "Missing the reference-photo lock. Without it, the model is more likely to redesign the plate.",
        }
  );

  checks.push(
    QUALITY_RE.test(text)
      ? { id: "quality", label: "Quality/style descriptor", status: "pass", message: "A resolution or style keyword is present." }
      : {
          id: "quality",
          label: "Quality/style descriptor",
          status: "warn",
          message: "No quality keyword (8k, cinematic, photorealistic...) found.",
        }
  );

  if (wordCount > 0 && wordCount < MIN_WORDS) {
    checks.push({
      id: "length-short",
      label: "Length",
      status: "warn",
      message: `Only ${wordCount} words \u2014 likely too vague. Aim for ${MIN_WORDS}\u2013${MAX_WORDS}.`,
    });
  } else if (wordCount > MAX_WORDS) {
    checks.push({
      id: "length-long",
      label: "Length",
      status: "warn",
      message: `${wordCount} words \u2014 longer than needed, costs more tokens without adding fidelity. Consider shortening.`,
    });
  } else if (wordCount > 0) {
    checks.push({
      id: "length-ok",
      label: "Length",
      status: "pass",
      message: `${wordCount} words \u2014 in the efficient range.`,
    });
  }

  if (VAGUE_SUBJECT_RE.test(text)) {
    checks.push({
      id: "specificity",
      label: "Dish specificity",
      status: "warn",
      message: "Found a generic word (\u201cfood\u201d, \u201cdish\u201d, \u201cplate\u201d) without a specific dish name nearby \u2014 name the actual dish.",
    });
  }

  return { checks, charCount, wordCount };
}

/** Trims text to a target length at the nearest sentence or word boundary, adding an ellipsis. */
export function trimToLimit(text: string, maxChars: number = TARGET_MAX_CHARS): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxChars) return trimmed;

  const window = trimmed.slice(0, maxChars);
  const lastPeriod = window.lastIndexOf(". ");
  if (lastPeriod > maxChars * 0.6) {
    return trimmed.slice(0, lastPeriod + 1);
  }
  const lastSpace = window.lastIndexOf(" ");
  return (lastSpace > 0 ? window.slice(0, lastSpace) : window) + "\u2026";
}

export const LENGTH_TARGET = { min: TARGET_MIN_CHARS, max: TARGET_MAX_CHARS };
