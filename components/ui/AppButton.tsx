"use client";

import { forwardRef } from "react";
import { Button } from "antd";
import type { ButtonProps } from "antd";

interface AppButtonProps extends ButtonProps {
  label?: string;
}

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ label, children, ...props }, ref) => {
    return (
      <Button ref={ref} {...props}>
        {children || label}
      </Button>
    );
  },
);

AppButton.displayName = "AppButton";
