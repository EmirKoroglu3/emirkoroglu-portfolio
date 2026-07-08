import Image from "next/image";

import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

export function ProfileAvatar({
  className,
  size = 40,
  priority = false,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src={profile.avatar.src}
      alt={profile.avatar.alt}
      width={size}
      height={size}
      priority={priority}
      className={cn("rounded-xl object-cover object-top", className)}
    />
  );
}
