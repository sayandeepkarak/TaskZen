"use client";

import { forwardRef } from "react";
import { Input } from "antd";
import type { InputProps, InputRef } from "antd";
import { cn } from "@/lib/utils";

interface AppInputProps extends InputProps {
  label?: string;
}

export const AppInput = forwardRef<InputRef, AppInputProps>(
  ({ label, style, className, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <label className="text-[13px] font-medium text-gray-700">
            {label}
          </label>
        )}
        <Input ref={ref} style={style} className={cn(className)} {...props} />
      </div>
    );
  },
);

AppInput.displayName = "AppInput";
