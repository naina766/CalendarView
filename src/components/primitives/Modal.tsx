import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  const baseClasses = "rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

  const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-400",
    secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-300",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
  };

  const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
