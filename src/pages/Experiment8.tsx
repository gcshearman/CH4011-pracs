import WorksheetShell from "@/components/worksheets/WorksheetShell";
import ExperimentRenderer from "@/components/worksheets/ExperimentRenderer";
import { Experiment8 } from "@/data/practicals/Experiment8";


export default function Experiment8Page() {
  return (
    <WorksheetShell
      experimentNumber={8}
      practicalType={Experiment8.module}
      title={Experiment8.title}
      completionPercentage={0}
      completedSections={0}
      totalSections={Experiment8.sections.length}
    >
      <ExperimentRenderer 
        experiment={Experiment8} 
      />
    </WorksheetShell>
  );
}