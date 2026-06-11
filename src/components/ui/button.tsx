import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40 disabled:pointer-events-none disabled:opacity-50 px-7 py-3 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-[0_1px_3px_rgba(37,99,235,0.3)]",
        secondary: "border-2 border-[#E2E8F0] bg-white text-[#0F172A] hover:border-[#2563EB] hover:text-[#2563EB]",
        default: "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-[0_1px_3px_rgba(37,99,235,0.3)]",
        outline: "border-2 border-[#E2E8F0] bg-white text-[#0F172A] hover:border-[#2563EB] hover:text-[#2563EB]",
        ghost: "text-[#0F172A] hover:bg-[#F1F5F9]",
        link: "text-[#2563EB] underline-offset-4 hover:underline",
        dark: "bg-[#0F172A] text-white hover:bg-[#1E293B]",
      },
      size: {
        default: "",
        sm: "px-4 py-2 text-xs",
        lg: "px-9 py-3.5 text-base",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
