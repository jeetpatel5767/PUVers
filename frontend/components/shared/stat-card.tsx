import { Card } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
}

export function StatCard({ label, value, subtext }: StatCardProps) {
  return (
    <Card>
      <p className="text-xs uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-1 text-3xl font-bold">{value}</p>
      {subtext && <p className="mt-1 text-xs text-neutral-500">{subtext}</p>}
    </Card>
  );
}
