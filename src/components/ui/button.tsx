import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-normal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(139,92,246,0.4)] disabled:pointer-events-none disabled:opacity-50 px-7 py-3 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-[#7048E8] to-[#8B5CF6] text-white hover:opacity-95 font-normal rounded-full border-0 shadow-[0_16px_34px_rgba(112,72,232,0.22)] hover:-translate-y-0.5 transition-all duration-200",
        secondary:
          "border border-[rgba(112,72,232,0.38)] bg-white text-[#7048E8] hover:bg-[rgba(112,72,232,0.06)] rounded-full transition-all duration-200",
        default:
          "bg-gradient-to-r from-[#7048E8] to-[#8B5CF6] text-white hover:opacity-95 font-normal rounded-full border-0 shadow-[0_16px_34px_rgba(112,72,232,0.22)] hover:-translate-y-0.5 transition-all duration-200",
        outline:
          "border border-[rgba(112,72,232,0.18)] bg-white text-[#423A55] hover:border-[rgba(112,72,232,0.38)] hover:bg-[rgba(112,72,232,0.04)] rounded-full transition-all duration-200",
        ghost:
          "text-[#423A55] hover:bg-[rgba(112,72,232,0.08)] hover:text-[#7048E8] transition-all duration-200",
        link: "text-[#7048E8] underline-offset-4 hover:underline transition-all duration-200",
        dark: "bg-white text-[#171321] border border-[rgba(112,72,232,0.18)] hover:bg-[#FAF9FF] hover:border-[rgba(112,72,232,0.38)] rounded-full transition-all duration-200",
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
