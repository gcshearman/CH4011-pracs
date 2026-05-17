import { useRef } from "react";
import WorksheetShell from "@/components/worksheets/WorksheetShell";
import ExperimentRenderer from "@/components/worksheets/ExperimentRenderer";
import { Experiment11 } from "@/data/practicals/Experiment11";
import { exportWorksheetToPDF } from "@/utils/exportPDF";


export default function Experiment11Page() {
  const worksheetRef = useRef<HTMLDivElement>(null);


  const handleExportPDF = async () => {
    if (!worksheetRef.current) return;


    const tempEl = document.createElement("div");
    tempEl.id = "worksheet-for-pdf";
    tempEl.innerHTML = worksheetRef.current.innerHTML;
    document.body.appendChild(tempEl);


    try {
      await exportWorksheetToPDF(
        "worksheet-for-pdf",
        `Experiment${Experiment11.number}_Results.pdf`
      );
    } finally {
      document.body.removeChild(tempEl);
    }
  };


  return (
    <div ref={worksheetRef}>
      <WorksheetShell
        experimentNumber={11}
        practicalType={Experiment11.module}
        title={Experiment11.title}
        completionPercentage={100}
        completedSections={Experiment11.sections.filter(
          (s) => !s.title.includes("Automatic Marking")
        ).length}
        totalSections={Experiment11.sections.filter(
          (s) => !s.title.includes("Automatic Marking")
        ).length}
        onExportPDF={handleExportPDF}
      >
        <ExperimentRenderer 
          experiment={Experiment11}
        />
      </WorksheetShell>
    </div>
  );
}