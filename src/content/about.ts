/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ABOUT — the story, the training, the approach.
 *
 *  Every factual claim below comes from real background. Nothing here invents a
 *  certification, a licence, a degree, an award or a medical qualification —
 *  please keep it that way when you edit.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const about = {
  eyebrow: "About",
  title: "Trained hands, and the attention to use them well.",
  lead: "Good bodywork is mostly listening. The training tells your hands what is possible; the person on the table tells them what is needed.",

  /** Main narrative. Each string is a paragraph. */
  story: [
    "My formal education was 750+ hours at the Santa Barbara Body Therapy Institute — anatomy, physiology, and a great deal of time with hands on real bodies. What that many hours actually buys you is not a longer list of techniques. It is discrimination: the ability to feel the difference between tissue that is guarding and tissue that is ready, and to know which one is under your hands right now.",
    "From there I trained further in Genius of Flexibility and RFST work, which changed how I think about range of motion. Flexibility stopped looking like something you stretch into and started looking like something the nervous system agrees to. That idea runs through everything I do now, including sessions that never look like stretching at all.",
    "The most formative stretch of my working life was at Ford Chiropractic & Sports Care in La Mesa, alongside Dr. Hunter Ford. Massage there was rarely an add-on. It was often the work that came immediately before an adjustment, which meant my job was to prepare tissue for something specific — and to communicate clearly about what I was finding.",
    "In that setting I worked with 50+ clients a week. Volume like that is its own education. You stop guessing, because you have felt the same pattern in a hundred different bodies and learned how differently each of them responds. You also learn to work efficiently: a focused 20 or 30 minutes on one region, or two full hours across a whole body, with the same intent behind both.",
    "Santa Barbara is where all of that comes together now. Athletes and desk workers, people carrying an old injury and people who simply have not felt at home in their body for a while. The work is different for each of them. The attention is the same.",
  ],

  /**
   * ⚑ OPTIONAL — a personal note in your own voice. Delete the placeholder and
   * write two or three sentences about why this work matters to you. Set to an
   * empty string to hide the block entirely.
   */
  personalNote:
    "[Optional: add two or three sentences here in your own words — what drew you to bodywork, what you love about it, what you want people to feel when they leave. This is the most personal part of the page. Delete this bracketed text and replace it, or set `personalNote: \"\"` in src/content/about.ts to hide the block.]",

  /** The credibility row. Factual only. */
  credentials: [
    {
      figure: "750+",
      label: "Hours of formal training",
      detail: "Santa Barbara Body Therapy Institute — anatomy, physiology, and supervised hands-on practice.",
    },
    {
      figure: "50+",
      label: "Clients each week",
      detail: "Sustained clinical volume in a working chiropractic and sports-care practice.",
    },
    {
      figure: "10",
      label: "Hands-on approaches",
      detail: "From deep tissue and trigger point work to Table Shiatsu, lymphatic and cranial-sacral technique.",
    },
    {
      figure: "20–120",
      label: "Minutes per session",
      detail: "Focused single-area work through to full two-hour sessions, matched to what you need.",
    },
  ],

  /** Training and professional experience, stated plainly. */
  background: [
    {
      title: "Santa Barbara Body Therapy Institute",
      meta: "750+ hours of massage therapy education",
      body: "Formal training in anatomy, physiology and hands-on technique, with substantial supervised practice.",
    },
    {
      title: "Genius of Flexibility / RFST",
      meta: "Additional training",
      body: "Resistance-based flexibility work, and a framework for treating range of motion as something the nervous system negotiates.",
    },
    {
      title: "Ford Chiropractic & Sports Care — La Mesa",
      meta: "Professional experience alongside Dr. Hunter Ford",
      body: "Therapeutic massage within a chiropractic and sports-care practice, frequently performed immediately before adjustments, at a volume of 50+ clients per week.",
    },
  ],

  /** Hands-on techniques. Shown as a quiet list; also used on the services page. */
  techniques: [
    "Therapeutic massage",
    "Deep tissue",
    "Trigger point therapy",
    "Table Shiatsu",
    "Lymphatic drainage",
    "Cranial-sacral technique",
    "Assisted stretching",
    "Mobility work",
    "Sports & recovery bodywork",
    "Relaxation massage",
  ],

  /** Three short principles. Keep them short — they are set large. */
  principles: [
    {
      title: "Your session is built, not chosen",
      body: "The intake conversation is real. What I find under my hands in the first ten minutes matters more than the name of the service you booked, and the plan can change if your body says something different.",
    },
    {
      title: "Pressure is a conversation",
      body: "Deep does not mean painful, and gentle does not mean passive. The useful depth is the one you can breathe through — so I will keep asking, and I would like you to keep answering honestly.",
    },
    {
      title: "The goal is how you feel tomorrow",
      body: "Anyone can make an hour feel good. The work I care about is the kind you still notice the next morning, in how you move, how you sit, and how present you feel in your own body.",
    },
  ],
} as const;
