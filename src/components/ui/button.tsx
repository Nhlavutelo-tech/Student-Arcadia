import { Slot } from "@radix-ui/react-slot";
import { Link, type LinkProps } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-semibold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-foreground shadow-copper hover:-translate-y-0.5 hover:bg-primary",
        primary: "bg-accent text-accent-foreground shadow-copper hover:-translate-y-0.5 hover:bg-primary",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-primary/15 bg-card/70 text-primary backdrop-blur-xl hover:-translate-y-0.5 hover:bg-card",
        secondary: "border border-primary/15 bg-card/70 text-primary backdrop-blur-xl hover:-translate-y-0.5 hover:bg-card",
        ghost: "text-primary hover:bg-primary/10",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-11 px-5 py-2.5",
        sm: "h-9 px-3",
        lg: "h-12 px-7",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = "Button";

export function ButtonLink({
  children,
  variant = "default",
  size = "default",
  className,
  ...props
}: LinkProps & VariantProps<typeof buttonVariants> & { children: React.ReactNode; className?: string }) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props}>{children}</Link>;
}