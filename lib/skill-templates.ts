import type { SkillTaskType } from "./skills";

export interface SkillTemplate {
  id: string;
  title: string;
  taskType: SkillTaskType;
  summary: string;
  markdown: string;
}

export const SKILL_TEMPLATES: SkillTemplate[] = [
  {
    id: "weekly-content-kpi-report",
    title: "Weekly content KPI report",
    taskType: "report",
    summary: "Summarize Prompt Studio activity by category and designer for the week.",
    markdown: `---
name: weekly-content-kpi-report
description: Use this skill when asked to put together the weekly (or monthly) content production report for eMenu International \u2014 summarizing how many dish/drink prompts were generated and approved in Prompt Studio, broken down by category and by designer. Trigger on requests like "weekly content report", "how did we do this week", "content KPIs", or "summarize Prompt Studio activity".
---

# Weekly Content KPI Report

## When to use this
Use this whenever someone asks for a status update on content production \u2014 a
weekly recap, a monthly rollup, or a client-specific content summary. This is
an internal reporting task, not a client-facing document unless explicitly
asked to make it client-safe (see "Client-safe mode" below).

## Information to ask for if not provided
- **Date range** the report should cover (default: the last 7 days if not specified).
- **Scope**: all clients, or one specific client/restaurant.
- **Source of the data**: the Prompt Studio "My prompt list" export (.txt),
  a screenshot of the Firestore custom-effects library, or numbers the person
  gives you directly. If none of these are available, ask for them before
  proceeding \u2014 do not estimate or fabricate figures.

## Procedure
1. Parse the provided data to count, for the date range:
   - Total prompts generated, broken down by menu category (Rice & Pasta,
     Meat & Seafood, Drinks, Desserts).
   - How many were marked approved vs. still pending vs. rejected, if that
     status is available in the data.
   - Which designer/team member submitted each one, if attributed.
2. Identify the **weakest category** \u2014 the one with the fewest prompts or
   lowest approval rate \u2014 and call it out explicitly. This is the most useful
   part of the report; don't bury it.
3. Identify any **custom (designer-submitted) prompts** added to the shared
   library that week, and who added them.
4. Compare against the previous period if that data is available, and note
   whether output is trending up or down.
5. Write the report in this structure:
   - **Headline**: one sentence, the single most important takeaway.
   - **By the numbers**: a short table \u2014 category, prompts generated, approved.
   - **What needs attention**: the weak spot(s) found in step 2.
   - **Library growth**: new custom prompts added, by whom.
6. Keep the whole report under 300 words unless asked for a detailed version.

## Output format
A short markdown report with the four sections above. Use a table for "By
the numbers" \u2014 do not use a chart unless explicitly asked, since this is
meant to be read quickly, not presented.

## Client-safe mode
If asked to prepare a version to share with a restaurant client (not
internal), remove any mention of internal designer names, rejection rates,
or backlog \u2014 clients should only see what was delivered and what's covered
on their menu, framed positively.

## Common mistakes to avoid
- Don't invent numbers if the data wasn't provided \u2014 ask instead.
- Don't list every single prompt individually; this is a summary, not a log.
- Don't editorialize about individual designers' performance unless the
  report is explicitly for a one-on-one review, not a team update.
`,
  },
  {
    id: "client-photo-followup",
    title: "Client photo follow-up",
    taskType: "communication",
    summary: "Draft a warm but clear message chasing missing dish/drink photos.",
    markdown: `---
name: client-photo-followup
description: Use this skill when asked to draft a follow-up message to a restaurant client who hasn't yet sent the dish or drink photos needed to produce their menu videos. Trigger on requests like "follow up with [client] about photos", "chase down missing photos", "remind the client we're waiting on images", or similar.
---

# Client Photo Follow-Up

## When to use this
Use this whenever someone needs to nudge a restaurant client (or a specific
contact at that restaurant) to send the photos required to keep their
content pipeline moving. This is a client-facing message \u2014 tone matters more
here than in internal reports.

## Information to ask for if not provided
- **Client / restaurant name**
- **Contact name**, if known (use it \u2014 avoids a generic "Dear Sir/Madam" feel)
- **What's specifically missing** \u2014 which dishes, which categories, or "the
  full batch" if nothing has arrived yet
- **How long it's been waiting** (helps calibrate urgency)
- **Channel**: email, WhatsApp, or a Slack/internal note to relay to the client
- **Urgency level**: gentle reminder vs. this is blocking a deadline

## Procedure
1. Open warmly, referencing the actual project/menu by name \u2014 never a
   generic "Hi there."
2. State clearly and specifically what's needed (exact dishes or categories,
   not "some photos").
3. Give one concrete, low-friction reason it matters to *them* \u2014 framed
   around their own upsell goals, not just "we need it to do our job."
4. Make it effortless to respond: suggest a specific next step (a shared
   folder link, a reply with attachments, a quick call).
5. Match the urgency to what was provided.
6. Sign off with a real name and role if provided.

## Output format
A ready-to-send message in the requested channel's natural format \u2014 email
(subject + short body) or a shorter, conversational WhatsApp message.

## Common mistakes to avoid
- Don't guess which photos are missing if it wasn't specified \u2014 ask.
- Don't pile on multiple asks in one message if only one thing is needed.
- Don't use urgent language ("ASAP") unless explicitly time-sensitive.
`,
  },
  {
    id: "new-client-onboarding-checklist",
    title: "New client onboarding checklist",
    taskType: "document",
    summary: "Standard checklist for bringing a new restaurant into the content pipeline.",
    markdown: `---
name: new-client-onboarding-checklist
description: Use this skill when asked to prepare the onboarding checklist for a new restaurant client starting with eMenu International \u2014 what photos/videos are needed, what menu categories to cover, and what information to collect before content production can start. Trigger on "new client onboarding", "onboard [restaurant]", or "what do we need from a new client".
---

# New Client Onboarding Checklist

## When to use this
Use this when a new restaurant, cafe, or bar is signing on and someone needs
a clear checklist of what to collect and confirm before content production
(prompts, videos) can begin.

## Information to ask for if not provided
- **Restaurant name and country** (menu conventions and dish naming vary by
  market \u2014 this matters for translation/localization later).
- **Menu categories they offer**: which of Rice & Pasta, Meat & Seafood,
  Drinks, Desserts apply, and any category outside those four.
- **Point of contact** for photo delivery and approvals.
- **Existing photo/video assets**, if any, vs. starting from zero.
- **Target launch date** for the digital menu going live.

## Procedure
1. Confirm which menu categories apply and roughly how many dishes/drinks
   per category need content.
2. List out the specific photo requirements per dish (well-lit, on-brand
   plating, no other hands/utensils in frame unless intentional) \u2014 point to
   the existing "Digital Menu Photography Guidelines" standard.
3. Set expectations on turnaround: photos in \u2192 prompt generated \u2192 video
   approved \u2192 live on the client's menu.
4. Identify who on the internal team owns this client (designer assigned).
5. Set a follow-up date to check on missing photos if the client hasn't
   delivered everything up front.

## Output format
A checklist (markdown checkboxes), grouped into: **Client info**, **Content
needed by category**, **Team ownership**, **Timeline**. Keep it scannable \u2014
this is meant to be worked through, not read end to end.

## Common mistakes to avoid
- Don't assume all four menu categories apply \u2014 confirm with the client.
- Don't skip setting an internal owner \u2014 unowned onboarding stalls.
`,
  },
  {
    id: "prompt-audit-checklist",
    title: "Prompt audit checklist",
    taskType: "audit",
    summary: "Review a submitted video prompt against the brand's quality standard.",
    markdown: `---
name: prompt-audit-checklist
description: Use this skill when asked to review or audit a video generation prompt before it's used in Google Flow \u2014 checking it against eMenu's quality standard (format, real motion, reference-photo lock, specificity). Trigger on "audit this prompt", "check this prompt before I use it", or "does this prompt meet our standard".
---

# Prompt Audit Checklist

## When to use this
Use this whenever a designer or team member wants a prompt reviewed before
sending it to Google Flow \u2014 whether it came from Prompt Studio, was
hand-written, or was submitted by someone else for approval.

**This applies only to Flow video-generation prompts \u2014 not to Claude Skill
files.** Skills follow a completely different standard and have no length
ceiling; they should be as long and detailed as the task requires. Do not
apply the length or character-count guidance below to anything other than a
Flow prompt.

## Information to ask for if not provided
- The full prompt text.
- Which menu category / dish it's for, if not obvious from the prompt.

## Procedure
Check the prompt against each of these, and report pass/fail with a specific
fix for anything that fails \u2014 don't just say "improve this":
1. **Format specified** \u2014 aspect ratio and orientation stated (9:16, 1:1, 16:9).
2. **Duration specified** \u2014 an explicit clip length (e.g. "5-second").
3. **Describes real motion** \u2014 an actual animated effect (steam, drip, pour,
   orbit...), not just a static description.
4. **Lighting or background set** \u2014 otherwise the model picks one inconsistently.
5. **Locks the dish to the reference photo** \u2014 explicitly tells the model not
   to restyle, replace, or regenerate the dish itself.
6. **Names the specific dish** \u2014 not a generic "the food" or "the dish"
   standing in for a real name.
7. **Length is efficient** \u2014 roughly 350\u2013750 characters; much longer wastes
   tokens without adding fidelity.

## Output format
A short checklist \u2014 one line per criterion with a \u2713 or \u2717 and, for any
\u2717, one sentence on exactly how to fix it. End with an overall verdict: ready
to use, or needs revision first.

## Common mistakes to avoid
- Don't approve a prompt with a vague dish reference just because everything
  else passes \u2014 specificity has an outsized effect on result quality.
- Don't rewrite the whole prompt unless asked \u2014 point out what to fix and
  let the person revise it themselves, unless they explicitly want a rewrite.
`,
  },
];
