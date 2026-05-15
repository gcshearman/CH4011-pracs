import WorksheetShell from "@/components/worksheets/WorksheetShell";
import WorksheetSection from "@/components/worksheets/WorksheetSection";
import DataTableInput from "@/components/worksheets/DataTableInput";

export default function Experiment11() {
  return (
    <WorksheetShell
      title="Experiment 11: Measuring the Radius of Sodium and Potassium Ions"
      practicalType="CH4011 Practical"
      completionPercentage={0}
      completedSections={0}
      totalSections={3}
    >
      <WorksheetSection
        sectionNumber={1}
        title="Raw Titration Data"
        description="Record your burette readings."
        completed
      >
        <DataTableInput />
      </WorksheetSection>

      <WorksheetSection
        sectionNumber={2}
        title="Calculations"
      >
        <p>Mean titre calculation goes here.</p>
      </WorksheetSection>

      <WorksheetSection
        sectionNumber={3}
        title="Evaluation"
      >
        <p>Analysis and error discussion.</p>
      </WorksheetSection>
    </WorksheetShell>
  );
}