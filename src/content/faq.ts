/**
 * FAQ — also rendered as FAQPage structured data for search results.
 *
 * Keep answers factual and free of medical promises. Avoid "treats", "heals",
 * "cures" or claims about specific conditions.
 */

export type FaqItem = { q: string; a: string; group: FaqGroup };
export type FaqGroup = "Your session" | "Choosing" | "Booking & policies";

export const faqGroups: FaqGroup[] = ["Your session", "Choosing", "Booking & policies"];

export const faqs: FaqItem[] = [
  {
    group: "Your session",
    q: "What should I expect during a session?",
    a: "We start with a short conversation about how your body has been feeling, what you would like from the session, and anything I should work around. You will have privacy to get on the table, and you are draped and covered throughout — only the area being worked on is uncovered. Work begins broadly and warms the tissue before anything specific or deep. I will check in about pressure as we go. At the end you get time to sit up slowly, and a short summary of what I found.",
  },
  {
    group: "Your session",
    q: "What should I wear?",
    a: "For table massage, most people undress to their comfort level and are draped with a sheet at all times. Underwear on or off is entirely your choice, and it makes no difference to the quality of the work. For stretching and mobility sessions, comfortable athletic clothing you can move in works best — those sessions are done fully clothed.",
  },
  {
    group: "Your session",
    q: "Will it hurt?",
    a: "It should not. Deep tissue work produces a strong, clear sensation, but the useful range is the one you can stay relaxed and breathing inside of. If you are bracing or holding your breath, the pressure has gone past what is productive, and I would rather you tell me immediately. Pressure is adjusted continuously, and asking for less — or more — is always welcome.",
  },
  {
    group: "Your session",
    q: "What should I do after a massage?",
    a: "Drink water, and give yourself a little time before jumping back into something demanding if you can. Gentle movement — a walk, easy mobility work — usually feels better than either a hard workout or sitting completely still. Some tenderness the next day is normal after deeper work, similar to how you might feel after training. If anything feels off beyond that, let me know.",
  },
  {
    group: "Choosing",
    q: "How do I choose the right massage?",
    a: "If you are unsure, book Customized Bodywork or Therapeutic Massage — we will work it out together in the first few minutes, and I can take the session in any direction from there. As a general guide: Deep Tissue for dense, stubborn areas; Sports & Recovery around training; Relaxation when the goal is to switch off; Stretching & Mobility when you feel stiff and restricted; Lymphatic or Cranial-Sacral when you want something very gentle.",
  },
  {
    group: "Choosing",
    q: "How long should my session be?",
    a: "Sixty minutes is enough to address one or two regions well. Ninety minutes is the most-requested length, because it covers the whole body without rushing, or one area very thoroughly. Two hours suits people who take a while to settle or who want everything covered. Thirty-minute sessions are best kept for a single focused area, such as neck and shoulders.",
  },
  {
    group: "Choosing",
    q: "Can sessions be customized?",
    a: "Yes — and most are. The service you book is a starting point, not a script. A single session might combine therapeutic work, deep tissue, Table Shiatsu, assisted stretching and cranial-sacral holds, chosen for what your body presents on the day. If something is not working, say so mid-session and we will change direction.",
  },
  {
    group: "Choosing",
    q: "Do you work with athletes?",
    a: "Yes. A significant part of my professional experience was in a chiropractic and sports-care practice, working with active bodies at a volume of 50+ clients a week, often immediately before chiropractic adjustments. Sessions are adapted to where you are in your training cycle — brisker and more mobilising before an event, slower and more restorative afterwards.",
  },
  {
    group: "Booking & policies",
    q: "How do I book?",
    a: "Booking is done online — choose your service and length, pick a time, and you are set. If you cannot find a time that works, or you are not sure what to book, get in touch and we will sort it out directly.",
  },
  {
    group: "Booking & policies",
    q: "What is your cancellation policy?",
    a: "Please give at least 24 hours' notice to change or cancel a session. Last-minute cancellations and no-shows are charged a $25 fee — that time was held for you, and it is rarely possible to fill it at short notice. Life happens, though: if something genuinely unavoidable comes up, tell me and we will work it out.",
  },
  {
    group: "Booking & policies",
    q: "Do you offer a discount for booking several sessions?",
    a: "Yes — book three or more sessions at once and take 20% off the total. Most people coming in for something specific need a few visits anyway, so this makes committing to the work cheaper than paying visit by visit. Sessions do not have to be scheduled all at once, and they do not have to be the same service.",
  },
  {
    group: "Booking & policies",
    q: "Is massage right for me if I have a medical condition or injury?",
    a: "Please tell me about it before we begin, and check with your physician if you are managing a diagnosed condition, are pregnant, or are recovering from surgery or an acute injury. Bodywork here is offered for general wellbeing, comfort and recovery — it is not medical treatment and is not a substitute for care from a qualified healthcare provider.",
  },
  {
    group: "Booking & policies",
    q: "Do you offer gift cards or memberships?",
    a: "Multi-session packages are available now — three or more sessions booked together are 20% off. Gift cards and memberships are on the way, along with workshops and coastal wellness experiences. If you would like a session as a gift in the meantime, get in touch and it can be arranged directly.",
  },
];
