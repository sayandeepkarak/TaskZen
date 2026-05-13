"use client";

import { forwardRef } from "react";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

interface AppCalendarProps extends Omit<DatePickerProps, "value" | "onChange"> {
  value?: string;
  onChange?: (dateStr: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppCalendar = forwardRef<any, AppCalendarProps>(
  ({ className, value, onChange, ...props }, ref) => {
    return (
      <DatePicker
        ref={ref}
        className={cn(className)}
        value={value ? dayjs(value) : null}
        onChange={(_, date) => {
          // multiselection not handled yet!
          onChange?.(date as string);
        }}
        {...props}
      />
    );
  },
);

AppCalendar.displayName = "AppCalendar";
