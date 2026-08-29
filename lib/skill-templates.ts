import type { SkillDraft, SkillTaskType } from "./skills";

export interface SkillTemplate {
  id: string;
  title: string;
  taskType: SkillTaskType;
  summary: string;
  draft: SkillDraft;
}

export const SKILL_TEMPLATES: SkillTemplate[] = [
  {
    id: "weekly-content-kpi-report",
    title: "Weekly content KPI report",
    taskType: "report",
    summary: "Summarize Prompt Studio activity by category and designer for the week.",
    draft: {
      name: "Weekly content KPI report",
      trigger:
        "Use this when asked to put together the weekly (or monthly) content production report for eMenu International \u2014 summarizing how many dish/drink prompts were generated and approved in Prompt Studio, broken down by category and by designer.",
      taskType: "report",
      typeSpecific: {
        dataSource: "Prompt Studio's \"My prompt list\" export (.txt), a screenshot of the Firestore library, or numbers given directly \u2014 ask if none are available, never estimate.",
        period: "Weekly by default; monthly or client-specific on request.",
        metrics: "Prompts generated and approved per category (Rice & Pasta, Meat & Seafood, Drinks, Desserts), attributed by designer.",
        audience: "Internal team and leadership. Strip designer names and rejection rates for a client-safe version.",
      },
      steps: [
        "Count prompts generated and approved per category and per designer for the date range.",
        "Identify the weakest category \u2014 fewest prompts or lowest approval rate \u2014 and call it out explicitly.",
        "Note any new custom prompts added to the shared library that week, and who added them.",
        "Compare against the previous period if that data is available, and note the trend.",
        "Write the report as: Headline, By the numbers (table), What needs attention, Library growth.",
      ],
      requiredInputs: [
        "Date range to cover (default: the last 7 days)",
        "Scope: all clients, or one specific client",
        "The data source for the numbers",
      ],
      outputFormat: "A short markdown report, under 300 words, with a table for \u201cBy the numbers.\u201d No charts unless asked.",
      goodExample:
        "Headline: Drinks coverage is lagging \u2014 only 2 of 9 possible effects used this week, while Desserts hit 100% approval.\n\n| Category | Generated | Approved |\n|---|---|---|\n| Rice & Pasta | 5 | 5 |\n| Meat & Seafood | 7 | 6 |\n| Drinks | 2 | 2 |\n| Desserts | 4 | 4 |\n\nWhat needs attention: Drinks only used 2 of 9 available effects. Consider prompting the team to cover Cocktails and Blend swirl next week.\n\nLibrary growth: 1 new custom prompt added \u2014 \u201cBBQ Smoke Slow Pan\u201d by lina@emenu-international.com, filed under Meat & Seafood.",
      badExample: "",
      commonMistakes: [
        "Don't invent numbers if the data wasn't provided \u2014 ask instead.",
        "Don't list every single prompt individually; this is a summary, not a log.",
        "Don't editorialize about individual designers unless it's explicitly a one-on-one review.",
      ],
    },
  },
  {
    id: "client-photo-followup",
    title: "Client photo follow-up",
    taskType: "communication",
    summary: "Draft a warm but clear message chasing missing dish/drink photos.",
    draft: {
      name: "Client photo follow-up",
      trigger:
        "Use this when asked to draft a follow-up message to a restaurant client who hasn't yet sent the dish or drink photos needed to produce their menu videos.",
      taskType: "communication",
      typeSpecific: {
        situation: "A restaurant client hasn't sent required dish/drink photos yet \u2014 could be a first gentle nudge or something blocking a deadline.",
        tone: "Warm and low-pressure for a first reminder; clear about the date, without sounding threatening, if it's time-sensitive.",
        variables: "Client/restaurant name, contact name, exactly what's missing, how long it's been waiting.",
        channel: "Email or WhatsApp \u2014 match the format to whichever is requested.",
      },
      steps: [
        "Open warmly, referencing the actual project/menu by name \u2014 never a generic greeting.",
        "State clearly and specifically what's needed \u2014 exact dishes or categories, not \u201csome photos.\u201d",
        "Give one concrete reason it matters to them \u2014 framed around their own upsell goals, not just our workflow.",
        "Make it effortless to respond: a shared folder link, a reply with attachments, or a quick call.",
        "Match the urgency to what was described, and sign off with a real name if provided.",
      ],
      requiredInputs: [
        "Client / restaurant name and contact name",
        "What's specifically missing",
        "How long it's been waiting, and the urgency level",
        "Channel: email or WhatsApp",
      ],
      outputFormat: "A ready-to-send message: email (subject + short body) or a shorter WhatsApp-style message.",
      goodExample:
        "Subject: Quick check-in on your dessert photos \ud83c\udf70\n\nHi Marco,\n\nHope things have been busy (in a good way!) at Trattoria Bella. We're ready to start building out the video content for your dessert menu, but we're still missing photos for the Tiramisu and the Panna Cotta.\n\nSince your entrees have already seen a nice lift since the new videos went live, we'd love to get desserts moving the same way \u2014 but we do need those two photos to get started.\n\nWhenever you get a chance, just reply to this email with the photos attached, or drop them in the shared folder here: [link].\n\nThanks so much,\nLina",
      badExample: "",
      commonMistakes: [
        "Don't guess which photos are missing if it wasn't specified \u2014 ask.",
        "Don't pile on multiple asks in one message if only one thing is needed.",
        "Don't use urgent language (\u201cASAP\u201d) unless explicitly time-sensitive.",
      ],
    },
  },
  {
    id: "new-client-onboarding-checklist",
    title: "New client onboarding checklist",
    taskType: "document",
    summary: "Standard checklist for bringing a new restaurant into the content pipeline.",
    draft: {
      name: "New client onboarding checklist",
      trigger:
        "Use this when a new restaurant, cafe, or bar is signing on and someone needs a clear checklist of what to collect and confirm before content production can begin.",
      taskType: "document",
      typeSpecific: {
        docType: "New client onboarding checklist",
        sections: "Client info, Content needed by category, Team ownership, Timeline",
        formatting: "Markdown checkboxes, grouped by section \u2014 scannable, meant to be worked through, not read end to end.",
      },
      steps: [
        "Confirm which menu categories apply and roughly how many dishes/drinks per category need content.",
        "List the specific photo requirements per dish, pointing to the Digital Menu Photography Guidelines standard.",
        "Set expectations on turnaround: photos in \u2192 prompt generated \u2192 video approved \u2192 live on the menu.",
        "Identify who on the internal team owns this client.",
        "Set a follow-up date to check on missing photos if not everything was delivered up front.",
      ],
      requiredInputs: [
        "Restaurant name and country",
        "Menu categories offered",
        "Point of contact for photo delivery and approvals",
        "Target launch date",
      ],
      outputFormat: "A checklist (markdown checkboxes) grouped into: Client info, Content needed by category, Team ownership, Timeline.",
      goodExample:
        "## Client info\n- [ ] Restaurant name: Trattoria Bella\n- [ ] Country: Italy\n- [ ] Contact: Marco Rossi (marco@trattoriabella.it)\n\n## Content needed by category\n- [ ] Rice & Pasta \u2014 4 dishes\n- [ ] Meat & Seafood \u2014 6 dishes\n- [ ] Desserts \u2014 3 dishes\n\n## Team ownership\n- [ ] Assigned designer: Lina\n\n## Timeline\n- [ ] Target launch: Oct 15\n- [ ] Follow-up check: Sept 30 if photos haven't arrived",
      badExample: "",
      commonMistakes: [
        "Don't assume all four menu categories apply \u2014 confirm with the client.",
        "Don't skip setting an internal owner \u2014 unowned onboarding stalls.",
      ],
    },
  },
  {
    id: "prompt-audit-checklist",
    title: "Prompt audit checklist",
    taskType: "audit",
    summary: "Review a submitted video prompt against the brand's quality standard.",
    draft: {
      name: "Prompt audit checklist",
      trigger:
        "Use this when asked to review or audit a video generation prompt before it's used in Google Flow \u2014 checking it against eMenu's quality standard.",
      taskType: "audit",
      typeSpecific: {
        criteria:
          "Format specified, duration specified, real motion described, lighting/background set, reference-photo lock present, dish named specifically (not \u201cthe dish\u201d), length roughly 350\u2013750 characters. This applies only to Flow video-generation prompts \u2014 not to Claude Skill files, which have no length ceiling.",
        scoring: "All criteria should pass; any failure needs one specific, actionable fix before approval.",
        feedbackStyle: "A checklist, one line per criterion with a \u2713 or \u2717 and a one-sentence fix for any \u2717, ending with an overall verdict.",
      },
      steps: [
        "Check the prompt has an aspect ratio and orientation stated.",
        "Check it has an explicit clip duration.",
        "Check it describes real motion (steam, drip, pour, orbit\u2026), not just a static description.",
        "Check lighting or background is set.",
        "Check it explicitly locks the dish to the reference photo (no restyling/regenerating).",
        "Check the dish is named specifically, not left as a generic \u201cthe dish\u201d or \u201cthe food.\u201d",
        "Check the length is efficient (roughly 350\u2013750 characters) \u2014 flag if much longer.",
        "Give an overall verdict: ready to use, or needs revision first.",
      ],
      requiredInputs: ["The full prompt text", "Which menu category / dish it's for, if not obvious"],
      outputFormat: "A short checklist \u2014 one line per criterion with \u2713/\u2717, a fix for any \u2717, and an overall verdict.",
      goodExample:
        "\u2713 Format specified (9:16 vertical)\n\u2713 Duration specified (5-second)\n\u2713 Describes real motion (steam rising)\n\u2717 Dish named specifically \u2014 says \u201cthe dish,\u201d change to \u201cthe grilled ribeye with chimichurri\u201d\n\u2713 Reference-photo lock present\n\u2713 Length efficient (612 characters)\n\nVerdict: needs one small revision (name the dish) before use.",
      badExample: "",
      commonMistakes: [
        "Don't approve a prompt with a vague dish reference just because everything else passes.",
        "Don't rewrite the whole prompt unless asked \u2014 point out the fix and let the person revise it.",
      ],
    },
  },
  {
    id: "hourly-billing-invoice",
    title: "Cuenta de cobro por horas",
    taskType: "document",
    summary: "Genera la cuenta de cobro mensual con el formato estándar de la empresa.",
    draft: {
      name: "Cuenta de cobro por horas",
      trigger:
        "\u00dasese cuando se pida generar la cuenta de cobro / factura de horas trabajadas del mes, a partir de las horas por proyecto y la tarifa vigente.",
      taskType: "document",
      typeSpecific: {
        docType: "Cuenta de cobro / factura de horas trabajadas",
        sections:
          "Datos del prestador, período facturado, detalle de horas por proyecto, tarifa y subtotal, total a pagar, datos bancarios",
        formatting:
          "Seguir exactamente el formato del ejemplo de abajo \u2014 mismo orden de secciones y misma tabla para el detalle de horas. Personaliza nombre, tarifa y cuenta bancaria a cada persona.",
      },
      steps: [
        "Si falta el período, las horas trabajadas o la tarifa, pedirlos antes de continuar \u2014 nunca inventar cifras.",
        "Calcular el subtotal por proyecto (horas \u00d7 tarifa) y el total general.",
        "Armar el documento siguiendo exactamente la estructura del ejemplo, cambiando solo los datos variables.",
        "Verificar que el total coincida con la suma del detalle antes de entregar.",
      ],
      requiredInputs: [
        "Nombre completo y documento del prestador de servicios",
        "Período a facturar",
        "Horas trabajadas por proyecto o cliente",
        "Tarifa por hora vigente",
        "Datos bancarios para el pago",
      ],
      outputFormat: "Un documento con el mismo formato exacto que el ejemplo de buen resultado de abajo.",
      goodExample:
        "CUENTA DE COBRO\nPrestador: [Nombre completo]\nDocumento de identidad: [N\u00famero]\nPer\u00edodo: [Ej. 1 al 31 de agosto de 2026]\n\nCliente: eMenu International\nConcepto: Servicios de dise\u00f1o / gesti\u00f3n de contenido\n\nDetalle de horas\n| Proyecto | Horas | Tarifa/hora | Subtotal |\n|---|---|---|---|\n| [Proyecto A] | [XX] | $[XX] | $[XXX] |\n| [Proyecto B] | [XX] | $[XX] | $[XXX] |\n\nTOTAL A PAGAR: $[XXX]\n\nDatos bancarios:\nBanco: [Nombre del banco]\nCuenta: [Tipo y n\u00famero de cuenta]\nTitular: [Nombre del titular]",
      badExample:
        "No des solo un total sin la tabla de detalle por proyecto, aunque solo haya un proyecto \u2014 el cliente necesita ver el desglose.",
      commonMistakes: [
        "No inventar horas o tarifas si no se proporcionan \u2014 siempre preguntar primero.",
        "No omitir la tabla de detalle por proyecto.",
        "Verificar que el total sume correctamente antes de entregar.",
      ],
    },
  },
];
