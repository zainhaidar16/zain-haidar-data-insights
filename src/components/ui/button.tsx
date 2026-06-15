import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "nvr-button inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-normal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F5F3]/40 disabled:pointer-events-none disabled:opacity-50 px-7 py-3 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
        variant: {
          primary: "bg-gradient-to-b from-[#F5F5F3] to-[#C8C8C1] text-[#101113] hover:brightness-110 font-normal shadow-sm hover:shadow-md hover:-translate-y-0.5 rounded-full border-0",
          secondary:
            "border border-[rgba(245,245,243,0.16)] bg-transparent text-[#F5F5F3] hover:border-[rgba(245,245,243,0.30)] hover:bg-[rgba(255,255,255,0.08)] rounded-full",
          default: "bg-gradient-to-b from-[#F5F5F3] to-[#C8C8C1] text-[#101113] hover:brightness-110 font-normal shadow-sm hover:shadow-md hover:-translate-y-0.5 rounded-full border-0",
          outline:
            "border border-[rgba(245,245,243,0.16)] bg-transparent text-[#F5F5F3] hover:border-[rgba(245,245,243,0.30)] hover:bg-[rgba(255,255,255,0.08)] rounded-full",
          ghost: "text-[#D7D7D2] hover:bg-[rgba(255,255,255,0.08)] hover:text-[#F5F5F3]",
          link: "text-[#D8D8D2] underline-offset-4 hover:underline",
          dark: "bg-[#1D1E22] text-[#F5F5F3] border border-[rgba(245,245,243,0.16)] hover:bg-[#232428] rounded-full",
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
