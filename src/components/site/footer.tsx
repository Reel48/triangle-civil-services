import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { appleMapsUrl, footerNav, site } from "@/lib/site";

export function SiteFooter() {
  const { contact } = site;
  return (
    <footer className="bg-concrete-900 text-concrete-200">
      <div aria-hidden="true" className="h-1 bg-brand-yellow" />
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-semibold text-white">
            {site.name}
          </p>
          <p className="mt-1 text-sm text-concrete-300">
            A division of {site.legalName}
          </p>
          <p className="mt-6 max-w-sm text-sm text-concrete-300">
            {site.description}
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
              <a
                href={appleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                {contact.address.street}
                <br />
                {contact.address.city}, {contact.address.region}{" "}
                {contact.address.postalCode}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-accent-400" />
              <a href={contact.phoneHref} className="hover:text-white">
                {contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-accent-400" />
              <a href={contact.emailHref} className="hover:text-white">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        {footerNav.map((group) => (
          <div key={group.heading}>
            <p className="text-xs font-semibold tracking-[0.2em] text-white uppercase">
              {group.heading}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-concrete-300 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-concrete-800">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-concrete-300 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>Serving {site.serviceArea.join(" & ")} since {site.founded}.</p>
        </div>
      </div>
    </footer>
  );
}
