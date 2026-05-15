import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, FlaskConical, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface WorksheetShellProps {
  title: string;
  practicalType: string;
  completionPercentage: number;
  completedSections: number;
  totalSections: number;
  onExportPDF?: () => void;
  children: ReactNode;
}

export default function WorksheetShell({
  title,
  practicalType,
  completionPercentage,
  completedSections,
  totalSections,
  onExportPDF,
  children,
}: WorksheetShellProps) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-cyan-500/20 p-3">
              <FlaskConical className="h-8 w-8 text-cyan-300" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                {practicalType}
              </p>
              <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:min-w-[320px]">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Worksheet Completion</span>
              <span>
                {completedSections}/{totalSections} sections
              </span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
          </div>

          <Button
            onClick={onExportPDF}
            className="rounded-2xl bg-cyan-500 px-6 py-3 text-base font-semibold text-slate-950 hover:bg-cyan-400"
          >
            <Download className="mr-2 h-5 w-5" />
            Export PDF
          </Button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="rounded-3xl border-none shadow-md">
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-800">
                  Progress Overview
                </h2>

                <div className="mb-4 flex items-center gap-3 rounded-2xl bg-green-50 p-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm text-slate-600">Current Progress</p>
                    <p className="text-xl font-bold text-slate-900">
                      {completionPercentage}%
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-slate-700">
                  <li>• Enter experimental data accurately</li>
                  <li>• Complete calculations stepwise</li>
                  <li>• Review graph outputs</li>
                  <li>• Export completed worksheet</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <Card className="rounded-3xl border-none shadow-md">
            <CardContent className="p-6">
              <h2 className="mb-3 text-lg font-semibold">Practical Guidance</h2>
              <p className="text-sm leading-relaxed text-slate-600">
                Ensure all measurements are recorded to appropriate precision,
                concordant values are identified correctly, and calculations are
                clearly evidenced for full marks.
              </p>
            </CardContent>
          </Card>
        </aside>

        {/* Worksheet Content */}
        <main>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
