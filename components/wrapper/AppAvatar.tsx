"use client";

import { forwardRef } from "react";
import { Avatar } from "antd";
import type { AvatarProps } from "antd";
import { cn } from "@/lib/utils";

type AppAvatarProps = AvatarProps;

export const AppAvatar = forwardRef<HTMLSpanElement, AppAvatarProps>(
  ({ className, ...props }, ref) => {
    return <Avatar ref={ref} className={cn(className)} {...props} />;
  },
);

AppAvatar.displayName = "AppAvatar";
