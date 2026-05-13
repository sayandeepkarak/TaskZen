"use client";

import { forwardRef } from "react";
import { Button } from "antd";
import type { ButtonProps } from "antd";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface AppButtonProps extends ButtonProps {
  label?: string;
  icon?: LucideIcon;
  iconSize?: number;
}

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    { label, icon: Icon, iconSize = 16, children, className, style, ...props },
    ref,
  ) => {
    const defaultStyles: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      minHeight: 40,
      fontSize: 13,
      color: "#999",
      ...style,
    };

    return (
      <Button
        ref={ref}
        style={defaultStyles}
        className={cn(className)}
        {...props}
      >
        {Icon && <Icon size={iconSize} />}
        {children || label}
      </Button>
    );
  },
);

AppButton.displayName = "AppButton";
