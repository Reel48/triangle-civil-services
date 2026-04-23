import { Clock, Mail, MapPin, Phone, Printer } from "lucide-react";
import { Field, Input, Label, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { appleMapsUrl, buildMailto, site } from "@/lib/site";

const generalMailtoHref = buildMailto({
  subject: "General inquiry — Triangle Civil Services",
  body: `Hi Triangle Civil Services team,

• Name:
• Company:
• Phone:
• Reason for reaching out:


Thanks,
`,
});

export const metadata = {
  title: "Contact",
  description: "Get in touch with Triangle Civil Services in Beaumont, TX.",
};

export default function ContactPage() {
  const { contact } = site;
  const mapQuery = encodeURIComponent(
    `${contact.address.street}, ${contact.address.city}, ${contact.address.region} ${contact.address.postalCode}`,
  );
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your project."
        lead="For RFPs and bid packages, use the quote request. For general inquiries, a phone call or email is quickest."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <form
            action="/api/contact"
            method="post"
            className="flex flex-col gap-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <Label htmlFor="firstName" required>
                  First name
                </Label>
                <Input id="firstName" name="firstName" required />
              </Field>
              <Field>
                <Label htmlFor="lastName" required>
                  Last name
                </Label>
                <Input id="lastName" name="lastName" required />
              </Field>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <Label htmlFor="email" required>
                  Email
                </Label>
                <Input id="email" name="email" type="email" required />
              </Field>
              <Field>
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" />
              </Field>
            </div>
            <Field>
              <Label htmlFor="message" required>
                Message
              </Label>
              <Textarea id="message" name="message" required />
            </Field>
            <div className="mt-2">
              <Button type="submit" size="lg">
                Send message
              </Button>
            </div>
          </form>

          <aside className="h-fit rounded-lg border border-concrete-200 bg-concrete-50 p-6">
            <p className="font-display text-lg font-semibold text-concrete-900">
              Office
            </p>
            <ul className="mt-4 space-y-3 text-sm text-concrete-700">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                <a
                  href={appleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent-700"
                >
                  {contact.address.street}
                  <br />
                  {contact.address.city}, {contact.address.region}{" "}
                  {contact.address.postalCode}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent-600" />
                <a
                  href={contact.phoneHref}
                  className="hover:text-accent-700"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Printer className="h-4 w-4 shrink-0 text-accent-600" />
                <span>Fax {contact.fax}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent-600" />
                <a
                  href={generalMailtoHref}
                  className="hover:text-accent-700"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-accent-600" />
                {contact.hours}
              </li>
            </ul>
          </aside>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="overflow-hidden rounded-lg border border-concrete-200">
          <iframe
            title={`Map to ${site.name} headquarters`}
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[280px] w-full border-0 md:h-[420px]"
          />
        </div>
        <p className="mt-3 text-sm text-concrete-500">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent-700"
          >
            Get directions →
          </a>
        </p>
      </Section>
    </>
  );
}
