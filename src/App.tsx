import { useState } from "react";
import { worksheets } from "@/worksheets";

export default function App() {
  const [active, setActive] = useState("CH4011-E11");

  const ActiveWorksheet =
    worksheets.find((w) => w.id === active)?.component;

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 space-y-3">
        <h2 className="text-lg font-bold mb-4">Worksheets</h2>

        {worksheets.map((w) => (
          <button
            key={w.id}
            onClick={() => setActive(w.id)}
            className={`w-full text-left px-3 py-2 rounded-lg transition ${
              active === w.id
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-slate-100"
            }`}
          >
            {w.title}
          </button>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1">
        {ActiveWorksheet && <ActiveWorksheet />}
      </main>
    </div>
  );
}
