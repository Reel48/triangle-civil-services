"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Label, Textarea } from "@/components/ui/input";

type Props = {
  roleSlug: string;
  roleTitle: string;
};

export function ApplicationForm({ roleSlug, roleTitle }: Props) {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: window.scrollY - 40, behavior: "smooth" });
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl rounded-lg border border-concrete-200 bg-white p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-600">
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-xl font-semibold text-concrete-900">
              Thanks — application received.
            </p>
            <p className="mt-2 text-concrete-600">
              We&apos;ve captured your interest in the{" "}
              <span className="font-medium text-concrete-900">{roleTitle}</span>{" "}
              role. Our HR team will follow up by email or phone within a few
              business days.
            </p>
            <p className="mt-4 text-sm text-concrete-500">
              (Demo only — no submission has actually been sent.)
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid max-w-3xl gap-5 rounded-lg border border-concrete-200 bg-white p-6 md:p-8"
      aria-label={`Apply for ${roleTitle}`}
    >
      <input type="hidden" name="role" value={roleSlug} />

      <div className="grid gap-4 md:grid-cols-2">
        <Field>
          <Label htmlFor="firstName" required>
            First name
          </Label>
          <Input id="firstName" name="firstName" autoComplete="given-name" required />
        </Field>
        <Field>
          <Label htmlFor="lastName" required>
            Last name
          </Label>
          <Input id="lastName" name="lastName" autoComplete="family-name" required />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field>
          <Label htmlFor="email" required>
            Email
          </Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field>
          <Label htmlFor="phone" required>
            Phone
          </Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" required />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field>
          <Label htmlFor="years" required>
            Years of relevant experience
          </Label>
          <Input
            id="years"
            name="years"
            type="number"
            min={0}
            max={60}
            required
          />
        </Field>
        <Field>
          <Label htmlFor="city">Current city</Label>
          <Input id="city" name="city" placeholder="City, state" />
        </Field>
      </div>

      <Field>
        <Label htmlFor="about" required>
          Tell us about a project you&apos;re proud of
        </Label>
        <Textarea
          id="about"
          name="about"
          required
          placeholder="What was the scope, your role, and what made it go well?"
        />
      </Field>

      <Field>
        <Label htmlFor="resume" hint="PDF or DOC">
          Resume
        </Label>
        <Input
          id="resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          className="py-1.5"
        />
      </Field>

      <div className="mt-2">
        <Button type="submit" size="lg">
          Submit application
        </Button>
      </div>
    </form>
  );
}
