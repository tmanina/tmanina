"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
}

/**
 * زر بسيط مبني على Bootstrap
 * يدعم:
 * - variant: primary | outline | ghost | danger
 * - size: sm | md | lg
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseClass = "btn"

    const variantClass =
      variant === "primary"
        ? "btn-primary"
        : variant === "outline"
        ? "btn-outline-primary"
        : variant === "danger"
        ? "btn-danger"
        : "btn-link" // ghost

    const sizeClass =
      size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : ""

    return (
      <button
        ref={ref}
        className={cn(baseClass, variantClass, sizeClass, className)}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export default Button
