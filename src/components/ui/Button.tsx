"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
  onClick?: () => void;
}

export default function Button({ children, variant = "primary", className = "", onClick }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-primary text-on-primary hover:bg-primary/90 px-8 py-3 rounded-full font-manrope font-semibold",
    secondary: "bg-secondary text-on-secondary hover:bg-secondary/90 px-8 py-3 rounded-full font-manrope font-semibold",
    tertiary: "font-serif italic text-foreground px-0 py-2 border-b-2 border-tertiary border-opacity-100 hover:border-opacity-60 translate-y-[-4px]",
  };

  const finalClassName = `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <button className={finalClassName} onClick={onClick}>
      {children}
    </button>
  );
}
