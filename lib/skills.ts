export type SkillTaskType = "report" | "communication" | "analysis" | "audit" | "document" | "other";

export interface TypeFieldConfig {
  id: string;
  label: string;
  placeholder: string;
}

export interface TaskTypeConfig {
  id: SkillTaskType;
  label: string;
  desc: string;
  fields: TypeFieldConfig[];
}

export const TASK_TYPES: TaskTypeConfig[] = [
  {
    id: "report",
    label: "Report",
    desc: "A recurring summary \u2014 KPIs, status updates, recaps",
    fields: [
      { id: "dataSource", label: "Where does the data come from?", placeholder: "Prompt Studio export, a spreadsheet, Firestore..." },
      { id: "period", label: "What time period does it cover?", placeholder: "Weekly, monthly, on demand..." },
      { id: "metrics", label: "What must always be included?", placeholder: "Prompts generated, approval rate, by category..." },
      { id: "audience", label: "Who reads this?", placeholder: "Leadership, the design team..." },
    ],
  },
  {
    id: "communication",
    label: "Client communication",
    desc: "Emails, messages, templated outreach",
    fields: [
      { id: "situation", label: "What situation triggers this?", placeholder: "Missing photos, delivery ready, check-in..." },
      { id: "tone", label: "What tone is required?", placeholder: "Warm and low-pressure, formal, urgent..." },
      { id: "variables", label: "What changes per client?", placeholder: "Name, missing items, deadline..." },
      { id: "channel", label: "Channel", placeholder: "Email, WhatsApp, Slack..." },
    ],
  },
  {
    id: "analysis",
    label: "Data / KPI analysis",
    desc: "Interpreting numbers, spotting trends",
    fields: [
      { id: "questions", label: "What questions should it answer?", placeholder: "Which categories are underperforming..." },
      { id: "thresholds", label: "What does \u201cgood\u201d vs \u201cconcerning\u201d look like?", placeholder: "Below 50% approval is concerning..." },
      { id: "outputStyle", label: "Preferred output style", placeholder: "Table, narrative, bullet points..." },
    ],
  },
  {
    id: "audit",
    label: "Review / audit",
    desc: "Checking work against a standard",
    fields: [
      { id: "criteria", label: "What are the quality criteria?", placeholder: "Format specified, motion described..." },
      { id: "scoring", label: "How should pass/fail be decided?", placeholder: "All must pass, or a weighted score..." },
      { id: "feedbackStyle", label: "How should feedback be delivered?", placeholder: "Checklist with suggestions..." },
    ],
  },
  {
    id: "document",
    label: "Document creation",
    desc: "Structured docs, checklists, templates",
    fields: [
      { id: "docType", label: "What type of document?", placeholder: "Onboarding checklist, proposal..." },
      { id: "sections", label: "Required sections, in order", placeholder: "Overview, requirements, timeline..." },
      { id: "formatting", label: "Formatting requirements", placeholder: "Use tables, keep under 1 page..." },
    ],
  },
  {
    id: "other",
    label: "Other / custom",
    desc: "Doesn't fit the categories above",
    fields: [{ id: "details", label: "Describe the task in your own words", placeholder: "..." }],
  },
];

export interface SkillDraft {
  name: string;
  trigger: string;
  taskType: SkillTaskType;
  typeSpecific: Record<string, string>;
  steps: string[];
  requiredInputs: string[];
  outputFormat: string;
  goodExample: string;
  badExample: string;
  commonMistakes: string[];
}

export function emptySkillDraft(): SkillDraft {
  return {
    name: "",
    trigger: "",
    taskType: "report",
    typeSpecific: {},
    steps: [""],
    requiredInputs: [""],
    outputFormat: "",
    goodExample: "",
    badExample: "",
    commonMistakes: [""],
  };
}

export function slugify(name: string): string {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "custom-skill"
  );
}

export function buildSkillMarkdown(draft: SkillDraft): string {
  const typeConfig = TASK_TYPES.find((t) => t.id === draft.taskType);

  const typeSpecificLines = (typeConfig?.fields ?? [])
    .map((f) => {
      const val = draft.typeSpecific[f.id]?.trim();
      return val ? `- **${f.label}**: ${val}` : null;
    })
    .filter((l): l is string => Boolean(l))
    .join("\n");

  const stepsLines = draft.steps
    .filter((s) => s.trim())
    .map((s, i) => `${i + 1}. ${s.trim()}`)
    .join("\n");

  const inputsLines = draft.requiredInputs
    .filter((s) => s.trim())
    .map((s) => `- ${s.trim()}`)
    .join("\n");

  const mistakesLines = draft.commonMistakes
    .filter((s) => s.trim())
    .map((s) => `- ${s.trim()}`)
    .join("\n");

  const badExampleBlock = draft.badExample.trim()
    ? `\n## Example of what to avoid\n${draft.badExample.trim()}\n`
    : "";

  return `---
name: ${slugify(draft.name)}
description: ${draft.trigger.trim()}
---

# ${draft.name.trim() || "Untitled skill"}

## When to use this
${draft.trigger.trim() || "(not specified)"}

## Information to ask for if not provided
${inputsLines || "- (none specified)"}

## Context for this type of task
${typeSpecificLines || "- (none specified)"}

## Procedure
${stepsLines || "1. (no steps specified)"}

## Output format
${draft.outputFormat.trim() || "(not specified)"}

## Example of a good output
${draft.goodExample.trim() || "(not provided)"}
${badExampleBlock}
## Common mistakes to avoid
${mistakesLines || "- (none specified)"}
`;
}
