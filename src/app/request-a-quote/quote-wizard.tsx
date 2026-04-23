"use client";

import { useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field, Input, Label, Select, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { markets } from "@/content/projects";
import { services } from "@/content/services";

const schema = z.object({
  name: z.string().min(1, "Required"),
  company: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional().or(z.literal("")),
  market: z.string().min(1, "Select a market"),
  scope: z.string().min(1, "Select a scope"),
  location: z.string().min(1, "Required"),
  startDate: z.string().optional().or(z.literal("")),
  details: z.string().min(10, "Give us a bit more detail"),
});

type FormValues = z.infer<typeof schema>;

const steps: {
  id: string;
  title: string;
  description: string;
  fields: FieldPath<FormValues>[];
}[] = [
  {
    id: "contact",
    title: "Contact",
    description: "Who we should reach out to.",
    fields: ["name", "company", "email", "phone"],
  },
  {
    id: "project",
    title: "Project",
    description: "Market, scope, and where the work is.",
    fields: ["market", "scope", "location", "startDate"],
  },
  {
    id: "scope",
    title: "Scope & files",
    description: "Specifics and any drawings.",
    fields: ["details"],
  },
  {
    id: "review",
    title: "Review",
    description: "Confirm and send.",
    fields: [],
  },
];

export function QuoteWizard() {
  const [stepIdx, setStepIdx] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      market: "",
      scope: "",
      location: "",
      startDate: "",
      details: "",
    },
  });

  const step = steps[stepIdx];
  const isLast = stepIdx === steps.length - 1;

  async function onNext() {
    const ok = await trigger(step.fields, { shouldFocus: true });
    if (ok) setStepIdx((i) => Math.min(i + 1, steps.length - 1));
  }

  function onBack() {
    setStepIdx((i) => Math.max(i - 1, 0));
  }

  async function onSubmit() {
    const ok = await trigger();
    if (!ok) return;
    setSubmitted(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-concrete-200 bg-white p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-600">
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-xl font-semibold text-concrete-900">
              Thanks — we&apos;ve got it.
            </p>
            <p className="mt-2 text-concrete-600">
              Our estimating team will be in touch the same business day. If
              it&apos;s urgent, a phone call is the fastest path.
            </p>
            <p className="mt-4 text-sm text-concrete-500">
              (Demo only — no request has actually been sent.)
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-6 rounded-lg border border-concrete-200 bg-white p-6 md:p-8"
      aria-label="Request a quote"
    >
      <Progress currentIdx={stepIdx} />

      <div>
        <p className="font-display text-xl font-semibold text-concrete-900">
          {step.title}
        </p>
        <p className="mt-1 text-sm text-concrete-500">{step.description}</p>
      </div>

      {step.id === "contact" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Field>
            <Label htmlFor="name" required>Your name</Label>
            <Input
              id="name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            <FieldError msg={errors.name?.message} />
          </Field>
          <Field>
            <Label htmlFor="company" required>Company</Label>
            <Input
              id="company"
              autoComplete="organization"
              aria-invalid={!!errors.company}
              {...register("company")}
            />
            <FieldError msg={errors.company?.message} />
          </Field>
          <Field>
            <Label htmlFor="email" required>Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            <FieldError msg={errors.email?.message} />
          </Field>
          <Field>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              {...register("phone")}
            />
          </Field>
        </div>
      ) : null}

      {step.id === "project" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Field>
            <Label htmlFor="market" required>Market</Label>
            <Select
              id="market"
              defaultValue=""
              aria-invalid={!!errors.market}
              {...register("market")}
            >
              <option value="" disabled>Select market</option>
              {markets.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </Select>
            <FieldError msg={errors.market?.message} />
          </Field>
          <Field>
            <Label htmlFor="scope" required>Primary scope</Label>
            <Select
              id="scope"
              defaultValue=""
              aria-invalid={!!errors.scope}
              {...register("scope")}
            >
              <option value="" disabled>Select scope</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>{s.title}</option>
              ))}
              <option value="multi">Multiple / full-scope</option>
              <option value="other">Other</option>
            </Select>
            <FieldError msg={errors.scope?.message} />
          </Field>
          <Field>
            <Label htmlFor="location" required>Project location</Label>
            <Input
              id="location"
              placeholder="City, state"
              aria-invalid={!!errors.location}
              {...register("location")}
            />
            <FieldError msg={errors.location?.message} />
          </Field>
          <Field>
            <Label htmlFor="startDate">Target start</Label>
            <Input id="startDate" type="month" {...register("startDate")} />
          </Field>
        </div>
      ) : null}

      {step.id === "scope" ? (
        <div className="flex flex-col gap-4">
          <Field>
            <Label htmlFor="details" required>Scope details</Label>
            <Textarea
              id="details"
              placeholder="Quantities, schedule, access constraints, owner/GC, bid date…"
              rows={6}
              aria-invalid={!!errors.details}
              {...register("details")}
            />
            <FieldError msg={errors.details?.message} />
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
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            />
            {files.length ? (
              <ul className="mt-2 text-sm text-concrete-600">
                {files.map((f) => (
                  <li key={f.name}>
                    {f.name}{" "}
                    <span className="text-concrete-400">
                      ({Math.ceil(f.size / 1024)} KB)
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </Field>
        </div>
      ) : null}

      {step.id === "review" ? (
        <ReviewSummary values={getValues()} files={files} />
      ) : null}

      <div className="mt-2 flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onBack}
          disabled={stepIdx === 0}
          aria-label="Previous step"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        {isLast ? (
          <Button type="button" size="lg" onClick={onSubmit}>
            Send bid request
          </Button>
        ) : (
          <Button
            type="button"
            size="md"
            onClick={onNext}
            aria-label="Next step"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
}

function Progress({ currentIdx }: { currentIdx: number }) {
  const pct = ((currentIdx + 1) / steps.length) * 100;
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-medium text-concrete-500">
        <span>
          Step {currentIdx + 1} of {steps.length}
          <span className="mx-1.5 text-concrete-300">·</span>
          <span className="text-concrete-800">{steps[currentIdx].title}</span>
        </span>
        <span>{Math.round(pct)}%</span>
      </div>
      <ol className="mt-3 flex gap-1.5" aria-hidden="true">
        {steps.map((s, i) => (
          <li
            key={s.id}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i <= currentIdx ? "bg-accent-500" : "bg-concrete-200",
            )}
          />
        ))}
      </ol>
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1 text-xs font-medium text-red-600" role="alert">
      {msg}
    </p>
  );
}

function ReviewSummary({
  values,
  files,
}: {
  values: FormValues;
  files: File[];
}) {
  const scopeService = services.find((s) => s.slug === values.scope);
  const scopeLabel =
    scopeService?.title ??
    (values.scope === "multi"
      ? "Multiple / full-scope"
      : values.scope === "other"
        ? "Other"
        : values.scope);

  return (
    <div className="grid gap-6 rounded-md border border-concrete-200 bg-concrete-50 p-5 md:grid-cols-2">
      <ReviewRow label="Name" value={values.name} />
      <ReviewRow label="Company" value={values.company} />
      <ReviewRow label="Email" value={values.email} />
      <ReviewRow label="Phone" value={values.phone || "—"} />
      <ReviewRow label="Market" value={values.market} />
      <ReviewRow label="Scope" value={scopeLabel} />
      <ReviewRow label="Location" value={values.location} />
      <ReviewRow label="Target start" value={values.startDate || "—"} />
      <ReviewRow
        label="Details"
        value={values.details}
        className="md:col-span-2"
      />
      <ReviewRow
        label="Attachments"
        value={
          files.length
            ? files.map((f) => f.name).join(", ")
            : "None"
        }
        className="md:col-span-2"
      />
    </div>
  );
}

function ReviewRow({
  label,
  value,
  className,
}: {
  label: string;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold tracking-[0.18em] text-concrete-500 uppercase">
        {label}
      </p>
      <p className="mt-1 text-concrete-800">{value}</p>
    </div>
  );
}
