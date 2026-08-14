/**
 * THE EXPERIENCE — the five movements of a session.
 * Edit freely; the homepage shows the first four and the /experience page shows
 * all of them in full.
 */

export const experienceIntro = {
  eyebrow: "The Experience",
  title: "How a session unfolds",
  lead: "No two sessions are identical, because no two bodies arrive the same way. The shape, though, is consistent — and knowing it in advance means you can stop wondering what happens next and simply be there.",
};

export type Step = {
  key: string;
  index: string;
  title: string;
  subtitle: string;
  body: string;
  detail: string[];
  image: string;
};

export const steps: Step[] = [
  {
    key: "arrive",
    index: "01",
    title: "Arrive",
    subtitle: "Put the day down at the door.",
    body: "You are met, not processed. We talk for a few minutes about what your body has been doing lately, what hurts, what you want from the hour, and anything I should work around.",
    detail: [
      "Come five to ten minutes early if you can — arriving unhurried changes the whole session.",
      "We discuss pressure, focus areas, injuries and anything you would rather I avoid.",
      "You undress only to your comfort level and are draped and covered at all times.",
    ],
    image: "/images/texture/arrive.jpg",
  },
  {
    key: "breathe",
    index: "02",
    title: "Breathe",
    subtitle: "The room slows down before the work does.",
    body: "The first minutes are unhurried on purpose. Warm hands, broad contact, nothing sharp or surprising. Your breathing drops lower, your shoulders come down, and your body decides it is safe here.",
    detail: [
      "Broad, warming contact — no deep work before the tissue is ready.",
      "Quiet room, warm table, and as little talking as you would like.",
      "This phase is doing real work, even though nothing dramatic is happening.",
    ],
    image: "/images/texture/breathe.jpg",
  },
  {
    key: "release",
    index: "03",
    title: "Release",
    subtitle: "Specific work, where it is actually needed.",
    body: "This is the heart of the session. Deep tissue, trigger point work, shiatsu, cranial-sacral holds — whichever the tissue is asking for. Depth is built gradually and stays inside a range you can stay relaxed in.",
    detail: [
      "Techniques are chosen for your body that day, not fixed in advance.",
      "You are asked for feedback, and honest answers make the work better.",
      "Discomfort should always be the kind you can breathe through.",
    ],
    image: "/images/texture/release.jpg",
  },
  {
    key: "reconnect",
    index: "04",
    title: "Reconnect",
    subtitle: "Give the change somewhere to go.",
    body: "Assisted stretching and mobility work help your nervous system claim the range that just opened up. Tissue that has released holds better when it is asked to move.",
    detail: [
      "Assisted stretching and joint mobility, informed by RFST training.",
      "A few simple things to keep doing between sessions, if you want them.",
      "The point is range you can use, not range you visited once.",
    ],
    image: "/images/texture/reconnect.jpg",
  },
  {
    key: "renew",
    index: "05",
    title: "Leave Renewed",
    subtitle: "No rush out the door.",
    body: "You are given time to sit up slowly and come back into the room. Water, a few notes on what I found, and a clear sense of what your body would like next — whether that is a week from now or a month.",
    detail: [
      "Time to reorient before you stand up — the transition matters.",
      "Water, and a short summary of what I found and worked on.",
      "Guidance on timing if you would like to come back.",
    ],
    image: "/images/texture/renew.jpg",
  },
];
