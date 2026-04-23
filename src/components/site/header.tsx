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

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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
    <header className="sticky top-0 z-40 border-b border-concrete-100 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/logo.png"
            alt={site.name}
            width={3515}
            height={665}
            priority
            className="h-9 w-auto md:h-10"
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-concrete-800 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        ref={panelRef}
        aria-hidden={!open}
        className={cn(
          "overflow-hidden border-t border-concrete-100 bg-white transition-[max-height,opacity] duration-200 ease-out lg:hidden",
          open ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0",
        )}
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
