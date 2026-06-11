import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "nvr-button inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#033FED]/40 disabled:pointer-events-none disabled:opacity-50 px-7 py-3 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-[#FF6B00] text-white hover:bg-[#FF7D26] hover:text-white rounded-full",
        secondary:
          "border border-[#26262B] bg-transparent text-[#FFFFFF] hover:bg-[#111113] rounded-full",
        default: "bg-[#FF6B00] text-white hover:bg-[#FF7D26] rounded-full",
        outline:
          "border border-[#26262B] bg-transparent text-[#FFFFFF] hover:bg-[#111113] rounded-full",
        ghost: "text-[#A1A1AA] hover:bg-[#111113] hover:text-[#FFFFFF]",
        link: "text-[#FF6B00] underline-offset-4 hover:underline",
        dark: "bg-[#111113] text-white hover:bg-[#16161A] border border-[#26262B] rounded-full",
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
