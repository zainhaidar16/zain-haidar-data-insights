import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex w-auto items-center justify-center gap-2 whitespace-nowrap rounded-[10px] px-7 py-3.5 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(107,33,232,0.28)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer select-none max-[480px]:w-full",
  {
    variants: {
      variant: {
        primary:
          "border-0 bg-[#6b21e8] text-white hover:bg-[#5f1bd1]",
        secondary:
          "border-[1.5px] border-[#6b21e8] bg-transparent text-[#6b21e8] hover:bg-[rgba(107,33,232,0.06)]",
        default:
          "border-0 bg-[#6b21e8] text-white hover:bg-[#5f1bd1]",
        outline:
          "border-[1.5px] border-[#6b21e8] bg-transparent text-[#6b21e8] hover:bg-[rgba(107,33,232,0.06)]",
        ghost:
          "border-0 bg-transparent px-0 py-0 text-[#6b21e8] font-medium hover:text-[#5f1bd1] after:content-['→']",
        link: "border-0 bg-transparent px-0 py-0 text-[#6b21e8] font-medium hover:text-[#5f1bd1] after:content-['→']",
        dark: "border-0 bg-[#6b21e8] text-white hover:bg-[#5f1bd1]",
      },
      size: {
        default: "",
        sm: "px-7 py-3.5 text-[15px]",
        lg: "px-7 py-3.5 text-[15px]",
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
