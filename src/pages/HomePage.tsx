import { Link } from "react-router-dom";
import { worksheets } from "@/components/worksheets";
import { FlaskConical, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero header */}
      <header className="border-b border-cyan-900/30 bg-slate-900/85 backdrop-blur-md text-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="rounded-none bg-cyan-500/20 p-4">
              <FlaskConical className="h-12 w-12 text-cyan-300" />
            </div>
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                Laboratory Practical Worksheets
              </p>
              <h1 className="text-3xl font-bold md:text-5xl tracking-tight">
                CH4011 Practical Experiments
              </h1>
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
                Access interactive worksheets for your laboratory practicals.
                Enter experimental data, complete calculations stepwise, and export
                your completed work.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Worksheet cards */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-8 text-xl font-semibold text-slate-800">
          Available Experiments
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {worksheets.map((w) => (
            <Link
              key={w.id}
              to={`/experiment/${w.experimentNumber}`}
              className="group relative overflow-hidden border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl"
            >
              {/* Card header with dark slate background */}
              <div className="bg-slate-900 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="rounded-md border border-slate-600 bg-slate-700 px-3 py-1 text-sm font-semibold text-slate-100">
                    Experiment {w.experimentNumber}
                  </div>
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </div>
                <h3 className="mt-4 text-lg font-bold leading-tight">
                  {w.title}
                </h3>
              </div>

              {/* Card body */}
              <div className="p-6">
                <p className="text-sm text-slate-600">
                  Click to open the interactive worksheet for this experiment.
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-cyan-600">
                  <span>Start worksheet</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-500">
          <p>CH4011 Practical Chemistry • Laboratory Worksheets</p>
        </div>
      </footer>
    </div>
  );
}