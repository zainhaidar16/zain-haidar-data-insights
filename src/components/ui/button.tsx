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
          "bg-[#8B5CF6] text-white hover:bg-[#A779FF] font-normal rounded-full border-0 shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 transition-all duration-200",
        secondary:
          "border border-[rgba(145,92,255,0.30)] bg-transparent text-white hover:border-[rgba(145,92,255,0.50)] hover:bg-[rgba(139,92,246,0.08)] rounded-full transition-all duration-200",
        default:
          "bg-[#8B5CF6] text-white hover:bg-[#A779FF] font-normal rounded-full border-0 shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 transition-all duration-200",
        outline:
          "border border-[rgba(255,255,255,0.12)] bg-transparent text-white hover:border-[rgba(145,92,255,0.40)] hover:bg-[rgba(139,92,246,0.06)] rounded-full transition-all duration-200",
        ghost:
          "text-[#D8D8E0] hover:bg-[rgba(139,92,246,0.08)] hover:text-white transition-all duration-200",
        link: "text-[#8B5CF6] underline-offset-4 hover:underline transition-all duration-200",
        dark: "bg-[#111111] text-white border border-[rgba(145,92,255,0.30)] hover:bg-[#1B102B] hover:border-[rgba(145,92,255,0.50)] rounded-full transition-all duration-200",
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
