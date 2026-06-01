import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type AuthFieldProps = React.ComponentProps<typeof Input> & {
  error?: boolean;
  hint?: string;
  label: string;
  wrapperClassName?: string;
};

export function AuthField({
  className,
  error,
  hint,
  id,
  label,
  wrapperClassName,
  ...props
}: AuthFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", wrapperClassName)}>
      <Label htmlFor={id} className="text-left text-sm font-semibold text-foreground">
        {label}
      </Label>
      <Input
        id={id}
        aria-invalid={error || undefined}
        className={cn(
          "h-12 rounded-xl border-border bg-white px-4 text-left text-base text-foreground shadow-sm placeholder:text-muted-foreground/70 transition-all focus-visible:border-primary focus-visible:ring-primary/20 disabled:bg-muted disabled:text-muted-foreground md:text-sm",
          className,
        )}
        {...props}
      />
      {hint && <p className="text-left text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
