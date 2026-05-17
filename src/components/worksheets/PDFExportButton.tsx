import { useState, useRef } from "react";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type Props = {
  experimentNumber: number;
  title: string;
};

export function PDFExportButton({ experimentNumber, title }: Props) {
  const [isExporting, setIsExporting] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!pdfRef.current) return;

    setIsExporting(true);

    try {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`Experiment${experimentNumber}_Results.pdf`);
    } catch (error) {
      console.error("PDF export failed:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <div ref={pdfRef} className="hidden">
        {/* This will be captured for PDF - you can customize this layout */}
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
          <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
            CH4011 Experiment {experimentNumber}
          </h1>
          <h2 style={{ fontSize: "18px", marginBottom: "20px" }}>{title}</h2>
          <div style={{ marginBottom: "20px" }}>
            <p>Name: ________________________</p>
            <p>KU ID: ________________________</p>
          </div>
          <div id="worksheet-content">
            {/* Worksheet content will be rendered here */}
          </div>
        </div>
      </div>

      <button
        onClick={handleExport}
        disabled={isExporting}
        className="rounded-2xl bg-cyan-500 px-6 py-3 text-base font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-50 transition"
      >
        <Download className="mr-2 inline h-5 w-5" />
        {isExporting ? "Exporting..." : "Export PDF"}
      </button>
    </>
  );
}