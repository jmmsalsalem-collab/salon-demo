import {
  Scissors,
  Palette,
  Sparkles,
  Wind,
  Waves,
  Crown,
  Hand,
  Eye,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Scissors,
  Palette,
  Sparkles,
  Wind,
  Waves,
  Crown,
  Hand,
  Eye,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name] ?? Sparkles;
  return <Icon className={className} strokeWidth={1.5} />;
}
