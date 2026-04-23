import { Field, Input, Label, Select, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { services } from "@/content/services";
import { markets } from "@/content/projects";
import { site } from "@/lib/site";

export const metadata = {
  title: "Request a Quote",
  description:
    "Send us your scope and we'll respond with a bid the same business day.",
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title="Tell us about the project."
        lead="Share scope, schedule, and any drawings — we'll respond the same business day with next steps."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <form
            action="/api/quote"
            method="post"
            encType="multipart/form-data"
            className="flex flex-col gap-5"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <Label htmlFor="name" required>
                  Your name
                </Label>
                <Input id="name" name="name" required />
              </Field>
              <Field>
                <Label htmlFor="company" required>
                  Company
                </Label>
                <Input id="company" name="company" required />
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
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" />
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <Label htmlFor="market" required>
                  Market
                </Label>
                <Select id="market" name="market" required defaultValue="">
                  <option value="" disabled>
                    Select market
                  </option>
                  {markets.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field>
                <Label htmlFor="scope" required>
                  Primary scope
                </Label>
                <Select id="scope" name="scope" required defaultValue="">
                  <option value="" disabled>
                    Select scope
                  </option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                  <option value="multi">Multiple / full-scope</option>
                  <option value="other">Other</option>
                </Select>
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <Label htmlFor="location" required>
                  Project location
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, state"
                  required
                />
              </Field>
              <Field>
                <Label htmlFor="startDate">Target start</Label>
                <Input id="startDate" name="startDate" type="month" />
              </Field>
            </div>

            <Field>
              <Label htmlFor="details" required>
                Scope details
              </Label>
              <Textarea
                id="details"
                name="details"
                required
                placeholder="Quantities, schedule, access constraints, owner/GC, bid date…"
              />
            </Field>

            <Field>
              <Label htmlFor="files" hint="Drawings, specs, RFP (PDF / ZIP)">
                Attachments
              </Label>
              <Input
                id="files"
                name="files"
                type="file"
                multiple
                accept=".pdf,.zip,.doc,.docx,.xls,.xlsx,.dwg,.jpg,.png"
                className="py-1.5"
              />
            </Field>

            <div className="mt-2">
              <Button type="submit" size="lg">
                Send bid request
              </Button>
            </div>
          </form>

          <aside className="h-fit rounded-lg border border-concrete-200 bg-concrete-50 p-6">
            <p className="font-display text-lg font-semibold text-concrete-900">
              What happens next
            </p>
            <ol className="mt-4 space-y-3 text-sm text-concrete-700">
              <Step n={1} title="Same-day acknowledgement">
                You'll hear back from our estimating team within the business
                day.
              </Step>
              <Step n={2} title="Scope alignment">
                A quick call to confirm quantities, access, and schedule.
              </Step>
              <Step n={3} title="Bid package">
                We return a priced, signed proposal with qualifications and
                inclusions clearly stated.
              </Step>
            </ol>

            <div className="mt-6 border-t border-concrete-200 pt-4 text-sm">
              <p className="text-concrete-500">Prefer a phone call?</p>
              <a
                href={site.contact.phoneHref}
                className="font-display mt-1 block text-xl font-semibold text-concrete-900 hover:text-accent-600"
              >
                {site.contact.phone}
              </a>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-500 text-xs font-semibold text-white">
        {n}
      </span>
      <span>
        <span className="block font-medium text-concrete-900">{title}</span>
        <span className="text-concrete-600">{children}</span>
      </span>
    </li>
  );
}
