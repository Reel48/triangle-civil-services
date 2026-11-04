"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Menu, Phone, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { primaryNav, site, type NavItem } from "@/lib/site";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

// Largest shrink distance across breakpoints (see .site-header in
// globals.css). Scroll offsets past this don't change the header.
const MAX_SHRINK_PX = 32;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Scroll-linked compaction. The header's layout height never changes (a
  // negative sticky `top` lets it slide up natively, then stick), so the page
  // below never shifts and the browser never adjusts the scroll position.
  // This only feeds the scroll offset into a CSS variable that drives
  // transforms on the logo and bar; it doesn't re-render React.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let last = -1;
    const update = () => {
      const y = Math.min(Math.max(window.scrollY, 0), MAX_SHRINK_PX);
      if (y === last) return;
      last = y;
      header.style.setProperty("--header-scroll", String(y));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Body scroll lock + Escape to close + focus management while open.
  // (Route-change close is handled by onClick on each nav link.)
  useEffect(() => {
    if (!open) return;

    const triggerEl = menuButtonRef.current;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusables?.[0];
    const last = focusables?.[focusables.length - 1];
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === "Tab" && first && last) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKey);
      triggerEl?.focus();
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="site-header sticky z-40 border-b border-concrete-100 bg-white/90 backdrop-blur"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      {/* The bar is shifted down as the header compacts, so its empty area
          can overhang the header's bottom edge; only its children take
          pointer events, so it never blocks clicks on the page below. */}
      <div className="site-header-bar container-page pointer-events-none flex h-20 items-center justify-between gap-6 *:pointer-events-auto md:h-28">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="site-header-logo flex shrink-0 items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/tcs-logo.svg"
            alt={site.name}
            width={860}
            height={764}
            priority
            unoptimized
            className="h-16 w-auto md:h-24"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {primaryNav.map((item) => (
            <DesktopNavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={site.contact.phoneHref}
            className="hidden items-center gap-1.5 text-sm font-medium text-concrete-700 hover:text-accent-600 xl:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {site.contact.phone}
          </a>
          <ButtonLink href="/request-a-quote" size="sm">
            Request a quote
          </ButtonLink>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-concrete-800 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        ref={panelRef}
        // `inert` (not just aria-hidden) so the collapsed panel's links drop
        // out of the Tab order as well as the accessibility tree.
        inert={!open}
        // Overlays the page (absolute) rather than growing the header, so
        // opening the menu never changes the header's layout height. If it
        // did, the page would shift and the browser would adjust the scroll
        // position, snapping the scroll-linked header mid-open.
        className={cn(
          "absolute inset-x-0 top-full overflow-hidden border-y border-concrete-100 bg-white shadow-lg transition-[max-height,opacity] duration-200 ease-out lg:hidden",
          open ? "max-h-[560px] opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
        style={{
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
        }}
      >
        <nav aria-label="Mobile" className="container-page flex flex-col gap-1 py-4">
          {primaryNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-2 py-2.5 text-base font-medium",
                  active
                    ? "bg-concrete-50 text-concrete-900"
                    : "text-concrete-800 hover:bg-concrete-50",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-3 flex flex-col gap-2">
            <ButtonLink href="/request-a-quote" size="md" className="w-full">
              Request a quote
            </ButtonLink>
            <a
              href={site.contact.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-concrete-300 px-4 py-2.5 text-sm font-medium text-concrete-800"
            >
              <Phone className="h-4 w-4" />
              {site.contact.phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function DesktopNavLink({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const active = isActive(pathname, item.href);
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative text-sm font-medium transition-colors",
        active
          ? "text-concrete-900 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-accent-500"
          : "text-concrete-700 hover:text-accent-600",
      )}
    >
      {item.label}
    </Link>
  );
}
