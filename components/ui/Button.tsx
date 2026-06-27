import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-charcoal text-cream-50 hover:bg-espresso-600",
        gold: "bg-gold-400 text-espresso hover:bg-gold-500",
        outline: "border border-gold-300 text-charcoal hover:bg-gold-50",
        ghost: "text-charcoal hover:bg-cream-200",
        dark: "bg-espresso text-cream-50 hover:bg-espresso-600",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));
    if (href) {
      return (
        <Link href={href} className={classes}>
          {props.children}
        </Link>
      );
    }
    return <button ref={ref} className={classes} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
