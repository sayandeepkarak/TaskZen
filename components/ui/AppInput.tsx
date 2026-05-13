"use client";

import { forwardRef } from "react";
import { Input } from "antd";
import type { InputProps, InputRef } from "antd";

interface AppInputProps extends InputProps {
  label?: string;
  error?: string;
}

export const AppInput = forwardRef<InputRef, AppInputProps>(
  ({ label, error, status, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label
            style={{
              display: "block",
              marginBottom: 4,
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            {label}
          </label>
        )}
        <Input ref={ref} status={error ? "error" : status} {...props} />
        {error && (
          <p style={{ color: "#ff4d4f", fontSize: 12, marginTop: 2 }}>
            {error}
          </p>
        )}
      </div>
    );
  },
);

AppInput.displayName = "AppInput";
