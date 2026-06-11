import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "nvr-button inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#033FED]/40 disabled:pointer-events-none disabled:opacity-50 px-7 py-3 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
        variant: {
          primary: "bg-[#0071E3] text-white hover:bg-[#005BB5] hover:text-white rounded-full",
          secondary:
            "border border-[#D2D2D7] bg-white text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-full",
          default: "bg-[#0071E3] text-white hover:bg-[#005BB5] rounded-full",
          outline:
            "border border-[#D2D2D7] bg-white text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-full",
          ghost: "text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#1D1D1F]",
          link: "text-[#0071E3] underline-offset-4 hover:underline",
          dark: "bg-[#161617] text-white hover:bg-black border border-black rounded-full",
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
