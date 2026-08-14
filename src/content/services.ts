/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SERVICES
 *
 *  Add, remove or reorder freely — the services page, the homepage grid, the
 *  detail pages, the sitemap and the schema all read from this one array.
 *
 *  To add a service: copy a block, change the `slug`, and drop a matching image
 *  at public/images/services/<slug>.jpg (or point `image` anywhere you like).
 *
 *  ⚑ `startingPrice` is null everywhere on purpose — no invented prices.
 *     Fill in real numbers, then set `showPrices: true` in src/content/site.ts.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Duration = { minutes: number; note?: string };

export type Service = {
  slug: string;
  name: string;
  /** Small label above the name. Groups the menu without hard categories. */
  category: "Therapeutic" | "Restorative" | "Performance" | "Specialized";
  /** One evocative line for cards. */
  tagline: string;
  /** Card paragraph — two sentences at most. */
  summary: string;
  /** Detail-page body. Each string is a paragraph. */
  body: string[];
  /** "Who it may be a good fit for" bullets. */
  goodFor: string[];
  /** Hands-on work that may appear in the session. */
  includes: string[];
  durations: Duration[];
  startingPrice: number | null;
  image: string;
  /** Slugs shown as "you might also consider". */
  related: string[];
  /** Set false to hide from the site without deleting the entry. */
  active?: boolean;
};

