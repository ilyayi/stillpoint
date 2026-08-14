"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { bookHref, site } from "@/content/site";

/**
 * Small screens only. Slides up once you are past the hero and stays within
 * thumb reach for the rest of the page — booking should never be more than one
 * tap away on a phone.
 */
export function StickyBookBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Never shown on the booking page itself — the whole page is the CTA there.
  if (pathname === "/book") return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ivory/10 bg-deep/95 backdrop-blur-xl transition-transform duration-700 [transition-timing-function:var(--ease-tide)] sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <a
          href={`tel:${site.contact.phoneHref}`}
          aria-label={`Call ${site.name}`}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors active:bg-ivory/10"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5">
            <path
              d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6 4z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <Link
          href={bookHref}
          className="flex h-12 flex-1 items-center justify-center rounded-full bg-ivory font-sans text-[0.75rem] tracking-[0.18em] text-abyss uppercase active:bg-white"
        >
          {site.booking.label}
        </Link>
      </div>
    </div>
  );
}
