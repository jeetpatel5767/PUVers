import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "muted";
  className?: string;
}

const variants = {
  default: "bg-black text-white",
  outline: "bg-white text-black border border-black",
  muted: "bg-neutral-100 text-black border border-neutral-300",
};

export function Badge({ children, variant = "outline", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const label = status.replace(/_/g, " ");
  const isPending = status.includes("pending");
  const isPublished = status === "published" || status === "registered" || status === "active";
  const isCancelled = status === "cancelled" || status === "rejected";
  const isWaitlisted = status === "waitlisted";

  return (
    <Badge
      variant={
        isPublished ? "default" : isPending || isWaitlisted ? "muted" : isCancelled ? "outline" : "outline"
      }
    >
      {label}
    </Badge>
  );
}
