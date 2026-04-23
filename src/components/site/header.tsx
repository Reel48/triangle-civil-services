"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { primaryNav, site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-concrete-100 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/logo.png"
            alt={site.name}
            width={2812}
            height={532}
            priority
            className="h-9 w-auto md:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-concrete-700 transition-colors hover:text-accent-600"
            >
              {item.label}
            </Link>
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
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-concrete-800 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-concrete-100 bg-white lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="container-page flex flex-col gap-1 py-4">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2.5 text-base font-medium text-concrete-800 hover:bg-concrete-50"
            >
              {item.label}
            </Link>
          ))}
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

