// src/app/components/Logo.tsx
import { motion } from "motion/react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ variant = "light", size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  const textColor = variant === "light" ? "text-white" : "text-[#131210]";

  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      {/* Logo Image PNG */}
      <motion.img
        src="/logo.png"
        alt="Urban House Logo"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        className={`${sizeClasses[size]} object-contain`}
      />

      {/* Texte Urban House */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`${textSizes[size]} ${textColor} tracking-[0.2em] uppercase font-light leading-tight`}
            style={{ fontFamily: "'Fraunces', serif", letterSpacing: "0.2em" }}
          >
            URBAN
          </span>
          <span
            className={`${textSizes[size]} ${textColor} tracking-[0.2em] uppercase font-bold leading-tight`}
            style={{ fontFamily: "'Fraunces', serif", letterSpacing: "0.2em" }}
          >
            HOUSE
          </span>
        </div>
      )}
    </div>
  );
}