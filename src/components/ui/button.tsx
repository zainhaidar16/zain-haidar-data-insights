import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 px-7 py-3 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-[#252525] text-white hover:bg-[#545454]",
        secondary: "border-2 border-[#545454] text-[#252525] hover:bg-[#252525] hover:text-white",
        default: "bg-[#252525] text-white hover:bg-[#545454]",
        outline: "border-2 border-[#545454] text-[#252525] hover:bg-[#252525] hover:text-white",
        ghost: "text-[#252525] hover:bg-[#CFCFCF]",
        link: "text-[#252525] underline-offset-4 hover:underline",
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
