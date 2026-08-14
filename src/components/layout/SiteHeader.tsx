"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { bookHref, nav, site } from "@/content/site";

/**
 * Sits over the page hero as a transparent bar, then settles into an ivory bar
 * once you scroll past it. Both states are readable, which is the whole trick.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  /**
   * The menu remembers which route it was opened on, so navigating anywhere
   * closes it automatically — no effect needed to reset it.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const setOpen = (next: boolean) => setOpenedOn(next ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the open menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-deep focus:px-5 focus:py-3 focus:text-sm focus:text-ivory"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-700 [transition-timing-function:var(--ease-tide)] ${
          solid
            ? "bg-ivory/92 shadow-[0_1px_0_rgba(18,37,46,0.07)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="u-container flex h-[4.75rem] items-center justify-between gap-6 md:h-[5.5rem]">
          <Logo tone={solid ? "dark" : "light"} className="relative z-10" />

          <nav aria-label="Primary" className="flex items-center gap-9 max-lg:hidden">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`link-underline py-1.5 font-sans text-[0.8125rem] tracking-[0.1em] uppercase transition-colors duration-500 ${
                    solid
                      ? active
                        ? "text-deep"
                        : "text-ink-soft hover:text-deep"
                      : active
                        ? "text-ivory"
                        : "text-ivory/75 hover:text-ivory"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/*
              `max-sm:hidden`, not `hidden sm:inline-flex`. Tailwind v4 emits
              `.inline-flex` after `.hidden`, so at equal specificity the Button's
              own base display class wins and the button never hides. A
              media-query variant always sorts later, so it wins cleanly.
            */}
            <Button
              href={bookHref}
              size="sm"
              variant={solid ? "primary" : "light"}
              className="max-sm:hidden"
            >
              {site.booking.label}
            </Button>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`relative z-10 -mr-2 flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden ${
                solid ? "text-deep hover:bg-deep/5" : "text-ivory hover:bg-ivory/10"
              }`}
            >
              <span aria-hidden className="flex h-4 w-5 flex-col justify-between">
                <span
                  className={`block h-px w-full bg-current transition-transform duration-500 [transition-timing-function:var(--ease-tide)] ${
                    open ? "translate-y-[7.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-full bg-current transition-opacity duration-300 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-px w-full bg-current transition-transform duration-500 [transition-timing-function:var(--ease-tide)] ${
                    open ? "-translate-y-[7.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 bg-deep text-ivory lg:hidden"
      >
        <div className="u-container flex h-full flex-col justify-between pt-28 pb-10">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ transitionDelay: `${120 + i * 55}ms` }}
                className={`t-title border-b border-ivory/12 py-5 font-display text-ivory/90 transition-all duration-700 [transition-timing-function:var(--ease-tide)] hover:text-ivory ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="space-y-6">
            <Button href={bookHref} variant="light" size="lg" className="w-full">
              {site.booking.label}
            </Button>
            <div className="flex flex-col gap-1 text-center text-sm text-ivory/60">
              <a href={`tel:${site.contact.phoneHref}`} className="link-underline self-center">
                {site.contact.phone}
              </a>
              <span>
                {site.location.city}, {site.location.region}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
