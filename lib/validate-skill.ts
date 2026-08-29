import type { SkillDraft } from "./skills";

export type CheckStatus = "pass" | "warn" | "fail";

export interface SkillCheck {
  id: string;
  label: string;
  status: CheckStatus;
  message: string;
}

export function validateSkillDraft(draft: SkillDraft): SkillCheck[] {
  const checks: SkillCheck[] = [];

  checks.push(
    draft.name.trim().length > 2
      ? { id: "name", label: "Skill name", status: "pass", message: "Name is set." }
      : {
          id: "name",
          label: "Skill name",
          status: "fail",
          message: "Give it a short, clear name \u2014 e.g. \u201cWeekly content report.\u201d",
        }
  );

  const triggerWords = draft.trigger.trim().split(/\s+/).filter(Boolean).length;
  checks.push(
    triggerWords >= 8
      ? {
          id: "trigger",
          label: "Trigger is specific",
          status: "pass",
          message: "The trigger gives Claude enough context to recognize when to use this.",
        }
      : {
          id: "trigger",
          label: "Trigger is specific",
          status: "fail",
          message:
            "This is the most important field. Describe exactly when Claude should use this skill \u2014 e.g. \u201cwhen asked for the weekly content KPI report,\u201d not just \u201creports.\u201d",
        }
  );

  const realSteps = draft.steps.filter((s) => s.trim()).length;
  checks.push(
    realSteps >= 2
      ? { id: "steps", label: "Procedure has steps", status: "pass", message: `${realSteps} steps defined.` }
      : {
          id: "steps",
          label: "Procedure has steps",
          status: "warn",
          message: "Add at least 2\u20133 concrete steps so Claude follows the same process every time.",
        }
  );

  checks.push(
    draft.outputFormat.trim().length > 0
      ? { id: "output", label: "Output format specified", status: "pass", message: "Output format is defined." }
      : {
          id: "output",
          label: "Output format specified",
          status: "warn",
          message: "Describe what the result should look like \u2014 a table, an email, a checklist...",
        }
  );

  checks.push(
    draft.goodExample.trim().length > 20
      ? { id: "example", label: "Includes an example", status: "pass", message: "A good example is included." }
      : {
          id: "example",
          label: "Includes an example",
          status: "warn",
          message: "Add a real example of a good output \u2014 examples improve consistency more than instructions alone.",
        }
  );

  return checks;
}
