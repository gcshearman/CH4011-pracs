import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";
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
  cyan: "bg-slate-900 text-white",
  green: "bg-slate-900 text-white",
  amber: "bg-slate-900 text-white",
  red: "bg-slate-900 text-white",
  slate: "bg-slate-900 text-white",
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
      <Card className="overflow-hidden rounded-none border border-slate-200 bg-slate-900 shadow-sm">
        {/* Header (no bottom border) */}
        <div
          className={cn(
            "px-6 py-5 shadow-inner",
            accentStyles[accentColor]
          )}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                  <Badge className="rounded-none border border-slate-600 bg-slate-700 px-3 py-1 text-sm font-semibold text-slate-100 shadow-sm">
                    Section {sectionNumber}
                  </Badge>


                {completed ? (
                  <div className="flex items-center gap-2 text-green-200">
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
                <p className="max-w-3xl text-sm leading-relaxed text-slate-300">
                  {description}
                </p>
              )}
            </div>
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