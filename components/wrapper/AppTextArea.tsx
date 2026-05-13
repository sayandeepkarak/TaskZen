"use client";

import { forwardRef } from "react";
import { Input } from "antd";
import type { TextAreaProps } from "antd/es/input";
import { cn } from "@/lib/utils";

const { TextArea } = Input;

interface AppTextAreaProps extends TextAreaProps {
  label?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppTextArea = forwardRef<any, AppTextAreaProps>(
  ({ label, className, style, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <label className="text-[13px] font-medium text-gray-700">
            {label}
          </label>
        )}
        <TextArea
          ref={ref}
          style={style}
          className={cn(className)}
          {...props}
        />
      </div>
    );
  },
);

AppTextArea.displayName = "AppTextArea";