export const services: Service[] = [
  {
    slug: "therapeutic-massage",
    name: "Therapeutic Massage",
    category: "Therapeutic",
    tagline: "Considered, unhurried work with a clear purpose.",
    summary:
      "A full session built around what your body is actually asking for that day — thorough, specific, and paced so your nervous system can keep up.",
    body: [
      "Therapeutic massage is the foundation of the practice. We start with a short conversation: where things feel tight, what your days ask of your body, what you want to walk out feeling. Then the work follows that map rather than a script.",
      "Pressure is matched to your tissue and your tolerance, not to a menu. Some areas want slow, patient contact. Others want to be met firmly and then left alone. Reading that difference — and adjusting in real time — is most of the craft.",
      "Most people book this when something has been nagging for a while and they want it addressed properly, with enough time to do it well.",
    ],
    goodFor: [
      "Persistent tension in the neck, shoulders, back or hips",
      "Long hours at a desk, in a car, or on your feet",
      "Wanting one session that covers the whole body thoroughly",
      "A first visit, when you are not sure which service to choose",
    ],
    includes: [
      "Intake conversation and postural observation",
      "Broad warming work, then focused attention where it is needed",
      "Trigger point and deep tissue techniques as appropriate",
      "Assisted stretching to finish",
    ],
    durations: [{ minutes: 60 }, { minutes: 90, note: "Most requested" }, { minutes: 120 }],
    startingPrice: null,
    image: "/images/services/therapeutic-massage.jpg",
    related: ["deep-tissue", "trigger-point", "customized-bodywork"],
  },
  {
    slug: "deep-tissue",
    name: "Deep Tissue",
    category: "Therapeutic",
    tagline: "Depth earned slowly, never forced.",
    summary:
      "Slow, weighted work into the deeper layers of muscle and fascia — firm, specific, and always kept inside a range you can breathe through.",
    body: [
      "Deep tissue is often misunderstood as simply harder pressure. Done well, it is slower pressure. The aim is to sink through the surface layers as they let go, rather than push past them, and to stay at the depth where the tissue is actually responding.",
      "You will be asked for feedback throughout. Good deep work should feel like a strong, clear sensation you can stay relaxed inside of — not something you have to brace against. Bracing works against the whole point.",
      "This pairs naturally with trigger point work and stretching, and it is frequently what people mean when they say nothing lighter has touched the problem.",
    ],
    goodFor: [
      "Chronically tight or dense areas that lighter work has not reached",
      "Physically demanding work or training loads",
      "People who prefer firm, focused pressure",
      "Long-standing restriction around the shoulders, low back or hips",
    ],
    includes: [
      "Gradual warming so depth is comfortable",
      "Slow, sustained fascial work",
      "Forearm, elbow and knuckle techniques where appropriate",
      "Breath cues to help tissue release",
    ],
    durations: [{ minutes: 60 }, { minutes: 90, note: "Recommended" }, { minutes: 120 }],
    startingPrice: null,
    image: "/images/services/deep-tissue.jpg",
    related: ["trigger-point", "therapeutic-massage", "sports-recovery"],
  },
  {
    slug: "relaxation-massage",
    name: "Relaxation Massage",
    category: "Restorative",
    tagline: "Nothing to fix. Somewhere to land.",
    summary:
      "Flowing, full-body work at a steady, unhurried rhythm — designed to quiet the nervous system rather than chase a problem.",
    body: [
      "Not every session needs an agenda. This one is about rhythm: long, continuous strokes, even pressure, and very few interruptions, so your attention can drop out of your head and back into your body.",
      "It is genuinely restorative work, not a lesser version of therapeutic massage. Slowing the nervous system down is a real outcome, and for many people it is the one they need most.",
      "Choose the longer session if you tend to need a while to actually let go. Most people do.",
    ],
    goodFor: [
      "Stress, mental overload, or trouble winding down",
      "Anyone who wants to feel cared for rather than worked on",
      "Travel recovery and disrupted sleep",
      "A first experience of massage, if you are new to it",
    ],
    includes: [
      "Continuous full-body flow",
      "Steady moderate pressure throughout",
      "Attention to scalp, neck, hands and feet",
      "A quiet room and an unhurried close",
    ],
    durations: [{ minutes: 60 }, { minutes: 90, note: "Best for fully settling" }, { minutes: 120 }],
    startingPrice: null,
    image: "/images/services/relaxation-massage.jpg",
    related: ["cranial-sacral", "therapeutic-massage", "lymphatic"],
  },
  {
    slug: "sports-recovery",
    name: "Sports & Recovery",
    category: "Performance",
    tagline: "For bodies that are asked to perform.",
    summary:
      "Recovery-focused bodywork for training, competition and hard physical work — combining focused soft tissue work with stretching and mobility.",
    body: [
      "Built from time spent in a chiropractic and sports-care setting, where sessions were routinely scheduled around training, treatment and adjustments. That environment teaches you to work with a clear purpose and to respect what the rest of someone's week is doing to them.",
      "The work adapts to where you are in your cycle. Before an event, it stays brisk and mobilising. After one, it turns slower and more restorative. In a heavy training block, it targets the areas taking the most load.",
      "Sessions often combine soft tissue work with assisted stretching, so you leave with more available range, not just less soreness.",
    ],
    goodFor: [
      "Runners, surfers, cyclists, climbers and lifters",
      "Recovery between hard training blocks or after an event",
      "Physically demanding trades and long days on your feet",
      "Anyone maintaining a body that gets used hard",
    ],
    includes: [
      "Targeted work on the areas taking the most load",
      "Assisted stretching and joint mobility",
      "Trigger point work where it is useful",
      "Simple suggestions for what to do between sessions",
    ],
    durations: [
      { minutes: 30, note: "Focused, single-area" },
      { minutes: 60 },
      { minutes: 90, note: "Full recovery session" },
    ],
    startingPrice: null,
    image: "/images/services/sports-recovery.jpg",
    related: ["stretching-mobility", "deep-tissue", "trigger-point"],
  },
  {
    slug: "trigger-point",
    name: "Trigger Point Therapy",
    category: "Therapeutic",
    tagline: "Precise pressure, exactly where it matters.",
    summary:
      "Specific, sustained pressure on tight bands of muscle that can refer sensation elsewhere — useful when the sore spot and the source are not the same place.",
    body: [
      "Tight, irritable points within a muscle can refer sensation well away from themselves. A knot near the shoulder blade may be felt up the neck; one in the hip may be felt down the leg. Chasing the place that hurts can miss the place that is causing it.",
      "This work is methodical: locate the point, apply sustained and measured pressure, wait for the tissue to change, then follow with movement or stretch so the release holds.",
      "It is precise rather than relaxing, and it is often the fastest route into a stubborn pattern. It combines well inside a longer therapeutic session.",
    ],
    goodFor: [
      "Recurring knots that keep coming back to the same spot",
      "Tension patterns that seem to travel",
      "Desk-related neck, jaw and shoulder tightness",
      "People who want focused work over a full-body session",
    ],
    includes: [
      "Assessment of the tissue and its referral pattern",
      "Sustained, measured compression",
      "Movement and stretch to consolidate the change",
      "Feedback throughout so pressure stays productive",
    ],
    durations: [{ minutes: 30, note: "Single area" }, { minutes: 60 }, { minutes: 90 }],
    startingPrice: null,
    image: "/images/services/trigger-point.jpg",
    related: ["deep-tissue", "therapeutic-massage", "sports-recovery"],
  },
  {
    slug: "stretching-mobility",
    name: "Stretching & Mobility",
    category: "Performance",
    tagline: "Range you can actually use.",
    summary:
      "Table-based assisted stretching and joint mobility work, informed by Genius of Flexibility / RFST training — for range that holds, not just range you borrow.",
    body: [
      "Assisted stretching lets your body reach positions it will not find on its own, with resistance and support applied at the right moments. Because you are not managing your own balance, the muscle can genuinely let go.",
      "The approach draws on Genius of Flexibility / RFST training, which treats flexibility as something the nervous system negotiates rather than something you force. Resistance is used deliberately, so the range you gain is range you can control.",
      "It works as a standalone session or as the last stretch of a longer bodywork appointment. People who sit all day and people who train hard tend to want it for opposite reasons, and both benefit.",
    ],
    goodFor: [
      "Feeling stiff, restricted, or older than you are",
      "Hips, hamstrings, shoulders and thoracic spine",
      "Athletes wanting usable range rather than passive flexibility",
      "Long sitters, drivers and desk workers",
    ],
    includes: [
      "Assisted table-based stretching",
      "Resistance-based flexibility techniques",
      "Joint mobility work",
      "A few things to keep doing at home",
    ],
    durations: [{ minutes: 30 }, { minutes: 60, note: "Full session" }, { minutes: 90 }],
    startingPrice: null,
    image: "/images/services/stretching-mobility.jpg",
    related: ["sports-recovery", "customized-bodywork", "therapeutic-massage"],
  },
  {
    slug: "lymphatic",
    name: "Lymphatic Massage",
    category: "Restorative",
    tagline: "Light, rhythmic, quietly effective.",
    summary:
      "Very light, rhythmic work following the body's lymphatic pathways — gentle by design, and often deeply calming.",
    body: [
      "Lymphatic work is the lightest thing offered here, and the least like what most people expect from massage. The contact is slow, repetitive and barely more than skin-deep, following the natural pathways of the lymphatic system.",
      "Because the pressure is so light and the rhythm so consistent, sessions tend to be profoundly quieting. Many people fall asleep.",
      "If you are managing a specific medical condition, please check with your physician first — this work is offered for general wellbeing, not as medical treatment.",
    ],
    goodFor: [
      "Feelings of puffiness, heaviness or sluggishness",
      "Anyone who finds firm pressure too much",
      "Recovery periods when deep work is not appropriate",
      "Pairing with rest during a demanding stretch of life",
    ],
    includes: [
      "Very light, rhythmic, repetitive contact",
      "Sequencing that follows lymphatic pathways",
      "A slow, quiet, warm room",
      "Unhurried transitions throughout",
    ],
    durations: [{ minutes: 60 }, { minutes: 90 }],
    startingPrice: null,
    image: "/images/services/lymphatic.jpg",
    related: ["relaxation-massage", "cranial-sacral", "customized-bodywork"],
  },
  {
    slug: "cranial-sacral",
    name: "Cranial-Sacral Work",
    category: "Specialized",
    tagline: "The quietest work on the menu.",
    summary:
      "Subtle, sustained holds at the head, neck and sacrum. Almost nothing appears to happen, and the settling can be remarkable.",
    body: [
      "Cranial-sacral technique uses very light, sustained contact — often just the weight of a hand — at the head, along the spine and at the sacrum. From the outside it can look like nothing is happening at all.",
      "What people usually report is a change in state: breathing drops lower, the jaw and eyes soften, the body stops holding itself. For anyone who lives in a state of alertness, that shift is the point.",
      "It is frequently requested by people who find heavier work overstimulating, and it folds beautifully into the end of a longer session.",
    ],
    goodFor: [
      "Headache-prone patterns, jaw clenching, eye strain",
      "Feeling wired, over-stimulated, or unable to switch off",
      "Anyone who prefers extremely gentle contact",
      "The end of a demanding week",
    ],
    includes: [
      "Light sustained holds at head, neck and sacrum",
      "Table Shiatsu elements where useful",
      "Long quiet phases with minimal talking",
      "A slow, protected close",
    ],
    durations: [{ minutes: 60 }, { minutes: 90 }],
    startingPrice: null,
    image: "/images/services/cranial-sacral.jpg",
    related: ["relaxation-massage", "lymphatic", "customized-bodywork"],
  },
  {
    slug: "customized-bodywork",
    name: "Customized Bodywork",
    category: "Specialized",
    tagline: "Built entirely around you.",
    summary:
      "One session drawing on everything in the toolkit — therapeutic, shiatsu, cranial-sacral, stretching — assembled around what your body needs that day.",
    body: [
      "Bodies rarely arrive as a single category. A session might open with broad therapeutic work, move into deep tissue through the hips, use Table Shiatsu along the back line, add assisted stretching, and finish with several quiet minutes of cranial-sacral holds.",
      "That range is the reason for training in so many approaches. Rather than fitting you to a modality, the modality is chosen to fit you — and can change halfway through if your body says something different.",
      "If you are not sure what to book, book this. We will work it out together in the first few minutes.",
    ],
    goodFor: [
      "Anyone unsure which service is the right one",
      "Bodies with several things going on at once",
      "Returning clients whose needs shift week to week",
      "People who want the full range of the practice available",
    ],
    includes: [
      "A conversation first, then a plan",
      "Any combination of the techniques offered here",
      "Freedom to change direction mid-session",
      "Notes carried forward to your next visit",
    ],
    durations: [
      { minutes: 60 },
      { minutes: 90, note: "Room to cover more" },
      { minutes: 120, note: "The most complete session" },
    ],
    startingPrice: null,
    image: "/images/services/customized-bodywork.jpg",
    related: ["therapeutic-massage", "stretching-mobility", "cranial-sacral"],
  },
];

export const activeServices = services.filter((s) => s.active !== false);

export const getService = (slug: string) => activeServices.find((s) => s.slug === slug);

export const serviceCategories = [
  {
    key: "Therapeutic",
    label: "Therapeutic",
    blurb: "Focused work for tension, restriction and long-standing patterns.",
  },
  { key: "Restorative", label: "Restorative", blurb: "Slower sessions that settle the nervous system." },
  { key: "Performance", label: "Performance", blurb: "Recovery, range and readiness for active bodies." },
  { key: "Specialized", label: "Specialized", blurb: "Subtle and combined approaches, tailored session by session." },
] as const;

/** Formats "60 · 90 · 120 min" for cards. */
export const durationLabel = (durations: Duration[]) =>
  `${durations.map((d) => d.minutes).join(" · ")} min`;
