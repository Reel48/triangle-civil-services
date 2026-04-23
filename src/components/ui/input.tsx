import * as React from "react";
import { cn } from "@/lib/cn";

const baseField =
  "block w-full rounded-md border border-concrete-300 bg-white px-3 py-2.5 text-[0.95rem] text-concrete-800 " +
  "placeholder:text-concrete-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30 " +
  "disabled:bg-concrete-50";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn(baseField, className)} {...props} />;
});

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, rows = 5, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(baseField, "min-h-[7rem] resize-y", className)}
      {...props}
    />
  );
});

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(baseField, "appearance-none pr-9", className)}
      {...props}
    >
      {children}
    </select>
  );
});

type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
  className?: string;
};

export function Label({ htmlFor, children, required, hint, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "mb-1.5 block text-sm font-medium text-concrete-800",
        className
      )}
    >
      {children}
      {required ? <span className="ml-0.5 text-accent-500">*</span> : null}
      {hint ? (
        <span className="ml-2 font-normal text-concrete-400">{hint}</span>
      ) : null}
    </label>
  );
}

export function Field({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
}
