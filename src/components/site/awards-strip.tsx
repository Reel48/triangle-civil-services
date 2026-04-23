import {
  Award,
  BadgeCheck,
  Medal,
  ShieldCheck,
  Star,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/site/section";
import { site, type AwardIcon } from "@/lib/site";

const iconMap: Record<AwardIcon, LucideIcon> = {
  trophy: Trophy,
  medal: Medal,
  award: Award,
  shield: ShieldCheck,
  check: BadgeCheck,
  star: Star,
};

type Props = {
  tone?: "default" | "subtle";
  eyebrow?: string;
  title?: string;
  lead?: string;
};

export function AwardsStrip({
  tone = "subtle",
  eyebrow = "Recognition",
  title = "Associations & accreditations.",
  lead = "Active memberships and prequalification standings our clients rely on.",
}: Props) {
  return (
    <Section tone={tone}>
      <p className="text-xs font-semibold tracking-[0.2em] text-accent-600 uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display mt-3 text-3xl font-semibold text-concrete-900 md:text-4xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-3 max-w-2xl text-concrete-500">{lead}</p>
      ) : null}

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {site.awards.map((a) => {
          const Icon = iconMap[a.icon];
          return (
            <li
              key={a.name}
              className="flex items-start gap-4 rounded-lg border border-concrete-200 bg-white p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-accent-50 text-accent-600">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-base font-semibold text-concrete-900">
                  {a.name}
                </p>
                <p className="mt-0.5 text-sm text-concrete-600">{a.detail}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
