"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"
import { ArrowRight,ArrowBigDownDash } from "lucide-react"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}


interface SeparatorArrowProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "dashed" | "dotted";
  size?: "sm" | "md" | "lg";
  color?: "default" | "primary" | "secondary" | "muted";
  showArrow?: boolean;
  arrowDirection?: "left" | "right" | "up" | "down";
}

function SeparatorArrow({
  className,
  orientation = "horizontal",
  variant = "default",
  size = "md",
  color = "default",
  showArrow = true,
  arrowDirection = "right",
  ...props
}: SeparatorArrowProps) {
  const baseClasses = cn(
    "relative flex items-center justify-center",
    orientation === "horizontal" ? "w-full" : "h-full",
    className
  );

  const lineClasses = cn(
    "flex-1",
    {
      // Size variants
      "h-px": size === "sm" && orientation === "horizontal",
      "h-0.5": size === "md" && orientation === "horizontal", 
      "h-1": size === "lg" && orientation === "horizontal",
      "w-px": size === "sm" && orientation === "vertical",
      "w-0.5": size === "md" && orientation === "vertical",
      "w-1": size === "lg" && orientation === "vertical",
      
      // Color variants
      "bg-border": color === "default",
      "bg-primary": color === "primary", 
      "bg-secondary": color === "secondary",
      "bg-muted": color === "muted",
      
      // Line style variants
      "border-t": variant === "dashed" && orientation === "horizontal",
      "border-l": variant === "dashed" && orientation === "vertical",
      "border-dashed": variant === "dashed",
      "border-dotted": variant === "dotted",
    }
  );

  const arrowClasses = cn(
    "transition-transform duration-200",
    {
      // Arrow direction
      "rotate-0": arrowDirection === "right",
      "rotate-180": arrowDirection === "left", 
      "rotate-90": arrowDirection === "down",
      "-rotate-90": arrowDirection === "up",
      
      // Color variants for arrow
      "text-border": color === "default",
      "text-primary": color === "primary",
      "text-secondary": color === "secondary", 
      "text-muted": color === "muted",
    }
  );

  const arrowSize = {
    sm: "w-3 h-3",
    md: "w-4 h-4", 
    lg: "w-5 h-5"
  };

  return (
    <div className={baseClasses} {...props}>
      {/* Left line */}
      <div className={lineClasses} />
      
      {/* Arrow */}
      {showArrow && (
        <div className={cn("mx-2", arrowClasses)}>
          <svg 
            className={arrowSize[size]}
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </div>
      )}
      
      {/* Right line */}
      <div className={lineClasses} />
    </div>
  );
}

// Vertical arrow separator
function SeparatorArrowVertical({
  className,
  variant = "default",
  size = "md",
  color = "default",
  showArrow = true,
  arrowDirection = "down",
  ...props
}: Omit<SeparatorArrowProps, "orientation">) {
  return (
    <SeparatorArrow
      className={cn("flex-col", className)}
      orientation="vertical"
      variant={variant}
      size={size}
      color={color}
      showArrow={showArrow}
      arrowDirection={arrowDirection}
      {...props}
    />
  );
}

// Simple arrow connector for connecting two elements
function ArrowConnector({
  className,
  color = "default",
  size = "md",
  ...props
}: {
  className?: string;
  color?: "default" | "primary" | "secondary" | "muted";
  size?: "sm" | "md" | "lg";
}) {
  const connectorClasses = cn(
    "flex items-center justify-center",
    className
  );

  const arrowSize = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-10 h-10"
  };

  const arrowColor = {
    default: "text-border",
    primary: "text-primary", 
    secondary: "text-secondary",
    muted: "text-muted"
  };

  return (
    <div className={connectorClasses} {...props}>
     <ArrowBigDownDash className={cn(arrowSize[size], arrowColor[color])} />
    </div>
  );
}

export { Separator, SeparatorArrow, SeparatorArrowVertical, ArrowConnector }
