/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ABOUT — the story, the training, the approach.
 *
 *  Every factual claim below comes from real background. Nothing here invents a
 *  certification, a licence, a degree, an award or a medical qualification —
 *  please keep it that way when you edit.
 *
 *  ⚑ One thing to check: the teaching line says "the massage school" without
 *    naming it. Add the school's name in `background` below once you are happy
 *    for it to appear publicly.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const about = {
  eyebrow: "About",
  title: "I know what it is to want your body back.",
  lead: "Ten years of bodywork, a spine that had to be rebuilt from the inside out, and a fairly simple conviction: nobody should spend years in pain waiting for it to sort itself out.",

  /** Main narrative. Each string is a paragraph. */
  story: [
    "I broke my back. That is the short version of how I ended up doing this for a living. The longer version involves a lot of time on the floor, a lot of very small progress, and the slow discovery that a body given the right attention will do remarkable things on its own. I healed without surgery. It took patience, good care, and a great deal of unglamorous daily work — and it permanently changed what I think is possible for people who have been told to just live with something.",
    "That is also where the impatience comes from. I met a lot of people during that stretch who had been in pain for years, quietly, having decided it was simply their lot. Some of them were one good decision away from feeling substantially better. I would rather you got to that decision sooner than I did.",
    "My formal education was 750+ hours at the Santa Barbara Body Therapy Institute — anatomy, physiology, and a great deal of time with hands on real bodies. What that many hours actually buys you is not a longer list of techniques. It is discrimination: the ability to feel the difference between tissue that is guarding and tissue that is ready, and to know which one is under your hands right now.",
    "From there I trained further in Genius of Flexibility and RFST work, which changed how I think about range of motion. Flexibility stopped looking like something you stretch into and started looking like something the nervous system agrees to. That idea runs through everything I do now, including sessions that never look like stretching at all.",
    "The most formative stretch of my working life was at Ford Chiropractic & Sports Care in La Mesa, alongside Dr. Hunter Ford, where I worked with 50+ clients a week. Massage there was rarely an add-on — it was often the work that came immediately before an adjustment, which meant preparing tissue for something specific and communicating clearly about what I was finding. Volume like that is its own education. You stop guessing, because you have felt the same pattern in a hundred different bodies and learned how differently each of them responds.",
    "Ten years in, I also teach at the massage school — which is the best thing that ever happened to my own hands. You cannot explain to a room full of students why you are doing something until you genuinely understand it yourself.",
    "Santa Barbara is where all of that comes together now. Athletes and desk workers, people carrying an old injury and people who simply have not felt at home in their body for a while. The work is different for each of them. The attention is the same.",
  ],

  /**
   * The belief underneath the practice. Shown as a full-width statement on the
   * About page.
   */
  mission: {
    eyebrow: "Why this work",
    statement:
      "The world gets better when fewer people are distracted by being sick, tired and in pain.",
    body: "That is not a small claim about massage. It is a claim about attention. Pain is expensive — it takes the part of you that would otherwise be doing good work, showing up for people, making things. Every person who gets out of pain and back into their life gets that part of themselves back. I would like there to be more of them.",
  },

  /**
   * ⚑ OPTIONAL — a personal note in your own voice. Delete the placeholder and
   * write two or three sentences of your own. Set to an empty string to hide
   * the block entirely.
   */
  personalNote:
    "[Optional: add two or three sentences here in your own words — anything you want people to know before they meet you. This is the most personal part of the page. Delete this bracketed text and replace it, or set `personalNote: \"\"` in src/content/about.ts to hide the block.]",

  /** The credibility row. Factual only. */
  credentials: [
    {
      figure: "10+",
      label: "Years in bodywork",
      detail: "A decade of hands-on practice, and still the most interesting problem I know.",
    },
    {
      figure: "750+",
      label: "Hours of formal training",
      detail: "Santa Barbara Body Therapy Institute — anatomy, physiology, and supervised practice.",
    },
    {
      figure: "50+",
      label: "Clients each week",
      detail: "Sustained clinical volume in a working chiropractic and sports-care practice.",
    },
    {
      figure: "Now",
      label: "Teaching the next ones",
      detail: "Instructor at the massage school, passing the work on to students coming up.",
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
    {
      // ⚑ Add the school's name here when you are ready — e.g.
      // title: "Santa Barbara Body Therapy Institute — Instructor",
      title: "Massage school instructor",
      meta: "Current",
      body: "Teaching hands-on technique to students training for the same work, which keeps the fundamentals sharp and honest.",
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
      title: "Sooner beats later",
      body: "Most of what people carry for years responds far better when it is addressed early. If something has been nagging at you, do not wait for it to become interesting — and if I am not the right person for it, I will tell you who is.",
    },
  ],
} as const;
