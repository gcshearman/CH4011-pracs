import { useParams, Link } from "react-router-dom";
import { getWorksheetByNumber } from "@/components/worksheets";

export default function WorksheetPage() {
  const { experimentNumber } = useParams<{ experimentNumber: string }>();
  const number = Number(experimentNumber);

  const worksheet = getWorksheetByNumber(number);

  if (!worksheet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">
            Experiment {number} not found
          </h1>
          <p className="mt-2 text-slate-600">
            <Link to="/" className="text-blue-600 hover:underline">
              Back to home
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const ActiveWorksheet = worksheet.component;

  return <ActiveWorksheet />;
}