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
// Flags a generic word (food/dish/plate/meal) only when it stands alone as the subject —
// not when it's part of a list (", food,") or a fixed phrase ("the dish itself").
const VAGUE_SUBJECT_RE = /\b(food|dish|meal|plate)\b(?!\s+\w)(?!,)/i;

const TARGET_MIN_CHARS = 350;
const TARGET_MAX_CHARS = 750;

export function validatePrompt(raw: string): { checks: PromptCheck[]; charCount: number; wordCount: number } {
  const text = raw.trim();
  const wordCount = text ? text.split(/\s+/).length : 0;
  const charCount = text.length;

  const checks: PromptCheck[] = [];

  checks.push(
    FORMAT_RE.test(text)
      ? { id: "format", label: "Format specified", status: "pass", message: "Aspect ratio is stated." }
      : {
          id: "format",
          label: "Format specified",
          status: "fail",
          message: "Add an aspect ratio near the start, e.g. \u201c9:16 vertical\u201d or \u201c16:9 horizontal.\u201d",
        }
  );

  checks.push(
    DURATION_RE.test(text)
      ? { id: "duration", label: "Duration specified", status: "pass", message: "Clip length is stated." }
      : {
          id: "duration",
          label: "Duration specified",
          status: "warn",
          message: "Add a clip length right after the format, e.g. \u201c5-second seamless loop.\u201d",
        }
  );

  checks.push(
    MOTION_WORDS.test(text)
      ? { id: "motion", label: "Describes real motion", status: "pass", message: "Describes an actual animated effect, not a static shot." }
      : {
          id: "motion",
          label: "Describes real motion",
          status: "fail",
          message: "Describe what actually moves \u2014 steam rising, sauce dripping, camera slowly orbiting \u2014 or this may render as a still image.",
        }
  );

  checks.push(
    LIGHT_BG_RE.test(text)
      ? { id: "light", label: "Lighting or background set", status: "pass", message: "Lighting or backdrop is described." }
      : {
          id: "light",
          label: "Lighting or background set",
          status: "warn",
          message: "Add a short phrase like \u201cdark moody kitchen background\u201d or \u201cwarm side lighting\u201d \u2014 otherwise the model picks one for you.",
        }
  );

  checks.push(
    REFERENCE_LOCK_RE.test(text)
      ? {
          id: "lock",
          label: "Locks the dish to the reference photo",
          status: "pass",
          message: "Tells the model not to alter the uploaded dish.",
        }
      : {
          id: "lock",
          label: "Locks the dish to the reference photo",
          status: "fail",
          message: "Add a line telling the model to keep the dish exactly as in the uploaded photo, with no restyling \u2014 otherwise it's more likely to redesign the plate.",
        }
  );

  checks.push(
    QUALITY_RE.test(text)
      ? { id: "quality", label: "Quality/style descriptor", status: "pass", message: "A resolution or style keyword is present." }
      : {
          id: "quality",
          label: "Quality/style descriptor",
          status: "warn",
          message: "Add a quality keyword near the end, e.g. \u201c8k\u201d or \u201cphotorealistic,\u201d for a more consistent result.",
        }
  );

  if (charCount > 0 && charCount < TARGET_MIN_CHARS) {
    checks.push({
      id: "length-short",
      label: "Length",
      status: "warn",
      message: `${charCount} characters \u2014 likely too vague. Add a bit more scene detail to reach ${TARGET_MIN_CHARS}\u2013${TARGET_MAX_CHARS}.`,
    });
  } else if (charCount > TARGET_MAX_CHARS) {
    checks.push({
      id: "length-long",
      label: "Length",
      status: "warn",
      message: `${charCount} characters \u2014 longer than needed, costs more tokens without adding fidelity. Use \u201cShorten to fit\u201d below.`,
    });
  } else if (charCount > 0) {
    checks.push({
      id: "length-ok",
      label: "Length",
      status: "pass",
      message: `${charCount} characters \u2014 in the efficient range.`,
    });
  }

  if (VAGUE_SUBJECT_RE.test(text)) {
    checks.push({
      id: "specificity",
      label: "Dish specificity",
      status: "warn",
      message: "Replace the generic word (\u201cfood\u201d, \u201cdish\u201d, \u201cplate\u201d) with the actual dish name \u2014 it noticeably improves the result.",
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
