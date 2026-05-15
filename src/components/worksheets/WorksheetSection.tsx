import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WorksheetSectionProps {
  sectionNumber: number;
  title: string;
  description?: string;
  completed?: boolean;
  accentColor?: "cyan" | "green" | "amber" | "red" | "slate";
  children: ReactNode;
}

const accentStyles = {
  cyan: "border-cyan-500 bg-cyan-50 text-cyan-800",
  green: "border-green-500 bg-green-50 text-green-800",
  amber: "border-amber-500 bg-amber-50 text-amber-800",
  red: "border-red-500 bg-red-50 text-red-800",
  slate: "border-slate-500 bg-slate-50 text-slate-800",
};

export default function WorksheetSection({
  sectionNumber,
  title,
  description,
  completed = false,
  accentColor = "cyan",
  children,
}: WorksheetSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="overflow-hidden rounded-3xl border-none shadow-md">
        {/* Header */}
        <div
          className={cn(
            "border-l-8 px-6 py-5",
            accentStyles[accentColor]
          )}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge className="rounded-xl px-3 py-1 text-sm font-semibold">
                  Section {sectionNumber}
                </Badge>

                {completed ? (
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-slate-500">
                    <Circle className="h-5 w-5" />
                    <span className="text-sm font-medium">In Progress</span>
                  </div>
                )}
              </div>

              <h2 className="text-2xl font-bold leading-tight">{title}</h2>

              {description && (
                <p className="max-w-3xl text-sm leading-relaxed text-slate-700">
                  {description}
                </p>
              )}
            </div>

            <ChevronDown className="h-6 w-6 text-slate-500" />
          </div>
        </div>

        {/* Content */}
        <CardContent className="space-y-6 bg-white p-8">
          {children}
        </CardContent>
      </Card>
    </motion.section>
  );
}
